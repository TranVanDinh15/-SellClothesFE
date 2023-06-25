import AxiosInstance from './Axios-custom';
// get thương hiệu
export const getAllBrand = (page: any, pagesize: any) => {
    return AxiosInstance.get(`/all-code/BRAND?page=${page}&size=${pagesize}`);
};
// get Brand select
export const getBrandSelect = () => {
    return AxiosInstance.get(`/all-code/BRAND`);
};
// Tạo thương hiệu
export const createBrand = (data: any) => {
    return AxiosInstance.post('/all-code', data);
};
// Update thương hiệu
export const updateBrand = (data: {}) => {
    return AxiosInstance.put('/all-code', data);
};
// Delete thương hiệu
export const deleteBrand = (id: any) => {
    return AxiosInstance.delete(`/all-code/${id}`);
};
// Login Admin
export const loginAdmin = (data: any) => {
    return AxiosInstance.post('/auth/login', data);
};
// get category paginate
export const getAllCategory = (page: any, pagesize: any) => {
    return AxiosInstance.get(`/all-code/CATEGORY?page=${page}&size=${pagesize}`);
};
// get category
export const getCategory = () => {
    return AxiosInstance.get(`/all-code/CATEGORY`);
};
// Tạo category
export const createCategory = (data: any) => {
    return AxiosInstance.post('/all-code', data);
};
// get Product by page and size
export const getListProduct = (page: any, size: any) => {
    return AxiosInstance.get(`/product?page=${page}&size=${size}`);
};
// create new Prodcut
export const createNewProduct = (data: any) => {
    return AxiosInstance.post('/product', data);
};
// get status product
export const getStatus = () => {
    return AxiosInstance.get(`/all-code/STATUS`);
};