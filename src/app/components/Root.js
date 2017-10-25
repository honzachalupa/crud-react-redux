import React, { PropTypes } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainView from '../views/MainView';
import CreateView from '../views/CreateView';
import ReadView from '../views/ReadView';
import UpdateView from '../views/UpdateView';
import DeleteView from '../views/DeleteView';

export default function Root() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={MainView} />
                <Route path="/create" component={CreateView} />
                <Route path="/read/:id" component={ReadView} />
                <Route path="/update/:id" component={UpdateView} />
                <Route path="/delete/:id" component={DeleteView} />
            </Switch>
        </Router>
    );
}
