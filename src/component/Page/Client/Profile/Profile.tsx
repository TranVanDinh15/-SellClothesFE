import { Breadcrumb, Image, MenuProps } from 'antd';
import React from 'react';
import './Profile.scss';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { BsClockHistory, BsTicketPerforated } from 'react-icons/bs';

import { RiLockPasswordLine } from 'react-icons/ri';
import { GiPositionMarker } from 'react-icons/gi';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useRedux } from '../Cart/Cart';

const { Content, Sider } = Layout;
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
    getItem('Tài khoản của tôi', '/Profile', <UserOutlined className="iconSidebarCss" />),
    getItem('Đơn hàng của tôi', '/Profile/Order', <BsClockHistory className="iconSidebarCss" />),
    getItem('Voucher hiện có', '/Profile/Voucher', <BsTicketPerforated className="iconSidebarCss" />),
    getItem('Địa chỉ', '/Profile/Address', <GiPositionMarker className="iconSidebarCss" />),
];
export default function Profile() {
    const navigate = useNavigate();
    const location = useLocation();
    // Get User Hiện tại
    const curentUser = useSelector((state: useRedux) => state.reduxAuth.user);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const onClick: MenuProps['onClick'] = (e) => {
        console.log(e.key);
        navigate(e.key);
    };
    return (
        <div className="BlogClientWarrapper">
            <div className="BlogClientBox">
                <div className="BlogClientBox__title">
                    <Breadcrumb
                        items={[
                            {
                                title: 'Trang chủ',
                            },
                            {
                                title: 'Tài khoản',
                            },
                        ]}
                    />
                    <div className="BlogClientBox__title__text">
                        <span>Tài khoản</span>
                    </div>
                </div>

                <Layout>
                    <Sider
                        theme="light"
                        breakpoint="lg"
                        collapsedWidth="0"
                        onBreakpoint={(broken) => {
                            console.log(broken);
                        }}
                        onCollapse={(collapsed, type) => {
                            console.log(collapsed, type);
                        }}
                    >
                        <div className="demo-logo-vertical">
                            <Image width={100} src={`${process.env.REACT_APP_IMAGE_AVATAR_URL}${curentUser?.image}`} />
                        </div>
                        <Menu
                            className="MenuProfile"
                            theme="light"
                            mode="inline"
                            defaultSelectedKeys={[location.pathname]}
                            items={items}
                            onClick={onClick}
                        />
                    </Sider>
                    <Layout className="LayoutProfile">
                        <Content style={{ margin: '24px 16px 0', backgroundColor: '#fff' }}>
                            <div style={{ padding: 40, minHeight: 360, background: colorBgContainer }}>
                                <Outlet />
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        </div>
    );
}
