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
