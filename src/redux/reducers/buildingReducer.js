import { BUILDING_SET, BUILDING_STATE_CLEAR, BUILDINGS_SET, BUILDING_PAGEABLE } from '~/redux/actions/actionTypes';

const initialState = {
    building: {},
    buildings: [],
    pagination: {
        page: 1,
        size: 4,
        totalElements: 0,
        totalPages: 1,
    },
};

const buildingReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case BUILDING_SET:
            return { ...state, building: payload };
        case BUILDINGS_SET:
            return { ...state, buildings: payload };
        case BUILDING_PAGEABLE:
            return { ...state, pagination: payload };
        case BUILDING_STATE_CLEAR:
            return {
                building: {},
                buildings: [],
                pagination: {},
            };
        default:
            return state;
    }
};

export default buildingReducer;
