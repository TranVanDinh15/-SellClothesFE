import { NavigateProps } from 'react-router-dom';
import { Dispatch } from 'redux';
import { SortUpdateAction, createAtUpdateAction } from '../../../../../Redux/Actions/Actions.url';

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
