import React from 'react';
import { Card } from 'antd';
import './TabProduct.scss';
import SliderCustomColorP from '../../Slider/SliderCustom.ColorP';
const { Meta } = Card;
export default function TabProductCustomer() {
    const ResultCover = (
        <div className="tabProductWrapper">
            <div className="soldWrapper">
                <span>Đã bán 524</span>
            </div>
            <div className="disccount__card">
                <span>-50%</span>
            </div>
            <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
        </div>
    );
    return (
        <div>
            <Card hoverable style={{ width: 200 }} cover={ResultCover}>
                <div className="cardProduct__Infor">
                    <div className="cardProduct__Infor_name">
                        <span> Áo Polo Trẻ Em In Mèo Đáng Yêu</span>
                    </div>
                    <div className="cardProduct__Infor_Price">
                        <div className="cardProduct__Infor_PriceOriginal">
                            <span>199.000 đ</span>
                        </div>
                        <div className="cardProduct__Infor_PriceDisccount">
                            <span>250.000 đ</span>
                        </div>
                    </div>
                    <SliderCustomColorP />
                </div>
            </Card>
        </div>
    );
}
