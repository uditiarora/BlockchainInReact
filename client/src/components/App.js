import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Title from './Title';
import '../css/App.css';
class App extends Component {
  state = { walletInfo: {} };

  componentDidMount() {
    fetch(`${document.location.origin}/api/wallet-info`)
      .then(response => response.json())
      .then(json => this.setState({ walletInfo: json }));
  }

  render() {
    const { address, balance } = this.state.walletInfo;

    return (
      <div className="App">
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-md-5 col-sm-12 title-container">
                  <Title />
                </div>
                <div className="col-md-7 col-sm-12 form-container">
                  <div><Link to='/blocks'><button className="btn2 btn btn-primary col-md-4">Blocks</button></Link></div>
                  <div><Link to='/conduct-transaction'><button className="btn2 btn btn-primary col-md-4">Conduct a Transaction</button></Link></div>
                  <div><Link to='/transaction-pool'><button className="btn2 btn btn-primary col-md-4">Transaction Pool</button></Link></div>
                  <br />
                  <br />
                  <br />
                  <br />
                  
                  <hr />
                  <div className='WalletInfo'>
                    <div className="col-md-12"><p>Address: {address}</p></div>
                    <div className="col-md-12"><p>Balance: {balance}</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    );
  }
}

export default App;