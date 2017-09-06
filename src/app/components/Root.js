import React, { PropTypes } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MainView from '../views/MainView';
import CreateView from '../views/CreateView';
import ReadView from '../views/ReadView';
import UpdateView from '../views/UpdateView';
import DeleteView from '../views/DeleteView';

export default function Root() {
    return (
        <BrowserRouter>
            <div>
                <Route path="/" exact component={MainView} />
                <Route path="/create" component={CreateView} />
                <Route path="/read" component={ReadView} />
                <Route path="/update" component={UpdateView} />
                <Route path="/delete" component={DeleteView} />
            </div>
        </BrowserRouter>
    );
}
