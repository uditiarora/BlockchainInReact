const PubNub = require('pubnub');

const credentials = {
    publishKey: 'pub-c-9f6b46f8-1fff-45a7-afb4-780fd6d45144',
    subscribeKey: 'sub-c-cc9ba75c-3121-11ea-aaf2-c6d8f98a95a1',
    secretKey: 'sec-c-MTJiZjYzNzktNmM0OS00OWU2LWI0ZGEtOWU2ZTRmZGQ1ZDI0'
};

const CHANNELS = {
    TEST: 'TEST',
    BLOCKCHAIN: 'BLOCKCHAIN',
    TRANSACTION: 'TRANSACTION'
  };
  
  class PubSub {
    constructor({ blockchain, transactionPool, wallet }) {
      this.blockchain = blockchain;
      this.transactionPool = transactionPool;
      this.wallet = wallet;
  
      this.pubnub = new PubNub(credentials);
  
      this.pubnub.subscribe({ channels: Object.values(CHANNELS) });
  
      this.pubnub.addListener(this.listener());
    }
  
    broadcastChain() {
      this.publish({
        channel: CHANNELS.BLOCKCHAIN,
        message: JSON.stringify(this.blockchain.chain)
      });
    }
  
    broadcastTransaction(transaction) {
      this.publish({
        channel: CHANNELS.TRANSACTION,
        message: JSON.stringify(transaction)
      });
    }
  
    subscribeToChannels() {
      this.pubnub.subscribe({
        channels: [Object.values(CHANNELS)]
      });
    }
  
    listener() {
      return {
        message: messageObject => {
          const { channel, message } = messageObject;
  
          console.log(`Message received. Channel: ${channel}. Message: ${message}`);
          const parsedMessage = JSON.parse(message);
  
          switch(channel) {
            case CHANNELS.BLOCKCHAIN:
              this.blockchain.replaceChain(parsedMessage, () => {
                this.transactionPool.clearBlockchainTransactions(
                  { chain: parsedMessage }
                );
              });
              break;
            case CHANNELS.TRANSACTION:
              if (!this.transactionPool.existingTransaction({
                inputAddress: this.wallet.publicKey
              })) {
                this.transactionPool.setTransaction(parsedMessage);
              }
              break;
            default:
              return;
          }
        }
      }
    }
  
    publish({ channel, message }) {
     this.pubnub.publish({ message, channel });
    }
  
    broadcastChain() {
      this.publish({
        channel: CHANNELS.BLOCKCHAIN,
        message: JSON.stringify(this.blockchain.chain)
      });
    }
  
    broadcastTransaction(transaction) {
      this.publish({
        channel: CHANNELS.TRANSACTION,
        message: JSON.stringify(transaction)
      });
    }
  }
  
  module.exports = PubSub;