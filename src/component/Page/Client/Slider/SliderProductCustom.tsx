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
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
const slug = require('slug');
interface SliderProduct {
    listData: dataCategoryProduct[] | null;
}
const PrevArrow = ({ onClick }: any) => (
    <div
        style={{
            width: '40px',
            height: '40px',
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: '50%',
            cursor: 'pointer',
            zIndex: '1',
        }}
        onClick={onClick}
    >
        {/* <img src="/path-to-your-black-left-arrow-icon.png" alt="Prev" /> */}
        <LeftOutlined />
    </div>
);

const NextArrow = ({ onClick }: any) => (
    <div
        style={{
            width: '40px',
            height: '40px',
            position: 'absolute',
            right: '25px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: '50%',
            cursor: 'pointer',
            zIndex: '1',
        }}
        onClick={onClick}
    >
        {/* <img src="/path-to-your-black-right-arrow-icon.png" alt="Next" /> */}
        <RightOutlined />
    </div>
);
export default function SliderProductCustom({ listData }: SliderProduct) {
    const navigate = useNavigate();
    var settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
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
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
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
                            width={270}
                        />
                    );
                })}
        </Slider>
    );
}
