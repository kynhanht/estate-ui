import { LOGIN_SET, LOGOUT_SET } from '~/redux/actions/actionTypes';

const initialState = {
    token: null,
    id: null,
    roleCode: null,
    fullName: null,
    username: null,
    isAuthenticated: false,
};

const jwtAuthReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN_SET:
            return { ...payload, isAuthenticated: true };
        case LOGOUT_SET:
            return {
                token: null,
                id: null,
                roleCode: null,
                fullName: null,
                username: null,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};

export default jwtAuthReducer;
