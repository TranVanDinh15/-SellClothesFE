import { reqProductSize, reqUpdateDetailP, reqUpdateSize } from './ApiInterFace';
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
// Update danh mục sản phẩm
export const updateCategoy = (data: {}) => {
    return AxiosInstance.put('/all-code', data);
};
// Delete danh mục sản phẩm
export const deleteCategory = (id: any) => {
    return AxiosInstance.delete(`/all-code/${id}`);
};
// get Product by page and size
export const getListProduct = (page: any, size: any) => {
    return AxiosInstance.get(`/product?page=${page}&size=${size}`);
};
export const getProductById = (id: string) => {
    return AxiosInstance.get(`/product/${id}`);
};
// create new Prodcut
export const createNewProduct = (data: any) => {
    return AxiosInstance.post('/product', data);
};
// get status product
export const getStatus = () => {
    return AxiosInstance.get(`/all-code/STATUS`);
};
// Delete sản phẩm
export const deleteProdcut = (id: any) => {
    return AxiosInstance.delete(`/product/${id}`);
};
// Upload Image
export const uploadImageRequest = (mulFile: any) => {
    console.log(mulFile);
    return AxiosInstance({
        method: 'post',
        url: '/upload/images',
        data: mulFile,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
// get Product detail by ProductId
export const getProductDetailById = (productId: number) => {
    return AxiosInstance.get(`/product/detail/${productId}`);
};
// create Product detail
export const createProductDetail = (data: any) => {
    return AxiosInstance.post('/product/detail', data);
};
// delete product detail
export const deleteProductDetail = (id: number) => {
    return AxiosInstance.delete(`/product/detail/${id}`);
};
// create product detail size
export const createProductDetailSize = (data: reqProductSize) => {
    return AxiosInstance.post('/product/size', data);
};
export const getProductDetailSize = (id: number) => {
    return AxiosInstance.get(`/product/size/${id}`);
};
// update product detail size
export const updateProductDetailSize = (data: reqUpdateSize, id: number) => {
    return AxiosInstance.put(`/product/size/${id}`, data);
};
// delete product detail size
export const deleteProductDetailSize = (id: number) => {
    return AxiosInstance.delete(`/product/size/${id}`);
};
// update product detail
export const updateProductDetail = (id: number, data: reqUpdateDetailP) => {
    return AxiosInstance.put(`/product/detail/${id}`, data);
};
// Get color product by Id
export const GetColorProductById = (id: number) => {
    return AxiosInstance.get(`/product/colors/${id}`);
};
// get All code color
export const getColorSelect = () => {
    return AxiosInstance.get(`/all-code/COLOR`);
};
// Get banner
export const getAllBanner = (query: string) => {
    return AxiosInstance.get(`/banner?${query}`);
};
// get filter Product
export const getProductByCat = (query: string) => {
    return AxiosInstance.get(`/product?${query}`);
};
