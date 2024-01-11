import axios from 'axios';
import { API_USER } from './constant';

export default class UserService {
    searchUsers = async (userSearchRequest, params) => {
        return await axios.post(`${API_USER}/search`, userSearchRequest, {
            params: params,
        });
    };

    getUserById = async (id) => {
        return await axios.get(`${API_USER}/${id}`);
    };

    createUser = async (user) => {
        return await axios.post(API_USER, user);
    };

    updateUser = async (id, user) => {
        return await axios.put(`${API_USER}/${id}`, user);
    };

    deleteUsers = async (ids) => {
        return await axios.delete(API_USER, { data: ids });
    };

    getStaffs = async () => {
        return await axios.get(`${API_USER}/staffs`);
    };

    getRoles = async () => {
        return await axios.get(`${API_USER}/roles`);
    };

    changeUserPasswords = async (id, userPasswordRequest) => {
        return await axios.put(`${API_USER}/${id}/change-password`, userPasswordRequest);
    };

    resetUserPasswords = async (id) => {
        return await axios.put(`${API_USER}/${id}/reset-password`);
    };

    getProfileUserByUserName = async (userName) => {
        return await axios.get(`${API_USER}/profile/${userName}`);
    };

    updateProfileUser = async (userName, userProfileRequest) => {
        return await axios.put(`${API_USER}/profile/${userName}`, userProfileRequest);
    };

    getStaffsByBuildingId = async (buildingId) => {
        return await axios.get(`${API_USER}/${buildingId}/building-staffs`);
    };

    getStaffsByCustomerId = async (customerId) => {
        return await axios.get(`${API_USER}/${customerId}/customer-staffs`);
    };
}
