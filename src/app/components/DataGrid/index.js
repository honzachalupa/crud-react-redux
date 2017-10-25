import React, { Component, PropTypes } from 'react';
import DataGridHeader from './Header';
import DataGridItem from './Item';

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
    }

    render() {
        const { items, browserHistory } = this.props;
        const numberOfRecords = items.length;
        const properties = DataGrid.getProperties(items);

        return (
            <div data-tpl="DataGrid">
                <table>
                    <DataGridHeader
                        items={items}
                        properties={properties}
                        numberOfRecords={numberOfRecords}
                    />

                    <tbody>
                        {
                            items.map((item) => {
                                return (
                                    <DataGridItem
                                        key={item.id}
                                        item={item}
                                        properties={properties}
                                        browserHistory={browserHistory}
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
