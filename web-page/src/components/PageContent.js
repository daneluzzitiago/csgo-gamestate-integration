import React from 'react';
import { Col, Divider, Layout, Row, Typography } from 'antd';
import EconomyChart from './EconomyChart';
import PlayerStatistics from './PlayerStatistics';
import HeatMap from './HeatMap';

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
                            />
                        </Col>
                    </Row>
                    <Divider orientation='left'>Heatmap de Deaths</Divider>
                    <Row justify='center'>
                        <Col>
                            <HeatMap 
                                deaths={this.state.deaths}
                            />
                        </Col>
                    </Row>
                </Content>
            </Layout>
        );
    }
}