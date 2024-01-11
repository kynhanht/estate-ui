import axios from 'axios';
import { API_BUILIDNG } from './constant';

export default class BuildingService {
    searchBuildings = async (buildingSearchRequest, params) => {
        return await axios.post(`${API_BUILIDNG}/search`, buildingSearchRequest, {
            params: params,
        });
    };

    getBuildingDistricts = async () => {
        return await axios.get(`${API_BUILIDNG}/districts`);
    };

    getBuildingTypes = async () => {
        return await axios.get(`${API_BUILIDNG}/types`);
    };

    getBuildingById = async (id) => {
        return await axios.get(`${API_BUILIDNG}/${id}`);
    };

    createBuilding = async (building) => {
        const formData = new FormData();
        for (var key in building) {
            if (building[key]) {
                formData.append(key, building[key]);
            }
        }
        return await axios.post(API_BUILIDNG, formData);
    };

    updateBuilding = async (id, building) => {
        const formData = new FormData();
        for (var key in building) {
            if (building[key]) {
                formData.append(key, building[key]);
            }
        }
        return await axios.put(`${API_BUILIDNG}/${id}`, formData);
    };

    deleteBuildings = async (ids) => {
        return await axios.delete(API_BUILIDNG, { data: ids });
    };

    assignBuilding = async ({ staffIds, buildingId }) => {
        return await axios.post(`${API_BUILIDNG}/assignment-building`, { staffIds, buildingId });
    };

    static getBuildingImageUrl = (filename) => {
        return API_BUILIDNG + `/image/${filename}`;
    };
}
