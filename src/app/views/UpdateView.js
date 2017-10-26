import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { update as updateItem } from './../store/actions/data';
import { FormGroup, Button, ButtonGroup, Col } from 'react-bootstrap';
import Form from './../components/Form';
import FormHeader from './../components/Form/Header';
import FormFooter from './../components/Form/Footer';
import { getSelectedItem, getItemId, isItemValid } from './../helpers';
import Toastr from 'toastr';

class UpdateView extends Component {
    constructor(props) {
        super(props);

        this.updateTempItem = this.updateTempItem.bind(this);

        const { items, match } = props;
        const { id: selectedId } = match.params;

        items.forEach((item) => {
            if (item.id.toString() === selectedId) {
                this.state = {
                    item: Object.assign({}, item)
                };
            }
        });
    }

    updateTempItem(item) {
        this.setState({
            item
        });
    }

    handleSave() {
        const { item } = this.state;

        if (isItemValid(item)) {
            Toastr.success('Employee\'s details were updated.');

            this.props.updateItem(item);
            this.props.history.push('/');
        } else {
            Toastr.error('Please fill all fields...', 'Error');
        }
    }

    handleCancel() {
        this.props.history.push('/');
    }

    render() {
        const { item } = this.state;

        return (
            <Form item={item} updateTempItem={this.updateTempItem}>
                <FormHeader>
                    <Link to="/" className="btn">
                        Back to items list
                    </Link>

                    <h2>Read</h2>
                </FormHeader>
                <FormFooter>
                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button onClick={() => this.handleSave()}>Save changes</Button>
                        </Col>
                    </FormGroup>
                </FormFooter>
            </Form>
        );
    }
}

export default connect((store) => {
    const { items } = store.data;

    return {
        items
    };
}, {
    updateItem
})(UpdateView);
