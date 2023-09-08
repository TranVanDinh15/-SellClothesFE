import { FormInstance, message } from 'antd';
import {
    CreateReceipt,
    GetDetailReceipt,
    UpdateReceipt,
    createDetailReceipt,
    getAllCategory,
    getListProduct,
    getProductByCategory,
    getProductDetailById,
    getProductDetailSize,
    getReceipt,
    updateDetailReceipt,
} from '../../../utils/Api/Api';
import AxiosInstance from '../../../utils/Api/Axios-custom';
import { formAddReceipt, listValuesSupplier } from './Receipt';
import { categoryDefine, productdefine } from './ReceiptInterface';
import { formAddDetailReceipt } from './ReceiptDetail';

export const HandleGetReceipt = async (
    currentPage: number,
    pageSize: number,
    setDatatable: React.Dispatch<React.SetStateAction<[]>>,
    setTotal: React.Dispatch<React.SetStateAction<number | undefined>>,
): Promise<void> => {
    try {
        const response = await getReceipt(currentPage, pageSize);
        console.log(response);
        if (response && response.status == 200) {
            console.log(response);
            setDatatable(response.data?.data);
            setTotal(response.data?.meta?.totalItems);
        }
    } catch (error) {
        console.log(error);
    }
};
export const handleGetSelectSupplier = async (
    setListSelectSupplier: React.Dispatch<React.SetStateAction<listValuesSupplier[] | null>>,
): Promise<void> => {
    const response = await AxiosInstance.get(`/supplier?page=1&size=1000&sortupdatedAt=DESC`);
    if (response && response.status == 200) {
        console.log(response);
        if (response.data?.data && response.data?.data.length > 0) {
            const mapData = response.data?.data.map((item: any) => {
                return {
                    value: item?.id,
                    label: item?.name,
                };
            });
            if (mapData) {
                setListSelectSupplier(mapData);
            }
        }
    }
};
// onchangeSelect category
export const onChangeSupplierSelect = (value: string) => {
    // setCategorySave(value);
};

