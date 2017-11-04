import React, { Component } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './components/App';
import LoginView from './components/LoginView';
import AboutView from './components/AboutView';
import MainView from './components/MainView';
import RegisterView from './components/RegisterView';
import TestView from './components/TestView';
import NotFoundView from './components/NotFoundView';

import { requireAuthentication } from './components/auth/AuthenticatedComponent';
import { requireNoAuthentication } from './components/auth/NotAuthenticatedComponent';
import { DetermineAuth } from './components/auth/DetermineAuth';

//https://github.com/reactjs/react-router-tutorial/tree/master/lessons/06-params

class AppRouter extends Component {

  render() {
  return (
    <BrowserRouter>
      <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/test" component={requireNoAuthentication(TestView)} />
      <Route exact path="/login" component={requireNoAuthentication(LoginView)} />
      <Route exact path="/register" component={requireNoAuthentication(RegisterView)} />
      <Route exact path="/about/:topic" component={AboutView} />
      <Route exact path="/main" component={requireAuthentication(MainView)} />
      <Route component={DetermineAuth(NotFoundView)} />
      </Switch>
    </BrowserRouter>
  )}

}
export default AppRouter;