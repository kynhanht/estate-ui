import { LOGIN_SET, LOGOUT_SET } from '~/redux/actions/actionTypes';

const initialState = {
    token: null,
    roleCode: null,
    fullName: null,
};

const jwtAuthReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN_SET:
            return { ...payload };
        case LOGOUT_SET:
            return {
                token: null,
                roleCode: null,
                fullName: null,
            };
        default:
            return state;
    }
};

export default jwtAuthReducer;
