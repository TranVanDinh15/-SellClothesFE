import { urlConstant } from '../Actions/Actions.constant';

const initialState = { urlCustomer: null, price: null, sort: null, createAt: null };

const UrlCustomerReducers = (state = initialState, action: any) => {
    switch (action.type) {
        case urlConstant.URL__ACTION:
            return {
                urlCustomer: action.payLoad.url,
            };
        case urlConstant.URL__UPDATESORT:
            return {
                ...state,
                createAt: null,
                sort: action.payLoad.sort,
            };
        case urlConstant.URL__UPDATEPRICE:
            return {
                ...state,
                price: action.payLoad.price,
            };
        case urlConstant.URL__UPDATECREATEAT:
            return {
                ...state,
                sort: null,
                createAt: action.payLoad.createAt,
            };
        default:
            return state;
    }
};

export default UrlCustomerReducers;
