import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import GemstoneExtraction from '../abis/GemstoneExtraction.json';
import Navbar from './Navbar'
import Main from './Main'
import MinedGemForm from './forms/MinedGemForm';
import ProcessingList from './products/ProcessingList'
import MinedGemsList from './products/MinedGemsList'
import Dashboard from './Dashboard'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OwnedByUser from './OwnedByUser';



class App extends Component {

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
    
  }

  gemMining(gemType, price, miningLocation, extractionMethod ){
    this.setState({ loading: true })
    this.state.gemsE.methods.gemMining(gemType, price, miningLocation, extractionMethod ).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }
  

  purchaseGem(id, price ){
    this.setState({ loading: true })
    this.state.gemsE.methods.purchaseGem(id).send({ from: this.state.account, value: price })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  render() {
    return (
      
      <div className='col-6'> 
        <Router>
          {/* Navbar mindig látható */}
          <Navbar account={this.state.account} />
          <Routes>
            {/* Az alábbi útvonalakon csak a Dashboard jelenik meg */}
            <Route path="/addMinedGem" element={<MinedGemForm gemMining={this.gemMining} />} />
            <Route path="/minedGems" element={<MinedGemsList  minedGems={this.state.minedGems}
                                                              gemMining={this.gemMining}
                                                              purchaseGem={this.purchaseGem}
                                                              />} />
            <Route path="/processingList" element={<ProcessingList  minedGems={this.state.minedGems}
                                                                    gemMining={this.gemMining}
                                                                    purchaseGem={this.purchaseGem}
                                                                    />} />
            <Route path="/ownMinedGems" element={<OwnedByUser  minedGems={this.state.minedGems}
                                                               gemMining={this.gemMining}
                                                               purchaseGem={this.purchaseGem}
                                                               account={this.state.account}
                                                                    />} />
          </Routes>
        </Router> 
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex"> 
            
            <div id="content">
             {/* <MinedGemForm gemMining={this.gemMining} /> 
              {this.state.loading ? (
                <div id="loader" className="text-center">
                  <p className="text-center">Loading...</p>
                </div>
              ) : (
                <div>
                  <MinedGemsList
                    minedGems={this.state.minedGems}
                    gemMining={this.gemMining}
                    purchaseGem={this.purchaseGem}
                  />
                  <ProcessingList
                    minedGems={this.state.minedGems}
                    gemMining={this.gemMining}
                    purchaseGem={this.purchaseGem}
                  />
                </div>
              )}
              */}
            </div>

            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;