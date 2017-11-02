import React, { Component } from 'react';
import logo from '../svg/logo.svg';
import './App.css';

import RandomService from '../service/random'

class App extends Component {

  async handleClick() {
    console.log("handle click");
    let cls = new RandomService();

    console.log(await cls.getRandomInt())
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

        <button onClick={this.handleClick}>Button</button>
      </div>
    );
  }
}

export default App;
