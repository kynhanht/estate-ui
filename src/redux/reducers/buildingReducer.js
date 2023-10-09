import { BUILDING_SET, BUILDINGS_SET } from '~/redux/actions/actionTypes';

const initialState = {
    building: {},
    buildings: [],
};

const buildingReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case BUILDING_SET:
            return { ...state, building: payload };
        case BUILDINGS_SET:
            return { ...state, building: payload };
        default:
            return state;
    }
};

export default buildingReducer;
