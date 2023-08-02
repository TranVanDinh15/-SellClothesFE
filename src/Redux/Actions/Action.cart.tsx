import { Dispatch } from 'redux';
import { dataCart } from '../../component/Page/Client/Cart/CartInterFace';
import { CartConstant } from './Actions.constant';

export const updateCartAction = (dataCart: dataCart) => {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: CartConstant.UPDATE__CART,
            payLoad: {
                CartData: dataCart,
            },
        });
    };
};
