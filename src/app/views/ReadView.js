import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormGroup, Button, ButtonGroup, Col } from 'react-bootstrap';
import Form from './../components/Form';
import FormHeader from './../components/Form/Header';
import FormFooter from './../components/Form/Footer';
import getSelectedItem from './../utilities/getSelectedItem';
import getItemId from './../utilities/getItemId';

class ReadView extends Component {
    constructor(props) {
        super(props);

        const { items, match } = props;
        const { id: selectedId } = match.params;

        items.forEach((item) => {
            if (item.id.toString() === selectedId) {
                this.state = {
                    item
                };
            }
        });
    }

    redirectToList() {
        this.props.history.push('/');
    }

    redirectToUpdate() {
        const { item } = this.state;
        const { id } = item;

        this.props.history.push(`/update/${id}`);
    }

    redirectToDelete() {
        const { item } = this.state;
        const { id } = item;

        this.props.history.push(`/delete/${id}`);
    }

    render() {
        const { item } = this.state;

        return (
            <Form item={item} readOnly>
                <FormHeader>
                    <Link to="/" className="btn">
                        Back to items list
                    </Link>

                    <h2>Read</h2>
                </FormHeader>
                <FormFooter>
                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <ButtonGroup>
                                <Button onClick={() => this.redirectToUpdate()}>Edit</Button>
                                <Button onClick={() => this.redirectToDelete()}>Delete</Button>
                            </ButtonGroup>
                        </Col>
                    </FormGroup>
                </FormFooter>
            </Form>
        );
    }
}

export default connect((store) => {
    const { items, formFields } = store.data;

    return {
        items,
        formFields
    };
})(ReadView);
