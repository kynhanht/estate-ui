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
        return await axios.post(API_BUILIDNG, building);
    };

    updateBuilding = async (id, building) => {
        return await axios.put(`${API_BUILIDNG}/${id}`, building);
    };

    deleteBuildings = async (ids) => {
        return await axios.delete(API_BUILIDNG, { data: ids });
    };

    assignBuilding = async ({ staffIds, buildingId }) => {
        return await axios.post(`${API_BUILIDNG}/assignment`, { staffIds, buildingId });
    };
}
