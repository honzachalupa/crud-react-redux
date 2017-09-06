import * as actions from './../actions/addEmployee';

const defaultState = {
    employees: []
};

export default function addEmployee(state = defaultState, action) {
    switch (action.type) {
        case actions.EXTEND: {
            return {
                ...state,
                employees: [...state.employees, action.employee]
            };
        }
        default:
            return state;
    }
}
