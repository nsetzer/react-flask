import { createReducer } from '../utils/misc';

import {
    TEST_MESSSAGE_CREATE,
    TEST_MESSSAGE_DELETE,
    TEST_MESSSAGE_GET_ALL,
    TEST_MESSSAGE_SUCCESS,
    TEST_MESSSAGE_FAILURE,
} from '../constants/index';

const initialState = {
    statusText: null,
    messages: [],
}

export default createReducer(initialState, {
    [TEST_MESSSAGE_CREATE]: (state) =>
        Object.assign({}, state, {
            statusText: null,
        }),
    [TEST_MESSSAGE_DELETE]: (state) =>
        Object.assign({}, state, {
            statusText: null,
        }),
    [TEST_MESSSAGE_GET_ALL]: (state) =>
        Object.assign({}, state, {
            statusText: null,
        }),
    [TEST_MESSSAGE_SUCCESS]: (state, payload) =>
        Object.assign({}, state, {
            statusText: null,
            messages: payload.messages
        }),
    [TEST_MESSSAGE_FAILURE]: (state, payload) =>
        Object.assign({}, state, {
            statusText: `Authentication Error: ${payload.status} ${payload.statusText}`
        }),

});
