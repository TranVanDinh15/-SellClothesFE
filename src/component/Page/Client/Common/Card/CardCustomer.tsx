import { Button, Card } from 'antd';
import React, { useState, useEffect } from 'react';
import SliderCustomColorP from '../../Slider/SliderCustom.ColorP';
import { convertVND } from '../../../Admin/common/method/method';
import { StarOutlined } from '@ant-design/icons';
interface props {
    item: {
        id: number;
        brandId: string;
        categoryId: string;
        name: string;
        material: string;
        madeBy?: string;
        sold: number;
        view: number;
        rating: number;
        detail: {
            color: {
                value: string;
                code: string;
            };
            discountPrice: number;
            images: string[];
            originalPrice: number;
        }[];
    };
    clickCard: () => void;
    width?: number;
}
export default function CardCustomer({ item, clickCard, width }: props) {
    const [currentDetail, setCurrentDetail] = useState<any>();
    useEffect(() => {
        if (item) {
            setCurrentDetail(item?.detail[0]);
        }
    }, [item]);
    console.log(item);
    return (
        <>
            {currentDetail?.discountPrice ? (
                <Card
                    hoverable
                    style={{ width: width ? width : '220px' }}
                    cover={
                        <div
                            className="tabProductWrapper"
                            onClick={() => {
                                clickCard();
                            }}
                        >
                            <div className="soldWrapper">
                                <span
                                    style={{
                                        color: '#fff',
                                    }}
                                >
                                    <StarOutlined
                                        style={{
                                            color: 'yellow',
                                            marginRight: '4px',
                                        }}
                                    />

                                    {Math.round(item?.rating)}
                                </span>
                                <span
                                    style={{
                                        color: '#fff',
                                        padding: '0 8px',
                                    }}
                                >
                                    Đã bán {item.sold}
                                </span>
                            </div>
                            <div className="disccount__card">
                                <span>
                                    {Math.round(
                                        ((currentDetail?.originalPrice - currentDetail?.discountPrice) /
                                            currentDetail?.originalPrice) *
                                            100,
                                    )}
                                    %
                                </span>
                            </div>
                            <img
                                alt="example"
                                src={`${process.env.REACT_APP_IMAGE_PRODUCT}${currentDetail?.images[0]}`}
                            />
                        </div>
                    }
                >
                    <div className="cardProduct__Infor">
                        <div
                            className="cardProduct__Infor_name"
                            onClick={() => {
                                clickCard();
                            }}
                        >
                            <span>{item.name}</span>
                        </div>

                        <div
                            className="cardProduct__Infor_Price"
                            onClick={() => {
                                clickCard();
                            }}
                        >
                            <div className="cardProduct__Infor_PriceOriginal">
                                <span>{convertVND(currentDetail?.discountPrice)}</span>
                            </div>
                            <div className="cardProduct__Infor_PriceDisccount">
                                <span>{convertVND(currentDetail?.originalPrice)}</span>
                            </div>
                        </div>
                        <div
                            className="sliderCustomColorP"
                            style={{
                                padding: '0 10px',
                            }}
                        >
                            <SliderCustomColorP items={item} setCurrentDetail={setCurrentDetail} />
                        </div>
                    </div>
                </Card>
            ) : (
                <Card
                    hoverable
                    style={{ width: width ? width : '220px' }}
                    cover={
                        <div
                            className="tabProductWrapper"
                            onClick={() => {
                                clickCard();
                            }}
                        >
                            <div className="soldWrapper">
                                <span
                                    style={{
                                        color: '#fff',
                                    }}
                                >
                                    <StarOutlined
                                        style={{
                                            color: 'yellow',
                                            marginRight: '4px',
                                        }}
                                    />

                                    {Math.round(item?.rating)}
                                </span>
                                <span
                                    style={{
                                        color: '#fff',
                                        padding: '0 8px',
                                    }}
                                >
                                    Đã bán {item.sold}
                                </span>
                            </div>
                            <img
                                alt="example"
                                src={`${process.env.REACT_APP_IMAGE_PRODUCT}${currentDetail?.images[0]}`}
                            />
                        </div>
                    }
                >
                    <div className="cardProduct__Infor">
                        <div
                            className="cardProduct__Infor_name"
                            onClick={() => {
                                clickCard();
                            }}
                        >
                            <span>{item.name}</span>
                        </div>

                        <div
                            className="cardProduct__Infor_Price"
                            onClick={() => {
                                clickCard();
                            }}
                        >
                            <div className="cardProduct__Infor_PriceOriginal">
                                <span>{convertVND(currentDetail?.originalPrice)}</span>
                            </div>
                        </div>
                        <div
                            className="sliderCustomColorP"
                            style={{
                                padding: '0 10px',
                            }}
                        >
                            <SliderCustomColorP items={item} setCurrentDetail={setCurrentDetail} />
                        </div>
                    </div>
                </Card>
            )}
        </>
    );
}
