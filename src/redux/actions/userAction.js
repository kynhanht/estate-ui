import UserSerive from '~/services/userService';
import { COMMON_LOADING_SET, USERS_SET, USER_STATE_CLEAR } from './actionTypes';

const service = new UserSerive();

export const getStaffs = () => async (dispatch) => {
    try {
        console.log('Get Staffs');
        dispatch({ type: COMMON_LOADING_SET, payload: true });
        const respone = await service.getStaffs();
        if (respone.status === 200) {
            dispatch({
                type: USERS_SET,
                payload: respone.data,
            });
        }
    } catch (error) {
        console.error(error.response.data ? error.response.data.messages : error.message);
    } finally {
        dispatch({ type: COMMON_LOADING_SET, payload: false });
    }
};

export const clearUserState = () => (dispatch) => {
    dispatch({ type: USER_STATE_CLEAR });
};
