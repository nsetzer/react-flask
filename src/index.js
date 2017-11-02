import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';


import './index.css';
import App from './components/App';
import LoginView from './components/LoginView';
import AboutView from './components/AboutView';
import registerServiceWorker from './util/registerServiceWorker';

//https://github.com/reactjs/react-router-tutorial/tree/master/lessons/06-params
//<Route path="/repos" component={Repos}/>
//<Route path="/about" component={About}/>
ReactDOM.render((
    <HashRouter>
      <div>
        <Route exact path="/" component={App} />
        <Route exact path="/login" component={LoginView} />
        <Route exact path="/about/:topic" component={AboutView} />
      </div>
   </HashRouter >
), document.getElementById('root'));
registerServiceWorker();
