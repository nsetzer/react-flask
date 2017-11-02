import React, { Component } from 'react';
import logo from '../svg/logo.svg';
import './App.css';

import RandomService from '../service/random'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {value: 0};
    this.handleClick = this.handleClick.bind(this)
  }

  async handleClick() {
    let res = await RandomService.getRandomInt();
    this.setState({"value": res.value});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Your App is Now Running
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <h2> Get Random Int From Server</h2>
        <button onClick={this.handleClick}>Click Me</button>
        <p>{this.state.value}</p>
      </div>
    );
  }
}

export default App;
