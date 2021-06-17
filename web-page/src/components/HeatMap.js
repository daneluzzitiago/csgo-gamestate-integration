import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default class HeatMap extends React.Component {
  state = {
    deathsPosition: [],
  }

  componentDidUpdate(previousProps) {
    if(previousProps.deaths !== this.props.deaths) {
      const deathsPosition = [];
      this.props.deaths.map((d) => {
        const position = d.position.split(', ');
        console.log(position);
        console.log(Number(position[0]));
        console.log(Number(position[1]));
        const deathPosition = {
          x: Number(position[0]),
          y: Number(position[1]),
        }
        deathsPosition.push(deathPosition);
      });
      console.log(deathsPosition)
      this.setState({ deathsPosition });
    }
  }

  render() {
      return (    
        <ResponsiveContainer
          width={400}
          height={400}
        >
          <ScatterChart
            margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis type="number" dataKey="x" name="x" domain={[-1500, 2100]} />
            <YAxis type="number" dataKey="y" name="y" domain={[-1000, 3100]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="Morte" data={this.state.deathsPosition} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      );
    }
  }
  