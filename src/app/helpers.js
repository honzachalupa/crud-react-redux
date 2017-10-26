import React from 'react';
import { Alert } from 'react-bootstrap';

export function getIdFromLabel(label) {
    return label.replace(/\s/, '_').toLowerCase();
}

export function getItemId(name) {
    return Number(getUrlParameter('id'));
}

export function getSelectedItem(id, items) {
    let matchingItem = null;

    if (items.length > 0) {
        items.forEach((item) => {
            if (item.id === id) {
                matchingItem = item;
            }
        });
    }

    if (matchingItem) {
        return matchingItem;
    }

    return window.location.hash = '/';
}

export function getUrlParameter(name) {
    const url = window.location.href;
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);

    if (!results) {
        return null;
    }

    if (!results[2]) {
        return '';
    }

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function renderMessage(style, message) {
    return (
        <Alert bsStyle={style}>
            { message }
        </Alert>
    );
}
