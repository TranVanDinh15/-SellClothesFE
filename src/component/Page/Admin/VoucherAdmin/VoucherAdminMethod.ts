import {
    createTypeVoucher,
    createVoucher,
    getCodeTypeVoucher,
    getStatus,
    getTypeVoucher,
    getVoucher,
    updateVoucher,
} from '../../../utils/Api/Api';
import type { Dayjs } from 'dayjs';
import { createTypeVoucherIF, dataCreateVoucher } from '../../../utils/Api/ApiInterFace';
import { typeVoucher } from '../../../Table/TableInterface';
import { StatusSelect } from './VoucherAdmin';
import { message } from 'antd';
export const handleGetTypeVoucher = async (
    setTypeVoucher: React.Dispatch<React.SetStateAction<[]>>,
    setTotal: React.Dispatch<React.SetStateAction<number | undefined>>,
    currentPage: number,
    pageSize: number,
): Promise<void> => {
    const response = await getTypeVoucher(pageSize, currentPage);
    if (response && response.status == 200) {
        console.log(response);
        setTypeVoucher(response.data?.data);
        setTotal(response.data?.meta?.totalItems);
    }
};
export const handleAddVoucher = async (
    data: dataCreateVoucher,
    setIsModalAddOpen: React.Dispatch<React.SetStateAction<boolean>>,
    formAdd: any,
    setIsLoadData: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> => {
    const response = await createVoucher(data);
    if (response && response.status == 201) {
        console.log(response);
        setIsModalAddOpen(false);
        formAdd.setFieldsValue({
            toDate: '',
            fromDate: '',
            typeVoucherId: '',
            amount: '',
            codeVoucher: '',
        });
        setIsLoadData((isLoadData) => !isLoadData);
        message.success('Đã thêm Voucher');
    }
};
// Xử lý thêm loại voucher
export const addTypeVoucher = async (
    data: createTypeVoucherIF,
    formAdd: any,
    setIsModalAddOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setIsLoadData: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> => {
    const dataCustom = {
        typeVoucherCode: data.typeVoucherCode,
        value: Number(data.value),
        minValue: Number(data.minValue),
        maxValue: Number(data.maxValue),
    };
    const response = await createTypeVoucher(dataCustom);
    if (response && response.status == 201) {
        formAdd.setFieldsValue({
            typeVoucherCode: '',
            value: '',
            minValue: '',
            maxValue: '',
        });
        setIsModalAddOpen(false);
        message.success('Thêm thành công');
        setIsLoadData((isLoadData) => !isLoadData);
    }
};
// Lấy typeCodeVochertừ All Code
export const getTypeCodeVoucher = async (
    setTypeVoucherCode: React.Dispatch<React.SetStateAction<StatusSelect[] | null>>,
): Promise<void> => {
    const response = await getCodeTypeVoucher();
    if (response && response.status == 200) {
        const mapData = response.data?.data
            ? response.data?.data.map((item: any) => {
                  return {
                      value: item?.code,
                      label: item?.value,
                  };
              })
            : [];
        setTypeVoucherCode(mapData);
    }
};
// get TypeVoucher Select
export const handleGetTypeVoucherSelect = async (
    setTypeVoucherSelect: React.Dispatch<React.SetStateAction<{ value: string; label: string }[] | null>>,
): Promise<void> => {
    const response = await getTypeVoucher(2000, 1);
    if (response && response.status == 200) {
        console.log(response);
        const mapdata = response.data?.data
            ? response.data?.data.map((item: any) => {
                  return {
                      label: item?.value,
                      value: item?.id,
                  };
              })
            : [];
        setTypeVoucherSelect(mapdata);
    }
};
// Lấy  Voucher
export const handlegetVoucher = async (
    currentPage: number,
    pageSize: number,
    setDataVoucher: React.Dispatch<React.SetStateAction<[]>>,
    setTotal: React.Dispatch<React.SetStateAction<number | undefined>>,
): Promise<void> => {
    const response = await getVoucher(currentPage, pageSize);
    if (response && response.status == 200) {
        console.log(response);
        setDataVoucher(response.data?.data);
        setTotal(response.data?.meta?.totalItems);
    }
};
export const handleGetStatusUpdate = async (
    setDataSelectStatus: React.Dispatch<React.SetStateAction<{ value: string; label: string }[] | null>>,
): Promise<void> => {
    const response = await getStatus();
    if (response && response.status == 200) {
        console.log(response);
        const mapData = response.data?.data
            ? response.data?.data.map((item: any) => {
                  return {
                      label: item?.value,
                      value: item?.code,
                  };
              })
            : [];
        setDataSelectStatus(mapData);
    }
};
export const handleUpdateVoucher = async (
    id: number,
    data: { statusId: string },
    setIsLoadData: React.Dispatch<React.SetStateAction<boolean>>,
    formUpdate: any,
    setIsModalUpdate: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> => {
    const response = await updateVoucher(id, data);
    console.log(response);
    if (response && response.status == 200) {
        message.success('Cập nhật thành công');
        setIsLoadData((isLoadData) => !isLoadData);
        setIsModalUpdate(false);
        formUpdate.setFieldsValue({
            statusId: '',
        });
    }
};
