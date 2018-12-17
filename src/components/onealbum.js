import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as albumActions from '../actions/albums'


class OneAlbum extends Component {
  constructor(props){
    super(props);

    let data = this.props.albums.filter((item) => (item.id === this.props.id))[0];

    this.state = {
      isEdit :false,
      fields: {...data},
      form: {...data},
      formSubmit: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  }
  
  handleSubmit(event) {
    if (this.state.formSubmit){
        this.props.editAlbum({
          id: this.props.id,
          band_id: this.state.form.band_id,
          name: this.state.form.name,
          year: this.state.form.year
        });
        this.setState({
          fields: {...this.state.form}
        });

      }
    else{
      this.setState({
        form: {...this.state.fields}
      })
    };
    this.setState({
      isEdit: false,
      formSubmit: false
    });
    event.preventDefault();
  }  

  renderEdit(id){
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
              value={this.state.form.band_id}
              onChange={this.handleChange}
          >
          {this.props.bands.map( (item, i) =>  
              <option key={i} value={item.id}>
                {item.name} 
              </option>
          )}
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
      <div className="onealbum">
        <div className="info">
        {this.props.id} - {this.state.fields.name} - {this.state.fields.year} - {this.state.fields.band_id}
        </div>
        <div className="actions">
          {editBlock}
          <button onClick={() => this.props.deleteAlbum(this.props.id)}
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
    albums: state.albums,
    bands: state.bands,
  }
}

function matchDispatchToProps(dispatch){
  return bindActionCreators(albumActions, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(OneAlbum);