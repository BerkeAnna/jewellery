import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
            <div id="content">
                <h1>Add gem</h1>
                <form onSubmit={(event) => {
                    event.preventDefault()
                    const gemType = this.gemType.value
                    const price = window.web3.utils.toWei(this.price.value.toString(), 'Ether')
                    const miningLocation = this.miningLocation.value
                    const extractionMethod = this.extractionMethod.value
                    this.props.gemMining(gemType, price, miningLocation, extractionMethod)
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
                    <p>&nbsp;</p>
                    <h2>Buy Product</h2>
                        <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Owner</th>
                                <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody >
                              {this.props.minedGems.map((minedGem, key) => {
                                return(
                                    <tr key={key}>
                                        <th scope="row">{minedGem.id.toString()}</th>
                                        <td>{minedGem.gemType}</td>
                                        <td>{minedGem.miningLocation}</td>
                                        <td>{minedGem.extractionMethod}</td>
                                        <td>{window.web3.utils.fromWei(minedGem.price.toString(), 'Ether')} Eth</td>
                                        <td>{minedGem.owner} </td>
                                        <td>
                                            <button 
                                                name = {minedGem.id}
                                                value={minedGem.price}
                                                onClick={(event) => { 
                                                    this.props.purchaseGem(event.target.name, event.target.value)
                                                 } }
                                            >
                                            Buy
                                            </button>
                                        </td>
                                    </tr>

                                )
                              })}
                            
                            </tbody>
                        </table>
            </div>
    );
  }
}

export default Main;