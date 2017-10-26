import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { sort as sortItems } from '../../store/actions/data';

class Header extends Component {
    /* static translate(value) {
        switch (value) {
            case 'id':
                return 'ID';
            case 'first_name':
                return 'First Name';
            case 'last_name':
                return 'Last Name';
            case 'age':
                return 'Age';
            case 'bio':
                return 'About';
            case 'start_date':
                return 'Start Date';
            default:
                console.error(`Unable to translate value '${value}'`);
                return value;
        }
    } */

    static labelToId(label) {
        return label.replace(/\s/, '_').toLowerCase();
    }

    constructor(props) {
        super(props);

        const { items } = props;

        this.state = {
            numberOfRecords: items.length
        };
    }

    componentWillMount() {
        // this.getDataAllTypes();
    }

    componentDidMount() {
        const { formFields } = this.props;

        this.props.sortItems(formFields[0].label);
    }

    /* getDataAllTypes() {
        const valuesAll = {};
        const dataTypes = {};

        this.props.properties.forEach((property) => {
            const valuesPerProperty = [];

            this.props.items.forEach((item) => {
                valuesPerProperty.push(item[property]);
            });

            valuesAll[property] = valuesPerProperty;
        });

        Object.keys(valuesAll).forEach((property) => {
            let isText = false;
            let isNumber = false;
            let isDate = false;

            valuesAll[property].forEach((value) => {
                if (/^\d+$/.test(value)) {
                    if (!isText) {
                        isNumber = true;
                    }
                } else if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(value)) {
                    if (!isText) {
                        isDate = true;
                    }
                }

                isText = !(isNumber || isDate);
            });

            dataTypes[property] = isNumber ? 'number' : isDate ? 'date' : 'text';
        });

        this.setState({
            dataTypes
        });
    } */

    getDataType(property) {
        const { dataTypes } = this.state;
        let dataType = 'text';

        Object.keys(dataTypes).forEach((key) => {
            if (property === key) {
                dataType = dataTypes[key];
            }
        });

        return dataType;
    }

    handleClick(label) {
        this.props.sortItems(label);
    }

    render() {
        const { numberOfRecords } = this.state;
        const { formFields, sorting } = this.props;

        return (
            <thead>
                <tr>
                    {
                        formFields.map((field) => {
                            const { label, dataType } = field;
                            const isSingleRecord = numberOfRecords === 1;
                            const className = (!isSingleRecord && sorting.lastPropName === Header.labelToId(label)) ? sorting.lastDirection : null;

                            return (
                                <td key={label} data-type={dataType} className={className}>
                                    <button onClick={!isSingleRecord ? () => this.handleClick(label) : null}>
                                        {label}
                                    </button>
                                </td>
                            );
                        })
                    }
                </tr>
            </thead>
        );
    }
}

export default connect((store) => {
    const { items, formFields, sorting } = store.data;

    return {
        items,
        formFields,
        sorting
    };
}, {
    sortItems
})(Header);
