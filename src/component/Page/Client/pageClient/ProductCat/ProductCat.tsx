import React, { useState, useEffect } from 'react';
import './ProductCat.scss';
import {
    Breadcrumb,
    Button,
    Checkbox,
    Col,
    Empty,
    Layout,
    Menu,
    MenuProps,
    Pagination,
    PaginationProps,
    Row,
    Select,
    Skeleton,
    Space,
    Tag,
    theme,
} from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import { CloseOutlined, DownOutlined } from '@ant-design/icons';
import {
    handleChangeTitleSelect,
    handleDeleteChooseMaterial,
    handleDeleteColor,
    handleGetColorProduct,
    handleGetMaterial,
} from './ProductCatMethod';
import TabProductCustomer from '../../Common/TabProduct/TabProduct';
import { useNavigate, useParams } from 'react-router-dom';
import { GetContext } from '../../../Admin/common/Context/Context';
import { getProductByCat } from '../../../../utils/Api/Api';
import { dataCategoryProduct } from './ProductCatInterface';
import SekeletonCardCustomer from '../../Common/SekeletonCard/SekeletonCardCustomer';
import { ScaleLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
    ClientChooseAction,
    ClientChooseCheckBoxDeleteAction,
    ClientChooseDeleteAction,
    ColorUpdateAction,
    ColorUpdateWhenPathAction,
    MaterialUpdateAction,
    MaterialUpdateWhenPathAction,
    PriceUpdateAction,
    SortUpdateAction,
    createAtUpdateAction,
} from '../../../../../Redux/Actions/Actions.url';
import TagYourChoose from './TagYourChoose';
// Biến một mảng thành string
import queryString from 'query-string';
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
        material: string[];
    };
}

