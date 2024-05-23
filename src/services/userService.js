import api from '~/helpers/api';
import { API_USER } from './constant';

export default class UserService {
    searchUsers = async (userSearchRequest, params) => {
        return await api.post(`${API_USER}/search`, userSearchRequest, {
            params: params,
        });
    };

    getUserById = async (id) => {
        return await api.get(`${API_USER}/${id}`);
    };

    createUser = async (user) => {
        return await api.post(API_USER, user);
    };

    updateUser = async (id, user) => {
        return await api.put(`${API_USER}/${id}`, user);
    };

    deleteUsers = async (ids) => {
        return await api.delete(API_USER, { data: ids });
    };

    getStaffs = async () => {
        return await api.get(`${API_USER}/staffs`);
    };

    getRoles = async () => {
        return await api.get(`${API_USER}/roles`);
    };

    changeUserPasswords = async (id, userPasswordRequest) => {
        return await api.put(`${API_USER}/${id}/change-password`, userPasswordRequest);
    };

    resetUserPasswords = async (id) => {
        return await api.put(`${API_USER}/${id}/reset-password`);
    };

    getProfileUserByUserName = async (userName) => {
        return await api.get(`${API_USER}/profile/${userName}`);
    };

    updateProfileUser = async (userName, userProfileRequest) => {
        return await api.put(`${API_USER}/profile/${userName}`, userProfileRequest);
    };

    getStaffsByBuildingId = async (buildingId) => {
        return await api.get(`${API_USER}/${buildingId}/building-staffs`);
    };

    getStaffsByCustomerId = async (customerId) => {
        return await api.get(`${API_USER}/${customerId}/customer-staffs`);
    };
}
