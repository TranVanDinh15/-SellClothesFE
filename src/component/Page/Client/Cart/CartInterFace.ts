type color = {
    code: string;
    createdAt: string;
    hexCode: string;
    id: number;
    parentCode: any;
    type: string;
    updatedAt: string;
    value: string;
};
type images = string[];
type productDefine = {
    brandId: string;
    categoryId: string;
    contentHtml: string;
    contentMarkdown: string;
    createdAt: string;
    id: number;
    madeBy: any;
    material: string;
    name: string;
    rating: number;
    sold: number;
    statusId: string;
    updatedAt: string;
    view: number;
};
type productDetail = {
    color: color;
    colorId: string;
    createdAt: string;
    description: string;
    discountPrice: number;
    id: number;
    images: images;
    name: string;
    originalPrice: number;
    product: productDefine;
    productId: number;
    updatedAt: string;
};
type productDetailSize = {
    createdAt: string;
    height: number;
    id: number;
    name: string;
    productDetail: productDetail;
    productDetailId: number;
    quantity: number;
    updatedAt: number;
    weight: number;
    width: number;
};
type detailItem = {
    cartId: number;
    createdAt: string;
    id: number;
    productDetailSize: productDetailSize;
    productDetailSizeId: number;
    quantity: number;
    updatedAt: string;
};
type detail = detailItem[];
type cart = {
    createdAt: string;
    detail: detail;
    id: number;
    updatedAt: string;
    userId: number;
};
export type dataCart = {
    cart: cart;
    totalPrice: number;
};
