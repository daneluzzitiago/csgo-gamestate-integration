import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

export default class PageFooter extends React.Component {
    render() {
        return(
            <Layout>
                <Footer style={{ textAlign: 'center' }}>CS:GO Game State Integration @2021 por Tiago Lemes Daneluzzi</Footer>
            </Layout>
            
        );
    }
}