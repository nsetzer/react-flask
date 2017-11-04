import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './index.css';
import App from './components/App';
import LoginView from './components/LoginView';
import AboutView from './components/AboutView';
import MainView from './components/MainView';
import RegisterView from './components/RegisterView';
import TestView from './components/TestView';
import NotFoundView from './components/NotFoundView';
import registerServiceWorker from './utils/registerServiceWorker';
import { Provider } from 'react-redux';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import configureStore from './store/configureStore';

import { requireAuthentication } from './components/auth/AuthenticatedComponent';
import { requireNoAuthentication } from './components/auth/NotAuthenticatedComponent';
import { DetermineAuth } from './components/auth/DetermineAuth';

const store = configureStore();

//https://github.com/reactjs/react-router-tutorial/tree/master/lessons/06-params

ReactDOM.render((
    <BrowserRouter>
    <Provider store={store}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div>
        <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/test" component={requireNoAuthentication(TestView)} />
        <Route exact path="/login" component={requireNoAuthentication(LoginView)} />
        <Route exact path="/register" component={requireNoAuthentication(RegisterView)} />
        <Route exact path="/about/:topic" component={AboutView} />
        <Route exact path="/main" component={requireAuthentication(MainView)} />
        <Route component={DetermineAuth(NotFoundView)} />
        </Switch>
      </div>
      </MuiThemeProvider>
   </Provider>
   </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
