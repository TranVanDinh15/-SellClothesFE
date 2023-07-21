import React, { useState, useEffect } from 'react';
import './ProductCat.scss';
import {
    Breadcrumb,
    Button,
    Checkbox,
    Col,
    Layout,
    Menu,
    MenuProps,
    Row,
    Select,
    Skeleton,
    Space,
    Tag,
    theme,
} from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import { CloseOutlined, FilterOutlined, LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { handleChangeTitleSelect, handleGetColorProduct } from './ProductCatMethod';
import TabProductCustomer from '../../Common/TabProduct/TabProduct';
import { useNavigate, useParams } from 'react-router-dom';
import { GetContext } from '../../../Admin/common/Context/Context';
import { getProductByCat } from '../../../../utils/Api/Api';
import { dataCategoryProduct } from './ProductCatInterface';
import SekeletonCardCustomer from '../../Common/SekeletonCard/SekeletonCardCustomer';
import IsLoading from '../../../Admin/common/IsLoading/IsLoading';
import { ScaleLoader } from 'react-spinners';
import { image } from '@uiw/react-md-editor';
import { useSelector } from 'react-redux';
import { filter } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import {
    ClientChooseAction,
    ColorUpdateAction,
    PriceUpdateAction,
    SortUpdateAction,
} from '../../../../../Redux/Actions/Actions.url';
import TagYourChoose from './TagYourChoose';
export interface reduxIterface {
    UrlReducer: {
        urlCustomer: string;
        createAt: string;
        price: {
            fromPrice: number;
            toPrice: number;
        };
        sort: string;
        color: string[];
        ClientChoose: [];
    };
}

export default function ProductCat() {
    const dispatch = useDispatch();
    // Lấy Params từ Url để call api
    const paramUrl = useParams();
    const navigate = useNavigate();
    const sortCustom = useSelector((state: reduxIterface) => state.UrlReducer.sort);
    const PriceCustom = useSelector((state: reduxIterface) => state.UrlReducer.price);
    const createAtCustom = useSelector((state: reduxIterface) => state.UrlReducer.createAt);
    const ColorCustom = useSelector((state: reduxIterface) => state.UrlReducer.color);
    const clientChooseCustom = useSelector((state: reduxIterface) => state.UrlReducer.ClientChoose);
    console.log(clientChooseCustom);
    console.log(ColorCustom);
    const {
        itemCategory,
        setItemCategory,
        sortId,
        setSortId,
        urlCustomer,
        setUrlCustomer,
        isBorderColor,
        setIsBorderColor,
    }: any = GetContext();
    const [size, setSize] = useState<number | string>('1');
    const [page, setPage] = useState<number | string>('10');
    const [listData, setListData] = useState<dataCategoryProduct[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [valueSelect, setvalueSelect] = useState<string>('default');
    const [checkedItems, setCheckedItems] = useState([]);
    const [minPriceFilter, setMinPricefilter] = useState<any>();
    const [maxPriceFilter, setMaxPricefilter] = useState<any>();
    const [isChangeUrl, setIsChangeUrl] = useState<boolean>(false);
    const [listColor, setListColor] = useState<any>();
    const [valuesCheckBox, setvaluesCheckBox] = useState([]);
    console.log(isBorderColor);
    const listCheckBox = [
        {
            id: 0,
            name: `Nhỏ hơn 100.000đ`,
            fromPrice: 0,
            toPrice: 100000,
            value: `Nhỏ hơn 100.000đ`,
        },
        {
            id: 1,
            name: `Từ 100.000đ - 200.000đ`,
            fromPrice: 100000,
            toPrice: 200000,
            value: `Từ 100.000đ - 200.000đ`,
        },
        {
            id: 2,
            name: `Từ 200.000đ - 350.000đ`,
            fromPrice: 200000,
            toPrice: 350000,
            value: `Từ 200.000đ - 350.000đ`,
        },
        {
            id: 3,
            name: `Từ 350.000đ - 500.000đ`,
            fromPrice: 350000,
            toPrice: 500000,
            value: `Từ 350.000đ - 500.000đ`,
        },
        {
            id: 4,
            name: `Từ 500.000đ - 700.000đ`,
            fromPrice: 500000,
            toPrice: 700000,
            value: `Từ 500.000đ - 700.000đ`,
        },
        {
            id: 5,
            name: `Lớn hơn 700.000đ`,
            fromPrice: 700000,
            toPrice: 100000000,
            value: `Lớn hơn 700.000đ`,
        },
    ];
    const handleCheckboxChange = (value: any) => {
        console.log(value);
        setvaluesCheckBox(value);
        // Lưu trạng thái của checkbox
        let newArray: any = [];
        if (value.length > 0) {
            for (let i = 0; i < value.length; i++) {
                const list = listCheckBox.forEach((item) => {
                    if (item.id == value[i]) {
                        // dispatch action user adready choose
                        dispatch(
                            ClientChooseAction(
                                {
                                    id: 'price',
                                    value: item.name,
                                    valueCheckBox: item.id,
                                },
                                clientChooseCustom,
                            ),
                        );
                        newArray.push(item);
                    }
                });
            }
        } else {
            setMinPricefilter('');
            setMaxPricefilter('');
        }
        if (newArray.length > 0) {
            const minPrice = newArray.map((item: any) => {
                return item.fromPrice;
            });
            const maxPrice = newArray.map((item: any) => {
                return item.toPrice;
            });
            if (minPrice) {
                setMinPricefilter(Math.min(...minPrice));
            }
            if (maxPrice) {
                setMaxPricefilter(Math.max(...maxPrice));
            }
        }
        // setCheckedItems(newArray);
    };
    const handleCheckBoxState = () => {};
    // handle get list Product depend query
    const handleGetProduct = async (pram: any): Promise<void> => {
        setIsLoading(true);
        const query = `categoryId=${pram.slug}`;
        const response = await getProductByCat(query);
        if (response && response.status == 200) {
            const data = response.data.data;
            const resultData =
                data.length > 0
                    ? data.map((item: dataCategoryProduct, index: number) => {
                          return {
                              id: item.id,
                              brandId: item.brandId,
                              categoryId: item.categoryId,
                              name: item.name,
                              material: item.material,
                              madeBy: item.madeBy,
                              sold: item.sold,
                              view: item.view,
                              detail: [...item.detail],
                          };
                      })
                    : [];
            setListData(resultData);
            setIsLoading(false);
        }
    };

    const items = [
        {
            id: 0,
            name: 'Nam',
        },
        {
            id: 1,
            name: 'Nữ',
        },
        {
            id: 2,
            name: 'Trẻ em',
        },
    ];
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const itemSelect = [
        { value: 'default', label: 'Mặc định' },
        { value: 'ASC', label: 'Sắp xếp từ A-Z' },
        { value: 'DESC', label: 'Sắp xếp từ Z-A' },
        { value: 'createdAt', label: 'Mới nhất' },
    ];

    const preventDefault = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        console.log('Clicked! But prevent default.');
    };
    useEffect(() => {
        // Call Api get Product filter
        if (paramUrl) {
            handleGetProduct(paramUrl);
        }
    }, [paramUrl]);
    useEffect(() => {
        if (urlCustomer) {
            navigate(`${urlCustomer}${sortCustom ? `&sortid=${sortCustom}` : ''}${
                createAtCustom ? `&createdAt=ASC` : ''
            }${minPriceFilter || minPriceFilter === 0 ? `&fromPrice=${minPriceFilter}` : ''}${
                maxPriceFilter ? `&toPrice=${maxPriceFilter}` : ''
            }${
                ColorCustom.length > 0
                    ? ColorCustom.map((itemColor) => {
                          return `&colorCodes=${itemColor}`;
                      }).join('')
                    : ''
            }
            `);
        }
    }, [sortCustom, PriceCustom, createAtCustom, minPriceFilter, maxPriceFilter, ColorCustom]);
    // Xử lý tìm kiếm theo giá
    useEffect(() => {
        if (minPriceFilter || maxPriceFilter) {
            const priceDp = {
                fromPrice: minPriceFilter,
                toprice: maxPriceFilter,
            };
            dispatch(PriceUpdateAction(priceDp));
        }
    }, [minPriceFilter, maxPriceFilter, valuesCheckBox]);
    useEffect(() => {
        handleGetColorProduct(setListColor);
    }, []);
    return (
        <div className="ProductCatWrapper">
            {!itemCategory ? (
                <div className="ProductCatSpinner">
                    <ScaleLoader color="orangered" />
                </div>
            ) : (
                <div className="ProductCatTitle">
                    <div className="ProductCatTitle__Breadcrumb">
                        <Breadcrumb
                            items={[
                                {
                                    title: 'Trang chủ',
                                },
                                {
                                    title: itemCategory?.value,
                                },
                            ]}
                        />
                    </div>
                    <div className="ProductCatTitle__Heading">
                        <h1>Áo Polo Nam</h1>
                    </div>
                    <div className="ProductCatTitle__option">
                        {items.map((item: { id: number; name: string }, index: number) => {
                            return (
                                <Button
                                    type="ghost"
                                    key={index}
                                    // onClick={() => {
                                    //     navigate('/dadad?q=1');
                                    // }}
                                >
                                    {item.name}
                                </Button>
                            );
                        })}
                    </div>
                </div>
            )}
            <div className="ProductCatContent">
                <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
                    <Sider
                        style={{
                            background: colorBgContainer,
                            height: '100vh',
                        }}
                        width={250}
                    >
                        <div className="yourChoose">
                            <div className="filterPrice__Choose">
                                <Button type="text">Bạn chọn</Button>
                            </div>
                            <div>
                                <TagYourChoose
                                    clientChooseCustom={clientChooseCustom}
                                    setCheckValues={setvaluesCheckBox}
                                    handleCheckboxChange={handleCheckboxChange}
                                    setIsBoderColor={setIsBorderColor}
                                />
                            </div>
                        </div>
                        <div className="filterPrice">
                            <div className="filterPrice__title">
                                <Button type="text">Theo giá ( VND )</Button>
                            </div>
                            <div className="filterChatBox__Container">
                                <Checkbox.Group
                                    style={{ width: '100%' }}
                                    onChange={(value) => {
                                        handleCheckboxChange(value);
                                    }}
                                    className="filterChatBox__Container__chatGroup"
                                    value={valuesCheckBox}
                                >
                                    {listCheckBox.map((item, index: number) => {
                                        return (
                                            <Checkbox
                                                value={item.id}
                                                key={index}
                                                onChange={(e) => {
                                                    console.log(e);
                                                    // setChecked(false);
                                                }}
                                                defaultChecked={true}
                                            >
                                                {item.name}
                                            </Checkbox>
                                        );
                                    })}
                                </Checkbox.Group>
                            </div>
                        </div>
                        <div className="filterColor">
                            <div className="filterColor__title">
                                <Button type="text">Màu sắc</Button>
                            </div>
                            <Space
                                wrap={true}
                                style={{
                                    marginLeft: '15px',
                                }}
                            >
                                {listColor
                                    ? listColor.map((item: any, index: number) => {
                                          return (
                                              <div
                                                  className={`ColorItem `}
                                                  style={{
                                                      border:
                                                          isBorderColor.includes(item?.code) == true
                                                              ? '1px solid #111'
                                                              : `none`,
                                                  }}
                                                  key={index}
                                                  onClick={() => {
                                                      dispatch(ColorUpdateAction(item?.code, ColorCustom));
                                                      setIsBorderColor((state: any) => [...state, item?.code]);
                                                      dispatch(
                                                          ClientChooseAction(
                                                              {
                                                                  id: 'color',
                                                                  value: item?.value,
                                                                  valueCode: item?.code,
                                                              },
                                                              clientChooseCustom,
                                                          ),
                                                      );
                                                  }}
                                              >
                                                  <div
                                                      className="ColorItem__color"
                                                      style={{
                                                          backgroundColor: item.hexCode,
                                                          color: item.hexCode ? '#fff' : '#000',
                                                      }}
                                                  ></div>
                                                  <Button
                                                      //   style={{
                                                      //       backgroundColor: item.hexCode,
                                                      //       color: item.hexCode ? '#fff' : '#000',
                                                      //   }}
                                                      type="text"
                                                      key={index}
                                                  >
                                                      {item?.value}
                                                  </Button>
                                                  <div>
                                                      <CloseOutlined
                                                          style={{
                                                              height: '10px',
                                                              width: '10px',
                                                          }}
                                                      />
                                                  </div>
                                              </div>
                                          );
                                      })
                                    : ''}
                            </Space>
                        </div>
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <div className="ProductCatContent__title">
                            <div className="ProductCatContent__title__amount">
                                <span>{listData.length} sản phẩm</span>
                            </div>
                            <div className="ProductCatContent__title__arranging">
                                <div className="ProductCatContent__title__arranging__heading">
                                    <span>Sắp xếp theo</span>
                                </div>
                                <Select
                                    // value={valueSelect}
                                    defaultValue="default"
                                    style={{ width: 220 }}
                                    onChange={(value) => {
                                        handleChangeTitleSelect(
                                            value,
                                            urlCustomer,
                                            navigate,
                                            setvalueSelect,
                                            dispatch,
                                            setIsChangeUrl,
                                            sortCustom,
                                            createAtCustom,
                                        );
                                    }}
                                    options={[...itemSelect]}
                                />
                            </div>
                        </div>
                        {listData.length > 0 ? (
                            <Space className="ProductCatContent__ListCard" wrap={true} size={'small'} align="center">
                                <TabProductCustomer width={210} listData={listData} />
                            </Space>
                        ) : (
                            <Space
                                style={{
                                    marginTop: '40px',
                                }}
                            >
                                <SekeletonCardCustomer />
                                <SekeletonCardCustomer />
                                <SekeletonCardCustomer />
                                <SekeletonCardCustomer />
                            </Space>
                        )}
                    </Content>
                </Layout>
            </div>
        </div>
    );
}
