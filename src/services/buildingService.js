import axios from 'axios';
import { API_BUILIDNG } from './constant';

export default class BuildingService {
    createBuilding = async (building) => {
        return await axios.post(API_BUILIDNG, building);
    };

    searchBuildings = async (buildingSearchRequest) => {
        return await axios.post(`${API_BUILIDNG}/search`, buildingSearchRequest);
    };

    getBuildingDistricts = async () => {
        return await axios.get(`${API_BUILIDNG}/districts`);
    };

    getBuildingTypes = async () => {
        return await axios.get(`${API_BUILIDNG}/types`);
    };
}
