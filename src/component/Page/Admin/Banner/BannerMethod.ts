import { FormInstance, message } from 'antd';
import { AddBanner, GetBanner, GetStatusAllCode, UpdateBanner } from '../../../utils/Api/Api';
import { StatusSelect, formAddBanner } from './Banner';

export const HandleGetBanner = async (
    currentPage: number,
    pageSize: number,
    setDataTable: React.Dispatch<React.SetStateAction<[]>>,
    setTotal: React.Dispatch<React.SetStateAction<number | undefined>>,
): Promise<void> => {
    const response = await GetBanner(currentPage, pageSize);
    if (response && response.status == 200) {
        setDataTable(response?.data?.data);
        setTotal(response?.data?.meta?.totalItems);
    }
};
export const HandleGetStatusSelect = async (
    setStatusSelect: React.Dispatch<React.SetStateAction<StatusSelect[] | undefined>>,
): Promise<void> => {
    const response = await GetStatusAllCode(1, 2000);
    if (response && response.status == 200) {
        if (response.data && response.data?.data && response.data?.data.length > 0) {
            const mapData = response.data?.data.map((item: any) => {
                return {
                    value: item?.code,
                    label: item?.value,
                };
            });
            setStatusSelect(mapData);
        }
    }
};
export const HandleAddBanner = async (
    value: {
        name: string;
        description: string;
        statusId: string;
    },
    image: string,
    isLoadBanner: boolean,
    setIsLoadBanner: React.Dispatch<React.SetStateAction<boolean>>,
    setIsModalAddOpen: React.Dispatch<React.SetStateAction<boolean>>,
    formAdd: FormInstance<formAddBanner>,
    setImagesUploadMultiple: React.Dispatch<React.SetStateAction<[]>>,
    setImageDp: React.Dispatch<React.SetStateAction<[]>>,
) => {
    console.log(value, image);
    const data = {
        name: value?.name,
        description: value?.description,
        statusId: value?.statusId,
        image: image,
    };
    if (data?.description && data?.image && data.name && data.statusId) {
        const response = await AddBanner(data);
        if (response && response.status == 201) {
            setIsLoadBanner(!isLoadBanner);
            setIsModalAddOpen(false);
            setImagesUploadMultiple([]);
            setImageDp([]);
            formAdd.setFieldsValue({
                name: '',
                description: '',
                statusId: '',
            });
        }
    } else {
        message.warning('Vui lòng nhập đầy đủ thông tin ');
    }
};
export const HandleUpdateBanner = async (
    id: number,
    value: { name: string; description: string; statusId: string },
    image: string,
    isLoadBanner: boolean,
    setIsLoadBanner: React.Dispatch<React.SetStateAction<boolean>>,
    setIsOpenUpdateBanner: React.Dispatch<React.SetStateAction<boolean>>,
    formUpdate: FormInstance<formAddBanner>,
    setImage: React.Dispatch<React.SetStateAction<string>>,
    setImagesUploadMultiple: React.Dispatch<React.SetStateAction<[]>>,
    setImageDp: React.Dispatch<React.SetStateAction<[]>>,
    setDataBannerUpdate: React.Dispatch<React.SetStateAction<any>>,
): Promise<void> => {
    const data = {
        name: value.name,
        description: value.description,
        statusId: value.statusId,
        image: image,
    };
    console.log(id, data);
    const response = await UpdateBanner(id, data);
    console.log(response);
    if (response && response.status == 200) {
        setIsLoadBanner(!isLoadBanner);
        setIsOpenUpdateBanner(false);
        formUpdate.setFieldsValue({
            name: '',
            description: '',
            statusId: '',
        });
        message.success('Cập nhật thành công');
        setImage('');
        setImagesUploadMultiple([]);
        setImageDp([]);
        setDataBannerUpdate('');
    } else {
        message.error('Đã có lỗi xảy ra');
    }
};
