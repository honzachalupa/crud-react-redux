export const ADD_ITEM = 'ADD';
export const SORT_LIST = 'SORT';

export const add = (item) => ({
    type: ADD_ITEM,
    item
});

export const sort = (sort) => ({
    type: SORT_LIST,
    sort
});
