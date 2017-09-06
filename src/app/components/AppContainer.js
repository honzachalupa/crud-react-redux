import React, { Component, Router, Route, PropTypes } from 'react';
import MainView from './../views/MainView';
import CreateView from './../views/CreateView';
import ReadView from './../views/ReadView';
import UpdateView from './../views/UpdateView';
import DeleteView from './../views/DeleteView';

export default class AppContainer extends Component {
    constructor(store) {
        super();

        store.subscribe(() => {
            console.log('store changed: ', store.getState());
        });

        store.dispatch({
            type: 'TEST',
            payload: {
                id: 1,
                value: 'bla bla bla'
            }
        });

        this.state = {
            route: window.location.hash.substr(1)
        };
    }

    componentDidMount() {
        window.addEventListener('hashchange', () => {
            this.setState({
                route: window.location.hash.substr(1)
            });
        });
    }

    render() {
        let View;

        if (this.state.route === '/create') {
            View = CreateView;
        } else if (/read\?id=/.test(this.state.route)) {
            View = ReadView;
        } else if (/update\?id=/.test(this.state.route)) {
            View = UpdateView;
        } else if (/delete\?id=/.test(this.state.route)) {
            View = DeleteView;
        } else {
            View = MainView;
        }

        return (
            <div>
                <h1>Employees List</h1>

                <View />
            </div>
        );
    }
}
