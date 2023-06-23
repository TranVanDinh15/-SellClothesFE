import React, { useState } from 'react';
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { FaUserAlt, FaBloggerB } from 'react-icons/fa';
import { AiFillTrademarkCircle } from 'react-icons/ai';
import { RiProductHuntLine } from 'react-icons/ri';
import type { MenuProps } from 'antd';
import { Breadcrumb, Image, Layout, Menu, theme } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Input, Space } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

import './defaultLayoutAdmin.css';
const { Search } = Input;
const { Header, Content, Footer, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Trang chủ', '/Admin', <PieChartOutlined className="iconSidebarCss" />),
    getItem('Quản lý thương hiệu', '/Admin/TradeMark', <AiFillTrademarkCircle className="iconSidebarCss" />),
    getItem('Quản lý sản phẩm', '/Admin/Product', <RiProductHuntLine className="iconSidebarCss" />, [
        getItem('Danh sách sản phẩm', '/Admin/Product'),
        getItem('Loại quần áo', '/Admin/Product/Category'),
        getItem('Màu sắc', '/Admin/Product/Color'),
    ]),
    getItem('Quản lý người dùng', '/Admin/User', <FaUserAlt className="iconSidebarCss" />, [
        getItem('Danh sách Users', '/Admin/User/listUser'),
        getItem('Thêm User', '/Admin/Blog/addBlog'),
    ]),
    getItem('Quản lý bài đăng', '/Admin/Blog', <FaBloggerB className="iconSidebarCss" />, [
        getItem('Danh sách bài đăng', '/Admin/Blog/listBlog'),
        getItem('Thêm bài đăng', '/Admin/Blog/addBlog'),
    ]),
    // getItem('User', 'sub1', <UserOutlined />, [getItem('Tom', '3'), getItem('Bill', '4'), getItem('Alex', '5')]),
    // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
];
const onSearch = (value: string) => console.log(value);
export default function DefaultLayoutAdmin() {
    const location = useLocation();
    console.log(location.pathname);
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const onClick: MenuProps['onClick'] = (e) => {
        console.log(e.key);
        navigate(e.key);
    };
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} theme="light">
                <div className="demo-logo-vertical" />
                <div
                    style={{
                        margin: '20px 0',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Image src="https://demo.dashboardpack.com/marketing-html/img/logo.png" width={140} />
                </div>
                <div className="OptionManager">
                    <Menu
                        defaultSelectedKeys={[location.pathname]}
                        mode="inline"
                        items={items}
                        theme="light"
                        onClick={onClick}
                    />
                </div>
            </Sider>
            <Layout>
                <Header
                    style={{ padding: '0 40px', display: 'flex', justifyContent: 'right', backgroundColor: '#fff' }}
                >
                    <div className="SearchAdminContainer">
                        <Search
                            placeholder="input search text"
                            allowClear
                            enterButton="Search"
                            size="middle"
                            onSearch={onSearch}
                        />
                    </div>
                    <div className="userAdmin">
                        <Avatar
                            size={{ xs: 24, sm: 32, md: 40, lg: 40, xl: 40, xxl: 40 }}
                            icon={<AntDesignOutlined />}
                        />
                    </div>
                </Header>
                <Content style={{ height: '100vh' }}>
                    <Outlet />
                </Content>
                {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer> */}
            </Layout>
        </Layout>
    );
}
