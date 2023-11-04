import React from 'react';
import Slider from '@ant-design/react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ImageGallery from 'react-image-gallery';
import './Slider.css';
import { AiOutlineLeft } from 'react-icons/ai';
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
    console.log(data);
    return (
        <div className="SliderWrapper">
            <div className="SliderWrapper__Container">
                <ImageGallery
                    showBullets={true}
                    showThumbnails={false}
                    showFullscreenButton={false}
                    showPlayButton={false}
                    slideOnThumbnailOver={true}
                    autoPlay={true}
                    
                    items={data.map(
                        (
                            item: {
                                image: string;
                            },
                            index: number,
                        ) => {
                            return {
                                original: `${process.env.REACT_APP_IMAGE_BANNER_URL}${item.image}`,
                                thumbnail: `${process.env.REACT_APP_IMAGE_BANNER_URL}${item.image}`,
                            };
                        },
                    )}
                />
            </div>
        </div>
    );
}
