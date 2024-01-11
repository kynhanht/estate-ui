import UserSerive from '~/services/userService';
import {
    USER_SET,
    USERS_SET,
    USER_PAGEABLE,
    USER_STATE_CLEAR,
    COMMON_LOADING_SET,
    COMMON_ERROR_SET,
    COMMON_MESSAGE_SET,
} from './actionTypes';

const service = new UserSerive();

export const getUserById = (id) => async (dispatch) => {
    try {
        console.log('Get user');
        dispatch({ type: COMMON_LOADING_SET, payload: true });
        const respone = await service.getUserById(id);
        if (respone.status === 200) {
            dispatch({ type: USER_SET, payload: respone.data });
        } else {
            dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
        }
    } catch (error) {
        // console.error(error.response.data ? error.response.data.messages : error.message);
        console.error(error);
        dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
    } finally {
        dispatch({ type: COMMON_LOADING_SET, payload: false });
    }
};

export const searchUsers = (userSearchRequest, params) => async (dispatch) => {
    try {
        console.log('Search users');
        dispatch({ type: COMMON_LOADING_SET, payload: true });
        const respone = await service.searchUsers(userSearchRequest, params);
        if (respone.status === 200) {
            console.log(respone.data);
            dispatch({ type: USERS_SET, payload: respone.data.content });
            const { size, totalPages, totalElements, pageable } = respone.data;
            const pagination = {
                page: pageable.pageNumber + 1,
                size: size,
                totalPages: totalPages,
                totalElements: totalElements,
            };
            dispatch({ type: USER_PAGEABLE, payload: pagination });
        } else {
            dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
        }
    } catch (error) {
        console.error(error);
        dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
    } finally {
        dispatch({ type: COMMON_LOADING_SET, payload: false });
    }
};

export const createUser = (user, navigate) => async (dispatch) => {
    try {
        console.log('Create user');
        dispatch({ type: COMMON_LOADING_SET, payload: true });
        const respone = await service.createUser(user);
        if (respone.status === 201) {
            dispatch({ type: USER_SET, payload: respone.data });
            dispatch({ type: COMMON_MESSAGE_SET, payload: 'User is saved' });
            navigate('/users');
        } else {
            dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
        }
    } catch (error) {
        console.error(error);
        dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
    } finally {
        dispatch({ type: COMMON_LOADING_SET, payload: false });
    }
};

export const updateUser = (id, user, navigate) => async (dispatch) => {
    try {
        console.log('Update user');
        dispatch({ type: COMMON_LOADING_SET, payload: true });
        const respone = await service.updateUser(id, user);
        if (respone.status === 200) {
            dispatch({ type: USER_SET, payload: respone.data });
            dispatch({ type: COMMON_MESSAGE_SET, payload: 'User is updated' });
            navigate('/users');
        } else {
            dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
        }
    } catch (error) {
        console.error(error);
        dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
    } finally {
        dispatch({ type: COMMON_LOADING_SET, payload: false });
    }
};

export const deleteUsers = (ids) => async (dispatch) => {
    try {
        console.log('delete users');
        dispatch({ type: COMMON_LOADING_SET, payload: true });
        const respone = await service.deleteUsers(ids);
        if (respone.status === 200) {
            dispatch({ type: COMMON_MESSAGE_SET, payload: 'Users are deleted' });
        } else {
            dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
        }
    } catch (error) {
        console.error(error);
        dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
    } finally {
        dispatch({ type: COMMON_LOADING_SET, payload: false });
    }
};

export const clearUserState = () => (dispatch) => {
    dispatch({ type: USER_STATE_CLEAR });
};
