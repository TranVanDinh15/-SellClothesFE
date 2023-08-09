import { message } from 'antd';
import { getAllCategory, getSubjectId } from '../../../utils/Api/Api';
import { dataCategoy, headerCategory, headerCategoryMapItem } from './HeaderInterface';
const filterCategory = (dataCategory: dataCategoy[], parentCode: string) => {
    var tree = [];
    for (var i = 0; i < dataCategory.length; i++) {
        if (dataCategory[i].parentCode === parentCode) {
            var node: any = {
                value: dataCategory[i].value,
                code: dataCategory[i].code,
                children: filterCategory(dataCategory, dataCategory[i].code),
            };
            tree.push(node);
        }
    }
    return tree;
};
export const getListCategoryFun = async (setHeadercategory: React.Dispatch<React.SetStateAction<headerCategory[]>>) => {
    const response = await getAllCategory(1, 100);
    if (response && response.status == 200) {
        const resultHeaderCat = response.data.data.filter((item: headerCategoryMapItem, index: number) => {
            return item.parentCode == null;
        });
        setHeadercategory(resultHeaderCat);
    } else {
        message.error('Đã có lỗi xảy ra!');
    }
};
export const getListCategorySub = async (
    setDataCategory: React.Dispatch<React.SetStateAction<dataCategoy[]>>,
    code: string,
) => {
    const response = await getAllCategory(1, 100);
    if (response && response.status == 200 && response.data) {
        // const resultHeaderCat = response.data.data.filter((item: headerCategoryMapItem, index: number) => {
        //     return item.parentCode == null;
        // });
        // setHeadercategory(resultHeaderCat);
        const filterDataCat = filterCategory(response.data.data, code);
        setDataCategory(filterDataCat);
    } else {
        message.error('Đã có lỗi xảy ra!');
    }
};
export const showResultSearch = (setOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
    setOpen(true);
};

export const onCloseResultSearch = (setOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
    setOpen(false);
};
export const handleGetSubjectId = async (
    setSubjectId: React.Dispatch<React.SetStateAction<{ value: string; code: string; id: number }[] | undefined>>,
) => {
    const response = await getSubjectId();
    if (response && response.status == 200) {
        //    setSubjectId(response)
        const mapData = response.data?.data
            ? response.data?.data.map((item: any, index: any) => {
                  return {
                      value: item?.value,
                      code: item?.code,
                      id: item?.id,
                  };
              })
            : '';
        mapData && setSubjectId(mapData);
    }
};
