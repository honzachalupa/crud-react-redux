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

        const { isReadOnly, item, formFields } = this.props;
        const itemDataPlaceholder = {};

        if (item) {
            this.state = {
                isReadOnly,
                item
            };
        } else if (formFields) {
            formFields.forEach((field) => {
                const key = GenericForm.labelToId(field.label);
                itemDataPlaceholder[key] = null;
            });

            this.state = {
                isReadOnly,
                item: itemDataPlaceholder
            };
        }
    }

    componentDidMount() {
        const { updateTempItem } = this.props;
        const { item } = this.state;

        if (updateTempItem) {
            updateTempItem(item);
        }
    }

    handleChange(e, property, dataType) {
        const { updateTempItem } = this.props;
        const { item } = this.state;

        if (dataType === 'richtext') {
            const value = e;

            item[`${property}_HTML`] = value;
            item[property] = value.replace(/<.+?>/g, ' ');
        } else {
            item[property] = e.target.value;
        }

        updateTempItem(item);
    }

    render() {
        const { formFields, readOnly: isReadOnly } = this.props;
        const { item } = this.state;

        const fieldsBlock = formFields.map((field) => {
            const id = GenericForm.labelToId(field.label);
            let inputBlock;

            if (field.dataType === 'richtext') {
                const value = item[`${id}_HTML`];

                if (isReadOnly) {
                    const ckEditorConfig = {
                        readOnly: true,
                        toolbarCanCollapse: true,
                        toolbarStartupExpanded: false
                    };

                    inputBlock = (
                        <CKEditor activeClass="p10" config={ckEditorConfig} content={value} />
                    );
                } else {
                    inputBlock = (
                        <CKEditor activeClass="p10" onChange={(value) => this.handleChange(value, id, 'richtext')} content={value} />
                    );
                }
            } else { // Text, number, date, ...
                const value = item[id];

                inputBlock = (
                    <FormControl type={field.dataType} disabled={isReadOnly} defaultValue={value} onChange={(e) => this.handleChange(e, id)} />
                );
            }

            return (
                <FormGroup key={id}>
                    <Col componentClass={ControlLabel} sm={2}>
                        {field.label}
                    </Col>
                    <Col sm={10}>
                        {inputBlock}
                    </Col>
                </FormGroup>
            );
        });

        return (
            <Form horizontal>
                {this.props.children ? this.props.children[0] : null}
                {fieldsBlock}
                {this.props.children ? this.props.children[1] : null}
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
