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
    size: any;
}
export interface DataTypeSizeProductDetail {
    key: React.Key;
    id: number;
    name: string;
    width: string;
    height: string;
    weight: string;
    quantity: string;
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
    id: number;
    title: string;
    shortDescription: string;
    createdAt: string;
    statusId: string;
    images: string[];
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
export interface typeVoucher {
    id: number;
    typeVoucherCode: string;
    value: number;
    maxValue: number;
    minValue: number;
    statusId: string;
    createdAt: string;
    updatedAt: string;
    typeVoucher: {
        id: number;
        type: string;
        value: string;
        code: string;
        parentCode: any;
        hexCode: any;
        createdAt: string;
        updatedAt: string;
    };
}
export interface voucherIF {
    id: number;
    fromDate: string;
    toDate: string;
    typeVoucherId: number;
    amount: number;
    statusId: string;
    usedAmount: number;
    codeVoucher: string;
    createdAt: string;
    updatedAt: string;
    typeVoucher: {
        id: number;
        typeVoucherCode: string;
        value: number;
        maxValue: number;
        minValue: number;
        statusId: string;
        createdAt: string;
        updatedAt: string;
    };
}
export interface orderAdminIF {
    id: number;
    addressUserId: number;
    statusId: string;
    typeShipId: number;
    voucherId: number;
    totalPrice: number;
    note: any;
    isPaymentOnline: boolean;
    createdAt: string;
    updatedAt: string;
    addressUser: {
        id: number;
        userId: number;
        shipName: string;
        statusId: string;
        shipAddress: string;
        shipPhoneNumber: number;
        shipEmail: string;
        createdAt: string;
        updatedAt: string;
    };
}
