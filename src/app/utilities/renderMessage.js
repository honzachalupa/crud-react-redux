import React from 'react';
import { Alert } from 'react-bootstrap';

export default (style, message) => {
    return (
        <Alert bsStyle={style}>
            { message }
        </Alert>
    );
};
