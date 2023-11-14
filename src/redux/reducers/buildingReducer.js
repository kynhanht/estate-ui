import {
    BUILDING_SET,
    BUILDING_STATE_CLEAR,
    BUILDING_SEARCH,
    BUILDINGS_SET,
    BUILDING_TYPES,
    BUILDING_DISTRICTS,
} from '~/redux/actions/actionTypes';

const initialState = {
    building: {},
    buildings: [],
    buildingSearch: {},
    buildingTypes: [],
    buildingDistricts: [],
};

const buildingReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case BUILDING_SET:
            return { ...state, building: payload };
        case BUILDINGS_SET:
            return { ...state, buildings: payload };
        case BUILDING_SEARCH:
            return { ...state, buildingSearch: payload };
        case BUILDING_TYPES:
            return { ...state, buildingTypes: payload };
        case BUILDING_DISTRICTS:
            return { ...state, buildingDistricts: payload };
        case BUILDING_STATE_CLEAR:
            return { building: {}, buildings: [], buildingSearch: {}, buildingTypes: [], buildingDistricts: [] };
        default:
            return state;
    }
};

export default buildingReducer;
