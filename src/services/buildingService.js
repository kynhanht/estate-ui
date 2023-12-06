import axios from 'axios';
import { API_BUILIDNG } from './constant';

export default class BuildingService {
    searchBuildings = async (buildingSearchRequest) => {
        return await axios.post(`${API_BUILIDNG}/search`, buildingSearchRequest);
    };

    getBuildingDistricts = async () => {
        return await axios.get(`${API_BUILIDNG}/districts`);
    };

    getBuildingTypes = async () => {
        return await axios.get(`${API_BUILIDNG}/types`);
    };

    getBuilding = async (id) => {
        return await axios.get(`${API_BUILIDNG}/${id}`);
    };

    createBuilding = async (building) => {
        const formData = new FormData();
        for (var key in building) {
            if (building[key]) {
                if (key === 'image' && building[key][0]?.originFileObj) {
                    formData.append(key, building[key][0].originFileObj);
                } else {
                    formData.append(key, building[key]);
                }
            }
        }
        return await axios.post(API_BUILIDNG, formData);
    };

    updateBuilding = async (id, building) => {
        const formData = new FormData();
        for (var key in building) {
            if (building[key]) {
                if (key === 'image' && building[key][0]?.originFileObj) {
                    formData.append(key, building[key][0].originFileObj);
                } else {
                    formData.append(key, building[key]);
                }
            }
        }
        return await axios.put(`${API_BUILIDNG}/${id}`, formData);
    };

    deleteBuildings = async (ids) => {
        return await axios.delete(API_BUILIDNG, { data: ids });
    };

    assignBuilding = async ({ staffIds, buildingId }) => {
        return await axios.post(`${API_BUILIDNG}/assignment`, { staffIds, buildingId });
    };

    static getBuildingImageUrl = (filename) => {
        return API_BUILIDNG + `/image/${filename}`;
    };
}
