import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { add as addItem } from '../store/actions/data';
import { FormGroup, Button, ButtonGroup, Col } from 'react-bootstrap';
import Form from './../components/Form';
import FormHeader from './../components/Form/Header';
import FormFooter from './../components/Form/Footer';
import Toastr from 'toastr';

class CreateView extends Component {
    static isFilled(item) {
        let filled = true;

        Object.keys(item).forEach((key) => {
            if (item[key] === null) {
                filled = false;
            }
        });

        return filled;
    }

    constructor() {
        super();

        this.createItem = this.createItem.bind(this);
    }

    createItem() {
        const { item } = this.state;

        if (CreateView.isFilled(item)) {
            Toastr.success('New employee was added...', 'Great!'); // To-do

            this.props.addItem(item);
            this.props.history.push('/');
        } else {
            Toastr.error('Please fill all fields...', 'Error');
        }
    }

    render() {
        return (
            <div data-view="create">
                <Form view="edit">
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
            </div>
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
