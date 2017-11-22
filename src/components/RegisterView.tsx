import * as React from 'react';
import PropTypes from 'prop-types';
//import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../actions/auth';


import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

export interface RegisterViewProps {
    registerUser: (a,b,c,d) => any,
    registerStatusText: PropTypes.string,
};

export interface RegisterViewState {
  email: string,
  password: string,
  verify_password: string,
  email_error_text: any,
  password_error_text: any,
  redirectFail: string,
  redirectSuccess: string,
  disabled: boolean,
};

const style = {
    marginTop: 50,
    paddingBottom: 50,
    paddingTop: 25,
    width: '100%',
    textAlign: 'center',
    display: 'inline-block',
};

class RegisterView extends React.Component<RegisterViewProps,RegisterViewState> {

  constructor(props) {
        super(props);
        const redirectFail = '/login';
        const redirectSuccess = '/main';
        this.state = {
            email: '',
            password: '',
            verify_password: '',
            email_error_text: null,
            password_error_text: null,
            redirectFail: redirectFail,
            redirectSuccess: redirectSuccess,
            disabled: true,
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
      this.props.registerUser(this.props, this.state.email, this.state.password, this.state.redirectSuccess);
  }

  render() {
    return (
      <div className="col-xs-12 col-md-6 col-md-offset-3" onKeyPress={(e) => this._handleKeyPress(e)}>
        <Paper style={style}>
          <h2>Register</h2>
          {
              this.props.registerStatusText &&
                  <div className="alert alert-info">
                      {this.props.registerStatusText}
                  </div>
          }
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

function mapStateToProps(state) {
    return {
        isRegistering: state.auth.isRegistering,
        registerStatusText: state.auth.registerStatusText,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(
  mapStateToProps,
    mapDispatchToProps
)(RegisterView);