import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default class EconomyChart extends React.Component {
    state = {}

    render() {
        const { economy } = this.props;

        return (
            <ResponsiveContainer width={'100%'} height={200}>
                <LineChart data={economy}>
                    <Line type="monotone" dataKey="CTValue" stroke="#0000ff" name="Economia CT" />
                    <Line type="monotone" dataKey="TValue" stroke="#ff0000" name="Economia TR" />
                    <CartesianGrid stroke="#ccc" width='100%' />
                    <XAxis dataKey="round" type="number" domain={[0,'dataMax + 1']} allowDecimals={false} />
                    <YAxis type="number" domain={[0, 'dataMax + 1000']} />
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        );
    }

}