import { Button, Layout } from 'antd';
import React from 'react';
import Content from '../../Admin/common/Content/Content';
import { Footer } from 'antd/es/layout/layout';
import HeaderClient from '../Header/Header';
import { Link, Outlet } from 'react-router-dom';
import ChatClient from '../ChatClient/ChatClient';
import { useSelector } from 'react-redux';
import { useRedux } from '../Cart/Cart';
import { GithubOutlined } from '@ant-design/icons';

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: '120vh',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#108ee9',
};
const footerStyle: React.CSSProperties = {
    color: '#fff',
    backgroundColor: '#000',
    minHeight: '200px',
    marginTop: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // fontSize: '16px',
};
export default function DefaultLayoutClient() {
    // Get User Hiện tại
    const curentUser = useSelector((state: useRedux) => state.reduxAuth.user);
    return (
        <Layout>
            {/* <Header style={headerStyle}>Header</Header> */}
            <HeaderClient />
            {/* <Content style={contentStyle}>Content</Content> */}
            <div>
                <Outlet />
            </div>
            {/* <Footer style={footerStyle}>Footer</Footer> */}
            {curentUser && curentUser?.roleId == 'USER' ? <ChatClient /> : ''}
            <Footer style={footerStyle}>
                <Button
                    style={{
                        fontSize: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: '600',
                        marginBottom: '20px',
                    }}
                    icon={<GithubOutlined />}
                >
                    Github:
                </Button>
                <div
                    className="nameGithub"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        fontSize: '18px',
                        gap: '10px',
                    }}
                >
                    <Link to={'https://github.com/TranVanDinh15'}>https://github.com/TranVanDinh15</Link>
                    <Link to={'https://github.com/toiphamdev'}>https://github.com/toiphamdev</Link>
                </div>
            </Footer>
        </Layout>
    );
}
