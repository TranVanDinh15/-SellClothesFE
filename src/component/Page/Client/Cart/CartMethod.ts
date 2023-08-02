import { Dispatch } from 'redux';
import { addCartApi, cartInitApi } from '../../../utils/Api/Api';
import { dataCart } from './CartInterFace';
import { updateCartAction } from '../../../../Redux/Actions/Action.cart';

export const handleGetCart = async (
    setCartData: React.Dispatch<React.SetStateAction<dataCart | undefined>>,
    dispatch: any,
): Promise<void> => {
    try {
        const response = await cartInitApi();
        if (response && response.status == 200) {
            setCartData(response.data);
            dispatch(updateCartAction(response?.data));
        }
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};
export const handleUpdateQuantity = async (productDetailSizeId: number, step: number, dispatch: any) => {
    const response = await addCartApi({
        productDetailSizeId: `${productDetailSizeId}`,
        quantity: step,
    });
    if (response && response.status == 201) {
        // setCartData(response.data);
        dispatch(updateCartAction(response?.data));
    }
    console.log(response);
};
