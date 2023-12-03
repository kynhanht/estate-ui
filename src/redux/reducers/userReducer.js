import { STAFFS_BY_BUILDING_ID, STAFFS_SET, USER_SET, USER_STATE_CLEAR } from '../actions/actionTypes';

const initialState = {
    user: {},
    staffs: [],
    staffsByBuildingId: [],
};

const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case USER_SET:
            return { ...state, user: payload };
        case STAFFS_SET:
            return { ...state, staffs: payload };
        case STAFFS_BY_BUILDING_ID:
            return { ...state, staffsByBuildingId: payload };
        case USER_STATE_CLEAR:
            return { user: {}, staffs: [], staffsByBuildingId: [] };
        default:
            return state;
    }
};

export default userReducer;
