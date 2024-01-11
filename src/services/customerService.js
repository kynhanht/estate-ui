import axios from 'axios';
import { API_CUSTOMER } from './constant';

export default class CustomerService {
    searchCustomers = async (customerSearchRequest, params) => {
        return await axios.post(`${API_CUSTOMER}/search`, customerSearchRequest, {
            params: params,
        });
    };

    getCustomerById = async (id) => {
        return await axios.get(`${API_CUSTOMER}/${id}`);
    };

    createCustomer = async (customer) => {
        return await axios.post(API_CUSTOMER, customer);
    };

    updateCustomer = async (id, customer) => {
        return await axios.put(`${API_CUSTOMER}/${id}`, customer);
    };

    deleteCustomers = async (ids) => {
        return await axios.delete(API_CUSTOMER, { data: ids });
    };

    assignCustomer = async ({ staffIds, customerId }) => {
        return await axios.post(`${API_CUSTOMER}/assignment-customer`, { staffIds, customerId });
    };
}
