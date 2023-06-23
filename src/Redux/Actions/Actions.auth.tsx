import { Action, Dispatch } from 'redux';
import { loginAdmin } from '../../component/utils/Api/Api';
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
