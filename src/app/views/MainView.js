import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import DataGrid from './../components/DataGrid';
import { addEmployee as addEmployeeAction } from '../store/actions/addEmployee';

class MainView extends Component {
    constructor(props) {
        super(props);

        const employee = {
            id: Math.random(),
            firstName: 'Jan',
            lastName: 'Chalupa',
            age: 24,
            bio: 'Bla bla bla...',
            startDate: '2017-09-06'
        };

        this.props.addEmployeeAction(employee);
    }

    render() {
        return (
            <div data-view="main">

                {console.log('main view', this.props.employees)}
                <DataGrid employees={this.props.employees} />
            </div>
        );
    }
}

export default connect((store) => {
    const { employees } = store.addEmployeeReducer;

    return {
        employees
    };
}, {
    addEmployeeAction
})(MainView);
