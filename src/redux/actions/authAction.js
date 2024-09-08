import authService from '~/services/authService';
import { COMMON_ERROR_SET, LOGIN_SET, LOGOUT_SET } from './actionTypes';

const service = new authService();

export const login = (loginRequest, navigate) => async (dispatch) => {
    try {
        console.log('Login');
        const respone = await service.login(loginRequest);
        if (respone.status === 200) {
            dispatch({ type: LOGIN_SET, payload: respone.data });
            navigate('/');
        } else {
            dispatch({ type: COMMON_ERROR_SET, payload: 'Có lỗi xảy ra' });
        }
    } catch (error) {
        dispatch({ type: COMMON_ERROR_SET, payload: 'Tài khoản hoặc mật khẩu không đúng, vui lòng nhập lại' });
    }
};

export const logout = (navigate) => async (dispatch) => {
    try {
        console.log('Logout');
        dispatch({ type: LOGOUT_SET });
        navigate('/login');
    } catch (error) {
        dispatch({ type: COMMON_ERROR_SET, payload: 'Có lỗi xảy ra' });
    }
};
