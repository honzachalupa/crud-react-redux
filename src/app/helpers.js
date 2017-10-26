import React from 'react';
import { Alert } from 'react-bootstrap';

export function isItemValid(item, fields) {
    let isValid = true;

    Object.keys(item).forEach((key) => {
        const value = item[key];

        fields.forEach((field) => {
            if (isValid) {
                if (key === getIdFromLabel(field.label) && field.required) {
                    if (isNotNullOrEmpty(value)) {
                        isValid = false;
                    }
                } else if (key === 'id') {
                    isValid = true;
                }
            }
        });
    });

    return isValid;
}

export function getIdFromLabel(label) {
    return label.replace(/\s/, '_').toLowerCase();
}

export function isNotNullOrEmpty(value) {
    return value === null || value === undefined || value === 'null' || value === 'undefined' || value === '' || value === ' ';
}

export function renderMessage(style, message) {
    return (
        <Alert bsStyle={style}>
            { message }
        </Alert>
    );
}
