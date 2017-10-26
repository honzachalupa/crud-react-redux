export const ADD_ITEM = 'ADD_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const SORT_ITEMS = 'SORT_ITEMS';

export const add = (item) => ({
    type: ADD_ITEM,
    item
});

export const update = (item) => ({
    type: UPDATE_ITEM,
    item
});

export const remove = (id) => ({
    type: DELETE_ITEM,
    id
});

export const sort = (label = 'id') => {
    return {
        type: SORT_ITEMS,
        label
    };
};
