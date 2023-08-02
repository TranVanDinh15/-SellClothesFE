import { FormInstance, message } from 'antd';
import { AddBlog, GetBlog } from '../../../utils/Api/Api';
import { formAddBlog } from './Blog';

export const handleGetBlog = async (
    currentPage: number,
    pageSize: number,
    setDataTable: React.Dispatch<React.SetStateAction<[]>>,
    setTotal: React.Dispatch<React.SetStateAction<number>>,
): Promise<void> => {
    const response = await GetBlog(currentPage, pageSize);
    if (response && response.status == 200) {
        console.log(response);
        setDataTable(response.data?.data);
        setTotal(response.data?.meta?.totalItems?.value);
    }
};
export const handleAddBlog = async (
    data: { title: string; shortDescription: string },
    isLoadBlog: boolean,
    setIsLoadBlog: React.Dispatch<React.SetStateAction<boolean>>,
    setIsModalAddOpen: React.Dispatch<React.SetStateAction<boolean>>,
    formAdd: FormInstance<formAddBlog>,
): Promise<void> => {
    const response = await AddBlog(data);
    if (response && response.status == 201) {
        console.log(response);
        console.log('addd');
        setTimeout(() => {
            setIsLoadBlog(!isLoadBlog);
        }, 1000);
        setIsModalAddOpen(false);
        message.success('Tạo thành công');
        // formAdd.setFieldsValue({
        //     title: '',
        //     shortDescription: '',
        // });
    }
};
