import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../actions/auth';


import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

const style = {
    marginTop: 50,
    paddingBottom: 50,
    paddingTop: 25,
    width: '100%',
    textAlign: 'center',
    display: 'inline-block',
};

class LoginView extends Component {

  constructor(props) {
        super(props);
        const redirectFail = '/login';
        const redirectSuccess = '/main';
        this.state = {
            email: 'admin',
            password: 'password',
            email_error_text: null,
            password_error_text: null,
            redirectFail: redirectFail,
            redirectSuccess: redirectSuccess,
            disabled: false, // should default true
        };
  }

  isDisabled() {
    let email_is_valid = false;
    let password_is_valid = false;

    if (this.state.email === '') {
        this.setState({
            email_error_text: null,
        });
    } else {
        email_is_valid = true;
    }
    /* else if (validateEmail(this.state.email)) {
        email_is_valid = true;
        this.setState({
            email_error_text: null,
        });

    } else {
        this.setState({
            email_error_text: 'Sorry, this is not a valid email',
        });
    }*/

    if (this.state.password === '' || !this.state.password) {
        this.setState({
            password_error_text: null,
        });
    } else if (this.state.password.length >= 8) {
        password_is_valid = true;
        this.setState({
            password_error_text: null,
        });
    } else {
        this.setState({
            password_error_text: 'Your password must be at least 8 characters',
        });

    }

    console.log(email_is_valid + " " + password_is_valid)
    if (email_is_valid && password_is_valid) {
        this.setState({
            disabled: false,
        });
    }
  }

  changeValue(e, type) {
        const value = e.target.value;
        const next_state = {};
        next_state[type] = value;
        this.setState(next_state, () => {
            this.isDisabled();
        });
    }

  _handleKeyPress(e) {
        if (e.key === 'Enter') {
            if (!this.state.disabled) {
                this.login(e);
            }
        }
    }

  login(e) {
      e.preventDefault();
      console.log("log in user")
      console.log(this.context)
      this.props.loginUser(this.props, this.state.email, this.state.password, this.state.redirectSuccess);
  }

  render() {
    return (
      <div className="col-xs-12 col-md-6 col-md-offset-3" onKeyPress={(e) => this._handleKeyPress(e)}>
        <Paper style={style}>
          <form>
            <div className="col-md-12">
                <TextField
                  hintText="Email"
                  floatingLabelText="Email"
                  type="email"
                  errorText={this.state.email_error_text}
                  onChange={(e) => this.changeValue(e, 'email')}
                />
            </div>
            <div className="col-md-12">
                <TextField
                  hintText="Password"
                  floatingLabelText="Password"
                  type="password"
                  errorText={this.state.password_error_text}
                  onChange={(e) => this.changeValue(e, 'password')}
                />
            </div>

            <RaisedButton
              disabled={this.state.disabled}
              style={{ marginTop: 50 }}
              label="Submit"
              onClick={(e) => this.login(e)}
            />
          </form>
        </Paper>
      </div>
    );
  }
};

LoginView.propTypes = {
    loginUser: PropTypes.func,
    statusText: PropTypes.string,
};

function mapStateToProps(state) {
    return {
        isAuthenticating: state.auth.isAuthenticating,
        statusText: state.auth.statusText,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}



export default connect(
  mapStateToProps,
    mapDispatchToProps
)(LoginView);