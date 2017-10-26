import React, { PropTypes } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainView from '../views/MainView';
import CreateView from '../views/CreateView';
import ReadView from '../views/ReadView';
import UpdateView from '../views/UpdateView';
import DeleteView from '../views/DeleteView';

export default function Root() {
    const pages = [
        {
            path: '/',
            component: MainView
        }, {
            path: '/create',
            component: CreateView
        }, {
            path: '/read/:id',
            component: ReadView
        }, {
            path: '/update/:id',
            component: UpdateView
        }, {
            path: '/delete/:id',
            component: DeleteView
        }
    ];
    return (
        <Router>
            <Switch>
                {
                    pages.map((page, i) => {
                        const { path, component } = page;
                        const key = path.replace(/[/:]/g, '');

                        return (
                            <Route key={key} path={path} exact component={component} />
                        );
                    })
                }
            </Switch>
        </Router>
    );
}
