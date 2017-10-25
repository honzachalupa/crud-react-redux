import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './root-reducer';
import middlewares from './middlewares';
import logger from 'redux-logger';

export default function configureStore(initialState) {
    /* eslint-disable no-underscore-dangle */
    const composeEnhancers = (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

    return createStore(
        rootReducer,
        initialState,
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        composeEnhancers(applyMiddleware(...middlewares))
    );
    /* eslint-enable */
}
