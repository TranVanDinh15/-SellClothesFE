import React from 'react';
import Slider from '@ant-design/react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slider.css';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
// interface dataSlider{
//     data: {
//         image: string
//     }[]
// }
interface dataSlider {
    data: {
        image: string;
    }[];
}
export default function SliderCustom({ data }: dataSlider) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: true,
    };
    return (
        <div className="SliderWrapper">
            <div className="SliderWrapper__Container">
                <Slider {...settings}>
                    {data.map(
                        (
                            item: {
                                image: string;
                            },
                            index: number,
                        ) => {
                            return (
                                <div className="SliderImage" key={index}>
                                    <img src={`${process.env.REACT_APP_IMAGE_BANNER_URL}${item.image}`} />
                                </div>
                            );
                        },
                    )}
                </Slider>
            </div>
        </div>
    );
}
