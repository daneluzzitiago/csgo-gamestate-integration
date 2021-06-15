import React from 'react';

export default class PlayerStatistics extends React.Component {
    state = {};

    render() {
        const { kills } = this.props;
        return (
            kills.map((k) => (
                <div>
                    {k.name + ' ' + k.position + ' ' + k.time_left + ' ' + (k.round + k.head_shot ? '(headshot)' : '')}
                </div>
            ))
        );
    }
}