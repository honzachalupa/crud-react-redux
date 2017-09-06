import React, { Component, PropTypes } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { add as addItem } from '../store/actions/data';
import DataGrid from './../components/DataGrid';

class MainView extends Component {
    constructor(props) {
        super(props);

        props.addItem({
            id: Math.random(),
            firstName: 'Jan',
            lastName: 'Chalupa',
            age: 24,
            bio: 'Bla bla bla...',
            startDate: '2017-09-06'
        });

        props.addItem({
            id: Math.random(),
            firstName: 'Jan',
            lastName: 'Chalupa',
            age: 24,
            bio: 'Bla bla bla...',
            startDate: '2017-09-06'
        });

        props.addItem({
            id: Math.random(),
            firstName: 'Jan',
            lastName: 'Chalupa',
            age: 24,
            bio: 'Bla bla bla...',
            startDate: '2017-09-06'
        });
    }

    render() {
        return (
            <div data-view="main">
                <NavLink to="/create" exact>Create new</NavLink>

                <DataGrid items={this.props.items} />
            </div>
        );
    }
}

export default connect((store) => {
    console.log(store);
    const { items } = store.data;

    return {
        items
    };
}, {
    addItem
})(MainView);
