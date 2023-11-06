import React, { Component } from 'react';

class SelectedGemForm extends Component {

  render() {
    return (
            <div id="content" className='pt-5 pl-3'>
                <h1>Add selected gem</h1>
                <form onSubmit={(event) => {
                    event.preventDefault()
                    const gemType = this.gemType.value
                    const price = window.web3.utils.toWei(this.price.value.toString(), 'Ether')
                    const color = this.color.value
                    const minedGemId = this.minedGemId.value
                    const height = this.height.value
                    const width = this.width.value
                    const thickness = this.thickness.value
                    const carat = this.carat.value

                    this.props.gemSelecting(minedGemId,height, width, thickness, carat, color,  gemType, price);
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
                      <label htmlFor="color">Color:</label>
                      <input
                      id="color"
                      type="text"
                      ref={(input) => { this.color = input }}
                      className="form-control"
                      placeholder="color"
                      required />
                    </div>
                    <div className="form-group mr-sm-2">
                        <input
                        id="height"
                        type="number"
                        ref={(input) => { this.height = input }}
                        className="form-control"
                        placeholder="height"
                        required />
                    </div>
                    <div className="form-group mr-sm-2">
                        <input
                        id="width"
                        type="number"
                        ref={(input) => { this.width = input }}
                        className="form-control"
                        placeholder="width"
                        required />
                    </div>
                    <div className="form-group mr-sm-2">
                        <input
                        id="thickness"
                        type="number"
                        ref={(input) => { this.thickness = input }}
                        className="form-control"
                        placeholder="thickness"
                        required />
                    </div>
                    <div className="form-group mr-sm-2">
                        <input
                        id="carat"
                        type="number"
                        ref={(input) => { this.carat = input }}
                        className="form-control"
                        placeholder="carat"
                        required />
                    </div>
                    <div className="form-group mr-sm-2">
                        <input
                        id="minedGemId"
                        type="number"
                        ref={(input) => { this.minedGemId = input }}
                        className="form-control"
                        placeholder="minedGemId"
                        required />
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Add selected gem</button>
                </form>
            </div>
   );               
  }
  
}

export default SelectedGemForm;