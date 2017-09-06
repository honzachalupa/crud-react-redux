import React, { Component, PropTypes } from 'react';

export default class Header extends Component {
    static translate (value) {
        switch (value) {
            case 'id':
                return 'ID';
            case 'firstName':
                return 'First Name';
            case 'lastName':
                return 'Last Name';
            case 'age':
                return 'Age';
            case 'bio':
                return 'About';
            case 'startDate':
                return 'Start Date';
            default:
                // console.error(new Error(`Unable to translate value '${value}'`));
                return value;
        }
    }

    componentWillMount() {
        this.getDataAllTypes();
    }

    componentDidMount() {
        this.props.sort('id', 'number');
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

    render() {
        return (
            <thead>
                <tr>
                    {
                        this.props.properties.map((property) => {
                            const dataType = this.getDataType(property);
                            const label = Header.translate(property);
                            const singleRecord = this.props.numberOfRecords === 1;
                            const className = (!singleRecord && this.props.lastSort.property === property) ? this.props.lastSort.direction : null;
                            const clickEvent = !singleRecord ? () => this.props.sort(property, dataType) : null;

                            return (
                                <td
                                    className={className}
                                    key={label}
                                    data-type={dataType}
                                >
                                    <button
                                        onClick={clickEvent}
                                    >
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
