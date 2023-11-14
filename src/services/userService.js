import axios from 'axios';
import { API_USER } from './constant';

export default class UserSerive {
    getStaffs = async () => {
        return await axios.get(`${API_USER}/staffs`);
    };
}
