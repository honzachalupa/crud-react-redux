import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { sort as sortItems } from './../../store/actions/data';
import { getIdFromLabel } from './../../helpers';

class Header extends Component {
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

    componentDidMount() {
        const { formFields } = this.props;

        this.props.sortItems(formFields[0].label);
    }

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
