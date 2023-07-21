import React, { useState, useEffect } from 'react';
import Slider from '@ant-design/react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slider.css';
import { Avatar, Button } from 'antd';
import { LeftOutlined, RightOutlined, UserOutlined } from '@ant-design/icons';
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs';
import { GetContext } from '../../Admin/common/Context/Context';
import ReactImageGallery from 'react-image-gallery';
interface dataProps {
    items: {
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

    setCurrentDetail: React.Dispatch<React.SetStateAction<any>>;
}
export default function SliderCustomColorP({ items, setCurrentDetail }: dataProps) {
    const [limitShow, setLimitShow] = useState<number>(4);
    const CustomPrevArrow = (props: any) => {
        const { onClick } = props;
        return (
            <div className="custom-arrow custom-prev-arrow" onClick={onClick}>
                {/* Đặt ký tự khác ở đây */}
                <BsArrowLeftCircle />
            </div>
        );
    };

    const CustomNextArrow = (props: any) => {
        const { onClick } = props;
        return (
            <div className="custom-arrow custom-next-arrow" onClick={onClick}>
                {/* Đặt ký tự khác ở đây */}
                <BsArrowRightCircle />
            </div>
        );
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: items.detail.length < limitShow ? items.detail.length : limitShow,
        slidesToScroll: 4,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
    };
    return (
        <div
            style={{
                padding: '10px 0px 0 0px',
            }}
        >
            <Slider {...settings}>
                {items.detail.map((item, index) => {
                    return (
                        <div
                            className="SliderImageSmall"
                            onClick={() => {
                                setCurrentDetail({
                                    ...item,
                                });
                            }}
                            key={index}
                        >
                            <Avatar
                                size="default"
                                icon={<UserOutlined />}
                                src={`${process.env.REACT_APP_IMAGE_PRODUCT}${item.images[1]}`}
                            />
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
}
