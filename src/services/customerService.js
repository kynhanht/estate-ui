import api from '~/helpers/api';
import { API_CUSTOMER } from './constant';

export default class CustomerService {
    searchCustomers = async (customerSearchRequest, params) => {
        return await api.post(`${API_CUSTOMER}/search`, customerSearchRequest, {
            params: params,
        });
    };

    getCustomerById = async (id) => {
        return await api.get(`${API_CUSTOMER}/${id}`);
    };

    createCustomer = async (customer) => {
        return await api.post(API_CUSTOMER, customer);
    };

    updateCustomer = async (id, customer) => {
        return await api.put(`${API_CUSTOMER}/${id}`, customer);
    };

    deleteCustomers = async (ids) => {
        return await api.delete(API_CUSTOMER, { data: ids });
    };

    assignCustomer = async ({ staffIds, customerId }) => {
        return await api.post(`${API_CUSTOMER}/assignment-customer`, { staffIds, customerId });
    };
}
