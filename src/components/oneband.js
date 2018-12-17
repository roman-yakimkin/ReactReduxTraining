import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as bandActions from '../actions/bands'

class OneBand extends Component {

  constructor(props){
    super(props);

    let name = this.props.bands.filter((item) => (item.id === this.props.id))[0].name;

    this.state = {
      isEdit :false,
      fieldName: name,
      formName: name,
      formSubmit: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({
      formName: event.target.value
    })
  }
  
  handleSubmit(event) {
    console.log(event);
    if (this.state.formSubmit){
        this.props.editBand({
          id: this.props.id,
          name: this.state.formName,
        });
        this.setState({
          fieldName: this.state.formName  
        });

      }
    else{
      this.setState({
        formName: this.state.fieldName
      })
    };
    this.setState({
      isEdit: false,
      formSubmit: false
    });
    event.preventDefault();
  }  

  renderEdit(id) {
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

  render(){
    let editBlock;
        if (!this.state.isEdit){
      editBlock = <button onClick={() => this.setState({ 
        isEdit: true 
      })}> 
      Edit 
      </button>
    }
    else {
      editBlock = this.renderEdit(this.props.id);
    }


    return (
      <div className="oneband">
        <div className="info">
        {this.props.id} - {this.state.fieldName}
        </div>
        <div className="actions">
          {editBlock}
          <button onClick={() => this.props.deleteBand(this.props.id)}
          >
            Delete
          </button> 
        </div>
      </div>  
    )
  }
}

function mapStateToProps (state) {
  return {
    bands: state.bands
  }
}

function matchDispatchToProps(dispatch){
  return bindActionCreators(bandActions, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(OneBand);