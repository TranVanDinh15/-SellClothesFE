import React from 'react';
import Slider from '@ant-design/react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slider.css';
export default function SliderCustom() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // centerMode: true,
        autoplay: true,
        arrows: false,
    };
    return (
        <div className="SliderWrapper">
            <div>
                <Slider {...settings}>
                    <div className="SliderImage">
                        <img src="https://cdn.dribbble.com/users/2972384/screenshots/6822537/sale-shopping.png" />
                    </div>
                    <div className="SliderImage">
                        <img src="https://assets.materialup.com/uploads/7fe7a45a-dd07-4a7a-b6d5-7a3632ea086d/preview.jpg" />
                    </div>
                    <div className="SliderImage">
                        <img src="https://img.freepik.com/free-psd/horizontal-banner-template-big-sale-with-woman-shopping-bags_23-2148786755.jpg?w=2000" />
                    </div>
                </Slider>
            </div>
        </div>
    );
}
