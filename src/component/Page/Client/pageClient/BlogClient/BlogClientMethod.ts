import { GetBlogById, GetBlogBySubjectId } from '../../../../utils/Api/Api';
import { dataBlog } from './BlogClient';
import { detailBlog } from './BlogClientItem';

export const handleGetBlogById = async (
    SubjectId: string,
    currentPage: number,
    pageSize: number,
    setDataBlog: React.Dispatch<React.SetStateAction<dataBlog[]>>,
    setTotal: React.Dispatch<React.SetStateAction<number>>,
): Promise<void> => {
    const response = await GetBlogBySubjectId(SubjectId, currentPage, pageSize);
    if (response && response.status == 200) {
        setDataBlog(response.data?.data);
        setTotal(response.data?.meta?.totalItems?.value);
    }
};
export const handleGetDetailBlog = async (
    id: number,
    setDataDetailBlog: React.Dispatch<React.SetStateAction<detailBlog | undefined>>,
): Promise<void> => {
    const response = await GetBlogById(id);
    if (response && response.status == 200) {
        setDataDetailBlog(response.data);
    }
};
