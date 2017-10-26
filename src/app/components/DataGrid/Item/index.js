import React, { Component, PropTypes } from 'react';

export default class Item extends Component {
    static labelToId(label) {
        return label.replace(/\s/, '_').toLowerCase();
    }

    redirectToDetail () {
        const { item, browserHistory } = this.props;

        browserHistory.push(`/read/${item.id}`);
    }

    render() {
        const { item, formFields } = this.props;

        return (
            <tr key={item.id} onClick={() => this.redirectToDetail()}>
                {
                    formFields.map((field) => {
                        const value = item[Item.labelToId(field.label)];

                        return (
                            <td key={field.label} style={{ width: `${100 / formFields.length}%` }}>
                                <p>
                                    {value}
                                </p>
                            </td>
                        );
                    })
                }
            </tr>
        );
    }
}
