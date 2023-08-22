import { FormInstance, message } from 'antd';
import { AddBlog, GetBlog, getSubjectId, updateBlog } from '../../../utils/Api/Api';
import { formAddBlog, formUpdate, selectBlog } from './Blog';
import { DatatypeBlog } from '../../../Table/TableInterface';

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
            setIsLoadBlog((isLoadBlog) => !isLoadBlog);
        }, 1000);
        setIsModalAddOpen(false);
        message.success('Tạo thành công');
        // formAdd.setFieldsValue({
        //     title: '',
        //     shortDescription: '',
        // });
    }
};
export const handleGetSubjectId = async (
    setSubjectBlog: React.Dispatch<React.SetStateAction<selectBlog[] | undefined>>,
): Promise<void> => {
    const response = await getSubjectId();
    if (response && response.status == 200) {
        if (response?.data && response?.data?.data) {
            const mapData = response?.data?.data.map((item: any) => {
                return {
                    label: item?.value,
                    value: item?.code,
                };
            });
            if (mapData) {
                setSubjectBlog?.(mapData);
            }
        }
    }
};
export const handleUpdateBlog = async (
    id: number,
    value: formUpdate,
    contentHtml: string,
    contentMarkdown: string,
    image: string[],
    setIsOpenUpdateBlog: React.Dispatch<React.SetStateAction<boolean>>,
    setIsLoadBlog: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> => {
    const dataUpdate = {
        contentHtml: contentHtml,
        contentMarkdown: contentMarkdown,
        images: image,
        shortDescription: value.shortDescription,
        statusId: value.statusId,
        subjectId: value.subjectId,
        title: value.title,
    };
    const response = await updateBlog(id, dataUpdate);
    console.log(response);
    if (response && response.status == 200) {
        setIsOpenUpdateBlog(false);
        setIsLoadBlog((isLoadBlog) => !isLoadBlog);
        message.success('Cập nhật thành công');
    }
};
export const handleUpdateImageBlog = async (
    id: number,
    data: {
        contentHtml: string;
        contentMarkdown: string;
        images: string[];
        shortDescription: string;
        statusId: string;
        subjectId: string;
        title: string;
    },
    setIsLoadBlog: React.Dispatch<React.SetStateAction<boolean>>,
    setUpdateImage: React.Dispatch<React.SetStateAction<any>>,
    currentPage: number,
    pageSize: number,
    setImagesUploadMultiple: React.Dispatch<React.SetStateAction<any | undefined>>,
    setImageDp: React.Dispatch<React.SetStateAction<[]>>,
): Promise<void> => {
    console.log(data);
    const response = await updateBlog(id, data);
    if (response && response.status == 200) {
        console.log(response);
        const responseGetBlog = await GetBlog(currentPage, pageSize);
        console.log(responseGetBlog);
        if (responseGetBlog && responseGetBlog?.status == 200) {
            const findImageUpdate = responseGetBlog?.data?.data.filter((item: any) => {
                return item?.id == id;
            });
            setIsLoadBlog((isLoadBlog) => !isLoadBlog);
            console.log(findImageUpdate);
            setUpdateImage(findImageUpdate[0].images);
            setImagesUploadMultiple([]);
            setImageDp([]);
            message.success('Đã lưu ');
        }
    } else {
        message.error('Vui lòng điền đầy đủ thông tin');
    }
};
