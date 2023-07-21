import React, { useState, useEffect } from 'react';
import { Card, Space } from 'antd';
import './TabProduct.scss';
import SliderCustomColorP from '../../Slider/SliderCustom.ColorP';
import { image } from '@uiw/react-md-editor';
import { convertVND } from '../../../Admin/common/method/method';
import { GetContext } from '../../../Admin/common/Context/Context';
import CardCustomer from '../Card/CardCustomer';
const { Meta } = Card;
interface cardProps {
    width: number | string;
    listData: {
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
    }[];
}
export default function TabProductCustomer({ width, listData }: cardProps) {
    const [detailProduct, setDetailProduct] = useState<any>();
    return (
        <Space wrap={true} >
            {listData.map((item, index) => {
                return <CardCustomer item={item} key={index} />;
            })}
        </Space>
    );
}
