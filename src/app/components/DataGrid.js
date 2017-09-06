import React, { Component, PropTypes } from 'react';
import DataGridHeader from './DataGrid/Header';
import DataGridItem from './DataGrid/Item';

export default class DataGrid extends Component {
    static getProperties(items) {
        const all = [];

        items.forEach((item) => {
            Object.keys(item).forEach((property) => {
                if (property.indexOf('_HTML') === -1) {
                    all.push(property);
                }
            });
        });

        const filtered = all.filter((value, index, self) => {
            return self.indexOf(value) === index;
        });

        return filtered;
    }

    constructor(props) {
        super(props);

        this.state = {
            lastSort: {
                property: null,
                direction: null
            }
        };

        this.sort = this.sort.bind(this);
    }

    sort(property, dataType) {
        const items = this.props.employees;

        if (this.state.lastSort.property !== property || this.state.lastSort.direction === 'reversed') {
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

            this.setState({
                lastSort: {
                    property,
                    direction: 'original'
                }
            });
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

            this.setState({
                lastSort: {
                    property,
                    direction: 'reversed'
                }
            });
        }

        this.setState({
            items
        });
    }

    render() {
        const items = this.props.employees || [];

        const numberOfRecords = items.length;
        const properties = DataGrid.getProperties(items);

        return (
            <div data-tpl="DataGrid">
                <table>
                    <DataGridHeader
                        items={items}
                        properties={properties}
                        sort={this.sort}
                        lastSort={this.state.lastSort}
                        numberOfRecords={numberOfRecords}
                    />

                    <tbody>
                        {
                            items.map((item) => {
                                console.log(item);
                                return (
                                    <DataGridItem
                                        key={item.id}
                                        item={item}
                                        properties={properties}
                                    />
                                );
                            })
                        }
                    </tbody>
                </table>

                <p className="number-of-records">Number of records: {numberOfRecords}</p>
            </div>
        );
    }
}

DataGrid.defaultProps = {
    lastSort: {
        property: null,
        direction: null
    }
};
