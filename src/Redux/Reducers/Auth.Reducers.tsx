import { authConstant } from '../Actions/Actions.constant';

const initialState = { isAuthenticate: false, user: null, isLoading: false, isfail: false };

const AuthReducers = (state = initialState, action: any) => {
    switch (action.type) {
        case authConstant.LOGIN__REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case authConstant.LOGIN__SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payLoad.user,
            };
        case authConstant.LOGIN__FAILUE:
            return {
                ...state,
                isLoading: false,
                isfail: action.payload,
            };
        default:
            return state;
    }
};

export default AuthReducers;
