import { message } from 'antd';
import { updateCartAction } from '../../../../../Redux/Actions/Action.cart';
import { VoucherUseApi, createOrder, getPayment, getTypeShip } from '../../../../utils/Api/Api';
import { dataCart } from '../../Cart/CartInterFace';
import { payMent, typeShip } from './CheckOut';

export const handleGetTypeShip = async (
    setTypeShip: React.Dispatch<React.SetStateAction<typeShip[] | null>>,
): Promise<void> => {
    const response = await getTypeShip();
    if (response && response.status == 200) {
        setTypeShip(response?.data);
    }
};
export const handleGetPayment = async (
    setTypeShip: React.Dispatch<React.SetStateAction<payMent[] | null>>,
): Promise<void> => {
    const response = await getPayment();
    console.log(response);
    if (response && response.status == 200) {
        setTypeShip(response.data?.data);
    }
};
export const handleOrderProduct = async (
    // setTypeShip: React.Dispatch<React.SetStateAction<payMent[] | null>>,
    data: {
        addressUserId: number;
        typeShipId: number;
        type: string;
        voucherCode: string;
    },
    paymentCode: string,
    navigate: any,
): Promise<void> => {
    console.log(data);
    if (paymentCode === process.env.REACT_APP__CODE__PAYMENT__VNPAY) {
        const response = await createOrder(data);
        console.log(response);
        if (response && response.status == 201) {
            window.location.href = `${process.env.REACT_APP_BASE_URL}/payments/create_payment_url?orderId=${response?.data?.id}`;
        }
    }
};
export const handleuseVoucher = async (dispatch: any, data: { voucherCode: string }): Promise<void> => {
    try {
        const response = await VoucherUseApi(data);
        if (response && response.status == 200) {
            dispatch(updateCartAction(response?.data));
        } else {
            message.error(response.data?.message);
        }
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};
