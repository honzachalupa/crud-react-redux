import * as actions from './../actions/data';

const defaultState = {
    items: []
};

export default function data(state = defaultState, action) {
    switch (action.type) {
        case actions.ADD_ITEM: {
            return {
                ...state,
                items: [...state.items, action.item]
            };
        }
        case actions.REMOVE_ITEM: {
            return state; // To-do
        }
        default:
            return state;
    }
}
