import { USERS_SET, USER_SET, USER_STATE_CLEAR } from '../actions/actionTypes';

const initialState = {
    user: {},
    staffs: [],
};

const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case USER_SET:
            return { ...state, user: payload };
        case USERS_SET:
            return { ...state, staffs: payload };

        case USER_STATE_CLEAR:
            return { user: {}, staffs: [] };
        default:
            return state;
    }
};

export default userReducer;
