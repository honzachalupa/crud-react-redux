import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DataGridHeader from './Header';
import DataGridItem from './Item';

function DataGrid (props) {
    const { items, formFields, browserHistory } = props;

    return (
        <div data-tpl="DataGrid">
            <table>
                <DataGridHeader />

                <tbody>
                    {
                        items.map((item) => {
                            return (
                                <DataGridItem key={item.id} item={item} formFields={formFields} browserHistory={browserHistory} />
                            );
                        })
                    }
                </tbody>
            </table>

            <p className="number-of-records">Number of records: {items.length}</p>
        </div>
    );
}

export default connect((store) => {
    const { items, formFields } = store.data;

    return {
        items,
        formFields
    };
})(DataGrid);
