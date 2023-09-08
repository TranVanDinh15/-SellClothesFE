import React, { useEffect, useState } from 'react';
import { PieChartOutlined } from '@ant-design/icons';
import { RiProductHuntLine } from 'react-icons/ri';
import { BiImport, BiUser } from 'react-icons/bi';
import { BsCardImage, BsTicketPerforated } from 'react-icons/bs';
import { TbBrandCake } from 'react-icons/tb';
import { HiOutlineUsers } from 'react-icons/hi';
import { TbBrandBlogger } from 'react-icons/tb';
import type { MenuProps } from 'antd';
import { Image, Layout, Menu, theme, Popover, Button } from 'antd';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Input } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import './defaultLayoutAdmin.css';
import images from '../../../../asset';
import ChatAdmin, { useRedux } from '../ChatAdmin/ChatAdmin';
import { AiOutlinePayCircle } from 'react-icons/ai';
import { GiConfirmed } from 'react-icons/gi';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logoutActions } from '../../../../Redux/Actions/Actions.auth';
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
    ]),
    getItem('Quản lý NCC', '/Admin/Supplier', <BiUser className="iconSidebarCss" />),
    getItem('Quản lý nhập hàng', '/Admin/ImportFoods', <BiImport className="iconSidebarCss" />),

    getItem('Quản lý bài đăng', '/Admin/Blog/listBlog', <TbBrandBlogger className="iconSidebarCss" />),
    getItem('Quản lý Banner', '/Admin/Banner', <BsCardImage className="iconSidebarCss" />),
    getItem('Quản lý Voucher', '/Admin/Voucher', <BsTicketPerforated className="iconSidebarCss" />, [
        getItem('Danh sách Voucher', '/Admin/Voucher'),
        getItem('Các kiểu Voucher', '/Admin/kieu-voucher'),
    ]),
    getItem('Quản lý đặt hàng', '/Admin/Order', <GiConfirmed className="iconSidebarCss" />),
];
const onSearch = (value: string) => console.log(value);
export default function DefaultLayoutAdmin() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [isLoadToken, setIsLoadToken] = useState<boolean>(false);
    const [tokenLocal, setTokenLocal] = useState<string>('');

    // Get User Hiện tại
    const curentUser = useSelector((state: useRedux) => state.reduxAuth.user);

    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const content = (
        <div>
            <Button
                type="text"
                style={{
                    width: '100%',
                }}
                onClick={() => {
                    dispatch(logoutActions(setIsLoadToken));
                }}
            >
                Đăng xuất
            </Button>
        </div>
    );
    const onClick: MenuProps['onClick'] = (e) => {
        console.log(e.key);
        navigate(e.key);
    };
    useEffect(() => {
        const token = localStorage.getItem('token');
        token ? setTokenLocal(token) : setTokenLocal('');
    }, [isLoadToken]);
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
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        navigate('/Admin');
                    }}
                >
                    <Image src={images.logo} width={100} preview={false} />
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
                    <div className="userAdmin">
                        {tokenLocal && curentUser ? (
                            <Popover content={content} title="Mục">
                                <Avatar
                                    size={{ xs: 24, sm: 32, md: 40, lg: 40, xl: 40, xxl: 40 }}
                                    icon={<AntDesignOutlined />}
                                    src={`${process.env.REACT_APP_IMAGE_AVATAR_URL}${curentUser?.image}`}
                                />
                            </Popover>
                        ) : (
                            <div className="headerClientAbove__LoginOut">
                                <Link to={'/Login-Admin'}>
                                    <Button type="text" className="btnLoginClick">
                                        Đăng Nhập
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </Header>
                <Content style={{ height: '100vh' }}>
                    <Outlet />
                </Content>
            </Layout>
            {curentUser && curentUser?.roleId == 'ADMIN' ? <ChatAdmin /> : ''}
        </Layout>
    );
}
