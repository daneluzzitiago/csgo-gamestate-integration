import React from 'react';
import { Col, Divider, Layout, Row, Typography } from 'antd';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import ctLogo from '../imgs/logo_CT_csgo.png';
import trLogo from '../imgs/logo_TR_csgo.png';

const { Content } = Layout;
const { Text, Title } = Typography

export default class PageContent extends React.Component {
    state = {
        economy: [
            {
                round: 0,
                CTValue: 5000,
                TValue: 5000,
            },
            {
                round: 1,
                CTValue: 9000,
                TValue: 7000,
            },
            {
                round: 2,
                CTValue: 10000,
                TValue: 9000,
            },
            {
                round: 3,
                CTValue: 19000,
                TValue: 15000,
            },
            {
                round: 4,
                CTValue: 22000,
                TValue: 20000,
            },
            {
                round: 5,
                CTValue: 30000,
                TValue: 25000,
            },
            {
                round: 6,
                CTValue: 25000,
                TValue: 32000,
            }
        ],
        round: 0,
    }

    // updateEconomy(economy) {
    //     this.setState({ economy });
    // }

    render() {
        // const socket = new WebSocket('ws://localhost:8080', 'server-client-protocol');
        
        // socket.addEventListener('open', function (event){
        //     return
        // });

        // const teste = (economy) => {
        //     console.log('teste: ', economy);
        //     this.updateEconomy(economy);
        // }
        
        // socket.addEventListener('message', function (event) {
        //     const eventData = JSON.parse(event.data);
        //     if(eventData.type === 'connection') {
        //         console.log(eventData.message);
        //     } else if (eventData.type === 'economy'){
        //         teste(eventData.payload);
        //     }
        // });


        // {this.state.economy.map(e => (
        //     <div key={e.round}>
        //         <Text>{'Round ' + e.round + ' - CT: ' + e.CTValue + ' T: ' + e.TValue}</Text>
        //     </div>
        // ))}
        
        return(
            <Layout>
                <Content style={{ padding: '10px 50px' }}>
                    <Row>
                        <Col/>
                        <Col>
                            <Title level={2}>Economia</Title>
                        </Col>
                    </Row>
                    <Row justify='center'>
                        <Col>
                            <Title level={2}>Primeiro half - Round {this.state.round + 1}</Title>
                        </Col>
                    </Row>
                    <Row justify='center' style={{ marginBottom: '15px'}}>
                        <Col>
                            <Title level={2}>Time 1</Title>
                        </Col>
                        <Col offset={1}>
                            <img src={ctLogo} height='50px'/>
                        </Col>
                        <Col offset={1}>
                            <Title level={2}>3</Title>
                        </Col>
                        <Col offset={1}>
                            <Title level={2}>x</Title>
                        </Col>
                        <Col offset={1}>
                            <Title level={2}>2</Title>
                        </Col>
                        <Col offset={1}>
                            <img src={trLogo} height='50px'/>
                        </Col>
                        <Col offset={1}>
                           <Title level={2}>Time 2</Title>
                        </Col>
                    </Row>
                    <Row justify='center'>
                        <Col span={2} style={{ textAlign: 'center' }}>
                            Round
                        </Col>
                        {this.state.economy.map((a) => 
                            <Col span={1} style={{ textAlign: 'center' }}>
                                {a.round}
                            </Col>
                        )}
                    </Row>
                    <Row justify='center'>
                        <Col span={2} style={{ textAlign: 'center' }}>
                            Economia CT
                        </Col>
                        {this.state.economy.map((a) => 
                            <Col span={1} style={{ textAlign: 'center',
                            border: 'solid',
                            borderWidth: 'thin',
                            borderRadius: '5px' }}>
                                {a.CTValue}
                            </Col>
                        )}
                    </Row>
                    <Row justify='center'>
                        <Col span={2} style={{ textAlign: 'center' }}>
                            Economia TR
                        </Col>
                        {this.state.economy.map((a) => 
                            <Col span={1} style={{ textAlign: 'center',
                            border: 'solid',
                            borderWidth: 'thin',
                            borderRadius: '5px' }}>
                                {a.TValue}
                            </Col>
                        )}
                    </Row>
                    <Row justify='center'>
                        <ResponsiveContainer width="95%" height={200}>
                            <LineChart data={this.state.economy}>
                                <Line type="monotone" dataKey="CTValue" stroke="#0000ff" name="Economia CT" />
                                <Line type="monotone" dataKey="TValue" stroke="#ff0000" name="Economia TR"/>
                                <CartesianGrid stroke="#ccc" width='100%' />
                                <XAxis dataKey="round" type="number" domain={[0,'dataMax + 1']} />
                                    {/* ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]} /> */}
                                <YAxis type="number" domain={[0, 'dataMax + 1000']} />
                                <Tooltip />
                            </LineChart>
                        </ResponsiveContainer>
                    </Row>
                </Content>
            </Layout>
            
        );
    }
}