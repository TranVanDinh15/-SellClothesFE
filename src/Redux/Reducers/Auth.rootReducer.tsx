import { combineReducers } from 'redux';
import AuthReducers from './Auth.Reducers';
import UrlCustomerReducers from './Url.Reducers';
const rootReducer = combineReducers({
    reduxAuth: AuthReducers,
    UrlReducer: UrlCustomerReducers,
});
export default rootReducer;
