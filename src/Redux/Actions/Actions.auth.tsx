import { Action, Dispatch } from 'redux';
import { LogOut, loginAdmin } from '../../component/utils/Api/Api';
import { AppDispatch } from '../../store';
import { authConstant } from './Actions.constant';
import { dataLogin } from './ActionCreator/ActionCreator';
import { message } from 'antd';
export const loginActions: any = (dataLogin: any, navigate: any) => {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: authConstant.LOGIN__REQUEST,
        });
        console.log(dataLogin);
        const response = await loginAdmin(dataLogin);
        if (response && response.status == 200) {
            const accessToken = response.data.accessToken;
            const data = {
                dob: response?.data?.user?.dob,
                email: response?.data?.user?.email,
                firstName: response?.data?.user?.email,
                fullName: response?.data?.user?.fullName,
                genderId: response?.data?.user?.genderId,
                image: response?.data?.user?.image,
                lastName: response?.data?.user?.lastName,
                phone: response?.data?.user?.phoneNumber,
            };
            console.log(response);
            dispatch({
                type: authConstant.LOGIN__SUCCESS,
                payLoad: {
                    user: response?.data?.user,
                },
            });
            if (accessToken) {
                localStorage.setItem('token', accessToken);
                navigate('/Admin');
                message.success('Đăng nhập thành công !');
            }
        }
    };
};
export const loginClientActions: any = (dataLogin: any, navigate: any) => {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: authConstant.LOGIN__REQUEST,
        });
        console.log(dataLogin);
        const response = await loginAdmin(dataLogin);
        console.log(response);
        if (response && response.status == 200) {
            const accessToken = response.data.accessToken;
            const data = {
                dob: response?.data?.user?.dob,
                email: response?.data?.user?.email,
                firstName: response?.data?.user?.email,
                fullName: response?.data?.user?.fullName,
                genderId: response?.data?.user?.genderId,
                image: response?.data?.user?.image,
                lastName: response?.data?.user?.lastName,
                phone: response?.data?.user?.phoneNumber,
            };
            if (accessToken) {
                dispatch({
                    type: authConstant.LOGIN__SUCCESS,
                    payLoad: {
                        user: response?.data?.user,
                    },
                });
                localStorage.setItem('token', accessToken);
                navigate('/');
                message.success('Đăng nhập thành công !');
            } else {
            }
        } else {
            message.error('thông tin tài khoản không chính xác!!');
        }
    };
};
export const logoutActions: any = (setIsLoadToken: React.Dispatch<React.SetStateAction<boolean>>) => {
    return async (dispatch: Dispatch) => {
        const response = await LogOut();
        console.log(response);
        if (response && response.status == 200) {
            message.success('Đã đăng xuất tài khoản');
            localStorage.removeItem('token');
            setIsLoadToken((isLoadToken) => !isLoadToken);
            dispatch({
                type: authConstant.LOGOUT__SUCCESS,
                payLoad: {
                    user: null,
                },
            });
        }
    };
};
