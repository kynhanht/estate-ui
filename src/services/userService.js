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

    changeUserPassword = async (id, userPasswordRequest) => {
        return await api.put(`${API_USER}/${id}/change-password`, userPasswordRequest);
    };

    resetUserPassword = async (id) => {
        return await api.put(`${API_USER}/${id}/reset-password`);
    };

    getProfileUserById = async (id) => {
        return await api.get(`${API_USER}/${id}/profile`);
    };

    updateProfileUser = async (id, userProfileRequest) => {
        return await api.put(`${API_USER}/${id}/profile`, userProfileRequest);
    };

    getStaffsByBuildingId = async (buildingId) => {
        return await api.get(`${API_USER}/${buildingId}/building-staffs`);
    };

    getStaffsByCustomerId = async (customerId) => {
        return await api.get(`${API_USER}/${customerId}/customer-staffs`);
    };
}
