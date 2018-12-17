import React, { Component } from 'react';
import '../styles/App.css';

import { connect } from 'react-redux';
import Bands from '../components/bands';
import Albums from '../components/albums';
import About from './about';
import MainPage from './main';
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom';

const Header = () => (
  <ul>
    <li>
      <Link to="/">Main</Link>
    </li>
    <li>
      <Link to="/about">About</Link>
    </li>
    <li>
      <Link to="/bands">Bands</Link>
    </li>
    <li>
      <Link to="/albums">Albums</Link>
    </li>
  </ul>
);

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <div>
            <Switch>
              <Route path="/about" component={About} />
              <Route path="/bands" component={Bands} />
              <Route path="/albums" component={Albums} />
              <Route path="/" component={MainPage} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state){
  return {
    bands: state.bands,
    albums: state.albums,
  }
}

export default connect(mapStateToProps)(App);