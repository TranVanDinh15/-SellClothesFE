import { Layout } from 'antd';
import React from 'react';
import Content from '../../Admin/common/Content/Content';
import { Footer } from 'antd/es/layout/layout';
import HeaderClient from '../Header/Header';
import { Outlet } from 'react-router-dom';
import ChatClient from '../ChatClient/ChatClient';
import { useSelector } from 'react-redux';
import { useRedux } from '../Cart/Cart';

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: '120vh',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#108ee9',
};
const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#7dbcea',
};
export default function DefaultLayoutClient() {
    // Get User Hiện tại
    const curentUser = useSelector((state: useRedux) => state.reduxAuth.user);
    return (
        <Layout>
            {/* <Header style={headerStyle}>Header</Header> */}
            <HeaderClient />
            {/* <Content style={contentStyle}>Content</Content> */}
            <Outlet />
            {/* <Footer style={footerStyle}>Footer</Footer> */}
            {curentUser && curentUser?.roleId == 'USER' ? <ChatClient /> : ''}
        </Layout>
    );
}
