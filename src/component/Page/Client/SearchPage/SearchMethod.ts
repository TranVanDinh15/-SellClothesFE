import { searchProduct } from '../../../utils/Api/Api';
import { resultSearch } from '../Header/HeaderInterface';

export const handleGetAllResult = async (
    typeSearch: string,
    query: string,
    setResultSearch: React.Dispatch<React.SetStateAction<resultSearch[]>>,
): Promise<void> => {
    const response = await searchProduct(typeSearch, `name=${query ? query : '{}'}&page=1&size=2000`);
    if (response && response.status == 200) {
        setResultSearch(response.data?.data);
        // setResultBlog([]);
    }
};
