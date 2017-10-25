import * as actions from './../actions/data';

const defaultState = {
    sorting: {
        propertyPrev: 'id',
        property: '',
        dataType: '',
        lastDirection: 'original'
    },
    formFields: [
        {
            label: 'First name',
            dataType: 'text'
        }, {
            label: 'Last name',
            dataType: 'text'
        }, {
            label: 'Age',
            dataType: 'number'
        }, {
            label: 'Bio',
            dataType: 'richtext'
        }, {
            label: 'Start date',
            dataType: 'date'
        }
    ],
    items: [
        {
            id: 1111,
            first_name: 'Jan',
            last_name: 'Chalupa',
            age: 11,
            bio: 'Bla bla bla...',
            bio_HTML: '<p>Bla bla bla...</p>',
            start_date: '2017-02-01'
        }, {
            id: 2222,
            first_name: 'David',
            last_name: 'Slavík',
            age: 22,
            bio: 'Bla bla bla...',
            bio_HTML: '<p>Bla bla bla...</p>',
            start_date: '2016-09-01'
        }, {
            id: 3333,
            first_name: 'Martin',
            last_name: 'Dušek',
            age: 33,
            bio: 'Bla bla bla...',
            bio_HTML: '<p>Bla bla bla...</p>',
            start_date: '2014-03-01'
        }
    ]
};

export default function data(state = defaultState, action) {
    switch (action.type) {
        case actions.ADD_ITEM: {
            const { item: newItem } = action;

            newItem.id = generateId(state.items);

            return {
                ...state,
                items: [...state.items, newItem]
            };
        }
        case actions.UPDATE_ITEM: {
            const { item: updatedItem } = action;
            const { id: updatedId } = updatedItem;

            const updatedItems = state.items.map((item) => {
                if (item.id.toString() === updatedId.toString()) {
                    return updatedItem;
                }

                return item;
            });

            return {
                ...state,
                items: updatedItems
            };
        }
        case actions.DELETE_ITEM: {
            return {
                ...state,
                items: state.items.filter((item) => {
                    return item.id.toString() !== action.id;
                })
            };
        }
        case actions.SORT: {
            const { sorting } = action;
            const { x, y } = sorting;

            const itemsSorted = sort(state.items, x, y);

            return {
                ...state,
                items: [...state.items, itemsSorted]
            };
        }
        default:
            return state;
    }
}

function generateId(items) {
    const existingIds = [];

    if (items) {
        items.forEach((item) => {
            existingIds.push(item.id);
        });
    }

    const generatedId = Math.round(Math.random() * 10000).toString();

    if (existingIds.indexOf(generatedId) > -1 || generatedId < 1000 || generatedId > 9999) {
        generateId();
    }

    return generatedId;
}

function sort(items, x, y) {

    return items;
}
