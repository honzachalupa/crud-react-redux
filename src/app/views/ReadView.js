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
        console.log(this.props);

        return (
            <Form view="read" item={item}>
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

            /* <div data-view="read">
                <Button onClick={() => this.redirectToList()}>Back to items list</Button>

                <Form horizontal>
                    <FormGroup controlId="first-name">
                        <Col componentClass={ControlLabel} sm={2}>
                            First name
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" disabled placeholder="First name" defaultValue={item.firstName} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="last-name">
                        <Col componentClass={ControlLabel} sm={2}>
                            Last name
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" disabled placeholder="Last name" defaultValue={item.lastName} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="age">
                        <Col componentClass={ControlLabel} sm={2}>
                            Age
                        </Col>
                        <Col sm={10}>
                            <FormControl type="number" disabled placeholder="Age" defaultValue={item.age} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="bio">
                        <Col componentClass={ControlLabel} sm={2}>
                            Bio
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" disabled placeholder="Bio" defaultValue={item.bio} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="start-date">
                        <Col componentClass={ControlLabel} sm={2}>
                            Start date
                        </Col>
                        <Col sm={10}>
                            <FormControl type="date" disabled placeholder="Start date" defaultValue={item.startDate} />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <ButtonGroup>
                                <Button onClick={() => this.redirectToUpdate()}>Edit</Button>
                                <Button onClick={() => this.redirectToDelete()}>Delete</Button>
                            </ButtonGroup>
                        </Col>
                    </FormGroup>
                </Form>
            </div> */
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
