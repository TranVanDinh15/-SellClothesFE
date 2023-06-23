import { combineReducers } from 'redux';
import AuthReducers from './Auth.Reducers';
const rootReducer = combineReducers({
    reduxAuth: AuthReducers,
});
export default rootReducer;
