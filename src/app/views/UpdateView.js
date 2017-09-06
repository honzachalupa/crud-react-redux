import React, { Component, PropTypes } from 'react';
import { Button, ButtonGroup, Form, FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';
import getSelectedItem from './../utilities/getSelectedItem';
import getItemId from './../utilities/getItemId';
import jQuery from 'jquery';
import Toastr from 'toastr';
import CKEditor from 'react-ckeditor-component';

export default class UpdateView extends Component {
    static handleCancel() {
        window.location.hash = '/';
    }

    constructor(props) {
        super(props);

        const items = JSON.parse(localStorage.getItem('items')) || [];

        this.state = {
            items,
            item: getSelectedItem(getItemId(), items)
        };
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

    handleSave() {
        const items = this.state.items;
        const updatedItem = this.state.item;

        items.forEach((item) => {
            if (item.id === updatedItem.id) {
                item = updatedItem;
            }
        });

        localStorage.setItem('items', JSON.stringify(items));

        Toastr.success('Employee\'s details were updated.');

        window.location.hash = '/';
    }

    render() {
        return (
            <div data-view="update">
                <Button onClick={() => UpdateView.handleCancel()}>Back to items list</Button>

                <Form horizontal>
                    <FormGroup controlId="first-name">
                        <Col componentClass={ControlLabel} sm={2}>
                            First name
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" placeholder="First name" defaultValue={this.state.item.firstName} onChange={(e) => this.handleChange(e, 'firstName')} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="last-name">
                        <Col componentClass={ControlLabel} sm={2}>
                            Last name
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" placeholder="Last name" defaultValue={this.state.item.lastName} onChange={(e) => this.handleChange(e, 'lastName')} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="age">
                        <Col componentClass={ControlLabel} sm={2}>
                            Age
                        </Col>
                        <Col sm={10}>
                            <FormControl type="number" placeholder="Age" defaultValue={this.state.item.age} onChange={(e) => this.handleChange(e, 'age')} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="bio">
                        <Col componentClass={ControlLabel} sm={2}>
                            Bio
                        </Col>
                        <Col sm={10}>
                            <CKEditor activeClass="p10" content={this.state.item.bio_HTML} onChange={(value) => this.handleCKEditorChange(value, 'bio')} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="start-date">
                        <Col componentClass={ControlLabel} sm={2}>
                            Start date
                        </Col>
                        <Col sm={10}>
                            <FormControl type="date" placeholder="Start date" defaultValue={this.state.item.startDate} onChange={(e) => this.handleChange(e, 'startDate')} />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <ButtonGroup>
                                <Button onClick={() => this.handleSave()}>Save</Button>
                                <Button onClick={() => UpdateView.handleCancel()}>Cancel</Button>
                            </ButtonGroup>
                        </Col>
                    </FormGroup>
                </Form>


            </div>
        );
    }
}
