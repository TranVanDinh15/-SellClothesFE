import { Card } from 'antd';
import React, { useState, useEffect } from 'react';
import SliderCustomColorP from '../../Slider/SliderCustom.ColorP';
import { convertVND } from '../../../Admin/common/method/method';
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
}
export default function CardCustomer({ item }: props) {
    const [currentDetail, setCurrentDetail] = useState<any>();
    console.log(currentDetail);
    useEffect(() => {
        if (item) {
            setCurrentDetail(item?.detail[0]);
        }
    }, [item]);
    return (
        <Card
            hoverable
            style={{ width: '220px' }}
            cover={
                <div className="tabProductWrapper">
                    <div className="soldWrapper">
                        <span>Đã bán {item.sold}</span>
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
                    <img alt="example" src={`${process.env.REACT_APP_IMAGE_PRODUCT}${currentDetail?.images[0]}`} />
                </div>
            }
        >
            <div className="cardProduct__Infor">
                <div className="cardProduct__Infor_name">
                    <span>{item.name}</span>
                </div>

                <div className="cardProduct__Infor_Price">
                    <div className="cardProduct__Infor_PriceOriginal">
                        <span>{convertVND(currentDetail?.originalPrice)}</span>
                    </div>
                    <div className="cardProduct__Infor_PriceDisccount">
                        <span>{convertVND(currentDetail?.discountPrice)}</span>
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
    );
}
