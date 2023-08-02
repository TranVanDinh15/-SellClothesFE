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
export interface DatatypeSupplier {
    id: number;
    name: string;
    address: string;
    email: string;
    createdAt: string;
}
export interface DatatypeReceipt {
    id: number;
    user: {
        firstName: string;
        id: number;
        lastName: string;
    };
    supplier: { address: string; createdAt: string; email: string; id: number; name: string; updatedAt: string };
    createdAt: string;
}
export interface DatatypeBlog {
    title: string;
    shortDescription: string;
    createdAt: string;
}
// -------- Interface Detail Receipt---------//
interface product {
    id: number;
    name: string;
    contentMarkdown: string;
    contentHtml: string;
    categoryId: string;
    statusId: string;
    view: number;
    madeBy: any;
    material: string;
    brandId: string;
    sold: number;
    rating: number;
    createdAt: string;
    updatedAt: string;
}
interface productDetail {
    id: number;
    productId: number;
    name: string;
    originalPrice: number;
    discountPrice: number;
    description: string;
    images: string[];
    colorId: string;
    createdAt: string;
    updatedAt: string;
    product: product;
}
interface productDetailSize {
    id: number;
    productDetailId: number;
    name: string;
    quantity: number;
    width: number;
    height: number;
    weight: number;
    createdAt: string;
    updatedAt: string;
    productDetail: productDetail;
}
export interface DatatypeDetailReceipt {
    id: number;
    receiptId: number;
    productDetailSizeId: number;
    quantity: number;
    price: string;
    createdAt: string;
    updatedAt: string;
    productDetailSize: productDetailSize;
}
// ---------------------------------------//
export interface DatatypeBanner {
    id: number;
    description: string;
    name: string;
    statusId: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    status: {
        value: string;
        code: string;
    };
}
