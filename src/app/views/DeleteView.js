import React, { Component, PropTypes } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import getSelectedItem from './../utilities/getSelectedItem';
import getItemId from './../utilities/getItemId';
import renderMessage from './../utilities/renderMessage';
import jQuery from 'jquery';
import Toastr from 'toastr';

export default class DeleteView extends Component {
    constructor(props) {
        super(props);

        const items = JSON.parse(localStorage.getItem('items')) || [];

        this.state = {
            items,
            item: getSelectedItem(getItemId(), items)
        };
    }

    handleConfirm() {
        const filteredItems = this.state.items.filter((item) => {
            return item !== this.state.item;
        });

        localStorage.setItem('items', JSON.stringify(filteredItems));

        Toastr.warning('Employee was removed.');

        window.location.hash = '/';
    }

    handleCancel() {
        window.history.back();
    }

    render() {
        return (
            <div data-view="delete">
                { renderMessage('warning', 'Are you sure you want to delete this item?') }

                <ButtonGroup>
                    <Button onClick={() => this.handleConfirm()}>Confirm</Button>
                    <Button onClick={() => this.handleCancel()}>Cancel</Button>
                </ButtonGroup>
            </div>
        );
    }
}
