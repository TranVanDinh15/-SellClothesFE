import { getProductByQuery } from '../../../utils/Api/Api';
import { dataCategoryProduct } from '../pageClient/ProductCat/ProductCatInterface';

export const handleGetProductSuggest = async (): Promise<void> => {};
export const handleGetProductSale = async (
    query: string,
    setListData: React.Dispatch<React.SetStateAction<dataCategoryProduct[] | null>>,
): Promise<void> => {
    const response = await getProductByQuery(query);
    if (response && response.status == 200) {
        const data = response?.data?.data;
        const resultData =
            data.length > 0
                ? data.map((item: dataCategoryProduct, index: number) => {
                      return {
                          id: item.id,
                          brandId: item.brandId,
                          categoryId: item.categoryId,
                          name: item.name,
                          material: item.material,
                          madeBy: item.madeBy,
                          sold: item.sold,
                          view: item.view,
                          rating: item?.rating,
                          detail: [...item.detail],
                      };
                  })
                : [];
        setListData(resultData);
    }
};
