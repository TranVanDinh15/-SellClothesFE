import { Dispatch } from 'redux';
import { urlConstant } from './Actions.constant';

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
