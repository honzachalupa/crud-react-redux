import { combineReducers } from 'redux';
import data from './reducers/data';

// const dataReducer = data;

const rootReducer = combineReducers({
    data
});

export default rootReducer;
