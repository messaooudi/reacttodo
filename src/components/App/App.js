import React, { Component } from 'react';
import logo from '../../logo.svg';
import './App.css';

import TodosContainer from '../TodosContainer/TodosContainer.js'
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React Todo*Flux app</h2>
          <h6>Double-click to edit a todo <br/><span>Created by MESSAOUDI Oussama</span></h6>
        </div>
          <TodosContainer logo={logo} />
      </div>
    );
  }
  
}

export default App;
