import { combineReducers } from 'redux';
import buildingReducer from './reducers/buildingReducer';

const rootReducer = combineReducers({
    buildingReducer,
});

export default rootReducer;
