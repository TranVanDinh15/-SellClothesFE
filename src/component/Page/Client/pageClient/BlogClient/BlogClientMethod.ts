import { GetBlogById } from '../../../../utils/Api/Api';
import { dataBlog } from './BlogClient';

export const handleGetBlogById = async (
    SubjectId: string,
    currentPage: number,
    pageSize: number,
    setDataBlog: React.Dispatch<React.SetStateAction<dataBlog[]>>,
    setTotal: React.Dispatch<React.SetStateAction<number>>,
): Promise<void> => {
    const response = await GetBlogById(SubjectId, currentPage, pageSize);
    if (response && response.status == 200) {
        setDataBlog(response.data?.data);
        setTotal(response.data?.meta?.totalItems?.value);
    }
};
