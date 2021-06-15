import React from 'react';
import { Col, Divider, Layout, Row, Typography } from 'antd';
import EconomyChart from './EconomyChart';
import PlayerStatistics from './PlayerStatistics';

const { Content } = Layout;
const { Title } = Typography

export default class PageContent extends React.Component {
    state = {
        economy: [],
        kills: [],
    }

    updateEconomy(economy) {
        this.setState({ economy });
    }

    updateKills(kills) {
        console.log(kills);
        this.setState({ kills });
    }

    render() {
        const socket = new WebSocket('ws://localhost:8080', 'server-client-protocol');
        
        socket.addEventListener('open', function (event){
            return
        });

        const callUpdateEconomy = (economy) => this.updateEconomy(economy);
        const callUpdateKills = (kills) => this.updateKills(kills);
        
        socket.addEventListener('message', function (event) {
            const eventData = JSON.parse(event.data);
            if(eventData.type === 'connection') {
                console.log(eventData.message);
            } else if (eventData.type === 'economy'){
                callUpdateEconomy(eventData.payload);
            } else if (eventData.type === 'kill'){
                callUpdateKills(eventData.payload);
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
                    <Divider orientation='left'>Estatística de Jogadores</Divider>
                    <Row justify={'center'}>
                        <Col span={20}>
                            <PlayerStatistics
                                kills={this.state.kills}
                            />
                        </Col>
                    </Row>
                </Content>
            </Layout>
        );
    }
}