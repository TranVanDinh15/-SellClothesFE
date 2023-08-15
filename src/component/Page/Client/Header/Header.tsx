import { Header } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import './HeaderClient.css';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Badge, Button, Drawer, Input, Menu, Popover, Select, message } from 'antd';
import { PhoneOutlined, SearchOutlined, ShoppingCartOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons';
import {
    getListCategoryFun,
    getListCategorySub,
    handleGetSubjectId,
    onCloseResultSearch,
    showResultSearch,
} from './Header.Method';
import { chidrenCategory, dataCategoy, headerCategory, resultSearch, resultSearchBlog } from './HeaderInterface';
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
import { LogOut, searchBlog, searchProduct } from '../../../utils/Api/Api';
import { json } from 'stream/consumers';
import { debounce } from '../Common/debound/debound';
import { convertVND } from '../../Admin/common/method/method';
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
    const { setItemCategory, setUrlCustomer, isLoadCart, setIsLoadSearch }: any = GetContext();
    const [tokenLocal, setTokenLocal] = useState<string>('');
    const userLogin = useSelector((state: reduxIterface) => state.reduxAuth.user);
    const [headerCategory, setHeaderCategory] = useState<headerCategory[]>([]);
    const [dataCategory, setDatacategory] = useState<dataCategoy[]>([]);
    const [saveCodeCategory, setSaveCodeCategory] = useState<string>('');
    const [openFilter, setOpenFilter] = useState<boolean>(false);
    // Đóng mở result search
    const [openSearch, setOpenSearch] = useState(false);
    // Quản lý hiển thị số lượng sản phẩm trong giỏ hàng
    const [amountCart, setAmountCart] = useState<number>(0);
    const [isLoadToken, setIsLoadToken] = useState<boolean>(false);
    const [categoryBlog, setCategoryBlog] = useState<{ value: string; code: string; id: number }[] | undefined>();
    // Quản lý tìm kiếm
    const [searchTerm, setSearchTerm] = useState<string>('');
    // Quản lý dữ liệu tìm kiếm trả về
    const [resultSearch, setResultSearch] = useState<resultSearch[]>([]);
    const [resultBlog, setResultBlog] = useState<resultSearchBlog[]>([]);
    // Quản lý search theo Tên hoặc blog
    const [blogOrProduct, setBlogOrProduct] = useState<string>('product');
    const [pageSize, setPageSize] = useState<number>(5);
    const [currentPage, setCurrentPage] = useState<number>(1);
    console.log(resultBlog);
    const { Option } = Select;
    const selectBefore = (
        <Select
            defaultValue="product"
            style={{ width: 120, border: 'none !important' }}
            className="SelectBeforeSearch"
            onChange={(value) => {
                setBlogOrProduct(value);
            }}
        >
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
                        {categoryBlog.map((item: { value: string; code: string; id: number }, index: number) => {
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
                            onClick={async () => {
                                item.id === 0 && navigate('/Profile');
                                if (item.id === 3) {
                                    await LogOut();
                                    message.success('Đã đăng xuất tài khoản');
                                    localStorage.removeItem('token');
                                    setIsLoadToken((isLoadToken) => !isLoadToken);
                                }
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
    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        const result = debouncedSearch(e.target.value);
        console.log(result);
    };
    const debouncedSearch = debounce(async (query: string) => {
        // Các logic tìm kiếm của bạn tại đây
        console.log('Searching for:', query);
        if (blogOrProduct == 'product') {
            const response = await searchProduct(
                blogOrProduct,
                `name=${query ? query : '{}'}&page=${currentPage}&size=${pageSize}`,
            );
            if (response && response.status == 200) {
                setResultSearch(response.data?.data);
                setResultBlog([]);
            }
        } else if (blogOrProduct == 'blog') {
            const response = await searchBlog(
                blogOrProduct,
                `name=${query ? query : '{}'}&page=${currentPage}&size=${pageSize}`,
            );
            if (response && response.status == 200) {
                setResultSearch([]);
                setResultBlog(response.data?.data);
            }
        }
    }, 500);
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
    useEffect(() => {
        const token = localStorage.getItem('token');
        token ? setTokenLocal(token) : setTokenLocal('');
    }, [isLoadToken]);
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
                                    className="searchResultInputContainer"
                                    addonBefore={selectBefore}
                                    value={searchTerm}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '500px',
                                        height: '42px',
                                    }}
                                />
                            </div>
                            <div className="searchResultBox">
                                {resultSearch && resultSearch.length > 0
                                    ? resultSearch.map((item, index) => {
                                          return (
                                              <div className="searchResultInput__Item" key={index}>
                                                  <div className="searchResultInput__Item__image">
                                                      <Image
                                                          src={`${process.env.REACT_APP_IMAGE_PRODUCT}${item?.detail[0]?.images[0]}`}
                                                          width={'50px'}
                                                          preview={false}
                                                      />
                                                  </div>
                                                  <div className="searchResultInput__Item__Infor">
                                                      <div className="searchResultInput__Item__Infor__name">
                                                          <span>{item?.name}</span>
                                                      </div>
                                                      <div className="searchResultInput__Item__Infor__name__Price">
                                                          <span>
                                                              {item?.detail[0].discountPrice
                                                                  ? convertVND(item?.detail[0].discountPrice)
                                                                  : convertVND(item?.detail[0].originalPrice)}
                                                          </span>
                                                      </div>
                                                  </div>
                                              </div>
                                          );
                                      })
                                    : ''}
                                {resultBlog && resultBlog.length > 0
                                    ? resultBlog.map((item, index) => {
                                          return (
                                              <div className="searchResultInput__Item" key={index}>
                                                  <div className="searchResultInput__Item__image">
                                                      <Image
                                                          src={`${process.env.REACT_APP_IMAGE_BLOGS_URL}${
                                                              item?.images && item.images[0]
                                                          }`}
                                                          width={'50px'}
                                                          preview={false}
                                                      />
                                                  </div>
                                                  <div className="searchResultInput__Item__Infor">
                                                      <div className="searchResultInput__Item__Infor__name">
                                                          <span>{item?.title}</span>
                                                      </div>
                                                      <div className="searchResultInput__Item__Infor__name__Price">
                                                          <span>{item?.shortDescription}</span>
                                                      </div>
                                                  </div>
                                              </div>
                                          );
                                      })
                                    : ''}
                            </div>
                            {resultSearch.length > 0 ? (
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                    onClick={() => {
                                        onCloseResultSearch(setOpenSearch);
                                        setIsLoadSearch((isLoadSearch: boolean) => !isLoadSearch);
                                    }}
                                >
                                    <Link to={`/tim-kiem?name=${searchTerm}`}>Xem tất cả</Link>
                                </div>
                            ) : (
                                ''
                            )}
                        </Drawer>
                    </div>
                    <div className="headerClientAbove__Cart">
                        <Popover
                            content={<Cart cartData={cartData} />}
                            arrow={true}
                            title={'Sản phẩm mới thêm'}
                            placement="bottomLeft"
                            className="headerClientAbove__Cart__Popover"
                        >
                            <Badge count={amountCart}>
                                <Button
                                    type="text"
                                    icon={
                                        <ShoppingOutlined
                                            style={{
                                                fontSize: '25px',
                                            }}
                                        />
                                    }
                                ></Button>
                            </Badge>
                        </Popover>
                    </div>
                    {tokenLocal ? (
                        <Button className="boxUserAlreadyLogin" type="ghost">
                            <Popover content={subNavItemUser(manageUser)} placement="bottomLeft" arrow={false}>
                                <div className="boxUserAlreadyLogin__AvatarAndName">
                                    <Avatar
                                        size="default"
                                        icon={<UserOutlined />}
                                        src={`${process.env.REACT_APP_IMAGE_AVATAR_URL}${curentUser?.image}`}
                                    />
                                    <span>{curentUser?.fullName}</span>
                                </div>
                            </Popover>
                        </Button>
                    ) : (
                        <div className="headerClientAbove__LoginOut">
                            <Button type="text">Đăng Ký</Button>
                            <span>\</span>
                            <Link to={'/signIn'}>
                                <Button type="text" className="btnLoginClick">
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
