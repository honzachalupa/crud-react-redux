import React, { Component, PropTypes } from 'react';
import { Button, ButtonGroup, Form, FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';
import getSelectedItem from './../utilities/getSelectedItem';
import getItemId from './../utilities/getItemId';

export default class ReadView extends Component {
    constructor(props) {
        super(props);

        const items = JSON.parse(localStorage.getItem('items')) || [];

        this.state = {
            items,
            item: getSelectedItem(getItemId(), items)
        };
    }

    redirectToList() {
        window.location.hash = '/';
    }

    redirectToUpdate() {
        window.location.hash = `/update?id=${this.state.item.id}`;
    }

    redirectToDelete() {
        window.location.hash = `/delete?id=${this.state.item.id}`;
    }

    render() {
        return (
            <div data-view="read">
                <Button onClick={() => this.redirectToList()}>Back to items list</Button>

                <Form horizontal>
                    <FormGroup controlId="first-name">
                        <Col componentClass={ControlLabel} sm={2}>
                            First name
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" disabled placeholder="First name" defaultValue={this.state.item.firstName} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="last-name">
                        <Col componentClass={ControlLabel} sm={2}>
                            Last name
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" disabled placeholder="Last name" defaultValue={this.state.item.lastName} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="age">
                        <Col componentClass={ControlLabel} sm={2}>
                            Age
                        </Col>
                        <Col sm={10}>
                            <FormControl type="number" disabled placeholder="Age" defaultValue={this.state.item.age} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="bio">
                        <Col componentClass={ControlLabel} sm={2}>
                            Bio
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" disabled placeholder="Bio" defaultValue={this.state.item.bio} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="start-date">
                        <Col componentClass={ControlLabel} sm={2}>
                            Start date
                        </Col>
                        <Col sm={10}>
                            <FormControl type="date" disabled placeholder="Start date" defaultValue={this.state.item.startDate} />
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
            </div>
        );
    }
}
