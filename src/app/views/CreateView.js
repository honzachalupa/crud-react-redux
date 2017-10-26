import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { add as addItem } from '../store/actions/data';
import { FormGroup, Button, ButtonGroup, Col } from 'react-bootstrap';
import Form from './../components/Form';
import FormHeader from './../components/Form/Header';
import FormFooter from './../components/Form/Footer';
import Toastr from 'toastr';
import { isItemValid } from './../helpers';

class CreateView extends Component {
    constructor() {
        super();

        this.createItem = this.createItem.bind(this);
        this.updateTempItem = this.updateTempItem.bind(this);
    }

    updateTempItem(item) {
        this.setState({
            item
        });
    }

    createItem() {
        const { item } = this.state;
        const { formFields } = this.props;

        if (isItemValid(item, formFields)) {
            Toastr.success('New employee was added...', 'Great!');

            this.props.addItem(item);
            this.props.history.push('/');
        } else {
            Toastr.error('Please fill all fields...', 'Error');
        }
    }

    render() {
        return (
            <Form updateTempItem={this.updateTempItem}>
                <FormHeader>
                    <Link to="/" className="btn">
                        Back to items list
                    </Link>

                    <h2>Create new item</h2>
                </FormHeader>
                <FormFooter>
                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button onClick={() => this.createItem()}>
                                Create Item
                            </Button>
                        </Col>
                    </FormGroup>
                </FormFooter>
            </Form>
        );
    }
}

export default connect((store) => {
    const { formFields } = store.data;

    return {
        formFields
    };
}, {
    addItem
})(CreateView);
