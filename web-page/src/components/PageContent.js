import React from 'react';
import { Col, Divider, Layout, Row, Typography } from 'antd';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import ctLogo from '../imgs/logo_CT_csgo.png';
import trLogo from '../imgs/logo_TR_csgo.png';

import EconomyChart from './EconomyChart';

const { Content } = Layout;
const { Text, Title } = Typography

export default class PageContent extends React.Component {
    state = {
        economy: [],
    }

    updateEconomy(economy) {
        this.setState({ economy });
    }

    render() {
        const socket = new WebSocket('ws://localhost:8080', 'server-client-protocol');
        
        socket.addEventListener('open', function (event){
            return
        });

        const callUpdateEconomy = (economy) => {
            this.updateEconomy(economy);
        }
        
        socket.addEventListener('message', function (event) {
            const eventData = JSON.parse(event.data);
            if(eventData.type === 'connection') {
                console.log(eventData.message);
            } else if (eventData.type === 'economy'){
                callUpdateEconomy(eventData.payload);
            }
        });
        
        return(
            <Layout>
                <Content style={{ padding: '0 50px' }}>
                    <Divider orientation='left'>Conteúdo</Divider>
                    <Row gutter={40}>
                        <Col span={8} />
                        <Col span={8}>
                            <Title level={2}>Economia</Title>
                        </Col>
                    </Row>
                    <Row justify={'center'}>
                        <Col span={20}>
                            <EconomyChart 
                                economy={this.state.economy}
                            />
                        </Col>
                    </Row>
                </Content>
            </Layout>
        );
    }
}