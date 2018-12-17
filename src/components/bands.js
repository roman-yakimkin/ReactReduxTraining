import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as bandActions from '../actions/bands'
import { UID } from "../store/configureStore";
import OneBand from './oneband';

class Bands extends Component {

  constructor(props){
    super(props);
    this.state = {
      addNew: false,
      formName: "",
      formSubmit: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  } 

  addBand(info)  {
    let newId = UID();
    return this.props.addBand({
      id: newId,
      name: info.name
    })
  }

  handleChange(event){
    this.setState({
      formName: event.target.value
    })
  }

  
  handleSubmit(event) {
    if (this.state.formSubmit){
      this.addBand({
        name: this.state.formName
      });
    }
    this.setState({
      addNew: false,
      formName: "",
      formSubmit: false
    });
    event.preventDefault();
  }  

  renderForm() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" 
                 value={this.state.formName} 
                 onChange={this.handleChange} 
          />
          <input type="submit" 
                 value="Save" 
                 onClick={() => this.setState({
                   formSubmit: true
                 })}/>
          <input type="submit" value="Cancel" />
        </form>
      </div>
    )
  }  

  render() {
    let addBlock;

    if (!this.state.addNew){
      addBlock = <button onClick={() => this.setState({ 
        addNew: true 
      })}> 
      Add new band 
      </button>
    }
    else 
      addBlock = this.renderForm();

    return (
      <div>
        <div>
          {addBlock}
        </div>
        {this.props.bands.map((band, i) => 
          <div key={i}>
          <OneBand id={band.id} />
          </div>
        )
        }
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    bands: state.bands
  };
}

function matchDispatchToProps(dispatch){
  return bindActionCreators(bandActions, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Bands);