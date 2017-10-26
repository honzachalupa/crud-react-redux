import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { remove as deleteItem } from '../store/actions/data';
import { Button, ButtonGroup } from 'react-bootstrap';
import { getSelectedItem, getItemId, renderMessage } from './../helpers';
import jQuery from 'jquery';
import Toastr from 'toastr';

class DeleteView extends Component {
    static handleCancel() {
        window.history.back();
    }

    constructor(props) {
        super(props);

        const { items, match } = props;
        const { id: selectedId } = match.params;

        this.state = {
            selectedId
        };
    }

    handleConfirm() {
        const { selectedId: id } = this.state;

        this.props.deleteItem(id);

        Toastr.warning('Employee was removed.');

        this.props.history.push('/');
    }

    render() {
        return (
            <div data-view="delete">
                { renderMessage('warning', 'Are you sure you want to delete this item?') }

                <ButtonGroup>
                    <Button onClick={() => this.handleConfirm()}>Confirm</Button>
                    <Button onClick={() => DeleteView.handleCancel()}>Cancel</Button>
                </ButtonGroup>
            </div>
        );
    }
}

export default connect((store) => {
    const { items } = store.data;

    return {
        items
    };
}, {
    deleteItem
})(DeleteView);
