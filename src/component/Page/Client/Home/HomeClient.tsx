import React, { useState, useEffect } from 'react';
import SliderCustom from '../Slider/SliderCustom';
import { Button, Col, Row } from 'antd';
import './HomeClient.css';
import TabProductCustomer from '../Common/TabProduct/TabProduct';
import { getAllBanner } from '../../../utils/Api/Api';
import SliderProductCustom from '../Slider/SliderProductCustom';
import { dataCategoryProduct } from '../pageClient/ProductCat/ProductCatInterface';
import { handleGetProductSale } from './HomeMethod';
export default function HomeClient() {
    const [allSlider, setAllSlider] = useState<
        {
            image: string;
        }[]
    >([]);
    const [listData, setListData] = useState<dataCategoryProduct[] | null>(null);
    const [foodsNew, setfootNew] = useState<dataCategoryProduct[] | null>(null);
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
        handleGetProductSale('discount = true', setListData);
        handleGetProductSale('sortcreatedAt=DESC&page=1&size=20', setfootNew);
    }, []);
    return (
        <div className="HomeClientWrapper">
            <div className="HomeClientWrapper__slider">
                <SliderCustom data={allSlider} />
            </div>
            <div className="SuggestForyou HomeClientSaleProduct">
                <div className="HomeClientSaleProduct__title">
                    <div className="HomeClientSaleProduct__title__Heading">
                        <span>Mới nhất</span>
                    </div>
                    <div className="HomeClientSaleProduct__title__btn">
                        <Button type="text">Xem thêm</Button>
                    </div>
                </div>
                <div className="HomeClientSaleProduct__listItem">
                    <SliderProductCustom listData={foodsNew} />
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
        </div>
    );
}
