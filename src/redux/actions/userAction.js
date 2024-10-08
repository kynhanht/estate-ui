import UserSerive from '~/services/userService';
import {
    USER_SET,
    USERS_SET,
    USER_PAGEABLE,
    USER_STATE_CLEAR,
    COMMON_LOADING_SET,
    COMMON_ERROR_SET,
    COMMON_MESSAGE_SET,
    USER_PROFILE,
    AUTH_SET,
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
            dispatch({ type: COMMON_ERROR_SET, payload: 'Có lỗi xảy ra' });
        }
    } catch (error) {
        dispatch({ type: COMMON_ERROR_SET, payload: 'Có lỗi xảy ra' });
    }
    dispatch({ type: COMMON_LOADING_SET, payload: false });
};

export const searchUsers = (userSearchRequest, params) => async (dispatch) => {
    try {
        console.log('Search users');
        dispatch({ type: COMMON_LOADING_SET, payload: true });
        const respone = await service.searchUsers(userSearchRequest, params);
        if (respone.status === 200) {
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
            dispatch({ type: COMMON_ERROR_SET, payload: 'Có lỗi xảy ra' });
        }
    } catch (error) {
        dispatch({ type: COMMON_ERROR_SET, payload: 'Có lỗi xảy ra' });
    }
    dispatch({ type: COMMON_LOADING_SET, payload: false });
};

export const createUser = (user, navigate) => async (dispatch) => {
    try {
        console.log('Create user');
        dispatch({ type: COMMON_LOADING_SET, payload: true });
        const respone = await service.createUser(user);
        if (respone.status === 201) {
            dispatch({ type: USER_SET, payload: respone.data });
            dispatch({ type: COMMON_MESSAGE_SET, payload: 'Tạo mới thành công' });
            navigate('/users');
        } else {
            dispatch({ type: COMMON_ERROR_SET, payload: 'Có lỗi xảy ra' });
        }
    } catch (error) {
        dispatch({ type: COMMON_ERROR_SET, payload: 'Có lỗi xảy ra' });
    }
    dispatch({ type: COMMON_LOADING_SET, payload: false });
};

export const updateUser = (id, user, navigate) => async (dispatch) => {
    try {
        console.log('Update user');
        dispatch({ type: COMMON_LOADING_SET, payload: true });
        const respone = await service.updateUser(id, user);
        if (respone.status === 200) {
            dispatch({ type: USER_SET, payload: respone.data });
            dispatch({ type: COMMON_MESSAGE_SET, payload: 'Cập nhập thành công' });
            navigate('/users');
        } else {
            dispatch({ type: COMMON_ERROR_SET, payload: 'Có lỗi xảy ra' });
        }
    } catch (error) {
        dispatch({ type: COMMON_ERROR_SET, payload: 'Có lỗi xảy ra' });
    }
    dispatch({ type: COMMON_LOADING_SET, payload: false });
};

export const deleteUsers = (ids) => async (dispatch) => {
    try {
        console.log('delete users');
        dispatch({ type: COMMON_LOADING_SET, payload: true });
        const respone = await service.deleteUsers(ids);
        if (respone.status === 200) {
            dispatch({ type: COMMON_MESSAGE_SET, payload: 'Xóa thành công' });
        } else {
            dispatch({ type: COMMON_ERROR_SET, payload: 'Có lỗi xảy ra' });
        }
    } catch (error) {
        dispatch({ type: COMMON_ERROR_SET, payload: 'Có lỗi xảy ra' });
    }
    dispatch({ type: COMMON_LOADING_SET, payload: false });
};

export const resetUserPassword = (id, navigate) => async (dispatch) => {
    try {
        console.log('Reset password');
        dispatch({ type: COMMON_LOADING_SET, payload: true });
        const respone = await service.resetUserPassword(id);
        if (respone.status === 200) {
            dispatch({ type: COMMON_MESSAGE_SET, payload: 'Mật khẩu đã được reset' });
            navigate('/users');
        } else {
            dispatch({ type: COMMON_ERROR_SET, payload: 'Có lỗi xảy ra' });
        }
    } catch (error) {
        dispatch({ type: COMMON_ERROR_SET, payload: 'Có lỗi xảy ra' });
    }
    dispatch({ type: COMMON_LOADING_SET, payload: false });
};

export const getProfileUserById = (id) => async (dispatch) => {
    try {
        console.log('Get Profile User');
        dispatch({ type: COMMON_LOADING_SET, payload: true });
        const respone = await service.getProfileUserById(id);
        if (respone.status === 200) {
            dispatch({ type: USER_PROFILE, payload: respone.data });
        } else {
            dispatch({ type: COMMON_ERROR_SET, payload: 'Có lỗi xảy ra' });
        }
    } catch (error) {
        dispatch({ type: COMMON_ERROR_SET, payload: 'Có lỗi xảy ra' });
    }
    dispatch({ type: COMMON_LOADING_SET, payload: false });
};

export const updateProfileUser = (id, userProfileRequest) => async (dispatch) => {
    try {
        console.log('Update Profile User');
        dispatch({ type: COMMON_LOADING_SET, payload: true });
        const respone = await service.updateProfileUser(id, userProfileRequest);
        if (respone.status === 200) {
            dispatch({ type: USER_PROFILE, payload: respone.data });
            dispatch({ type: AUTH_SET, payload: { fullName: respone.data.fullName } });
            dispatch({ type: COMMON_MESSAGE_SET, payload: 'Đã cập nhập thông tin' });
        } else {
            dispatch({ type: COMMON_ERROR_SET, payload: 'Có lỗi xảy ra' });
        }
    } catch (error) {
        dispatch({ type: COMMON_ERROR_SET, payload: 'Có lỗi xảy ra' });
    }
    dispatch({ type: COMMON_LOADING_SET, payload: false });
};

export const changeUserPassoword = (id, userPasswordRequest) => async (dispatch) => {
    try {
        console.log('Change User Password');
        dispatch({ type: COMMON_LOADING_SET, payload: true });
        const respone = await service.changeUserPassword(id, userPasswordRequest);
        if (respone.status === 200) {
            dispatch({ type: COMMON_MESSAGE_SET, payload: 'Đã thay đổi mật khẩu thành công' });
        } else {
            dispatch({ type: COMMON_ERROR_SET, payload: 'Có lỗi xảy ra' });
        }
    } catch (error) {
        dispatch({ type: COMMON_ERROR_SET, payload: 'Có lỗi xảy ra' });
    }
    dispatch({ type: COMMON_LOADING_SET, payload: false });
};

export const clearUserState = () => (dispatch) => {
    dispatch({ type: USER_STATE_CLEAR });
};
