import React, { Component, PropTypes } from 'react';
import { getIdFromLabel } from './../../../helpers';

export default class Item extends Component {
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
                        const value = item[getIdFromLabel(field.label)];

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
