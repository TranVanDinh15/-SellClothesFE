import React from 'react';
import Slider from '@ant-design/react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slider.css';
import { Avatar } from 'antd';
import { LeftOutlined, RightOutlined, UserOutlined } from '@ant-design/icons';
export default function SliderCustomColorP() {
    const CustomPrevArrow = (props: any) => {
        const { onClick } = props;
        return (
            <div className="custom-arrow custom-prev-arrow" onClick={onClick}>
                {/* Đặt ký tự khác ở đây */}
                <LeftOutlined />
            </div>
        );
    };

    const CustomNextArrow = (props: any) => {
        const { onClick } = props;
        return (
            <div className="custom-arrow custom-next-arrow" onClick={onClick}>
                {/* Đặt ký tự khác ở đây */}
                <RightOutlined />
            </div>
        );
    };
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
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
                <div className="SliderImageSmall">
                    <Avatar
                        size="small"
                        icon={<UserOutlined />}
                        src={
                            'https://bizweb.dktcdn.net/thumb/large/100/438/408/products/sam5039-den-5.jpg?v=1674020318000'
                        }
                    />
                </div>
                <div className="SliderImageSmall">
                    <Avatar
                        size="small"
                        icon={<UserOutlined />}
                        src={
                            'https://bizweb.dktcdn.net/thumb/large/100/438/408/products/sam5039-tra-3.jpg?v=1675313319000'
                        }
                    />
                </div>
                <div className="SliderImageSmall">
                    <Avatar
                        size="small"
                        icon={<UserOutlined />}
                        src={
                            'https://bizweb.dktcdn.net/thumb/large/100/438/408/products/sam5039-ghi-4.jpg?v=1674020318000'
                        }
                    />
                </div>
                <div className="SliderImageSmall">
                    <Avatar
                        size="small"
                        icon={<UserOutlined />}
                        src={
                            'https://bizweb.dktcdn.net/thumb/large/100/438/408/products/sam5039-xlo-2.jpg?v=1674020318000'
                        }
                    />
                </div>
                <div className="SliderImageSmall">
                    <Avatar
                        size="small"
                        icon={<UserOutlined />}
                        src={
                            'https://bizweb.dktcdn.net/thumb/large/100/438/408/products/sam5039-xmn-5.jpg?v=1674020318000'
                        }
                    />
                </div>
            </Slider>
        </div>
    );
}
