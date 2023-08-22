export interface dataCategoryProduct {
    id: number;
    brandId: string;
    categoryId: string;
    name: string;
    material: string;
    madeBy?: string;
    sold: number;
    view: number;
    rating: number;
    detail: {
        color: {
            value: string;
            code: string;
        };
        discountPrice: number;
        images: string[];
        originalPrice: number;
    }[];
}
[];
