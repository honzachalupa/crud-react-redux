import * as actions from './../actions/data';
import { getIdFromLabel } from './../../helpers';

const defaultState = {
    sorting: {
        lastPropName: null,
        lastDirection: null
    },
    formFields: [
        {
            label: 'ID',
            dataType: 'number'
        }, {
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
        }, {
            label: 'Test field',
            dataType: 'text'
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
        case actions.SORT_ITEMS: {
            const { label } = action;
            const { items, sorting, formFields } = state;
            const { items: itemsSorted, metadata } = sort(getIdFromLabel(label), items, sorting, formFields);

            return {
                ...state,
                items: itemsSorted,
                sorting: metadata
            };
        }
        default:
            return state;
    }
}

function generateId(items) {
    const existingIds = [];
    const generatedId = Math.round(Math.random() * 10000).toString();

    if (items) {
        items.forEach((item) => {
            existingIds.push(item.id);
        });
    }

    if (existingIds.indexOf(generatedId) > -1 || generatedId < 1000 || generatedId > 9999) {
        generateId();
    }

    return generatedId;
}

function getDataType(id, formFields) {
    let dataType;

    formFields.forEach((field) => {
        if (getIdFromLabel(field.label) === id.toString()) {
            dataType = field.dataType;
        }
    });

    return dataType;
}

function sort(propertyName, items, metadata, fields) {
    const propertyType = getDataType(propertyName, fields);
    const itemsClone = [...items];
    const metadataClone = { ...metadata };

    if (metadataClone.lastPropName === propertyName && metadataClone.lastDirection === 'original') {
        if (propertyType !== 'number') {
            itemsClone.sort((a, b) => {
                if (a[propertyName] < b[propertyName]) {
                    return 1;
                } else if (a[propertyName] > b[propertyName]) {
                    return -1;
                }

                return 0;
            });
        } else {
            itemsClone.sort((a, b) => {
                return b[propertyName] - a[propertyName];
            });
        }

        if (metadataClone.lastPropName === propertyName) {
            metadataClone.lastDirection = metadataClone.lastDirection !== 'original' ? 'original' : 'reversed';
        } else {
            metadataClone.lastDirection = 'original';
        }
    } else {
        if (propertyType !== 'number') {
            itemsClone.sort((a, b) => {
                if (a[propertyName] < b[propertyName]) {
                    return -1;
                } else if (a[propertyName] > b[propertyName]) {
                    return 1;
                }

                return 0;
            });
        } else {
            itemsClone.sort((a, b) => {
                return a[propertyName] - b[propertyName];
            });
        }

        metadataClone.lastDirection = 'original';
    }

    metadataClone.lastPropName = propertyName;

    return {
        items: itemsClone,
        metadata: metadataClone
    };
}
