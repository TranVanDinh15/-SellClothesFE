import { combineReducers } from 'redux';
import AuthReducers from './Auth.Reducers';
import UrlCustomerReducers from './Url.Reducers';
import CartReducers from './Cart.Reducer';
const rootReducer = combineReducers({
    reduxAuth: AuthReducers,
    UrlReducer: UrlCustomerReducers,
    CartReducer: CartReducers,
});
export default rootReducer;
