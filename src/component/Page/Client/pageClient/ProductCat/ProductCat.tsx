import React, { useState, useEffect } from 'react';
import './ProductCat.scss';
import { Breadcrumb, Button, Layout, Menu, MenuProps, Select, Skeleton, Space, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { handleChangeTitleSelect } from './ProductCatMethod';
import TabProductCustomer from '../../Common/TabProduct/TabProduct';
import { useNavigate, useParams } from 'react-router-dom';
import { GetContext } from '../../../Admin/common/Context/Context';
import { getProductByCat } from '../../../../utils/Api/Api';
import { dataCategoryProduct } from './ProductCatInterface';
import SekeletonCardCustomer from '../../Common/SekeletonCard/SekeletonCardCustomer';
import IsLoading from '../../../Admin/common/IsLoading/IsLoading';
import { ScaleLoader } from 'react-spinners';
import { image } from '@uiw/react-md-editor';
var slug = require('slug');
export default function ProductCat() {
    // Lấy Params từ Url để call api
    const paramUrl = useParams();
    const navigate = useNavigate();
    const { itemCategory, setItemCategory }: any = GetContext();
    const [size, setSize] = useState<number | string>('1');
    const [page, setPage] = useState<number | string>('10');
    const [listData, setListData] = useState<dataCategoryProduct[]>([]);
    console.log(listData);
    const [isLoading, setIsLoading] = useState<boolean>(false);
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
    const siderMenu = [
        {
            id: 0,
            name: 'Loại sản phẩm',
            children: [
                {
                    id: 0,
                    name: 'Aó Hoodies',
                },
                {
                    id: 1,
                    name: 'Aó Len',
                },
                {
                    id: 2,
                    name: 'Aó thun',
                },
            ],
        },
        {
            id: 1,
            name: 'Màu sắc',
        },
        {
            id: 2,
            name: 'Khoảng giá',
        },
        {
            id: 3,
            name: 'Chất liệu',
        },
    ];
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const items2: MenuProps['items'] = siderMenu.map((item, index) => {
        const key = String(index + 1);
        return {
            key: `${item.id}`,
            // icon: React.createElement(icon),
            label: `${item.name}`,

            children: item.children?.map((child, index) => {
                const subKey = `${slug(child.name)}`;
                return {
                    key: subKey,
                    label: child.name,
                };
            }),
        };
    });
    // Open Key
    const OpenKeyValue = siderMenu.map((item) => {
        return `${item.id}`;
    });
    const itemSelect = [
        { value: 'default', label: 'Mặc định' },
        { value: 'ASC', label: 'Sắp xếp từ A-Z' },
        { value: 'DESC', label: 'Sắp xếp từ Z-A' },
        { value: 'DESC', label: 'Rẻ nhất' },
        { value: 'DESC', label: 'Giá giảm dần' },
        { value: 'DESC', label: 'Mới nhất' },
    ];
    useEffect(() => {
        // Call Api get Product filter
        if (paramUrl) {
            handleGetProduct(paramUrl);
        }
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
                        {items.map((item: { id: number; name: string }) => {
                            return (
                                <Button
                                    type="ghost"
                                    key={item.id}
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
                    <Sider style={{ background: colorBgContainer }} width={250}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={[...OpenKeyValue]}
                            style={{ height: '100%' }}
                            items={items2}
                        />
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
                                    defaultValue="default"
                                    style={{ width: 220 }}
                                    onChange={handleChangeTitleSelect}
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
