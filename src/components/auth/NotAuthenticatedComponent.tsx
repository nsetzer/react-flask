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


export function requireNoAuthentication(Component) {

    class notAuthenticatedComponent extends React.Component<{isAuthenticated: boolean}> {

        static propTypes = {
            loginUserSuccess: PropTypes.func,
            isAuthenticated: PropTypes.bool,
        };

        constructor(props) {
            super(props);
            this.state = {
                loaded: false,
            };
        }

        componentWillMount() {
            this.checkAuth();
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth(nextProps);
        }

        checkAuth(props = this.props) {
            if (props.isAuthenticated) {
                props.history.push('/main');

            } else {
                const token = localStorage.getItem('token');
                if (token) {
                    validate_token( token )
                        .then(res => {
                            if (res.status === 200) {
                                this.props.loginUserSuccess(token);
                                props.history.push('/main');

                            } else {
                                this.setState({
                                    loaded: true,
                                });
                            }
                        });
                } else {
                    this.setState({
                        loaded: true,
                    });
                }
            }
        }

        render() {
            return (
                <div>
                    {!this.props.isAuthenticated && this.state.loaded
                        ? <Component {...this.props} />
                        : null
                    }
                </div>
            );

        }
    }

    interface StateFromProps {
      isAuthenticated: boolean,
    }

    interface DispatchFromProps {
    }

    return connect<StateFromProps, DispatchFromProps, void>(mapStateToProps, mapDispatchToProps)(notAuthenticatedComponent);

}
