import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { sort as sortItems } from '../../store/actions/data';

class Header extends Component {
    static translate(value) {
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
    }

    componentWillMount() {
        this.getDataAllTypes();
    }

    componentDidMount() {
        // this.props.sort();
    }

    getDataAllTypes() {
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
    }

    getDataType(property) {
        let dataType = 'text';

        Object.keys(this.state.dataTypes).forEach((key) => {
            if (property === key) {
                dataType = this.state.dataTypes[key];
            }
        });

        return dataType;
    }

    handleClick() {
        // this.props.sort('id', 'number');
    }

    render() {
        return (
            <thead>
                <tr>
                    {
                        this.props.properties.map((property) => {
                            const dataType = this.getDataType(property);
                            const label = Header.translate(property);
                            const singleRecord = this.props.numberOfRecords === 1;
                            // const className = (!singleRecord && this.props.lastSort.property === property) ? this.props.lastSort.direction : null;
                            const clickEvent = !singleRecord ? () => this.handleClick() : null;

                            return (
                                <td key={label} data-type={dataType} >
                                    <button onClick={clickEvent}>
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
    const { items, formFields } = store.data;

    return {
        items,
        formFields
    };
}, {
    sortItems
})(Header);
