export const ADD_ITEM = 'ADD_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const SORT = 'SORT';

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

export const sort = (items, sorting) => {
    const sortResult = sortFunction(items, sorting.property);

    return {
        type: SORT,
        items: sortResult.items,
        sorting: sortResult.sorting
    };
};

function sortFunction(items, property) {
    /* if (propertyPrev !== property || lastDirection === 'reversed') {
        if (dataType === 'number') {
            items.sort((a, b) => {
                return a[property] - b[property];
            });
        } else {
            items.sort((a, b) => {
                if (a[property] < b[property]) {
                    return -1;
                } else if (a[property] > b[property]) {
                    return 1;
                }

                return 0;
            });
        }
    } else {
        if (dataType === 'number') {
            items.sort((a, b) => {
                return b[property] - a[property];
            });
        } else {
            items.sort((a, b) => {
                if (a[property] < b[property]) {
                    return 1;
                } else if (a[property] > b[property]) {
                    return -1;
                }

                return 0;
            });
        }
    } */

    const dataType = '';
    const lastDirection = '';

    return {
        items: '',
        sorted: {
            propertyPrev: property,
            property,
            dataType,
            lastDirection: lastDirection === 'reversed' ? 'original' : 'reversed'
        }
    };
}
