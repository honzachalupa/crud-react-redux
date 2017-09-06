import React, { Component, PropTypes } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, ButtonGroup, Form, FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';
import jQuery from 'jquery';
import Toastr from 'toastr';
import CKEditor from 'react-ckeditor-component';

export default class CreateView extends Component {
    static isFilled(item) {
        let i = 0;

        Object.keys(item).forEach((key) => {
            if (!item[key]) {
                i += 1;
            }
        });

        return i === 0;
    }

    constructor(props) {
        super(props);

        this.items = JSON.parse(localStorage.getItem('items')) || [];

        this.state = {
            items: this.items,
            item: {
                id: this.generateId(),
                firstName: null,
                lastName: null,
                age: null,
                bio: null,
                startDate: null
            },
            formValid: false
        };
    }

    generateId() {
        const existingIds = [];

        this.items.forEach((item) => {
            existingIds.push(item.id);
        });

        const generatedId = Math.round(Math.random() * 10000);

        if (existingIds.indexOf(generatedId) > -1 || generatedId < 1000 || generatedId > 9999) {
            this.generateId();
        }

        return generatedId;
    }

    handleChange(e, property) {
        const item = this.state.item;

        item[property] = e.target.value;

        this.setState({
            item
        });
    }

    handleCKEditorChange(value, property) {
        const item = this.state.item;

        item[property] = value.replace(/<.+?>/g, ' ');
        item[`${property}_HTML`] = value;

        this.setState({
            item
        });
    }

    createItem() {
        const createdItem = this.state.item;

        if (CreateView.isFilled(createdItem)) {
            this.items.push(createdItem);

            localStorage.setItem('items', JSON.stringify(this.items));

            Toastr.success('New employee was added...', 'Great!');

            this.setState({
                formValid: true
            });
        } else {
            Toastr.error('Please fill all fields...', 'Error');

            this.setState({
                formValid: true
            });
        }
    }

    render() {
        if (this.state.formValid) {
            <Redirect to="/xyxy" />;
        }

        return (
            <div data-view="create">
                <Link to="/" className="btn">
                    Back to items list
                </Link>

                <Form horizontal>
                    <FormGroup controlId="first-name">
                        <Col componentClass={ControlLabel} sm={2}>
                            First name
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" placeholder="First name" onChange={(e) => this.handleChange(e, 'firstName')} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="last-name">
                        <Col componentClass={ControlLabel} sm={2}>
                            Last name
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" placeholder="Last name" onChange={(e) => this.handleChange(e, 'lastName')} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="age">
                        <Col componentClass={ControlLabel} sm={2}>
                            Age
                        </Col>
                        <Col sm={10}>
                            <FormControl type="number" placeholder="Age" onChange={(e) => this.handleChange(e, 'age')} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="bio">
                        <Col componentClass={ControlLabel} sm={2}>
                            Bio
                        </Col>
                        <Col sm={10}>
                            <CKEditor activeClass="p10" onChange={(value) => this.handleCKEditorChange(value, 'bio')} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="start-date">
                        <Col componentClass={ControlLabel} sm={2}>
                            Start date
                        </Col>
                        <Col sm={10}>
                            <FormControl type="date" placeholder="Start date" onChange={(e) => this.handleChange(e, 'startDate')} />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button onClick={() => this.createItem()}>
                                Create Item
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}
