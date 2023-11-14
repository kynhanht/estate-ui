import { combineReducers } from 'redux';
import buildingReducer from './reducers/buildingReducer';
import userReducer from './reducers/userReducer';
import commonReducer from './reducers/commonReducer';

const rootReducer = combineReducers({
    buildingReducer,
    userReducer,
    commonReducer,
});

export default rootReducer;
