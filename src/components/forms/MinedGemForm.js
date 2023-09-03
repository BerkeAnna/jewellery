import React, { Component } from 'react';

class MinedGemForm extends Component {

  render() {
    return (
            <div id="content" className='pt-5 pl-3'>
                <h1>Add gem</h1>
                <form onSubmit={(event) => {
                    event.preventDefault()
                    const gemType = this.gemType.value
                    const price = window.web3.utils.toWei(this.price.value.toString(), 'Ether')
                    const miningLocation = this.miningLocation.value
                    const extractionMethod = this.extractionMethod.value
                    this.props.gemMining(gemType, price, miningLocation, extractionMethod);
                    }}>
                    <div className="form-group mr-sm-2">
                        <input
                        id="gemType"
                        type="text"
                        ref={(input) => { this.gemType = input }}
                        className="form-control"
                        placeholder="Gem Type"
                        required />
                    </div>
                    <div className="form-group mr-sm-2">
                        <input
                        id="gemPrice"
                        type="text"
                        ref={(input) => { this.price = input }}
                        className="form-control"
                        placeholder="Gem Price"
                        required />
                    </div>
                    <div className="form-group mr-sm-2">
                        <input
                        id="miningLocation"
                        type="text"
                        ref={(input) => { this.miningLocation = input }}
                        className="form-control"
                        placeholder="miningLocation"
                        required />
                    </div>
                    <div className="form-group mr-sm-2">
                        <input
                        id="extractionMethod"
                        type="text"
                        ref={(input) => { this.extractionMethod = input }}
                        className="form-control"
                        placeholder="extractionMethod"
                        required />
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Add gem</button>
                </form>
            </div>
   );               
  }
}

export default MinedGemForm;