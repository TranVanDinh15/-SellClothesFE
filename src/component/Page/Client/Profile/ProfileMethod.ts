import { message } from 'antd';
import {
    createAddress,
    detailOrderById,
    getAddress,
    getDistrict,
    getProfile,
    getProvinces,
    getVoucherUser,
    getWard,
    getWardById,
    historyOrder,
    updateAddress,
    verifyApi,
    verifyMail,
} from '../../../utils/Api/Api';
import { profileIF } from './Account';
import { AddressIF, DistrictIF, WardIF, provincesIF } from './Address';
import { listVoucherIF } from '../VoucherClient/VoucherClient';
import { orderInterface } from './historyOrder';
import { detailOrderbyId } from './detailHistoryOrder';

export const handleGetProfile = async (
    setProfileUser: React.Dispatch<React.SetStateAction<profileIF | null>>,
): Promise<void> => {
    const response = await getProfile();
    console.log(response);
    if (response && response.status == 200) {
        setProfileUser(response.data);
    }
};
export const handleVerifyMail = async (
    setIsLoadAccount: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> => {
    const response = await verifyMail();
    if (response && response.status == 201) {
        message.success('Vui lòng kiểm tra email của bạn ');
    }
};
export const handleVerifyApi = async (data: { token: string }, navigate: any): Promise<void> => {
    const response = await verifyApi(data);
    console.log(response);
    if (response && response.status == 200) {
        navigate('/Profile');
    }
};
export const handleGetProvinces = async (
    setListProvinces: React.Dispatch<React.SetStateAction<provincesIF[] | null>>,
): Promise<void> => {
    const response = await getProvinces();
    if (response && response.status == 200) {
        const mapData = response?.data
            ? response?.data.map((item: any) => {
                  return {
                      label: item?.name,
                      value: item?.code,
                  };
              })
            : [];

        setListProvinces(mapData);
    }
};
export const onChangeProvincesSelect = async (
    value: any,
    setListDistrict: React.Dispatch<React.SetStateAction<DistrictIF[] | null>>,
    setProvincesName: React.Dispatch<React.SetStateAction<string>>,
): Promise<void> => {
    console.log(value);
    const response = await getDistrict(`/${value}?depth=2`);
    console.log(response);
    if (response && response.status == 200) {
        const mapdata = response.data?.districts.map((item: any) => {
            return {
                label: item?.name,
                value: item?.code,
            };
        });
        if (mapdata) {
            setProvincesName(response?.data?.name);
            setListDistrict(mapdata);
        }
    }
};
export const onChangeDistrictSelect = async (
    value: any,
    setListWards: React.Dispatch<React.SetStateAction<WardIF[] | null>>,
    setDistrictName: React.Dispatch<React.SetStateAction<string>>,
): Promise<void> => {
    console.log(value);
    const response = await getWard(`/${value}?depth=2`);
    console.log(response);
    if (response && response.status == 200) {
        const mapdata = response.data?.wards.map((item: any) => {
            return {
                label: item?.name,
                value: item?.code,
            };
        });
        if (mapdata) {
            setDistrictName(response?.data?.name);
            setListWards(mapdata);
        }
    }
};
export const onChangeWardSelect = async (
    value: any,
    setWardName: React.Dispatch<React.SetStateAction<string>>,
): Promise<void> => {
    console.log(value);
    const response = await getWardById(`/${value}`);
    console.log(response);
    if (response && response.status == 200) {
        setWardName(response.data?.name);
    }
};
export const handleCreateAddress = async (
    value: {
        shipName: string;
        shipPhoneNumber: string;
        shipEmail: string;
        shipAddress: string;
        addressDetail: string;
    },
    setIsModalAdd: React.Dispatch<React.SetStateAction<boolean>>,
    formAdd: any,
    setIsLoadAddress: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> => {
    console.log(value);
    const dataCreate = {
        shipName: value.shipName,
        shipAddress: `${value.shipAddress}, ${value.addressDetail}`,
        shipPhoneNumber: value?.shipPhoneNumber,
        shipEmail: value.shipEmail,
    };
    const response = await createAddress(dataCreate);
    console.log(response);
    if (response && response.status == 201) {
        setIsModalAdd(false);
        formAdd.setFieldsValue({
            shipName: '',
            shipPhoneNumber: '',
            shipEmail: '',
            provinces: '',
            district: '',
            ward: '',
            shipAddress: '',
        });
        setIsLoadAddress((isLoadAddress) => !isLoadAddress);
    }
};
export const handleGetAddress = async (
    setAddressUser: React.Dispatch<React.SetStateAction<AddressIF[] | null>>,
): Promise<void> => {
    const response = await getAddress();
    console.log(response);
    if (response && response.status == 200) {
        setAddressUser(response.data);
    }
};
export const handleUpdateAddress = async (
    id: number,
    value: {
        shipName: string;
        shipPhoneNumber: string;
        shipEmail: string;
        shipAddress: string;
        addressDetail: string;
    },
    setIsModalUpdate: React.Dispatch<React.SetStateAction<boolean>>,
    formUpdate: any,
    setIsLoadAddress: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> => {
    console.log(value);
    const dataCreate = {
        shipName: value.shipName,
        shipAddress: `${value.shipAddress}, ${value.addressDetail}`,
        shipPhoneNumber: value?.shipPhoneNumber,
        shipEmail: value.shipEmail,
    };
    const response = await updateAddress(id, dataCreate);
    console.log(response);
    if (response && response.status == 200) {
        setIsModalUpdate(false);
        formUpdate.setFieldsValue({
            shipName: '',
            shipPhoneNumber: '',
            shipEmail: '',
            provinces: '',
            district: '',
            ward: '',
            shipAddress: '',
        });
        setIsLoadAddress((isLoadAddress) => !isLoadAddress);
        message.success('Đã cập nhật địa chỉ');
    }
};
export const handleGetVoucherUser = async (
    id: number,
    currentPage: number,
    pageSize: number,
    setDataVoucher: React.Dispatch<React.SetStateAction<listVoucherIF[] | null>>,
    setTotal: React.Dispatch<React.SetStateAction<number | undefined>>,
): Promise<void> => {
    const response = await getVoucherUser(id, currentPage, pageSize);
    if (response && response.status == 200) {
        console.log(response);
        setDataVoucher(response.data?.data);
        setTotal(response.data?.meta?.totalItems);
    }
};
export const handleHistoryOrder = async (
    id: number,
    currentPage: number,
    pageSize: number,
    setListOrderHistory: React.Dispatch<React.SetStateAction<orderInterface[] | null>>,
    setTotal: React.Dispatch<React.SetStateAction<number | undefined>>,
): Promise<void> => {
    const response = await historyOrder(id, currentPage, pageSize);
    console.log(response);
    if (response && response.status == 200) {
        console.log(response);
        setListOrderHistory(response.data?.data);
        setTotal(response.data?.meta?.totalItems);
    }
};
export const handleGetDetailOrderById = async (
    id: number,
    setDetailOrder: React.Dispatch<React.SetStateAction<detailOrderbyId | null>>,
): Promise<void> => {
    const response = await detailOrderById(id);
    if (response && response.status == 200) {
        setDetailOrder(response.data);
    }
};
