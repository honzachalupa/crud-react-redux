import React, { Component, PropTypes } from 'react';

export default class Item extends Component {
    redirectToDetail () {
        window.location.hash = `/read?id=${this.props.item.id}`;
    }

    render() {
        const item = this.props.item;
        const rowId = item.id;
        const itemWidthPerc = (100 / this.props.properties.length);

        return (
            <tr
                key={rowId}
                onClick={() => this.redirectToDetail()}
            >
                {
                    this.props.properties.map((property) => {
                        return (
                            <td
                                key={property}
                                style={{ width: `${itemWidthPerc}%` }}
                            >
                                <p>
                                    {item[property]}
                                </p>
                            </td>
                        );
                    })
                }
            </tr>
        );
    }
}
