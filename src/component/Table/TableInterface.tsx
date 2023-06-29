import React from 'react';

export interface DataTypeProductDetail {
    key: React.Key;
    id: number;
    name: string;
    contentMarkdown: string;
    contentHtml: string;
    categoryId: string;
    statusId: string;
    brandId: string;
    color: string;
    material: string;
}
export interface DataTypeSizeProductDetail {
    key: React.Key;
    id: number;
    name: string;
    width: string;
    height: string;
    weight: string;
}
