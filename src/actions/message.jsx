
import {
    TEST_MESSSAGE_CREATE,
    TEST_MESSSAGE_DELETE,
    TEST_MESSSAGE_GET_ALL,
    TEST_MESSSAGE_SUCCESS,
    TEST_MESSSAGE_FAILURE,
} from '../constants/index';

import { parseJSON } from '../utils/misc';
import { create_message, get_all_messages, delete_message } from '../utils/http_functions';

export function messageRequest(messageType) {
    return {type: messageType}
}

export function messageSuccess(messages) {
    return {
        type: TEST_MESSSAGE_SUCCESS,
        payload: {
            messages,
        },
    };
}

export function messageFailure(error) {
    return {
        type: TEST_MESSSAGE_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText,
        },
    };
}

export function createMessage(text) {
    return function (dispatch) {
        dispatch(messageRequest(TEST_MESSSAGE_CREATE));
        return create_message(text)
            .then(parseJSON)
            .then(response => {
                dispatch(messageSuccess(response.messages));
            })
            .catch(error => {
                dispatch(messageFailure(error));
            })
    }
}

export function getAllMessages() {
    return function (dispatch) {
        dispatch(messageRequest(TEST_MESSSAGE_GET_ALL));
        return get_all_messages()
            .then(parseJSON)
            .then(response => {
                dispatch(messageSuccess(response.messages));
            })
            .catch(error => {
                dispatch(messageFailure(error));
            })
    }
}

export function deleteMessage(id) {
    return function (dispatch) {
        dispatch(messageRequest(TEST_MESSSAGE_DELETE));
        return delete_message(id)
            .then(parseJSON)
            .then(response => {
                dispatch(messageSuccess(response.messages));
            })
            .catch(error => {
                dispatch(messageFailure(error));
            })
    }
}