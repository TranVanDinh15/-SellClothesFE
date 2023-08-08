import { Header } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import './HeaderClient.css';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Badge, Button, Drawer, Input, Menu, Popover, Select } from 'antd';
import { PhoneOutlined, SearchOutlined, ShoppingCartOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons';
import {
    getListCategoryFun,
    getListCategorySub,
    handleGetSubjectId,
    onCloseResultSearch,
    showResultSearch,
} from './Header.Method';
import { chidrenCategory, dataCategoy, headerCategory } from './HeaderInterface';
import { useSelector } from 'react-redux';
import { reduxIterface } from '../LoginClient/Login.Interface';
import { Image } from 'antd';
import { GetContext } from '../../Admin/common/Context/Context';
import { useDispatch } from 'react-redux';
import { UrlActions } from '../../../../Redux/Actions/Actions.url';
import images from '../../../../asset';
import Cart, { useRedux } from '../Cart/Cart';
import { handleGetCart } from '../Cart/CartMethod';
import { dataCart } from '../Cart/CartInterFace';
import { LogOut } from '../../../utils/Api/Api';
const headerStyle: React.CSSProperties = {
    color: '#fff',
    minHeight: '90px',
    display: 'flex',
    flexWrap: 'wrap',
    boxShadow: '0 6px 12px 0 rgba(0,0,0,0.05)',
    backgroundColor: '#fff',
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
    zIndex: '1000',
};
const itemsMenu = [
    {
        id: 0,
        name: 'VỀ CHÚNG TÔI',
        children: [
            {
                id: 1,
                name: 'Áo khoác',
            },
            {
                id: 2,
                name: 'Bảo vệ khách hàng',
            },
            {
                id: 3,
                name: 'Câu chuyện và nhân vật',
            },
        ],
    },
    {
        id: 1,
        name: 'BLOG',
        children: [
            {
                id: 1,
                name: 'Làm đẹp',
            },
            {
                id: 2,
                name: 'Du lịch',
            },
            {
                id: 3,
                name: 'Mặt hàng',
            },
        ],
    },
];
const manageUser = [
    {
        id: 0,
        name: 'Profile',
    },
    {
        id: 1,
        name: 'Cập nhật người dùng',
    },
    {
        id: 2,
        name: 'Lịch sử mua hàng',
    },
    {
        id: 3,
        name: 'Đăng Xuất',
    },
];
export default function HeaderClient() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Get User Hiện tại
    const curentUser = useSelector((state: useRedux) => state.reduxAuth.user);
    // Chứa dữ liệu Cart
    const [cartData, setCartData] = useState<dataCart>();

    const { itemCategory, setItemCategory, setSortId, urlCustomer, setUrlCustomer, isLoadCart }: any = GetContext();
    const tokenLocal = localStorage.getItem('token');
    const userLogin = useSelector((state: reduxIterface) => state.reduxAuth.user);
    const [headerCategory, setHeaderCategory] = useState<headerCategory[]>([]);
    const [dataCategory, setDatacategory] = useState<dataCategoy[]>([]);
    const [saveCodeCategory, setSaveCodeCategory] = useState<string>('');
    const [openFilter, setOpenFilter] = useState<boolean>(false);
    // Đóng mở result search
    const [openSearch, setOpenSearch] = useState(false);
    // Quản lý hiển thị số lượng sản phẩm trong giỏ hàng
    const [amountCart, setAmountCart] = useState<number>(0);
    const [categoryBlog, setCategoryBlog] = useState<{ value: string; code: string }[] | undefined>();
    console.log(categoryBlog);
    const { Option } = Select;
    const selectBefore = (
        <Select defaultValue="Sản Phẩm" style={{ width: 120 }}>
            <Option value="product">Sản Phẩm</Option>
            <Option value="blog">Bài Viết</Option>
        </Select>
    );
    const selectAfter = (
        <Button
            icon={<SearchOutlined />}
            style={{
                border: 'none',
            }}
        ></Button>
    );
    const subNavItemHeader = (itemsData: chidrenCategory[]) => {
        return (
            <ul>
                {itemsData.map((item: chidrenCategory, index: number) => {
                    return (
                        <li className="subnavCategory" key={index}>
                            <Link to="/">
                                <span>{item.name}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        );
    };
    const subNavItemBlog = () => {
        return (
            <>
                {categoryBlog ? (
                    <ul>
                        {categoryBlog.map((item: { value: string; code: string }, index: number) => {
                            return (
                                <li className="subnavCategory" key={index}>
                                    <Link to={`/blog/${item.code}`}>
                                        <span>{item.value}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    ''
                )}
            </>
        );
    };
    const subNavItemUser = (itemsData: chidrenCategory[]) => {
        return (
            <ul>
                {itemsData.map((item: chidrenCategory, index: number) => {
                    return (
                        <li
                            className="subnavCategory"
                            key={index}
                            onClick={() => {
                                item.id == 3 && LogOut();
                            }}
                        >
                            {/* <Link to="/"> */}
                            <span>{item.name}</span>
                            {/* </Link> */}
                        </li>
                    );
                })}
            </ul>
        );
    };
    useEffect(() => {
        getListCategoryFun(setHeaderCategory);
        handleGetSubjectId(setCategoryBlog);
    }, []);
    useEffect(() => {
        if (saveCodeCategory) {
            getListCategorySub(setDatacategory, saveCodeCategory);
        }
    }, [saveCodeCategory]);
    useEffect(() => {
        if (curentUser) {
            handleGetCart(setCartData, dispatch);
        }
    }, [curentUser, isLoadCart]);
    useEffect(() => {
        if (cartData?.cart.detail && cartData.cart.detail.length > 0) {
            setAmountCart(cartData?.cart?.detail.length);
        } else {
            setAmountCart(0);
        }
    }, [cartData]);
    return (
        <Header style={headerStyle}>
            <header className="headerClientAbove">
                <div className="headerClientAbove__Logo">
                    <Link to={'/'}>
                        <img src={images.logo}></img>
                    </Link>
                </div>

                <ul className="headerClientbelow__listMenu">
                    {headerCategory.length > 0 &&
                        headerCategory.map((item: any, index: number) => {
                            return (
                                <li key={index}>
                                    <div
                                        className={dataCategory.length > 0 ? 'bigChildrenTab' : ''}
                                        onMouseMove={(event) => {
                                            setSaveCodeCategory(item.code);
                                        }}
                                    >
                                        <Button type="text" className="ListHeaderCat" onClick={() => {}}>
                                            {item.value}
                                        </Button>

                                        <div className="subNavCategory">
                                            {dataCategory && dataCategory.length > 0 ? (
                                                <div className="subNavCategory__container">
                                                    {dataCategory.map((item: dataCategoy, index: number) => {
                                                        return (
                                                            <div className="subNavCategory__item" key={index}>
                                                                <div
                                                                    className="subNavCategory__heading"
                                                                    onClick={() => {
                                                                        setItemCategory(item);
                                                                        setUrlCustomer(
                                                                            `/${item.code}?categoryId=${item.code}&page=1&size=20`,
                                                                        );
                                                                        navigate(
                                                                            `/${item.code}?categoryId=${item.code}&page=1&size=20`,
                                                                        );
                                                                    }}
                                                                >
                                                                    <span>{item?.value}</span>
                                                                </div>
                                                                <ul className="subNavCategory__listItems">
                                                                    {item.children.length > 0
                                                                        ? item?.children.map(
                                                                              (item: any, index: number) => {
                                                                                  return (
                                                                                      <li
                                                                                          key={index}
                                                                                          onClick={() => {
                                                                                              setItemCategory(item);
                                                                                              setUrlCustomer(
                                                                                                  `/${item.code}?categoryId=${item.code}&page=1&size=20`,
                                                                                              );
                                                                                          }}
                                                                                      >
                                                                                          <Link
                                                                                              to={`/${item.code}?categoryId=${item.code}&page=1&size=20`}
                                                                                          >
                                                                                              <span>{item?.value}</span>
                                                                                          </Link>
                                                                                      </li>
                                                                                  );
                                                                              },
                                                                          )
                                                                        : ''}
                                                                </ul>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    {itemsMenu.map((item: any, index: number) => {
                        return (
                            <li key={index}>
                                <Popover
                                    content={item?.id == 1 ? subNavItemBlog() : subNavItemHeader(item.children)}
                                    placement="bottomLeft"
                                    arrow={false}
                                >
                                    <Button type="text" className="ListHeaderCat ">
                                        {item.name}
                                    </Button>
                                </Popover>
                            </li>
                        );
                    })}
                </ul>
                <div className="headerClientAbove__LoginOutCart">
                    {/* <div>
                        <Button
                            type="text"
                            style={{
                                fontSize: '15px',
                                padding: '4px ',
                                // color: '#11006f',
                            }}
                            icon={
                                <PhoneOutlined
                                    style={{
                                        border: 'none',
                                        fontSize: '20px',
                                        // color: '#11006f',
                                    }}
                                />
                            }
                        >
                            0457965152
                            <Button
                                type="ghost"
                                style={{
                                    fontSize: '15px',
                                    padding: '4px ',
                                    backgroundColor: '#00BFFF',
                                    marginLeft: '10px',
                                    borderRadius: '10px',
                                    color: '#fff',
                                }}
                            >
                                Free
                            </Button>
                        </Button>
                    </div> */}
                    <div className="headerClientAbove__search">
                        <Button
                            type="text"
                            onClick={() => {
                                showResultSearch(setOpenSearch);
                            }}
                            icon={
                                <SearchOutlined
                                    style={{
                                        fontSize: '24px',
                                        // fontWeight: '600',
                                    }}
                                />
                            }
                        ></Button>
                        <Drawer
                            className="ResultSearch"
                            title="Công cụ tìm kiếm"
                            placement={'top'}
                            width={500}
                            height={400}
                            onClose={() => {
                                onCloseResultSearch(setOpenSearch);
                            }}
                            open={openSearch}
                        >
                            <div className="searchResultInput">
                                <Input
                                    placeholder="Tìm kiếm"
                                    addonAfter={selectAfter}
                                    // defaultValue="mysite"
                                    className="searchResultInputContainer"
                                    addonBefore={selectBefore}
                                    style={{
                                        width: '500px',
                                        height: '42px',
                                    }}
                                />
                            </div>
                            <div className="searchResultInput__Item">
                                <div className="searchResultInput__Item__image">
                                    <Image
                                        src="data:image/jpeg;base64,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"
                                        width={'50px'}
                                    />
                                </div>
                                <div className="searchResultInput__Item__Infor">
                                    <div className="searchResultInput__Item__Infor__name">
                                        <span>đbadbhadad</span>
                                    </div>
                                    <div className="searchResultInput__Item__Infor__name">
                                        <span>đbadbhadad</span>
                                    </div>
                                </div>
                            </div>
                            <div className="searchResultInput__Item">
                                <div className="searchResultInput__Item__image">
                                    <Image
                                        src="data:image/jpeg;base64,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"
                                        width={'50px'}
                                    />
                                </div>
                                <div className="searchResultInput__Item__Infor">
                                    <div className="searchResultInput__Item__Infor__name">
                                        <span>đbadbhadad</span>
                                    </div>
                                    <div className="searchResultInput__Item__Infor__name">
                                        <span>đbadbhadad</span>
                                    </div>
                                </div>
                            </div>
                            <div className="searchResultInput__Item">
                                <div className="searchResultInput__Item__image">
                                    <Image
                                        src="data:image/jpeg;base64,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"
                                        width={'50px'}
                                    />
                                </div>
                                <div className="searchResultInput__Item__Infor">
                                    <div className="searchResultInput__Item__Infor__name">
                                        <span>đbadbhadad</span>
                                    </div>
                                    <div className="searchResultInput__Item__Infor__name">
                                        <span>đbadbhadad</span>
                                    </div>
                                </div>
                            </div>
                            <div className="searchResultInput__Item">
                                <div className="searchResultInput__Item__image">
                                    <Image
                                        src="data:image/jpeg;base64,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"
                                        width={'50px'}
                                    />
                                </div>
                                <div className="searchResultInput__Item__Infor">
                                    <div className="searchResultInput__Item__Infor__name">
                                        <span>đbadbhadad</span>
                                    </div>
                                    <div className="searchResultInput__Item__Infor__name">
                                        <span>đbadbhadad</span>
                                    </div>
                                </div>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Link to={'/'}>Xem tất cả</Link>
                            </div>
                        </Drawer>
                    </div>
                    <div className="headerClientAbove__Cart">
                        <Popover
                            content={<Cart cartData={cartData} />}
                            arrow={true}
                            style={{
                                borderRadius: 'initial',
                                marginTop: '20px ',
                            }}
                            title={'Sản phẩm mới thêm'}
                            placement="bottomLeft"
                        >
                            <Badge count={amountCart}>
                                <Button
                                    type="text"
                                    icon={
                                        <ShoppingOutlined
                                            style={{
                                                fontSize: '25px',
                                                // color: '#11006f',
                                            }}
                                        />
                                    }
                                ></Button>
                            </Badge>
                        </Popover>
                    </div>
                    {tokenLocal ? (
                        <div
                            style={{
                                verticalAlign: 'middle',
                            }}
                        >
                            <Popover content={subNavItemUser(manageUser)} placement="bottomLeft" arrow={false}>
                                <Avatar size="default" icon={<UserOutlined />} />
                            </Popover>
                        </div>
                    ) : (
                        <div
                            className="headerClientAbove__LoginOut"
                            style={{
                                verticalAlign: 'middle',
                            }}
                        >
                            {/* <Button
                                type="text"
                                icon={
                                    <UserOutlined
                                        style={{
                                            border: 'none',
                                            fontSize: '16px',
                                            // color: '#11006f',
                                        }}
                                    />
                                }
                            ></Button> */}
                            <Button
                                type="text"
                                style={{
                                    fontSize: '15px',
                                    padding: '4px ',
                                    // color: '#11006f',
                                }}
                            >
                                Đăng Ký
                            </Button>
                            <span
                                style={{
                                    // color: '#11006f',
                                    fontSize: '15px',
                                }}
                            >
                                \
                            </span>
                            <Link to={'/signIn'}>
                                <Button
                                    type="text"
                                    style={{
                                        fontSize: '15px',
                                        padding: '4px',
                                        // color: '#11006f',
                                    }}
                                >
                                    Đăng Nhập
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </header>
        </Header>
    );
}
