import authService from '~/services/authService';
import { COMMON_ERROR_SET, LOGIN_SET, LOGOUT_SET } from './actionTypes';

const service = new authService();

export const login = (loginRequest, navigate) => async (dispatch) => {
    try {
        console.log('Login', loginRequest);
        const respone = await service.login(loginRequest);
        if (respone.status === 200) {
            dispatch({ type: LOGIN_SET, payload: respone.data });
            navigate('/');
        } else {
            dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
        }
    } catch (error) {
        dispatch({ type: COMMON_ERROR_SET, payload: 'The information is not valid! Please try again' });
    }
};

export const logout = (navigate) => async (dispatch) => {
    try {
        console.log('Logout');
        dispatch({ type: LOGOUT_SET });
    } catch (error) {
        dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
    }
};
