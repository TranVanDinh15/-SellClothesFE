import React from 'react';

import { CartConstant } from '../Actions/Actions.constant';
import { dataCart } from '../../component/Page/Client/Cart/CartInterFace';
interface InitialState {
    cartRedux: dataCart | null;
}
const initialState: InitialState = { cartRedux: null };

const CartReducers = (state = initialState, action: any) => {
    switch (action.type) {
        case CartConstant.UPDATE__CART:
            return {
                cartRedux: action.payLoad.CartData,
            };

        default:
            return state;
    }
};

export default CartReducers;
