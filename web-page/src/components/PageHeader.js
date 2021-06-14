import React from 'react';
import { Layout, Menu, } from 'antd';

const { Header } = Layout;

export default class PageHeader extends React.Component {
    render() {
        return(
            <Layout>
                <Header className='header'>
                    <Menu theme='dark' mode='horizontal'>
                        <Menu.Item key='1'>Início</Menu.Item>
                        <Menu.Item key='2'>Ajuda</Menu.Item>
                        <Menu.Item key='3'>Sobre</Menu.Item>
                    </Menu>
                </Header>
            </Layout>
        );
    }
}