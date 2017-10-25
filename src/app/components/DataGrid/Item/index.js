import React, { Component, PropTypes } from 'react';

export default class Item extends Component {
    redirectToDetail () {
        const { item, browserHistory } = this.props;

        console.log(browserHistory);

        browserHistory.push(`/read/${item.id}`);
    }

    render() {
        const { item } = this.props;
        const itemWidthPerc = (100 / this.props.properties.length);

        return (
            <tr key={item.id} onClick={() => this.redirectToDetail()}>
                {
                    this.props.properties.map((property) => {
                        return (
                            <td key={property} style={{ width: `${itemWidthPerc}%` }}>
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
