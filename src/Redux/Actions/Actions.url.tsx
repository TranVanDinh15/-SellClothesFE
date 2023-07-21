import { Dispatch } from 'redux';
import { urlConstant } from './Actions.constant';
import { message } from 'antd';

export const UrlActions: any = (pramsUrl: string) => {
    console.log(pramsUrl);
    return async (dispatch: Dispatch) => {
        dispatch({
            type: urlConstant.URL__ACTION,
            payLoad: {
                url: pramsUrl,
            },
        });
    };
};
export function PriceUpdateAction(priceDP: any): any {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: urlConstant.URL__UPDATEPRICE,
            payLoad: {
                price: priceDP,
            },
        });
    };
}
export const SortUpdateAction: any = (sortDP: string) => {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: urlConstant.URL__UPDATESORT,
            payLoad: {
                sort: sortDP,
            },
        });
    };
};
export const createAtUpdateAction: any = (createAtDp: string) => {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: urlConstant.URL__UPDATECREATEAT,
            payLoad: {
                createAt: createAtDp,
            },
        });
    };
};
export const ColorUpdateAction: any = (colorItem: string, colorCustom: string[]) => {
    return async (dispatch: Dispatch) => {
        if (colorCustom.length > 0) {
            const existItem = colorCustom.includes(colorItem);
            console.log(existItem);
            if (existItem) {
                message.warning('Bạn đã chọn màu này rồi');
                return;
            } else {
                dispatch({
                    type: urlConstant.URL__UPDATECOLOR,
                    payLoad: {
                        color: colorItem,
                    },
                });
            }
        } else {
            dispatch({
                type: urlConstant.URL__UPDATECOLOR,
                payLoad: {
                    color: colorItem,
                },
            });
        }
    };
};
export const ClientChooseAction: any = (
    objectItem: {
        value: string;
        id: string;
        // valueChecked: number;
    },
    clientChooseCustom: [],
) => {
    return async (dispatch: Dispatch) => {
        if (clientChooseCustom.length > 0) {
            const existArray = clientChooseCustom.findIndex((item: { id: string; value: string }) => {
                return item.value == objectItem.value;
            });
            console.log(existArray);
            if (existArray === -1) {
                dispatch({
                    type: urlConstant.URL__CLIENTCHOOSE,
                    payLoad: {
                        objectItem: objectItem,
                    },
                });
            } else {
                // dispatch({
                //     type: urlConstant.URL__CLIENTCHOOSE,
                //     payLoad: {
                //         objectItem: clientChooseCustom,
                //     },
                // });
            }
        } else {
            dispatch({
                type: urlConstant.URL__CLIENTCHOOSE,
                payLoad: {
                    objectItem: objectItem,
                },
            });
        }
    };
};
export const ClientChooseDeleteAction: any = (
    objectItem: {
        value: string;
        id: string;
    },
    clientChooseCustom: [],
    setCheckValues: React.Dispatch<React.SetStateAction<any>>,
    handleCheckboxChange: (param: any) => void,
    setIsBorderColor: React.Dispatch<React.SetStateAction<any>>,
) => {
    return async (dispatch: Dispatch) => {
        console.log(objectItem);
        const filterData = clientChooseCustom.filter(
            (
                item: {
                    value: string;
                    id: string;
                },
                index,
            ) => {
                return objectItem.value != item.value;
            },
        );
        console.log(filterData);
        if (objectItem.id == 'price') {
            const checkBoxValuesMap = filterData.map((item: any) => {
                if (item.id == 'price') {
                    return item?.valueCheckBox;
                }
            });
            console.log(checkBoxValuesMap);
            // Thay đổi min max cho phù hợp khi xóa yêu cầu đã chọn trươc đó
            // Đồng thời
            handleCheckboxChange(checkBoxValuesMap);
            // Update lại group check box
            setCheckValues((state: any) => [...checkBoxValuesMap]);
        }
        if (objectItem.id == 'color') {
            const filterColor = filterData.filter((item: any) => {
                if (item.id == 'color') {
                    return item?.valueCode;
                }
            });
            const codeColor = filterColor.map((item: any) => {
                return item?.valueCode;
            });
            setIsBorderColor(codeColor);
            dispatch({
                type: urlConstant.URL__DELETECOLOR,
                payLoad: {
                    colorAfterDelete: codeColor,
                },
            });
        }
        dispatch({
            type: urlConstant.URL__DELETECHOOSE,
            payLoad: {
                ClientChooseDelete: filterData,
            },
        });
    };
};
export const ClientChooseCheckBoxDeleteAction: any = (
    objectItem: {
        value: string;
        id: string;
    },
    clientChooseCustom: [],
) => {
    return async (dispatch: Dispatch) => {
        const filterData = clientChooseCustom.filter(
            (
                item: {
                    value: string;
                    id: string;
                },
                index,
            ) => {
                return objectItem.value != item.value;
            },
        );
        console.log(filterData);
        dispatch({
            type: urlConstant.URL__DELETECHOOSECHECKBOX,
            payLoad: {
                ClientChooseDelete: filterData,
            },
        });
    };
};
export const ClientChooseColorDeleteAction: any = (
    objectItem: {
        value: string;
        id: string;
        valueCode: string;
    },
    clientChooseCustom: [],
    setIsBorderColor: React.Dispatch<React.SetStateAction<any>>,
) => {
    return async (dispatch: Dispatch) => {
        const filterData = clientChooseCustom.filter(
            (
                item: {
                    value: string;
                    id: string;
                },
                index,
            ) => {
                return objectItem.value != item.value;
            },
        );
        const filterColor = filterData.filter((item: any) => {
            if (item.id === 'color') {
                return item?.valueCode;
            }
        });
        const codeColor = filterColor.map((item: any) => {
            return item?.valueCode;
        });
        console.log(filterColor);
        console.log(codeColor);
        if (codeColor.length > 0) {
            setIsBorderColor([...codeColor]);
        } else {
            setIsBorderColor([]);
        }
        dispatch({
            type: urlConstant.URL__DELETECOLOR,
            payLoad: {
                colorAfterDelete: codeColor,
            },
        });
        dispatch({
            type: urlConstant.URL__DELETECHOOSECOLOR,
            payLoad: {
                ClientChooseDelete: filterData,
            },
        });
    };
};
