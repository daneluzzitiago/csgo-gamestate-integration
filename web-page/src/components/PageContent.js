import React from 'react';
import { Col, Divider, Layout, Row, Typography } from 'antd';
import EconomyChart from './EconomyChart';
import PlayerStatistics from './PlayerStatistics';
import WeaponPie from './WeaponPie';

const { Content } = Layout;
const socket = new WebSocket('ws://localhost:8080', 'server-client-protocol');

export default class PageContent extends React.Component {
    state = {
        economy: [],
        kills: [],
        deaths: [],
    }
    
    componentDidMount() {
        const updateEconomy = (payload) => this.setState({ economy: payload });
        const updateKills = (payload) => this.setState({ kills: payload });
        const updateDeaths = (payload) => this.setState({ deaths: payload });

        socket.addEventListener('message', function (event) {
            const eventData = JSON.parse(event.data);
            if(eventData.type === 'connection') {
                console.log(eventData.message);
            } else if (eventData.type === 'economy'){
                updateEconomy(eventData.payload);
            } else if (eventData.type === 'kill'){
                updateKills(eventData.payload);
            } else if (eventData.type === 'death'){
                updateDeaths(eventData.payload);
                console.log('ALGUEM MORREU')
            }
        });
    }    

    render() {
        return(
            <Layout>
                <Content style={{ padding: '0 50px' }}>
                    <Divider orientation='left'>Economia</Divider>
                    <Row justify='center'>
                        <Col span={20}>
                            <EconomyChart 
                                economy={this.state.economy}
                            />
                        </Col>
                    </Row>
                    <Divider orientation='left'>Tempo de morte</Divider>
                    <Row justify='center'>
                        <Col span={20}>
                            <PlayerStatistics
                                kills={this.state.kills}
                                deaths={this.state.deaths}
                            />
                        </Col>
                    </Row>
                    <Divider orientation='left'>Essa merda que nao funciona</Divider>
                    <Row justify='center'>
                        <Col span={20}>
                            <WeaponPie />
                        </Col>
                    </Row>
                </Content>
            </Layout>
        );
    }
}