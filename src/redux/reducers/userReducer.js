import { USER_SET, USERS_SET, USER_PAGEABLE, USER_STATE_CLEAR } from '../actions/actionTypes';

const initialState = {
    user: {},
    users: [],
    pagination: {
        page: 1,
        size: 4,
        totalElements: 0,
        totalPages: 1,
    },
};

const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case USER_SET:
            return { ...state, user: payload };
        case USERS_SET:
            return { ...state, users: payload };
        case USER_PAGEABLE:
            return { ...state, pagination: payload };
        case USER_STATE_CLEAR:
            return {
                user: {},
                users: [],
                pagination: {},
            };
        default:
            return state;
    }
};

export default userReducer;
