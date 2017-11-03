/* eslint camelcase: 0 */

import axios from 'axios';

import env from '../env'


const tokenConfig = (token) => ({
    headers: {
        'Authorization': token, // eslint-disable-line quote-props
    },
});

export function validate_token(token) {
    return axios.post(env.baseUrl + '/api/is_token_valid', {
        token,
    });
}

export function create_user(email, password) {
    return axios.post(env.baseUrl + '/api/create_user', {
        email,
        password,
    });
}

export function get_token(email, password) {
    return axios.post(env.baseUrl + '/api/get_token', {
        email,
        password,
    });
}

export function has_github_token(token) {
    return axios.get(env.baseUrl + '/api/has_github_token', tokenConfig(token));
}

export function data_about_user(token) {
    return axios.get(env.baseUrl + '/api/user', tokenConfig(token));
}
