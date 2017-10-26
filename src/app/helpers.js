import React from 'react';
import { Alert } from 'react-bootstrap';

export function isItemValid(item) {
    let isValid = true;

    Object.keys(item).forEach((key) => {
        if (item[key] === null) {
            isValid = false;
        }

        if (key === 'id') {
            isValid = true;
        }
    });

    return isValid;
}

export function getIdFromLabel(label) {
    return label.replace(/\s/, '_').toLowerCase();
}

export function renderMessage(style, message) {
    return (
        <Alert bsStyle={style}>
            { message }
        </Alert>
    );
}
