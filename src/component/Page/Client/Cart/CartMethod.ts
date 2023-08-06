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
export const handleUpdateQuantity = async (
    productDetailSizeId: number,
    step: number,
    dispatch: any,
    setIsLoadCart: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    const response = await addCartApi({
        productDetailSizeId: `${productDetailSizeId}`,
        quantity: step,
    });
    console.log(response);
    if (response && response.status == 201) {
        const responsInitCart = await cartInitApi();
        if (responsInitCart && responsInitCart.status == 200) {
            console.log(responsInitCart);
            dispatch(updateCartAction(responsInitCart?.data));
            setIsLoadCart((isLoadCart) => !isLoadCart);
        }
    }
    console.log(response);
};
export const hadnleUpdateZero = async (productDetailSizeId: number, step: number, dispatch: any) => {
    const response = await addCartApi({
        productDetailSizeId: `${productDetailSizeId}`,
        quantity: step,
    });
    if (response && response.status == 201) {
        const responsInitCart = await cartInitApi();
        if (responsInitCart && responsInitCart.status == 200) {
            console.log(responsInitCart);
            dispatch(updateCartAction(responsInitCart?.data));
            // setIsLoadCart((isLoadCart) => !isLoadCart);
        }
    }
    console.log(response);
};
