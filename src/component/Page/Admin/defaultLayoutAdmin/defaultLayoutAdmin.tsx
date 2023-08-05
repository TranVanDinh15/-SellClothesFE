import React, { useState } from 'react';
import { PieChartOutlined } from '@ant-design/icons';
import { RiProductHuntLine } from 'react-icons/ri';
import { BiImport, BiUser } from 'react-icons/bi';
import { BsCardImage } from 'react-icons/bs';
import { TbBrandCake } from 'react-icons/tb';
import { HiOutlineUsers } from 'react-icons/hi';
import { TbBrandBlogger } from 'react-icons/tb';
import type { MenuProps } from 'antd';
import { Image, Layout, Menu, theme } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Input } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import './defaultLayoutAdmin.css';
import images from '../../../../asset';
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
    getItem('Quản lý người dùng', '/Admin/User', <HiOutlineUsers className="iconSidebarCss" />, [
        getItem('Danh sách Users', '/Admin/User/listUser'),
        getItem('Thêm User', '/Admin/Blog/addBlog'),
    ]),
    getItem('Quản lý thương hiệu', '/Admin/TradeMark', <TbBrandCake className="iconSidebarCss" />),
    getItem('Quản lý sản phẩm', '/Admin/Product', <RiProductHuntLine className="iconSidebarCss" />, [
        getItem('Danh sách sản phẩm', '/Admin/Product'),
        getItem('Danh mục sản phẩm', '/Admin/Product/Category'),
        // getItem('Màu sắc', '/Admin/Product/Color'),
    ]),
    getItem('Quản lý NCC', '/Admin/Supplier', <BiUser className="iconSidebarCss" />),
    getItem('Quản lý nhập hàng', '/Admin/ImportFoods', <BiImport className="iconSidebarCss" />),

    getItem('Quản lý bài đăng', '/Admin/Blog/listBlog', <TbBrandBlogger className="iconSidebarCss" />),
    getItem('Quản lý Banner', '/Admin/Banner', <BsCardImage className="iconSidebarCss" />),
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
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                theme="light"
                width={'250px'}
            >
                <div className="demo-logo-vertical" />
                <div
                    style={{
                        margin: '8px 0px',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Image src={images.logo} width={90} />
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
