import * as actions from './../actions/data';

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
            const { label } = action;
            const { items, sorting, formFields } = state;
            const { items: itemsSorted, metadata } = sort(labelToId(label), items, sorting, formFields);

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

function labelToId(label) {
    return label.replace(/\s/, '_').toLowerCase();
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

function getDataType(id, formFields) {
    let dataType;

    formFields.forEach((field) => {
        if (labelToId(field.label) === id.toString()) {
            dataType = field.dataType;
        }
    });

    return dataType;
}

function sort(id, items, metadata, fields) {
    const propertyName = id;
    const propertyType = getDataType(id, fields);
    const itemsClone = [...items];
    const metadataClone = { ...metadata };

    metadataClone.lastPropName = propertyName;

    if (metadataClone.lastPropName === propertyName || metadataClone.lastDirection !== 'original') {
        if (propertyType === 'number') {
            itemsClone.sort((a, b) => {
                console.log(1);
                return a[propertyName] - b[propertyName];
            });
        } else {
            itemsClone.sort((a, b) => {
                if (a[propertyName] < b[propertyName]) {
                    console.log(2);
                    return -1;
                } else if (a[propertyName] > b[propertyName]) {
                    console.log(3);
                    return 1;
                }

                console.log(4);
                return 0;
            });
        }

        metadataClone.lastDirection = metadataClone.lastDirection !== 'original' ? 'original' : 'reversed';
    } else {
        if (propertyType === 'number') {
            itemsClone.sort((a, b) => {
                console.log(5);
                return b[propertyName] - a[propertyName];
            });
        } else {
            itemsClone.sort((a, b) => {
                if (a[propertyName] < b[propertyName]) {
                    console.log(6);
                    return 1;
                } else if (a[propertyName] > b[propertyName]) {
                    console.log(7);
                    return -1;
                }

                console.log(8);
                return 0;
            });
        }

        metadataClone.lastDirection = 'original';
    }

    return { items: itemsClone, metadata: metadataClone };
}

/* function sortFunction(items, property) {
    if (propertyPrev !== property || lastDirection === 'reversed') {
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
    }

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
} */
