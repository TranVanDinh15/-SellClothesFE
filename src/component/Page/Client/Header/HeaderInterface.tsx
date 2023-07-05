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
