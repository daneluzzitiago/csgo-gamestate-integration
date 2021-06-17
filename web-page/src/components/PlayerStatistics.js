import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default class PlayerStatistics extends React.Component {
    state = {
        mappedKills: [
            {
                when: '> 120s',
                total: 0
            },
            {
                when: '> 110s',
                total: 0,
            },
            {
                when: '> 100s',
                total: 0,
            },
            {
                when: '> 90s',
                total: 0,
            },
            {
                when: '> 80s',
                total: 0,
            },
            {
                when: '> 70s',
                total: 0,
            },
            {
                when: '> 60s',
                total: 0,
            },
            {
                when: '> 50s',
                total: 0,
            },
            {
                when: '> 40s',
                total: 0,
            },
            {
                when: '> 30s',
                total: 0
            },
            {
                when: '> 20s',
                total: 0,
            },
            {
                when: '> 10s',
                total: 0,
            },
        ],
    };

    componentDidUpdate(previousProps) {
        if(previousProps.kills !== this.props.kills) {
            var kills_0_10 = 0;
            var kills_11_20 = 0;
            var kills_21_30 = 0;
            var kills_31_40 = 0;
            var kills_41_50 = 0;
            var kills_51_60 = 0;
            var kills_61_70 = 0;
            var kills_71_80 = 0;
            var kills_81_90 = 0;
            var kills_91_100 = 0;
            var kills_101_110 = 0;
            var kills_111_120 = 0;
            
            this.props.kills.map((k) => {
                if(k.time_left <= 10) {
                    kills_0_10++;
                } else if(k.time_left <= 20) {
                    kills_11_20++;
                } else if(k.time_left <= 30) {
                    kills_21_30++;
                } else if(k.time_left <= 40) {
                    kills_31_40++;
                } else if(k.time_left <= 50) {
                    kills_41_50++;
                } else if(k.time_left <= 60) {
                    kills_51_60++;
                } else if(k.time_left <= 70) {
                    kills_61_70++;
                } else if(k.time_left <= 80) {
                    kills_71_80++;
                } else if(k.time_left <= 90) {
                    kills_81_90++;
                } else if(k.time_left <= 100) {
                    kills_91_100++;
                } else if(k.time_left <= 110) {
                    kills_101_110++;
                } else if(k.time_left <= 120) {
                    kills_111_120++;
                }
            });
            const mappedKills = [
                {
                    when: '> 120s',
                    total: kills_111_120
                },
                {
                    when: '> 110s',
                    total: kills_101_110,
                },
                {
                    when: '> 100s',
                    total: kills_91_100,
                },
                {
                    when: '> 90s',
                    total: kills_81_90,
                },
                {
                    when: '> 80s',
                    total: kills_71_80,
                },
                {
                    when: '> 70s',
                    total: kills_61_70,
                },
                {
                    when: '> 60s',
                    total: kills_51_60,
                },
                {
                    when: '> 50s',
                    total: kills_41_50,
                },
                {
                    when: '> 40s',
                    total: kills_31_40,
                },
                {
                    when: '> 30s',
                    total: kills_21_30
                },
                {
                    when: '> 20s',
                    total: kills_11_20,
                },
                {
                    when: '> 10s',
                    total: kills_0_10,
                },
            ];
            this.setState({ mappedKills })
        }
    }

    render() {
        return (
            <ResponsiveContainer width={'100%'} height={200}>
                <LineChart data={this.state.mappedKills}>
                    <Line 
                        type="monotone" 
                        dataKey="total" 
                        stroke="#0000ff" 
                        name="Total de mortes" 
                        allowDecimals={false}
                    />
                    <CartesianGrid stroke="#ccc" width='100%' />
                    <XAxis dataKey="when" />
                    <YAxis type="number" />
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        );
    }
}