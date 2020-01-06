const Block = require('./block');
const { GENESIS_DATA } = require('./config');
const cryptoHash = require('./crypto-hash');
describe('Block',() => {
    const timestamp="date";
    const lastHash="lh";
    const hash="h";
    const data="d";
    const nonce = 1;
    const difficulty = 1;
    const block= new Block({
        timestamp: timestamp,
        lastHash : lastHash,
        hash : hash,
        data : data,
        nonce: nonce,
        difficulty: difficulty
    });



    it('has a timestamp, lastHash, hash and data',() => {
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
        expect(block.nonce).toEqual(nonce);
        expect(block.difficulty).toEqual(difficulty);

    });

    describe('genesis()', () => {
        const genesisBlock = Block.genesis();

        it('returns a  block instance', () => {
            expect(genesisBlock instanceof Block).toBe(true);
        });

        it('returns the genesis data', () => {
            expect(genesisBlock).toEqual(GENESIS_DATA);
        });
    });

    describe('mineBlock()',() => {
        const lastBlock = Block.genesis();
        const data = 'mined data';
        const minedBlock = Block.mineBlock({lastBlock, data});
        
        it('returns a block instance', () => {
            expect(minedBlock instanceof Block).toBe(true);
        });
        it('sets the lastHash to be hash of lastBlock', () => {
            expect(minedBlock.lastHash).toEqual(lastBlock.hash);
        });
        it('sets the data',() => {
            expect(minedBlock.data).toEqual(data);
        });
        it('sets a timestamp',() => {
            expect(minedBlock.timestamp).not.toEqual(undefined);
        });
        it('creates a SHA-256 hash based on proper inputs',() => {
            expect(minedBlock.hash)
            .toEqual(cryptoHash(
                minedBlock.timestamp,
                minedBlock.nonce, 
                minedBlock.difficulty, 
                lastBlock.hash, 
                data)
            );
        });
        it('sets a hash that matches difficulty criteria',() => {
            let str = '0';
            expect(minedBlock.hash.substring(0, minedBlock.difficulty))
            .toEqual(str.repeat(minedBlock.difficulty));
        });
    });

});