export interface dataCategoy {
    code: string;
    id: number;
    parentCode: any;
    type: string;
    createdAt: string;
    updatedAt: string;
    value: string;
    children: {
        code: string;
        id: number;
        parentCode: any;
        type: string;
        createdAt: string;
        updatedAt: string;
        value: string;
    }[];
}
export interface chidrenCategory {
    id: number;
    name: string;
}
export interface headerCategory {
    id: number;
    name: string;
    code: string;
}
export interface headerCategoryMapItem {
    id: number;
    value: string;
    code: string;
    parentCode: any;
}
interface detailProduct {
    color: { value: string; code: string };
    discountPrice: number;
    images: string[];
    originalPrice: number;
}
export interface resultSearch {
    brandId: string;
    category: { value: string; code: string };
    categoryId: string;
    contentHtml: string;
    contentMarkdown: string;
    createdAt: string;
    detail: detailProduct[];
    id: number;
    madeBy: any;
    material: string;
    name: string;
    rating: number;
    sold: number;
    status: { value: string; code: string };
    statusId: string;
    updatedAt: string;
    view: number;
}
export interface resultSearchBlog {
    contentHtml: string;
    contentMarkdown: any;
    createdAt: string;
    id: number;
    images: string[];
    shortDescription: string;
    statusId: string;
    subject: {
        code: string;
        createdAt: string;
        hexCode: any;
        id: number;
        parentCode: number;
        type: string;
        updatedAt: string;
        value: string;
    };
    subjectId: string;
    title: string;
    updatedAt: string;
    userId: number;
    view: number;
}
