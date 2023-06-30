export interface reqProductDetail {
    productId: string;
    name: string;
    originalPrice: string;
    discountPrice: string;
    // description: 'hdhhdhd',
    images: any;
    colorId: string;
}
export interface reqProductSize {
    productDetailId: number;
    name: string;
    width: string;
    height: string;
    weight: string;
}
export interface reqUpdateSize {
    productDetailId: number;
    name: string;
    width: string;
    height: string;
    weight: string;
    quantity: number;
}
export interface reqUpdateDetailP {
    productId: number;
    name: string;
    originalPrice: number;
    discountPrice: number;
    description: string;
    images: any;
    colorId: string;
}
