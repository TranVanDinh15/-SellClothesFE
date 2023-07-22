import { urlConstant } from '../Actions/Actions.constant';

const initialState = {
    urlCustomer: null,
    price: null,
    sort: null,
    createAt: null,
    color: [],
    ClientChoose: [],
    material: [],
};

const UrlCustomerReducers = (state = initialState, action: any) => {
    switch (action.type) {
        case urlConstant.URL__ACTIONDEFAULT:
            return {
                ...state,
                ...action.payLoad,
            };
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
        case urlConstant.URL__UPDATECOLOR:
            return {
                ...state,
                color: [...state.color, action.payLoad.color],
            };
        case urlConstant.URL__DELETECOLOR:
            return {
                ...state,
                color: [...action.payLoad.colorAfterDelete],
            };
        case urlConstant.URL__CLIENTCHOOSE:
            return {
                ...state,
                ClientChoose: [...state.ClientChoose, action.payLoad.objectItem],
            };
        case urlConstant.URL__DELETECHOOSE:
            return {
                ...state,
                ClientChoose: [...action.payLoad.ClientChooseDelete],
            };
        case urlConstant.URL__DELETECHOOSECHECKBOX:
            return {
                ...state,
                ClientChoose: [...action.payLoad.ClientChooseDelete],
            };
        case urlConstant.URL__DELETECHOOSECOLOR:
            return {
                ...state,
                ClientChoose: [...action.payLoad.ClientChooseDelete],
            };
        case urlConstant.URL__UPDATEMATERIAL:
            return {
                ...state,
                material: [...state.material, action.payLoad.material],
            };
        case urlConstant.URL__DELETEMATERIAL:
            return {
                ...state,
                material: [...action.payLoad.materialAfterDelete],
            };
        case urlConstant.URL__DELETECHOOSEMATERIAL:
            return {
                ...state,
                ClientChoose: [...action.payLoad.ClientChooseDelete],
            };

        default:
            return state;
    }
};

export default UrlCustomerReducers;
