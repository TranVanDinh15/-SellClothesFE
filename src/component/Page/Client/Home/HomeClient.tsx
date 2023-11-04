import React, { useState, useEffect } from 'react';
import SliderCustom from '../Slider/SliderCustom';
import { Button, Col, Row, Tabs, TabsProps } from 'antd';
import './HomeClient.css';
import TabProductCustomer from '../Common/TabProduct/TabProduct';
import { getAllBanner } from '../../../utils/Api/Api';
import SliderProductCustom from '../Slider/SliderProductCustom';
import { dataCategoryProduct } from '../pageClient/ProductCat/ProductCatInterface';
import { handleGetProductSale } from './HomeMethod';
import { useNavigate } from 'react-router-dom';
export default function HomeClient() {
    const navigate = useNavigate();
    const [allSlider, setAllSlider] = useState<
        {
            image: string;
        }[]
    >([]);
    const [listData, setListData] = useState<dataCategoryProduct[] | null>(null);
    const [foodsNew, setfootNew] = useState<dataCategoryProduct[] | null>(null);
    const [categoryClother, setCategoryClother] = useState<string>('nam');

    const onChange = (key: string) => {
        console.log(key);
        setCategoryClother(key);
    };
    const items: TabsProps['items'] = [
        {
            key: 'nam',
            label: 'TRANG PHỤC NAM',
            children: <SliderProductCustom listData={foodsNew} />,
        },
        {
            key: 'nu',
            label: 'TRANG PHỤC NỮ',
            children: <SliderProductCustom listData={foodsNew} />,
        },
        {
            key: 'tre-em',
            label: 'TRANG PHỤC TRẺ EM',
            children: <SliderProductCustom listData={foodsNew} />,
        },
    ];
    console.log(listData);
    const handleGetAllSlider = async (): Promise<void> => {
        const query = `statusId=ACTIVE&page=1&size=5&updatedAt=DESC`;
        const response = await getAllBanner(query);
        if (response && response.status == 200) {
            console.log(response);
            setAllSlider(response.data.data);
        }
    };
    useEffect(() => {
        handleGetAllSlider();
    }, []);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        handleGetProductSale('discount=true', setListData);
        handleGetProductSale(`categoryId=${categoryClother}&sortcreatedAt=DESC&page=1&size=20`, setfootNew);
    }, [categoryClother]);
    return (
        <div className="HomeClientWrapper">
            <div className="HomeClientWrapper__slider">
                <SliderCustom data={allSlider} />
            </div>
            <div className="SuggestForyou HomeClientSaleProduct">
                <div className="HomeClientSaleProduct__title">
                    <div className="HomeClientSaleProduct__title__Heading">
                        <span>Sản phẩm mới nhất</span>
                    </div>
                    {/* <div className="HomeClientSaleProduct__title__btn">
                        <Button type="text">Xem thêm</Button>
                    </div> */}
                </div>
                <div className="HomeClientSaleProduct__listItem">
                    <Tabs
                        defaultActiveKey="1"
                        items={items}
                        onChange={onChange}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    />
                    {/* <SliderProductCustom listData={foodsNew} /> */}
                </div>
            </div>
            <div className="HomeClientSaleProduct">
                <div className="HomeClientSaleProduct__title">
                    <span>SALE SỐC</span>
                </div>
                <div className="HomeClientSaleProduct__listItem">
                    <SliderProductCustom listData={listData} />
                </div>
            </div>
            <div className="SliderImage">
                <Row gutter={20}>
                    <Col span={8}>
                        <div
                            className="SliderImage__Col"
                            style={{
                                backgroundImage: `url(${`https://mauweb.monamedia.net/anphuoc/wp-content/uploads/2018/01/cm1.jpg`})`,
                            }}
                            onClick={() => {
                                navigate(`/nam?categoryId=nam&page=1&size=20`);
                            }}
                        >
                            <div className="SliderImage__Col__title">
                                <span>Trang phục nam</span>
                            </div>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div
                            className="SliderImage__Col"
                            style={{
                                backgroundImage: `url(${`https://mauweb.monamedia.net/anphuoc/wp-content/uploads/2018/01/cm3.jpg`})`,
                            }}
                            onClick={() => {
                                navigate(`/nu?categoryId=nu&page=1&size=20`);
                            }}
                        >
                            <div className="SliderImage__Col__title">
                                <span>Trang phục nữ</span>
                            </div>
                        </div>
                    </Col>
                    <Col span={8}>
                        <Row>
                            <div
                                className="SliderImage__ColTwo"
                                style={{
                                    backgroundImage: `url(${`https://media.canifa.com/Simiconnector/banner_name1690001508.webp`})`,
                                }}
                                onClick={() => {
                                    navigate(`/tre-em?categoryId=tre-em&page=1&size=20`);
                                }}
                            >
                                <div className="SliderImage__Col__title">
                                    <span>Trang phục trẻ em</span>
                                </div>
                            </div>
                        </Row>
                        <Row>
                            <div
                                className="SliderImage__ColTwo"
                                style={{
                                    backgroundImage: `url(${`https://mauweb.monamedia.net/anphuoc/wp-content/uploads/2018/01/cm4crop.jpg`})`,
                                }}
                            >
                                <div className="SliderImage__Col__title">
                                    <span>Phiếu quà tặng</span>
                                </div>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