export const onSearchSupplierSelect = (value: string) => {
    console.log('search:', value);
};
// Handle Add Receipt
export const handleAddReCeipt = async (
    value: any,
    isLoadReceipt: boolean,
    setIsLoadReceipt: React.Dispatch<React.SetStateAction<boolean>>,
    setIsModalAddsupplier: React.Dispatch<React.SetStateAction<boolean>>,
    formAdd: FormInstance<formAddReceipt>,
): Promise<void> => {
    try {
        console.log(value);
        const response = await CreateReceipt(value);
        if (response && response.status == 201) {
            console.log(response);
            if (isLoadReceipt) {
                setIsLoadReceipt(false);
            } else {
                setIsLoadReceipt(true);
            }
            setIsModalAddsupplier(false);
            message.success('tạo thành công');
            formAdd.setFieldsValue({
                supplierId: 0,
            });
        }
    } catch (error) {
        message.error('Đã có lỗi xảy ra');
    }
};
// Handle Update Receipt
export const handleUpdateReceipt = async (
    id: number,
    data: { supplierId: number },
    isLoadReceipt: boolean,
    setIsLoadReceipt: React.Dispatch<React.SetStateAction<boolean>>,
    setIsModalUpdatesupplier: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> => {
    try {
        const response = await UpdateReceipt(id, data);
        console.log(response);
        if (response && response.status == 200) {
            setIsLoadReceipt(!isLoadReceipt);
            setIsModalUpdatesupplier(false);
        }
    } catch (error) {
        message.error('Đã có lỗi xảy ra');
    }
};

// --------Handle Detail Receipt---------//

export const HandleGetDetailReceipt = async (
    id: number,
    currentPage: number,
    pageSize: number,
    setDatatable: React.Dispatch<React.SetStateAction<[]>>,
    setTotal: React.Dispatch<React.SetStateAction<number | undefined>>,
): Promise<void> => {
    try {
        const response = await GetDetailReceipt(id, currentPage, pageSize);
        console.log(response);
        if (response && response.status == 200) {
            console.log(response);
            setDatatable(response.data?.data);
            setTotal(response.data?.meta?.totalItems);
        }
    } catch (error) {
        console.log(error);
    }
};

export const HandleGetCategoryReceipt = async (
    currentPage: number,
    setCategoryApp: React.Dispatch<React.SetStateAction<categoryDefine[] | null>>,
): Promise<void> => {
    const response = await getAllCategory(currentPage, 2000);
    if (response && response.status == 200) {
        if (response.data?.data && response.data?.data.length > 0) {
            const mapdata = response.data?.data.map((item: any) => {
                return {
                    label: item.value,
                    value: item.code,
                };
            });
            setCategoryApp(mapdata);
        }
    }
};
export const onChangeCategorySelect = async (
    value: any,
    setProductApp: React.Dispatch<React.SetStateAction<categoryDefine[] | null>>,
    setProductDetailApp: React.Dispatch<React.SetStateAction<categoryDefine[] | null>>,
    setProductDetailSizeApp: React.Dispatch<React.SetStateAction<categoryDefine[] | null>>,
): Promise<void> => {
    console.log(value);
    const response = await getProductByCategory(value);
    if (response && response.status == 200) {
        console.log(response);
        if (response.data?.data && response.data?.data.length > 0) {
            const mapdata = response.data?.data.map((item: any) => {
                return {
                    label: item.name,
                    value: item.id,
                };
            });
            setProductApp(mapdata);
        } else {
            setProductApp(null);
            setProductDetailApp(null);
            setProductDetailSizeApp(null);
        }
    }
};
export const onChangeProductSelect = async (
    value: any,
    setProductDetailApp: React.Dispatch<React.SetStateAction<categoryDefine[] | null>>,
): Promise<void> => {
    console.log(value);
    const response = await getProductDetailById(value);
    if (response && response.status == 200) {
        console.log(response);
        if (response.data && response.data.length > 0) {
            const mapdata = response.data.map((item: any) => {
                return {
                    label: item.colorId,
                    value: item.id,
                };
            });
            setProductDetailApp(mapdata);
        } else {
            setProductDetailApp(null);
        }
    }
};
export const onChangeProductSizeSelect = async (
    value: any,
    setProductDetailSizeApp: React.Dispatch<React.SetStateAction<productdefine[] | null>>,
): Promise<void> => {
    console.log(value);
    const response = await getProductDetailSize(value);
    if (response && response.status == 200) {
        console.log(response);
        if (response.data && response.data.length > 0) {
            const mapdata = response.data.map((item: any) => {
                return {
                    label: item.name,
                    value: item.id,
                };
            });
            setProductDetailSizeApp(mapdata);
        } else {
            setProductDetailSizeApp(null);
        }
    }
};
// Handle Add Detail Receipt
export const HandleAddDetailReceipt = async (
    value: any,
    receiptId: number,
    isLoadDetailReceipt: boolean,
    setIsLoadDetailReceipt: React.Dispatch<React.SetStateAction<boolean>>,
    setIsModalAddOpen: React.Dispatch<React.SetStateAction<boolean>>,
    formAdd: FormInstance<formAddDetailReceipt>,
    setProductApp: React.Dispatch<React.SetStateAction<categoryDefine[] | null>>,
    setProductDetailApp: React.Dispatch<React.SetStateAction<productdefine[] | null>>,
    setProductDetailSizeApp: React.Dispatch<React.SetStateAction<productdefine[] | null>>,
): Promise<void> => {
    console.log(value);
    const data = {
        receiptId: receiptId,
        productDetailSizeId: value?.productDetailSizeId,
        quantity: value?.quantity,
        price: value?.price,
    };
    if (data.receiptId && data.productDetailSizeId && data.quantity && data.receiptId) {
        const response = await createDetailReceipt(data);
        if (response && response.status == 201) {
            console.log(response);
            message.success('Tạo thành công');
            setIsLoadDetailReceipt(!isLoadDetailReceipt);
            setIsModalAddOpen(false);
            formAdd.setFieldsValue({
                quantity: undefined,
                price: undefined,
                categoryId: undefined,
            });
            setProductApp(null);
            setProductDetailApp(null);
            setProductDetailSizeApp(null);
        }
    } else {
        message.error('Vui lòng điền đầy đủ thông tin');
    }
};
// Handle Update Detail Receipt
export const HandleUpdateDetapReceipt = async (
    productDetailSizeId: number,
    receiptId: number,
    id: number,
    value: any,
    setIsOpenUpdateDetailReceipt: React.Dispatch<React.SetStateAction<boolean>>,
    isLoadDetailReceipt: boolean,
    setIsLoadDetailReceipt: React.Dispatch<React.SetStateAction<boolean>>,
    setProductApp: React.Dispatch<React.SetStateAction<categoryDefine[] | null>>,
    setProductDetailApp: React.Dispatch<React.SetStateAction<productdefine[] | null>>,
    setProductDetailSizeApp: React.Dispatch<React.SetStateAction<productdefine[] | null>>,
) => {
    console.log(value);
    const data = {
        receiptId: receiptId,
        productDetailSizeId: value?.productDetailSizeId ? value?.productDetailSizeId : productDetailSizeId,
        quantity: value?.quantity,
        price: value?.price,
    };
    console.log(data);
    if (data.receiptId && data.productDetailSizeId && data.quantity && data.receiptId) {
        const response = await updateDetailReceipt(id, data);
        if (response && response.status == 200) {
            setIsLoadDetailReceipt(!isLoadDetailReceipt);
            setIsOpenUpdateDetailReceipt(false);
            setProductApp(null);
            setProductDetailApp(null);
            setProductDetailSizeApp(null);
            message.success('Cập nhật thành công');
        }
    } else {
        message.error('Vui lòng điền đầy đủ thông tin');
    }
};
