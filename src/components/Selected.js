import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import GemstoneExtraction from '../abis/GemstoneExtraction.json';
import Navbar from './Navbar'
import Main from './Main'
import MinedGemForm from './forms/MinedGemForm';
import SelectedGemForm from './forms/SelectedGemForm';
import BuyedGemsList from './products/BuyedGemsList'
import MinedGemsList from './products/MinedGemsList'
import Dashboard from './Dashboard'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OwnedByUser from './OwnedByUser';



class Selected extends Component {
/*
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' })
    } else if (window.web3) {
      window.web3 = new Web3(window.ethereum);
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
  
    const networkId = await web3.eth.net.getId()
    const networkData = GemstoneExtraction.networks[networkId]
    console.log(networkData)
   
    if(networkData){
      const gemsE = web3.eth.Contract(GemstoneExtraction.abi, networkData.address)
      this.setState({ gemsE })
      const minedGemCount = await gemsE.methods.minedGemCount().call()
      console.log(minedGemCount)
      console.log(gemsE.methods.minedGemCount())
      for(var i = 1 ; i<= minedGemCount; i++){
        const gem = await gemsE.methods.minedGems(i).call()
        this.setState({
          minedGems: [...this.state.minedGems, gem]
        })
      }
      this.setState({ loading: false })
    }else{
      window.alert('Gemstone extraction contract not deployed to detected network.')
    }
   
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      minedGemCount: 0, //IMPORTANT this name is same in .sol
      minedGems: [], // Inicializáld a products állapotot üres tömbként
      loading: true // Inicializáld a loading állapotot true-ként
    };

    this.gemMining = this.gemMining.bind(this)
    this.purchaseGem = this.purchaseGem.bind(this)
    this.sellGem = this.sellGem.bind(this)
    
  }

  gemMining(gemType, price, miningLocation, extractionMethod ){
    //const priceUint = parseInt(price);
    console.log(price)
    const gasLimit = 5000000; // Növelt gázlimit
    const gasPrice = window.web3.utils.toWei('300000', 'gwei'); // Növelt gázár

    this.setState({ loading: true })
    this.state.gemsE.methods.gemMining(gemType, price, miningLocation, extractionMethod).send({ from: this.state.account, gasLimit: gasLimit, gasPrice: gasPrice })
      .on('transactionHash', (hash) => {
        console.log('Transaction Hash:', hash);
      })
      .on('receipt', (receipt) => {
        console.log('Transaction Receipt:', receipt);
        this.setState({ loading: false });
      })
      .on('error', (error) => {
        console.error('Transaction Error:', error);
        this.setState({ loading: false });
      });

  }
  gemSelecting(minedGemId, height, width, thickness, carat, color, gemType,price){
    console.log(price);
    const gasLimit = 5000000; // Növelt gázlimit
    const gasPrice = window.web3.utils.toWei('300000', 'gwei'); // Növelt gázár
    this.setState({ loading: true })
    this.state.gemsE.methods.gemSelecting(minedGemId, height, width, thickness, carat, color, gemType,price).send({ from: this.state.account, gasLimit: gasLimit, gasPrice: gasPrice })
      .on('transactionHash', (hash) => {
        console.log('Transaction Hash:', hash);
      })
      .on('receipt', (receipt) => {
        console.log('Transaction Receipt:', receipt);
        this.setState({ loading: false });
      })
      .on('error', (error) => {
        console.error('Transaction Error:', error);
        this.setState({ loading: false });
      });

  }
  
  
  purchaseGem(id, price ){
    //const priceUint = parseInt(price);
    const gasLimit = 9000000;
    const gasPrice = window.web3.utils.toWei('700000', 'gwei');
    this.setState({ loading: true })
    this.state.gemsE.methods.purchaseGem(id).send({ from: this.state.account, value: price, gasLimit: gasLimit, gasPrice: gasPrice})
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  sellGem(id, price ){
    //const priceUint = parseInt(price);
    const gasLimit = 9000000;
    const gasPrice = window.web3.utils.toWei('700000', 'gwei');
    this.setState({ loading: true })
    this.state.gemsE.methods.sellGem(id).send({ from: this.state.account, value: price, gasLimit: gasLimit, gasPrice: gasPrice})
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  render() {
    return (
      
      <div className='col-6'> 
        <Router>
          {/* Navbar mindig látható */}/*
          <Navbar account={this.state.account} />
          <Routes>
          <Route path="/" element={<Dashboard  />} />
            <Route path="/addMinedGem" element={<MinedGemForm gemMining={this.gemMining} />} />
            
            <Route path="/addSelectedGem" element={<SelectedGemForm gemSelecting={this.gemSelecting} />} />
            <Route path="/minedGems" element={<MinedGemsList  minedGems={this.state.minedGems}
                                                              gemMining={this.gemMining}
                                                              purchaseGem={this.purchaseGem}
                                                              account={this.state.account}
                                                              />} />
            <Route path="/buyedGemsList" element={<BuyedGemsList  minedGems={this.state.minedGems}
                                                                    gemMining={this.gemMining}
                                                                    purchaseGem={this.purchaseGem}
                                                                    account={this.state.account}
                                                                    />} />
            <Route path="/ownMinedGems" element={<OwnedByUser  minedGems={this.state.minedGems}
                                                               gemMining={this.gemMining}
                                                               purchaseGem={this.purchaseGem}
                                                               account={this.state.account}
                                                               sellGem={this.sellGem}
                                                                    />} />
          </Routes>
        </Router> 
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex"> 
            
            <div id="content">
             {}
            </div>

            </main>
          </div>
        </div>
      </div>
    );
  }
  */
}

export default Selected;