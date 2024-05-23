import api from '~/helpers/api';
import { API_JWT_AUTH } from './constant';

export default class BuildingService {
    login = async (loginRequest) => {
        return await api.post(`${API_JWT_AUTH}/login`, loginRequest);
    };
}
