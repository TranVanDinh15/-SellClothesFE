import { FormInstance, message } from 'antd';
import { DatatypeSupplier } from '../../../Table/TableInterface';
import { UpdateSupplier, createSupplier, getSupplier } from '../../../utils/Api/Api';
import { FormValues } from './Supplier';

export const showModalUpdateSupplier = (setIsModalUpdate: React.Dispatch<React.SetStateAction<boolean>>) => {
    setIsModalUpdate(true);
};
export const handlegetSupplier = async (
    currentPage: number,
    pageSize: number,
    setDatatable: React.Dispatch<React.SetStateAction<[]>>,
    setTotal: React.Dispatch<React.SetStateAction<number | undefined>>,
): Promise<void> => {
    try {
        const response = await getSupplier(currentPage, pageSize);
        if (response && response.status == 200) {
            console.log(response);
            setDatatable(response.data?.data);
            setTotal(response.data?.meta?.totalItems);
        }
    } catch (error) {
        console.log(error);
    }
};
// Handle Ok add Supplier
export const handleOkaddSupplier = () => {};
// Handlecancel Add Supplier
export const handleCancelAddSupplier = (setIsModalAddSupplier: React.Dispatch<React.SetStateAction<boolean>>) => {
    setIsModalAddSupplier(false);
};
export const onFinishAddSupplier = async (
    value: { name: string; address: string; email: string },
    isLoadSupplier: boolean,
    setIsLoadSupplier: React.Dispatch<React.SetStateAction<boolean>>,
    setIsModalAddsupplier: React.Dispatch<React.SetStateAction<boolean>>,
    formAdd: FormInstance<FormValues>,
): Promise<void> => {
    console.log(value);
    try {
        const response = await createSupplier(value);
        if (response && response.status == 201) {
            console.log(response);
            if (isLoadSupplier) {
                setIsLoadSupplier(false);
            } else {
                setIsLoadSupplier(true);
            }
            message.success('Thêm thành công');
            setIsModalAddsupplier(false);
            formAdd.setFieldsValue({
                email: '',
                name: '',
                address: '',
            });
        }
    } catch (error) {
        console.log(error);
        message.error('Đã có lỗi xảy ra');
    }
};
// Xử lý Update Supplier
export const onFinishUpdateSupplier = async (
    id: number,
    data: { name: string; address: string; email: string },
    isLoadSupplier: boolean,
    setIsLoadSupplier: React.Dispatch<React.SetStateAction<boolean>>,
    setIsModalUpdatesupplier: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> => {
    console.log(id, data);
    try {
        const response = await UpdateSupplier(id, data);
        console.log(response);
        if (response && response.status == 200) {
            if (isLoadSupplier) {
                setIsLoadSupplier(false);
            } else {
                setIsLoadSupplier(true);
            }
            message.success('Cập nhật thành công');
            setIsModalUpdatesupplier(false);
        }
    } catch (error) {
        message.error('Đã có lỗi xảy ra');
    }
};
