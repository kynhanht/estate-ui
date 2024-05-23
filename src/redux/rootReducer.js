import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import jwtAuthReducer from './reducers/jwtAuthReducer';
import buildingReducer from './reducers/buildingReducer';
import userReducer from './reducers/userReducer';
import customerReducer from './reducers/customerReducer';
import transactionReducer from './reducers/transactionReducer';
import commonReducer from './reducers/commonReducer';

// Configure persistence for the 'jwtAuth' reducer
const persistConfig = {
    key: 'jwt',
    storage: storage,
};

const persistedJwtAuthReducer = persistReducer(persistConfig, jwtAuthReducer);

const rootReducer = combineReducers({
    jwtAuthReducer: persistedJwtAuthReducer,
    buildingReducer: buildingReducer,
    userReducer: userReducer,
    customerReducer: customerReducer,
    transactionReducer: transactionReducer,
    commonReducer: commonReducer,
});

export default rootReducer;
