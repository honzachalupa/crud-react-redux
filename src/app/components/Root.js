import React, { Component, PropTypes } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { addEmployee as addEmployeeAction } from '../store/actions/addEmployee';
import MainView from '../views/MainView';
// import CreateView from '../views/CreateView';
// import ReadView from '../views/ReadView';
// import UpdateView from '../views/UpdateView';
// import DeleteView from '../views/DeleteView';

class Root extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
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
        const { employees } = this.props;

        return (
            <BrowserRouter>
                <div>
                    <Route path="/" exact component={MainView} />
                    <Route path="/test" component={MainView} />
                </div>

                {/*
                <div>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={this.handleClick}
                    >
                        {employees.length}
                    </button>

                    {console.log('root', employees)}

                    <MainView employees={employees} />
                </div>
            */}
            </BrowserRouter>
        );
    }
}

Root.defaultProps = {
    employees: []
};

Root.propTypes = {
    employees: PropTypes.array
};

export default connect((store) => {
    const { employees } = store.addEmployeeReducer;

    return {
        employees
    };
}, {
    addEmployeeAction
})(Root);

