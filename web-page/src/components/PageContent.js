import React from 'react';
import { Col, Divider, Layout, Row, Typography } from 'antd';

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

        const teste = (economy) => {
            console.log('teste: ', economy);
            this.updateEconomy(economy);
        }
        
        socket.addEventListener('message', function (event) {
            const eventData = JSON.parse(event.data);
            if(eventData.type === 'connection') {
                console.log(eventData.message);
            } else if (eventData.type === 'economy'){
                teste(eventData.payload);
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
                            {this.state.economy.map(e => (
                                <div key={e.round}>
                                    <Text>{'Round ' + e.round + ' - CT: ' + e.CTValue + ' T: ' + e.TValue}</Text>
                                </div>
                            ))}
                        </Col>
                        <Col span={8} />
                    </Row>
                </Content>
            </Layout>
            
        );
    }
}