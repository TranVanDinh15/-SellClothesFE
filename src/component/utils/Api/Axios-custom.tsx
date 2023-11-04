import { message } from 'antd';
import axios from 'axios';
const BASE__URL = process.env.REACT_APP_BASE_URL;
const AxiosInstance = axios.create({
    baseURL: BASE__URL,
    withCredentials: true,
    headers: {
        'content-type': 'application/json',
    },
});

const token = localStorage.getItem('token');
AxiosInstance.defaults.headers.common = {
    Authorization: `Bearer ${token}`,
};
const handleRefreshToken = async () => {
    const response = await AxiosInstance.get('/auth/refresh');
    if (response && response.status == 200) {
        return response?.data?.accessToken;
    } else {
        return null;
    }
};
// Add a request interceptor
AxiosInstance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);
const NO_RETRY_HEADER = 'x-no-retry';
// Add a response interceptor
AxiosInstance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    async function (error) {
        const originalRequest = error.config;
        // if (
        //     error?.config &&
        //     error?.response &&
        //     error?.response?.status === 401 &&
        //     error.config.url === '/auth/refresh' &&
        //     !error.config.headers[NO_RETRY_HEADER]
        // ) {
        //     message.info('Hết thời gian chờ, Đăng nhập lại để tiếp tục !!');
        //     window.location.href = '/signIn';
        // }
        if (
            error.config &&
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry &&
            error.config.url != '/auth/refresh'
        ) {
            originalRequest._retry = true;
            const accessTokenLocal = localStorage.getItem('token');
            if (accessTokenLocal) {
                const access_token = await handleRefreshToken();
                if (access_token) {
                    error.config.headers['Authorization'] = `Bearer ${access_token}`;
                    localStorage.setItem('token', access_token);
                    return AxiosInstance.request(error.config);
                } else {
                    if (error.response.status === 401 || error.response.status === 403) {
                        // Giả sử rằng refreshToken hết hạn hoặc không hợp lệ trả về lỗi 401 hoặc 403
                        // Chuyển hướng người dùng đến trang đăng nhập
                        localStorage.removeItem('token');

                        if (window.location.pathname == '/Admin') {
                            message.info('Hết thời gian chờ, Đăng nhập lại để tiếp tục !!');
                            window.location.href = '/Login-Admin';
                        } else {
                            message.info('Hết thời gian chờ, Đăng nhập lại để tiếp tục !!');
                            setTimeout(() => {
                                window.location.reload();
                            }, 2000);
                        }
                        localStorage.clear();
                    }
                    // return Promise.reject(error);
                }
            }
            return error.response;
        }

        return error.response ?? Promise.reject(error);
        // return error;
    },
);
export default AxiosInstance;
