import { NavigateProps } from 'react-router-dom';
import { Dispatch } from 'redux';
import {
    ClientChooseColorDeleteAction,
    ClientChooseMaterialDeleteAction,
    SortUpdateAction,
    createAtUpdateAction,
    setDefaultAction,
} from '../../../../../Redux/Actions/Actions.url';
import { getCategoryColor, getCommentByIdProduct, getMaterialClient } from '../../../../utils/Api/Api';

export const handleChangeTitleSelect = (
    value: string,
    urlCustom: string,
    navigate: any,
    setvalueSelect: React.Dispatch<React.SetStateAction<string>>,
    disPatch: any,
    setIsChangeUrl: React.Dispatch<React.SetStateAction<boolean>>,
    sortCustom: string,
    createAtCustom: string,
) => {
    if (value == 'ASC' || value == 'DESC') {
        disPatch(SortUpdateAction(value));
        setIsChangeUrl(true);
    } else if (value == 'createdAt') {
        disPatch(createAtUpdateAction(value));
    } else if (value == 'default') {
        disPatch(setDefaultAction());
    }
};
// handle get Color product
export const handleGetColorProduct = async (setListColorProduct: React.Dispatch<React.SetStateAction<any>>) => {
    const response = await getCategoryColor();
    if (response && response.status == 200) {
        setListColorProduct(response.data.data);
    }
};
// Handle  delete choose Color
export const handleDeleteColor = (
    objectItem: {
        value: string;
        id: string;
        valueCode: string;
    },
    clientChooseCustom: [],
    setIsBorderColor: React.Dispatch<React.SetStateAction<any>>,
    disPatch: any,
) => {
    console.log(objectItem);
    disPatch(ClientChooseColorDeleteAction(objectItem, clientChooseCustom, setIsBorderColor));
};
// Handle get Material Color
export const handleGetMaterial = async (
    setMaterialFilter: React.Dispatch<React.SetStateAction<any>>,
): Promise<void> => {
    const response = await getMaterialClient();
    if (response.status == 200 && response.data) {
        setMaterialFilter(response?.data?.data);
    }
};
// Handle Delete choose Material
export const handleDeleteChooseMaterial = (
    objectItem: {
        id: string;
        value: string;
        materialCode: string;
    },
    clientChooseCustom: [],
    setIsBorderMaterial: React.Dispatch<React.SetStateAction<any>>,
    disPatch: any,
) => {
    disPatch(ClientChooseMaterialDeleteAction(objectItem, clientChooseCustom, setIsBorderMaterial));
};
