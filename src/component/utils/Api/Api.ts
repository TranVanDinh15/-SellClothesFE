import AxiosInstance from './Axios-custom';
export const getAllBrand = () => {
    return AxiosInstance.get('/all-code/BRAND');
};
