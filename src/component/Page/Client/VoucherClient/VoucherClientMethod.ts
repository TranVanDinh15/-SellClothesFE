import { message } from 'antd';
import { addVoucher, getVoucher, getVoucherClient } from '../../../utils/Api/Api';
import { listVoucherIF } from './VoucherClient';
export const handleGetVoucherClient = async (
    currentPage: number,
    pageSize: number,
    setDataVoucher: React.Dispatch<React.SetStateAction<listVoucherIF[] | null>>,
    setTotal: React.Dispatch<React.SetStateAction<number | undefined>>,
): Promise<void> => {
    const response = await getVoucherClient(currentPage, pageSize);
    if (response && response.status == 200) {
        console.log(response);
        setDataVoucher(response.data?.data);
        setTotal(response.data?.meta?.totalItems);
    }
};
export const handleAddVoucherinList = async (code: string): Promise<void> => {
    const response = await addVoucher(code);
    console.log(response);
    response && response.status == 200 && message.success('Đã thêm Voucher vào danh sách');
    response && response.status == 403 && message.error('Bạn đã thêm Voucher này rồi ');
};
