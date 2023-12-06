import UserSerive from '~/services/userService';
import {
    COMMON_LOADING_SET,
    STAFFS_SET,
    STAFFS_BY_BUILDING_ID,
    USER_STATE_CLEAR,
    COMMON_ERROR_SET,
} from './actionTypes';

const service = new UserSerive();

export const getStaffs = () => async (dispatch) => {
    try {
        console.log('Get Staffs');
        dispatch({ type: COMMON_LOADING_SET, payload: true });
        const respone = await service.getStaffs();
        if (respone.status === 200) {
            dispatch({
                type: STAFFS_SET,
                payload: respone.data,
            });
        } else {
            console.error(respone.message);
            dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
        }
    } catch (error) {
        console.error(error);
        dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
    } finally {
        dispatch({ type: COMMON_LOADING_SET, payload: false });
    }
};

export const getStaffsByBuildingId = (buildingId) => async (dispatch) => {
    try {
        console.log('Get Staffs By BuildingId');
        const respone = await service.getStaffsByBuildingId(buildingId);
        if (respone.status === 200) {
            dispatch({
                type: STAFFS_BY_BUILDING_ID,
                payload: respone.data,
            });
        } else {
            console.error(respone.message);
            dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
        }
    } catch (error) {
        console.error(error);
        dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
    }
};

export const clearUserState = () => (dispatch) => {
    dispatch({ type: USER_STATE_CLEAR });
};
