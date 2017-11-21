import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/auth';
import PropTypes from 'prop-types';

import { validate_token } from '../../utils/http_functions'

function mapStateToProps(state) {
    return {
        token: state.auth.token,
        userName: state.auth.userName,
        isAuthenticated: state.auth.isAuthenticated,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export function requireAuthentication(Component) {
    class AuthenticatedComponent extends React.Component<{isAuthenticated: boolean}> {

        static propTypes = {
            loginUserSuccess: PropTypes.func,
            isAuthenticated: PropTypes.bool,
        };

        componentWillMount() {
            this.checkAuth();
            this.setState({
                loaded_if_needed: false,
            });
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth(nextProps);
        }

        checkAuth(props = this.props) {
            if (!props.isAuthenticated) {
                const token = localStorage.getItem('token');
                if (!token) {
                    props.history.push('/login');
                } else {
                    validate_token( token )
                        .then(res => {
                            if (res.status === 200) {
                                this.props.loginUserSuccess(token);
                                this.setState({
                                    loaded_if_needed: true,
                                });

                            } else {
                                props.history.push('/login');

                            }
                        });

                }
            } else {
                this.setState({
                    loaded_if_needed: true,
                });
            }
        }

        render() {
            return (
                <div>
                    {this.props.isAuthenticated && this.state.loaded_if_needed
                        ? <Component {...this.props} />
                        : null
                    }
                </div>
            );

        }
    }

    interface StateFromProps {
      history: any,
    }

    interface DispatchFromProps {
        loginUserSuccess: () => void
    }

    return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}
