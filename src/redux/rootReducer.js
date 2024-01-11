import { combineReducers } from 'redux';
import buildingReducer from './reducers/buildingReducer';
import userReducer from './reducers/userReducer';
import customerReducer from './reducers/customerReducer';
import transactionReducer from './reducers/transactionReducer';
import commonReducer from './reducers/commonReducer';

const rootReducer = combineReducers({
    buildingReducer,
    userReducer,
    customerReducer,
    transactionReducer,
    commonReducer,
});

export default rootReducer;
