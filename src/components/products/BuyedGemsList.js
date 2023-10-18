import React, { Component } from 'react';

class buyedGemsList extends Component {

  render() {
    return (
            <div id="tables">
                    <p>&nbsp;</p>
                    <h2>List of gems waiting to be processed</h2>
                        <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">*</th>
                                <th scope="col">*</th>
                                <th scope="col">*</th>
                                <th scope="col">*</th>
                                <th scope="col">*</th>
                                <th scope="col">*</th>
                                <th scope="col">*</th>
                                </tr>
                            </thead>
                            <tbody >
                              {this.props.minedGems.map((minedGem, key) => {
                                return(
                                    
                                        minedGem.purchased == 1 && minedGem.owner!=this.props.account ? (
                                            <tr key={key}>
                                              <th scope="row">{minedGem.id.toString()}</th>
                                              <td>{minedGem.gemType}</td>
                                              <td>{minedGem.miningLocation}</td>
                                              <td>{minedGem.extractionMethod}</td>
                                              <td>{window.web3.utils.fromWei(minedGem.price.toString(), 'Ether')} Eth</td>
                                              <td>{minedGem.owner}</td>
                                              <td>{minedGem.pointOfProcessing}</td>
                                              <td>
                                                <button
                                                  name={minedGem.id}
                                                  value={minedGem.price}
                                                  onClick={(event) => {
                                                    this.props.purchaseGem(event.target.name, event.target.value);
                                                  }}
                                                >
                                                  Buy
                                                </button>
                                              </td>
                                            </tr>
                                          ) : null
                                    )
                              })}
                            
                            </tbody>
                        </table>


            </div>
    );
  }
}

export default buyedGemsList;