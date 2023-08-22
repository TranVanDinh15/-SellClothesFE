import React, { useEffect, useState } from 'react';
import './Cart.scss';
import { Button, Empty, Image } from 'antd';

import { dataCart } from './CartInterFace';
import { convertVND } from '../../Admin/common/method/method';
import { useNavigate } from 'react-router-dom';

export interface useRedux {
    reduxAuth: {
        isAuthenticate: boolean;
        user: any;
        isLoading: boolean;
        isfail: boolean;
    };
}
interface Cartprops {
    cartData: dataCart | undefined;
}
export default function Cart({ cartData }: Cartprops) {
    const navigate = useNavigate();
    return (
        <div className="CartWrapper">
            {cartData?.cart.detail && cartData?.cart.detail.length > 0 ? (
                <div className="IsCartContainer">
                    {cartData?.cart.detail.map((item, index) => {
                        return (
                            <div className="IsCartContainer__Item">
                                <div>
                                    <Image
                                        style={{
                                            flexBasis: '30%',
                                        }}
                                        width={50}
                                        // height={44}
                                        src={`${process.env.REACT_APP_IMAGE_PRODUCT}${item.productDetailSize.productDetail.images[0]}`}
                                        preview={false}
                                    />
                                </div>
                                <div className="IsCartContainer__NameProduct">
                                    <span>{item.productDetailSize.productDetail.name}</span>
                                </div>
                                <div className="IsCartContainer__ProductPrice">
                                    <span>
                                        {convertVND(
                                            item.productDetailSize.productDetail.discountPrice
                                                ? item.productDetailSize.productDetail.discountPrice
                                                : item.productDetailSize.productDetail.originalPrice,
                                        )}
                                    </span>
                                </div>
                            </div>
                        );
                    })}

                    <div className="IsCartContainer__ViewcartBtn">
                        <Button
                            type="ghost"
                            onClick={() => {
                                navigate('/Cart');
                            }}
                        >
                            Xem giỏ hàng
                        </Button>
                    </div>
                </div>
            ) : (
                <Empty
                    description={
                        <span
                            style={{
                                color: '#111',
                            }}
                        >
                            Chưa có sản phẩm trong giỏ hàng
                        </span>
                    }
                />
            )}
        </div>
    );
}
