import React, { Component } from 'react'
import OneAlbum from './onealbum'
import * as albumActions from '../actions/albums'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { UID } from "../store/configureStore"

class Albums extends Component {
  constructor(props){
    super(props);
    this.state = {
      addNew: false,
      form: {
        band_id: 1,
        name: "",
        year: "",
      },
      formSubmit: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addAlbum(info)  {
    let newId = UID();
    return this.props.addAlbum({
      id: newId,
      band_id: info.band_id,
      name: info.name,
      year: info.year
    })
  }


  handleChange(event){
    let newData = {...this.state.form};
    switch (event.target.name) {
      case 'name':
        newData.name = event.target.value;
        break;
      case 'year':      
        newData.year = event.target.value;
        break;
     case 'band':      
        newData.band_id = event.target.value;
        break;
      default:
        break;  
    }
        
    this.setState({
      form: {...newData}
    })

    console.log(newData);
  }
  
  handleSubmit(event) {
    if (this.state.formSubmit){
      this.addAlbum({...this.state.form});
    }
    this.setState({
      addNew: false,
      form: {
        band_id: 0,
        name: "",
        year: "",
      },
      formSubmit: false
    });
    event.preventDefault();
  }  

  renderForm() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" 
                 name="name" 
                 value={this.state.form.name} 
                 onChange={this.handleChange} 
          />
          <input type="text"
                 name="year"  
                 value={this.state.form.year} 
                 onChange={this.handleChange} 
          />
          <select name="band"
                  value="1"
                  onChange={this.handleChange}
          >
          {this.props.bands.map((item, i) => 
            <option 
              key={i} 
              value={item.id} 
            >
              {item.name}
            </option> ) }
          </select> 
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
        Add new album 
      </button>
    }
    else 
      addBlock = this.renderForm();

    return (
      <div>
        <div>
          {addBlock}
        </div>
        <div>
        {this.props.albums.map((album, i) => 
          <div key={i}>
          <OneAlbum id={album.id} />
          </div>
          )
        }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    albums: state.albums,
    bands: state.bands 
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(albumActions, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Albums)