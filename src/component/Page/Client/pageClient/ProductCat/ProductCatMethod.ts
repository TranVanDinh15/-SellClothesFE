import { NavigateProps } from 'react-router-dom';
import { Dispatch } from 'redux';
import {
    ClientChooseColorDeleteAction,
    SortUpdateAction,
    createAtUpdateAction,
} from '../../../../../Redux/Actions/Actions.url';
import { getCategoryColor } from '../../../../utils/Api/Api';

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
        // navigate(`${urlCustom}&sortid=${value}`);
        // setvalueSelect(value);
        disPatch(SortUpdateAction(value));
        setIsChangeUrl(true);
    } else if (value == 'createdAt') {
        // setvalueSelect(value);
        // navigate(`${urlCustom}&createdAt=ASC`);
        disPatch(createAtUpdateAction(value));
    } else if (value == 'default') {
        // setvalueSelect(value);
        // navigate(urlCustom);
    }
};
// handle get Color product
export const handleGetColorProduct = async (setListColorProduct: React.Dispatch<React.SetStateAction<any>>) => {
    const response = await getCategoryColor();
    if (response && response.status == 200) {
        setListColorProduct(response.data.data);
    }
};
// Handle  delete Color
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
    disPatch(ClientChooseColorDeleteAction(objectItem, clientChooseCustom, setIsBorderColor));
};
