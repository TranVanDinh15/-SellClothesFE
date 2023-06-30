import React from 'react';

export interface DataTypeProductDetail {
    key: React.Key;
    id: number;
    name: string;
    originalPrice: number;
    discountPrice: number;
    description: string;
    colorId: any;
    images: any;
    productId: number;
}
export interface DataTypeSizeProductDetail {
    key: React.Key;
    id: number;
    name: string;
    width: string;
    height: string;
    weight: string;
}
