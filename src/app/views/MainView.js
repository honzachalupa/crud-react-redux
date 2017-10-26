import React, { Component, PropTypes } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { setDynamicDataType } from '../store/actions/data';
import DataGrid from './../components/DataGrid';

const MainView = (props) => {
    const { items, history: browserHistory } = props;

    return (
        <div data-view="main">
            <NavLink to="/create" exact>Create new</NavLink>

            <DataGrid items={items} browserHistory={browserHistory} />
        </div>
    );
};

export default connect((store) => {
    const { items } = store.data;

    return {
        items
    };
})(MainView);
