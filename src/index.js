import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';

import './index.css';
import App from './components/App';
import LoginView from './components/LoginView';
import AboutView from './components/AboutView';
import MainView from './components/MainView';
import registerServiceWorker from './utils/registerServiceWorker';
import { Provider } from 'react-redux';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import configureStore from './store/configureStore';

import { requireAuthentication } from './components/AuthenticatedComponent';
import { requireNoAuthentication } from './components/notAuthenticatedComponent';

const store = configureStore();
//https://github.com/reactjs/react-router-tutorial/tree/master/lessons/06-params
//<Route path="/repos" component={Repos}/>
//<Route path="/about" component={About}/>
ReactDOM.render((
    <HashRouter>
    <Provider store={store}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div>
        <Route exact path="/" component={App} />
        <Route exact path="/login" component={requireNoAuthentication(LoginView)} />
        <Route exact path="/about/:topic" component={AboutView} />
        <Route exact path="/main" component={requireAuthentication(MainView)} />
      </div>
      </MuiThemeProvider>
   </Provider>
   </HashRouter >
), document.getElementById('root'));
registerServiceWorker();
