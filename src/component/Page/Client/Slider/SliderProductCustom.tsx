import React, { Component } from 'react';
import Slider from '@ant-design/react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import TabProductCustomer from '../Common/TabProduct/TabProduct';
import { dataCategoryProduct } from '../pageClient/ProductCat/ProductCatInterface';
import CardCustomer from '../Common/Card/CardCustomer';
import { useNavigate } from 'react-router-dom';
const slug = require('slug');
interface SliderProduct {
    listData: dataCategoryProduct[] | null;
}

export default function SliderProductCustom({ listData }: SliderProduct) {
    const navigate = useNavigate();
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <Slider {...settings}>
            {listData &&
                listData.map((item, index) => {
                    return (
                        <CardCustomer
                            item={item}
                            key={index}
                            clickCard={() => {
                                console.log(item);
                                navigate(`/chi-tiet-san-pham/${slug(item?.name)}?id=${item?.id}`);
                            }}
                            width={250}
                        />
                    );
                })}
        </Slider>
    );
}
