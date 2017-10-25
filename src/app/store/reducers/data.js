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
        }
    ]
};

export default function data(state = defaultState, action) {
    switch (action.type) {
        case actions.ADD_ITEM: {
            const { item } = action;

            item.id = generateId(state.items);

            return {
                ...state,
                items: [...state.items, item]
            };
        }
        case actions.UPDATE_ITEM: {
            const { item: updatingItem } = action;
            const { id: updatingId } = updatingItem;

            return {
                ...state,
                items: state.items.map((item) => {
                    if (item.id.toString() === updatingId) {
                        return updatingItem;
                    }

                    return item;
                })
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

            return {
                ...state,
                sorting
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

    const generatedId = Math.round(Math.random() * 10000);

    if (existingIds.indexOf(generatedId) > -1 || generatedId < 1000 || generatedId > 9999) {
        generateId();
    }

    return generatedId;
}
