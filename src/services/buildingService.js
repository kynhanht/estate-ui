import api from '~/helpers/api';
import { API_BUILIDNG } from './constant';

export default class BuildingService {
    searchBuildings = async (buildingSearchRequest, params) => {
        return await api.post(`${API_BUILIDNG}/search`, buildingSearchRequest, {
            params: params,
        });
    };

    getBuildingDistricts = async () => {
        return await api.get(`${API_BUILIDNG}/districts`);
    };

    getBuildingTypes = async () => {
        return await api.get(`${API_BUILIDNG}/types`);
    };

    getBuildingById = async (id) => {
        return await api.get(`${API_BUILIDNG}/${id}`);
    };

    createBuilding = async (building) => {
        const formData = new FormData();
        for (var key in building) {
            if (building[key]) {
                formData.append(key, building[key]);
            }
        }
        return await api.post(`${API_BUILIDNG}`, formData);
    };

    updateBuilding = async (id, building) => {
        const formData = new FormData();
        for (var key in building) {
            if (building[key]) {
                formData.append(key, building[key]);
            }
        }
        return await api.put(`${API_BUILIDNG}/${id}`, formData);
    };

    deleteBuildings = async (ids) => {
        return await api.delete(`${API_BUILIDNG}`, { data: ids });
    };

    assignBuilding = async ({ staffIds, buildingId }) => {
        return await api.post(`${API_BUILIDNG}/assignment-building`, { staffIds, buildingId });
    };

    static getBuildingImageUrl = (filename) => {
        return API_BUILIDNG + `/image/${filename}`;
    };
}
