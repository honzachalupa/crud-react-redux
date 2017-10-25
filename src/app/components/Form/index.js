import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, ButtonGroup, Form, FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';
import jQuery from 'jquery';
import CKEditor from 'react-ckeditor-component';

class GenericForm extends Component {
    static labelToId(label) {
        return label.replace(/\s/, '_').toLowerCase();
    }

    constructor(props) {
        super(props);

        const { view, item, formFields } = this.props;
        const itemDataPlaceholder = {};

        if (item) {
            this.state = {
                view,
                item
            };
        } else if (formFields) {
            formFields.forEach((field) => {
                const key = GenericForm.labelToId(field.label);
                itemDataPlaceholder[key] = null;
            });

            this.state = {
                view,
                item: itemDataPlaceholder
            };
        }
    }

    handleChange(e, property, dataType) {
        const { item } = this.state;

        if (dataType === 'richtext') {
            const value = e;

            item[`${property}_HTML`] = value;
            item[property] = value.replace(/<.+?>/g, ' ');
        } else {
            item[property] = e.target.value;
        }

        this.setState({
            item
        });

        this.validate();
    }

    validate() {
        const { item } = this.state;
        let isValid = true;

        Object.keys(item).forEach((key) => {
            if (item[key] === null) {
                isValid = false;
            }
        });

        return isValid;
    }

    render() {
        const { formFields } = this.props;
        const { item } = this.state;

        const fieldsBlock = formFields.map((field) => {
            const { label, dataType } = field;
            const id = GenericForm.labelToId(label);
            let inputBlock;

            if (dataType === 'richtext') {
                if (this.state.view === 'read') {
                    const editorConfig = {
                        readOnly: true,
                        toolbarCanCollapse: true,
                        toolbarStartupExpanded: false
                    };

                    inputBlock = (
                        <CKEditor activeClass="p10" config={editorConfig} content={item[id]} />
                    );
                } else {
                    inputBlock = (
                        <CKEditor activeClass="p10" onChange={(value) => this.handleChange(value, id, 'richtext')} content={item[id]} />
                    );
                }
            } else { // Text, number, date, ...
                inputBlock = (
                    <FormControl type={field.dataType} disabled={this.state.view === 'read'} placeholder={label} defaultValue={item[id]} onChange={(e) => this.handleChange(e, id)} />
                );
            }

            return (
                <FormGroup key={id}>
                    <Col componentClass={ControlLabel} sm={2}>
                        {label}
                    </Col>
                    <Col sm={10}>
                        {inputBlock}
                    </Col>
                </FormGroup>
            );
        });

        return (
            <Form horizontal>
                {this.props.children[0]}

                {fieldsBlock}

                {this.props.children[1]}
            </Form>
        );
    }
}

export default connect((store) => {
    const { formFields } = store.data;

    return {
        formFields
    };
})(GenericForm);
