import { combineReducers } from 'redux';
import addEmployee from './reducers/addEmployee';

const addEmployeeReducer = addEmployee;

const rootReducer = combineReducers({
    addEmployeeReducer
});

export default rootReducer;
