import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';

const rootReducer = combineReducers({
    routing: routerReducer,
    /* your reducers */
    auth,
});

export default rootReducer;
