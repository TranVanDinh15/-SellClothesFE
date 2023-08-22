import axios from 'axios';
import {
    createTypeVoucherIF,
    dataCreateVoucher,
    dataUpdateBlog,
    reqProductSize,
    reqUpdateDetailP,
    reqUpdateSize,
} from './ApiInterFace';
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
// LogOut
export const LogOut = () => {
    return AxiosInstance.patch('/auth/logout');
};
// get category paginate
export const getAllCategory = (page: any, pagesize: any) => {
    return AxiosInstance.get(`/all-code/CATEGORY?page=${page}&size=${pagesize}&sortcreatedAt=DESC`);
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
    return AxiosInstance.get(`/product?page=${page}&size=${size}&sortcreatedAt=DESC`);
};
// get Product by Category
export const getProductByCategory = (categoryId: string) => {
    return AxiosInstance.get(`/product?page=1&size=2000&categoryId=${categoryId}`);
};
export const getProductById = (id: string) => {
    return AxiosInstance.get(`/product/${id}`);
};
// create new Prodcut
export const createNewProduct = (data: any) => {
    return AxiosInstance.post('/product', data);
};
// Update Product
export const updateProduct = (
    id: number,
    data: {
        categoryId: string;
        statusId: string;
        brandId: string;
        colorCodes: string[];
        material: string;
        contentMarkdown: string;
        contentHtml: string;
        name: string;
    },
) => {
    return AxiosInstance.put(`/product/${id}`, data);
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
// get Color  Category
export const getCategoryColor = () => {
    return AxiosInstance.get('/all-code/COLOR?page=1&size=1000');
};
// get Material Category
export const getMaterialClient = () => {
    return AxiosInstance.get(`/all-code/MATERIAL?page=1&size=1000`);
};
// Get Api Comment
export const getCommentByIdProduct = (id: number, page: number, size: number, star: number) => {
    return AxiosInstance.get(
        `/comment?productId=${id}&sortcreatedAt=DESC&page=${page}&size=${size}${star ? `&star=${star}` : ''}`,
    );
};
// Add  Comment
export const createCommentProduct = (data: { content: string; productId: number; star: number; images: string[] }) => {
    return AxiosInstance.post('/comment', data);
};
// add rep comment
export const createRepCommentProduct = (data: { content: string; productId: number }) => {
    return AxiosInstance.post('/comment', data);
};
// Like vs unLike
export const likeVsunLike = (cmtId: number) => {
    return AxiosInstance.patch(`/user/comment/like/${cmtId}`);
};
// disLike vs undisLike
export const disLikeVsUndislike = (cmtId: number) => {
    return AxiosInstance.patch(`/user/comment/dislike/${cmtId}`);
};
// cart init
export const cartInitApi = () => {
    return AxiosInstance.put('/cart');
};
// add cart
export const addCartApi = (data: { productDetailSizeId: string; quantity: number }) => {
    return AxiosInstance.post('/cart/add-to-cart', data);
};
// get Supplier
export const getSupplier = (currentPage: number, pageSize: number) => {
    return AxiosInstance.get(`/supplier?page=${currentPage}&size=${pageSize}&sortupdatedAt=DESC`);
};
// Add Supplier
export const createSupplier = (data: { name: string; address: string; email: string }) => {
    return AxiosInstance.post(`/supplier`, data);
};
// Update Supplier
export const UpdateSupplier = (id: number, data: { name: string; address: string; email: string }) => {
    return AxiosInstance.put(`/supplier/${id}`, data);
};
// Delete Supplier
export const DeleteSupplier = (id: number) => {
    return AxiosInstance.delete(`/supplier/${id}`);
};
// get Receipt
export const getReceipt = (currentPage: number, pageSize: number) => {
    return AxiosInstance.get(`/receipt?page=${currentPage}&size=${pageSize}&sortupdatedAt=DESC`);
};
// Add Receipt
export const CreateReceipt = (data: { supplierId: number }) => {
    return AxiosInstance.post('/receipt', data);
};
// Update Receipt
export const UpdateReceipt = (id: number, data: { supplierId: number }) => {
    return AxiosInstance.put(`/receipt/${id}`, data);
};
// Delete Receipt
export const deleteReceipt = (id: number) => {
    return AxiosInstance.delete(`/receipt/${id}`);
};
// Get Blog
export const GetBlog = (currentPage: number, pageSize: number) => {
    return AxiosInstance.get(`/blog?page=${currentPage}&size=${pageSize}&sortupdatedAt=DESC`);
};
// Get Blog By Subject
export const GetBlogBySubjectId = (SubjectId: string, currentPage: number, pageSize: number) => {
    return AxiosInstance.get(
        `/blog/?subjectId=${SubjectId}&page=${currentPage}&size=${pageSize}&sortupdatedAt=DESC&statusId=ACTIVE`,
    );
};
// Get Blog By Id
export const GetBlogById = (id: number) => {
    return AxiosInstance.get(`/blog/${id}`);
};
// Add Blog
export const AddBlog = (data: { title: string; shortDescription: string }) => {
    return AxiosInstance.post(`/blog`, data);
};
// Update Blog
export const updateBlog = (id: number, data: dataUpdateBlog) => {
    return AxiosInstance.put(`/blog/${id}`, data);
};
// Get SubjectId
export const getSubjectId = () => {
    return AxiosInstance.get('/all-code/SUBJECT?page=1&size=1000');
};
// Get Detail Receipt
export const GetDetailReceipt = (id: number, currentPage: number, pageSize: number) => {
    return AxiosInstance.get(`/receipt/${id}?page=${currentPage}&size=${pageSize}&sortcreatedAt=DESC`);
};
// Add Detail Receipt
export const createDetailReceipt = (data: {
    receiptId: number;
    productDetailSizeId: number;
    quantity: number;
    price: number;
}) => {
    return AxiosInstance.post('/receipt/detail', data);
};
// Update Detail Receipt
export const updateDetailReceipt = (
    id: number,
    data: {
        receiptId: number;
        productDetailSizeId: number;
        quantity: number;
        price: number;
    },
) => {
    return AxiosInstance.put(`/receipt/detail/${id}`, data);
};
// Delete  Detail Receipt
export const DeleteDetailReceipt = (id: number) => {
    return AxiosInstance.delete(`/receipt/detail/${id}`);
};
// Get Banner
export const GetBanner = (currentPage: number, pageSize: number) => {
    return AxiosInstance.get(`/banner?page=${currentPage}&size=${pageSize}&updatedAt=DESC`);
};
// Get Status All Code
export const GetStatusAllCode = (currentPage: number, pageSize: number) => {
    return AxiosInstance.get(`/all-code/STATUS?page=${currentPage}&size=${pageSize}`);
};
// Add Banner
export const AddBanner = (data: { name: string; description: string; statusId: string; image: string }) => {
    return AxiosInstance.post('/banner', data);
};
// Update Banner
export const UpdateBanner = (
    id: number,
    data: { name: string; description: string; statusId: string; image: string },
) => {
    return AxiosInstance.put(`/banner/${id}`, data);
};
// Delete banner
export const DeleteBanner = (id: number) => {
    return AxiosInstance.delete(`/banner/${id}`);
};
// get amount Total User
export const getAmountTotalUser = () => {
    return AxiosInstance.get(`/dashboard/total-user`);
};
// get amount  User online
export const getAmountUserOnline = () => {
    return AxiosInstance.get(`/dashboard/user-online`);
};
// get Total user by time
export const getTotalUserTime = (startDate: any, endDate: any) => {
    return AxiosInstance.get(`/dashboard/new-user?startDate=${startDate}&endDate=${endDate}`);
};
// get amount Order
export const getAmountOrder = (startDate: any, endDate: any) => {
    return AxiosInstance.get(`/dashboard/count-order?startDate=${startDate}&endDate=${endDate}`);
};
// get product Sold
export const getProductSold = (startDate: any, endDate: any) => {
    return AxiosInstance.get(`/dashboard/product-sold?startDate=${startDate}&endDate=${endDate}`);
};
// Get User Role Id
export const getUserRoleId = (id: string) => {
    return AxiosInstance.get(`/user?roleId=${id}`);
};
// Create Room Message
export const createRoomMessage = (data: { userTwoId: number }) => {
    return AxiosInstance.post(`/room-messages/create`, data);
};
// Get Rooms by Id
export const getRooms = () => {
    return AxiosInstance.get('/room-messages/rooms');
};
// Get Message
export const getMessageByRoom = (id: number) => {
    return AxiosInstance.get(`/room-messages/messages/${id}`);
};
// Get rooms Admin
export const getRoomsAdmin = () => {
    return AxiosInstance.get(`/room-messages/rooms-admin`);
};
// Get admin by role
export const getAdmin = () => {
    return AxiosInstance.get(`/user?roleId=Admin`);
};

// Get type voucher
export const getTypeVoucher = (currentPage: number, pageSize: number) => {
    return AxiosInstance.get(`/voucher/type-voucher?page=${pageSize}&size=${currentPage}&updatedAt=DESC`);
};
export const getCodeTypeVoucher = () => {
    return AxiosInstance.get(`/all-code/TYPE_VOUCHER`);
};
// Create type Voucher
export const createTypeVoucher = (data: createTypeVoucherIF) => {
    return AxiosInstance.post(`/voucher/type-voucher`, data);
};
// get Voucher
export const getVoucher = (currentPage: number, pageSize: number) => {
    return AxiosInstance.get(`/voucher?page=${pageSize}&size=${currentPage}&updatedAt=DESC`);
};
export const getVoucherClient = (currentPage: number, pageSize: number) => {
    return AxiosInstance.get(`/voucher?page=${pageSize}&size=${currentPage}&statusId=ACTIVE&updatedAt=DESC`);
};
export const getVoucherUser = (id: number, currentPage: number, pageSize: number) => {
    return AxiosInstance.get(`/voucher?userId=${id}&page=${pageSize}&size=${currentPage}&updatedAt=DESC`);
};
// create  voucher
export const createVoucher = (data: dataCreateVoucher) => {
    return AxiosInstance.post(`/voucher`, data);
};
// update Voucher
export const updateVoucher = (id: number, data: { statusId: string }) => {
    return AxiosInstance.patch(`/voucher/update/${id}`, data);
};
// Search Product
export const searchProduct = (typeSearch: string, query: string) => {
    return AxiosInstance.get(`/${typeSearch}/search?${query}`);
};
// Search Product
export const searchBlog = (typeSearch: string, query: string) => {
    return AxiosInstance.get(`/${typeSearch}?${query}`);
};
// Get Profile
export const getProfile = () => {
    return AxiosInstance.get('/user/profile');
};
// Send verify mail
export const verifyMail = () => {
    return AxiosInstance.post('/user/verify-email');
};
// Verify Api
export const verifyApi = (data: { token: string }) => {
    return AxiosInstance.patch('/user/verify', data);
};
// get Provinces
export const getProvinces = () => {
    return axios.get(`${process.env.REACT_APP__PROVINCES__URL}`);
};
// get District
export const getDistrict = (query: string) => {
    return axios.get(`${process.env.REACT_APP__PROVINCES__URL}${query}`);
};
export const getWard = (query: string) => {
    return axios.get(`${process.env.REACT_APP__DISTRICT__URL}${query}`);
};
export const getWardById = (query: string) => {
    return axios.get(`${process.env.REACT_APP__WARD__URL}${query}`);
};
// create Address
export const createAddress = (data: {
    shipName: string;
    shipAddress: string;
    shipPhoneNumber: string;
    shipEmail: string;
}) => {
    return AxiosInstance.post('/user/address', data);
};
// get Address
export const getAddress = () => {
    return AxiosInstance.get('/user/address');
};
// update Address
export const updateAddress = (
    id: number,
    data: {
        shipName: string;
        shipAddress: string;
        shipPhoneNumber: string;
        shipEmail: string;
    },
) => {
    return AxiosInstance.put(`/user/address/${id}`, data);
};
// Delete Address
export const deleteAddress = (id: number) => {
    return AxiosInstance.delete(`/user/address/${id}`);
};
// Add Voucher in List
export const addVoucher = (code: string) => {
    return AxiosInstance.patch(`/user/voucher/add/${code}`);
};
// Send Mail Change Password
export const sendMailChangePassord = () => {
    return AxiosInstance.post(`/user/change-pass`);
};
// Change Password
export const changePassword = (data: { token: string; newPass: string }) => {
    return AxiosInstance.patch(`/user/change-pass`, data);
};
// Get type Ship
export const getTypeShip = () => {
    return AxiosInstance.get('/order/type-ship');
};
// Get payMent
export const getPayment = () => {
    return AxiosInstance.get('/all-code/PAYMENT');
};
// create Order
export const createOrder = (data: { addressUserId: number; typeShipId: number; type: string }) => {
    return AxiosInstance.post(`/order`, data);
};
// Get Detail Order
export const detailOrderById = (id: number) => {
    return AxiosInstance.get(`/order/${id}`);
};
// use Voucher Price
export const VoucherUseApi = (data: { voucherCode: string }) => {
    return AxiosInstance.put(`/cart`, data);
};
// history Order
export const historyOrder = (id: number, currentPage: number, size: number) => {
    return AxiosInstance.get(`/order?userId=${id}&page=${currentPage}&size=${size}`);
};