export default function ProductCat() {
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

    const listCheckBox = [
        {
            id: 0,
            name: `Nhỏ hơn 100.000đ`,
            fromPrice: 0,
            toPrice: 100000,
        },
        {
            id: 1,
            name: `Từ 100.000đ - 200.000đ`,
            fromPrice: 100000,
            toPrice: 200000,
        },
        {
            id: 2,
            name: `Từ 200.000đ - 350.000đ`,
            fromPrice: 200000,
            toPrice: 350000,
        },
        {
            id: 3,
            name: `Từ 350.000đ - 500.000đ`,
            fromPrice: 350000,
            toPrice: 500000,
        },
        {
            id: 4,
            name: `Từ 500.000đ - 700.000đ`,
            fromPrice: 500000,
            toPrice: 700000,
        },
        {
            id: 5,
            name: `Lớn hơn 700.000đ`,
            fromPrice: 700000,
            toPrice: 100000000,
        },
    ];
    // Lấy query từ URL
    const urlSearchParams = new URLSearchParams(window.location.search);
    const queryParams = Object.fromEntries(urlSearchParams.entries());
    const getQueryObject = (queryString: any) => {
        const urlParams = new URLSearchParams(queryString);
        const queryObject: any = {};

        urlParams.forEach((value, key) => {
            // Phân tách chuỗi giá trị để tạo mảng (sử dụng phương thức split)
            const splitValue = value.split(',');

            // Nếu splitValue chỉ có một phần tử, gán giá trị đơn, không phải mảng
            if (splitValue.length === 1) {
                queryObject[key] = splitValue[0];
            } else {
                queryObject[key] = splitValue;
            }
        });

        return queryObject;
    };
    // Custom query passed vào api
    const customQuery = (queryObject: any) => {
        let params = new URLSearchParams();
        for (let key in queryObject) {
            if (Array.isArray(queryObject[key])) {
                queryObject[key].forEach((value: any) => {
                    params.append(key, value);
                });
            } else {
                params.append(key, queryObject[key]);
            }
        }
        return params;
    };
    const dispatch = useDispatch();
    // Lấy Params từ Url để call api
    const paramUrl = useParams();
    const navigate = useNavigate();
    const sortCustom = useSelector((state: reduxIterface) => state.UrlReducer.sort);
    const PriceCustom = useSelector((state: reduxIterface) => state.UrlReducer.price);
    const createAtCustom = useSelector((state: reduxIterface) => state.UrlReducer.createAt);
    const ColorCustom = useSelector((state: reduxIterface) => state.UrlReducer.color);
    const clientChooseCustom = useSelector((state: reduxIterface) => state.UrlReducer.ClientChoose);
    const materialCustom = useSelector((state: reduxIterface) => state.UrlReducer.material);
    const { itemCategory, urlCustomer, setUrlCustomer }: any = GetContext();
    const [listData, setListData] = useState<dataCategoryProduct[]>([]);
    console.log(listData);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [valueSelect, setvalueSelect] = useState<string>('default');
    const [checkedItems, setCheckedItems] = useState([]);
    const [minPriceFilter, setMinPricefilter] = useState<any>();
    const [maxPriceFilter, setMaxPricefilter] = useState<any>();
    const [isChangeUrl, setIsChangeUrl] = useState<boolean>(false);
    const [listColor, setListColor] = useState<any>();
    const [valuesCheckBox, setvaluesCheckBox] = useState<string[]>([]);
    const [checkedValuesPrev, setCheckedValuesPrev] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(20);
    const [totalPage, setTotalPage] = useState<number>(100);
    const [materialFilter, setMaterialFilter] = useState<any>();
    // Quản lý filter màu sắc có boder hoặc không
    const [isBorderColor, setIsBorderColor] = useState<any>([]);
    // Quản lý filter chất liệu có border hoặc không
    const [isBorderMaterial, setIsBorderMaterial] = useState<any>([]);
    // Quản lý đóng mở filter checkBox
    const [isCheckBox, setIsCheckBox] = useState<boolean>(true);
    // Quản lý đóng mở filter color
    const [isColor, setIsColor] = useState<boolean>(true);
    // Quản lý đóng mở filter material
    const [isMaterial, setIsMaterial] = useState<boolean>(true);
    // Xử lý Redux khi client path Url
    const handleReduxClientpath = () => {
        const validData: any = {};
        Object.keys(queryParams).forEach((key) => {
            if (queryParams[key] !== '') {
                validData[key] = queryParams[key];
            }
        });
        // Custom lại  query khi một query có 2 thuộc tính trở lên
        const queryAfterCustom = getQueryObject(queryString.stringify(validData));
        //
        // dispatch sortId, createdAt lên redux khi người dùng path url có sortid
        if (queryAfterCustom?.sortid) {
            dispatch(SortUpdateAction(queryParams?.sortid));
        } else if (queryAfterCustom?.createdAt) {
            dispatch(createAtUpdateAction(queryParams?.createdAt));
        }
        if (queryAfterCustom?.colorCodes) {
            // dispatch((queryParams?.createdAt));
            if (Array.isArray(queryAfterCustom?.colorCodes)) {
                queryAfterCustom?.colorCodes?.forEach((item: string) => {
                    dispatch(
                        ClientChooseAction(
                            {
                                value: item,
                                id: 'color',
                                valueCode: item,
                            },
                            clientChooseCustom,
                        ),
                    );
                });
                dispatch(ColorUpdateWhenPathAction(queryAfterCustom?.colorCodes));
                setIsBorderColor(queryAfterCustom?.colorCodes);
            } else {
                dispatch(ColorUpdateWhenPathAction([queryAfterCustom?.colorCodes]));
                setIsBorderColor([queryAfterCustom?.colorCodes]);
                dispatch(
                    ClientChooseAction(
                        {
                            value: queryAfterCustom?.colorCodes,
                            id: 'color',
                            valueCode: queryAfterCustom?.colorCodes,
                        },
                        clientChooseCustom,
                    ),
                );
            }
        }
        if (queryAfterCustom?.material) {
            if (Array.isArray(queryAfterCustom?.material)) {
                queryAfterCustom?.material?.forEach((item: string) => {
                    dispatch(
                        ClientChooseAction(
                            {
                                value: item,
                                id: 'material',
                                materialCode: item,
                            },
                            clientChooseCustom,
                        ),
                    );
                });
                dispatch(MaterialUpdateWhenPathAction(queryAfterCustom?.material));
                setIsBorderMaterial(queryAfterCustom?.material);
            } else {
                dispatch(MaterialUpdateWhenPathAction([queryAfterCustom?.material]));
                setIsBorderMaterial([queryAfterCustom?.material]);
            }
        }
    };
    const handleCheckboxChange = (value: string[]) => {
        // Xác định checkbox vừa thay đổi bằng cách so sánh mảng trước và sau khi thay đổi
        // Biến này dùng để tìm ra phần tử không có trong  value mà checkedValuesPrev có để thực hiện xóa mục đã chọn
        const changedCheckbox = checkedValuesPrev.find((valueItem) => !value.includes(valueItem));
        if (changedCheckbox) {
            const objectItem = listCheckBox.filter((item) => {
                return item.id.toString() == changedCheckbox;
            });
            if (objectItem.length > 0) {
                const priceDataMap = objectItem.map((item) => {
                    return {
                        id: 'price',
                        value: item.name,
                        valueCheckBox: item.id,
                    };
                });
                dispatch(ClientChooseCheckBoxDeleteAction(priceDataMap[0], clientChooseCustom));
            }
        }
        //
        //
        setvaluesCheckBox(value);
        setCheckedValuesPrev(value);
        // Lưu trạng thái của checkbox
        let newArray: any = [];
        if (value.length > 0) {
            for (let i = 0; i < value.length; i++) {
                const list = listCheckBox.forEach((item) => {
                    if (item.id.toString() == value[i]) {
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
    // handle get list Product depend query
    const handleGetProduct = async (pram: any): Promise<void> => {
        if (queryParams) {
            setIsLoading(true);
            setUrlCustomer(`/${queryParams.categoryId}?categoryId=${queryParams.categoryId}`);
            // Tạo một danh sách các thuộc tính có giá trị khác rỗng
            const validData: any = {};
            Object.keys(queryParams).forEach((key) => {
                if (queryParams[key] !== '') {
                    validData[key] = queryParams[key];
                }
            });
            // Custom lại  query khi một query có 2 thuộc tính trở lên
            const queryAfterCustom = getQueryObject(queryString.stringify(validData));
            // custom query để passed vào api
            const queryCustom = customQuery(queryAfterCustom);
            //
            const response = await getProductByCat(`${queryCustom.toString()}`);
            console.log(response);
            if (response && response.status == 200) {
                const data = response?.data?.data;
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
                                  rating: item?.rating,
                                  detail: [...item.detail],
                              };
                          })
                        : [];
                setListData(resultData);
                setIsLoading(false);
                setCurrentPage(response?.data?.meta?.current as number);
                setPageSize(response?.data?.meta?.size as number);
                setTotalPage(response?.data?.meta?.totalItems as number);
            }
        }
    };
    // Xử lý thay đổi page
    const onChangePage: PaginationProps['onChange'] = (pageNumber, pageSize) => {
        setCurrentPage(pageNumber);
        setPageSize(pageSize);
    };
    // const preventDefault = (e: React.MouseEvent<HTMLElement>) => {
    //     e.preventDefault();
    // };
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
                    ? `&colorCodes=${ColorCustom.map((itemColor: any) => {
                          return itemColor;
                      }).join(',')}`
                    : ''
            }${
                materialCustom.length > 0
                    ? `&material=${materialCustom
                          .map((itemMaterial) => {
                              return itemMaterial;
                          })
                          .join(',')}`
                    : ''
            }${currentPage && pageSize ? `&page=${currentPage}&size=${pageSize}` : ''}
            `);
        }
    }, [
        sortCustom,
        PriceCustom,
        createAtCustom,
        minPriceFilter,
        maxPriceFilter,
        ColorCustom,
        materialCustom,
        currentPage,
        pageSize,
    ]);
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
        handleGetMaterial(setMaterialFilter);
    }, []);
    useEffect(() => {
        handleReduxClientpath();
    }, []);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="ProductCatWrapper">
            <div className="containerProductCat">
                <div className="page-header-inner">
                    <h1 className="page-title">Shop</h1>
                    <nav aria-label="breadcrumbs" className="site-breadcrumbs">
                        <p>
                            <a href="https://moren.la-studioweb.com">Home</a>
                            <span className="separator"> &gt; </span>
                            <span className="last">Shop</span>
                        </p>
                    </nav>{' '}
                </div>
            </div>
            <div className="ProductCatContent">
                <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
                    <Sider
                        style={{
                            background: colorBgContainer,
                            height: 'auto',
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
                                    setIsBorderMaterial={setIsBorderMaterial}
                                />
                            </div>
                        </div>
                        <div className="filterPrice">
                            <div className="filterPrice__title">
                                <Button type="text">Theo giá ( VND )</Button>
                                <Button
                                    type="text"
                                    icon={<DownOutlined className="IconDownFilter" />}
                                    onClick={() => {
                                        if (isCheckBox) {
                                            setIsCheckBox(false);
                                        } else {
                                            setIsCheckBox(true);
                                        }
                                    }}
                                ></Button>
                            </div>
                            {isCheckBox ? (
                                <div className="filterChatBox__Container">
                                    <Checkbox.Group
                                        style={{ width: '100%' }}
                                        onChange={(value: any) => {
                                            handleCheckboxChange(value);
                                        }}
                                        className="filterChatBox__Container__chatGroup"
                                        value={valuesCheckBox}
                                    >
                                        {listCheckBox.map((item, index: number) => {
                                            return (
                                                <Checkbox value={item.id} key={index} defaultChecked={true}>
                                                    {item.name}
                                                </Checkbox>
                                            );
                                        })}
                                    </Checkbox.Group>
                                </div>
                            ) : (
                                ''
                            )}
                        </div>
                        <div className="filterColor">
                            <div className="filterColor__title">
                                <Button type="text">Màu sắc</Button>
                                <Button
                                    type="text"
                                    icon={<DownOutlined className="IconDownFilter" />}
                                    onClick={() => {
                                        if (isColor) {
                                            setIsColor(false);
                                        } else {
                                            setIsColor(true);
                                        }
                                    }}
                                ></Button>
                            </div>
                            {isColor ? (
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
                                                  >
                                                      <div
                                                          className="ColorItem__color"
                                                          style={{
                                                              backgroundColor: item.hexCode,
                                                              color: item.hexCode ? '#fff' : '#000',
                                                          }}
                                                      ></div>
                                                      <Button
                                                          type="text"
                                                          key={index}
                                                          onClick={() => {
                                                              dispatch(ColorUpdateAction(item?.code, ColorCustom));
                                                              setIsBorderColor((state: any) => [...state, item?.code]);
                                                              dispatch(
                                                                  ClientChooseAction(
                                                                      {
                                                                          id: 'color',
                                                                          value: item?.code,
                                                                          valueCode: item?.code,
                                                                      },
                                                                      clientChooseCustom,
                                                                  ),
                                                              );
                                                          }}
                                                      >
                                                          {item?.value}
                                                      </Button>
                                                      {isBorderColor.includes(item?.code) == true ? (
                                                          <div
                                                              onClick={() => {
                                                                  handleDeleteColor(
                                                                      {
                                                                          id: 'color',
                                                                          value: item.code,
                                                                          valueCode: item.code,
                                                                      },
                                                                      clientChooseCustom,
                                                                      setIsBorderColor,
                                                                      dispatch,
                                                                  );
                                                              }}
                                                          >
                                                              <CloseOutlined
                                                                  style={{
                                                                      height: '10px',
                                                                      width: '10px',
                                                                  }}
                                                              />
                                                          </div>
                                                      ) : (
                                                          ''
                                                      )}
                                                  </div>
                                              );
                                          })
                                        : ''}
                                </Space>
                            ) : (
                                ''
                            )}
                        </div>
                        <div className="filterMaterial">
                            <div className="filterMaterial__title">
                                <Button type="text">Chất liệu</Button>
                                <Button
                                    type="text"
                                    icon={<DownOutlined className="IconDownFilter" />}
                                    onClick={() => {
                                        if (isMaterial) {
                                            setIsMaterial(false);
                                        } else {
                                            setIsMaterial(true);
                                        }
                                    }}
                                ></Button>
                            </div>
                            {isMaterial ? (
                                <Space
                                    wrap={true}
                                    style={{
                                        marginLeft: '15px',
                                    }}
                                >
                                    {materialFilter
                                        ? materialFilter.map((item: any, index: number) => {
                                              return (
                                                  <div
                                                      className={`ColorItem `}
                                                      style={{
                                                          border:
                                                              isBorderMaterial.includes(item?.code) == true
                                                                  ? '1px solid #111'
                                                                  : `none`,
                                                      }}
                                                      key={index}
                                                  >
                                                      <Button
                                                          type="text"
                                                          key={index}
                                                          onClick={() => {
                                                              dispatch(
                                                                  MaterialUpdateAction(item?.code, materialCustom),
                                                              );
                                                              setIsBorderMaterial((state: any) => [
                                                                  ...state,
                                                                  item?.code,
                                                              ]);
                                                              dispatch(
                                                                  ClientChooseAction(
                                                                      {
                                                                          id: 'material',
                                                                          value: item?.code,
                                                                          materialCode: item?.code,
                                                                      },
                                                                      clientChooseCustom,
                                                                  ),
                                                              );
                                                          }}
                                                      >
                                                          {item?.value}
                                                      </Button>
                                                      {isBorderMaterial.includes(item?.code) == true ? (
                                                          <div
                                                              onClick={() => {
                                                                  handleDeleteChooseMaterial(
                                                                      {
                                                                          id: 'material',
                                                                          value: item.code,
                                                                          materialCode: item.code,
                                                                      },
                                                                      clientChooseCustom,
                                                                      setIsBorderMaterial,
                                                                      dispatch,
                                                                  );
                                                              }}
                                                          >
                                                              <CloseOutlined
                                                                  style={{
                                                                      height: '10px',
                                                                      width: '10px',
                                                                  }}
                                                              />
                                                          </div>
                                                      ) : (
                                                          ''
                                                      )}
                                                  </div>
                                              );
                                          })
                                        : ''}
                                </Space>
                            ) : (
                                ''
                            )}
                        </div>
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: '100vh' }}>
                        <div className="ProductCatContent__title">
                            <div className="ProductCatContent__title__amount">
                                <span>{listData.length} sản phẩm</span>
                            </div>
                            <div className="ProductCatContent__title__arranging">
                                <div className="ProductCatContent__title__arranging__heading">
                                    <span>Sắp xếp theo</span>
                                </div>
                                <Select
                                    defaultValue={
                                        queryParams && (queryParams.sortid || queryParams.createdAt)
                                            ? queryParams.sortid
                                                ? queryParams.sortid
                                                : queryParams.createdAt == 'ASC'
                                                ? 'createdAt'
                                                : ''
                                            : 'default'
                                    }
                                    style={{
                                        width: 220,
                                        borderRadius: 'inherit',
                                    }}
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
                            <>
                                <Space
                                    className="ProductCatContent__ListCard"
                                    wrap={true}
                                    size={'small'}
                                    align="center"
                                >
                                    <TabProductCustomer width={210} listData={listData} />
                                </Space>
                                <div className="PageCustomerPC">
                                    <Pagination
                                        defaultCurrent={
                                            queryParams?.page ? Number(queryParams?.page) : Number(currentPage)
                                        }
                                        current={queryParams?.page ? Number(queryParams?.page) : Number(currentPage)}
                                        pageSize={queryParams?.size ? Number(queryParams?.size) : Number(pageSize)}
                                        total={Number(totalPage)}
                                        onChange={onChangePage}
                                        showSizeChanger
                                        pageSizeOptions={[10, 20, 30, 50]}
                                    />
                                </div>
                            </>
                        ) : (
                            <Space
                                style={{
                                    marginTop: '40px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                {/* <SekeletonCardCustomer />
                                <SekeletonCardCustomer />
                                <SekeletonCardCustomer />
                                <SekeletonCardCustomer />    */}
                                <Empty description={'Không có sản phẩm phù hợp'} />
                            </Space>
                        )}
                    </Content>
                </Layout>
            </div>
        </div>
    );
}
