import React, { Component } from 'react';
import Web3 from 'web3'
import { Link } from 'react-router-dom';

class Navbar extends Component {

  render() {
    return (
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="http://www.dappuniversity.com/bootcamp"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mined gems
        </a>
        <ul className='navbar-nav px-3 justify-content-center d-flex flex-row'>
          <li className='nav-item text-nowrap d-none d-sm-none d-sm-block'>
            <small className='text-white'><Link to="/dashboard">Dashboard</Link></small>
          </li>
          <li className='nav-item text-nowrap d-none d-sm-none d-sm-block ml-2'>
            <small className='text-white'><Link to="/minedGems">Mined Gems</Link></small>
          </li>
          <li className='nav-item text-nowrap d-none d-sm-none d-sm-block ml-2'>
            <small className='text-white'><Link to="/processingList">Processing List</Link></small>
          </li>
        </ul>
        <ul className='navbar-nav px-3'>
          <li className='nav-item text-nowrap d-none d-sm-none d-sm-block'>
          <small className='text-white'><span id='account'>{this.props.account}</span></small>
             </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;