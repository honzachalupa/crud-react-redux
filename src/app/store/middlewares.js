import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

const middlewares = [
    thunk
];

// Logger must be the last middleware in chain
if (process.env.NODE_ENV !== 'production') {
    const logger = createLogger({
        collapsed: true
    });
    middlewares.push(logger);
}

export default middlewares;
