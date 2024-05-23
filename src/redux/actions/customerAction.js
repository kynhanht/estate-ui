import {
    CUSTOMER_SET,
    CUSTOMERS_SET,
    CUSTOMER_PAGEABLE,
    CUSTOMER_STATE_CLEAR,
    COMMON_ERROR_SET,
    COMMON_LOADING_SET,
    COMMON_MESSAGE_SET,
} from './actionTypes';
import CustomerService from '~/services/customerService';

const service = new CustomerService();

export const getCustomerById = (id) => async (dispatch) => {
    try {
        console.log('Get customer');
        dispatch({ type: COMMON_LOADING_SET, payload: true });
        const respone = await service.getCustomerById(id);
        if (respone.status === 200) {
            dispatch({ type: CUSTOMER_SET, payload: respone.data });
        } else {
            dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
        }
    } catch (error) {
        dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
    }
    dispatch({ type: COMMON_LOADING_SET, payload: false });
};

export const searchCustomers = (customerSearchRequest, params) => async (dispatch) => {
    try {
        console.log('Search customers');
        dispatch({ type: COMMON_LOADING_SET, payload: true });
        const respone = await service.searchCustomers(customerSearchRequest, params);
        if (respone.status === 200) {
            dispatch({ type: CUSTOMERS_SET, payload: respone.data.content });
            const { size, totalPages, totalElements, pageable } = respone.data;
            const pagination = {
                page: pageable.pageNumber + 1,
                size: size,
                totalPages: totalPages,
                totalElements: totalElements,
            };
            dispatch({ type: CUSTOMER_PAGEABLE, payload: pagination });
        } else {
            dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
        }
    } catch (error) {
        dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
    }
    dispatch({ type: COMMON_LOADING_SET, payload: false });
};

export const createCustomer = (customer, navigate) => async (dispatch) => {
    try {
        console.log('Create customer');
        dispatch({ type: COMMON_LOADING_SET, payload: true });
        const respone = await service.createCustomer(customer);
        if (respone.status === 201) {
            dispatch({ type: CUSTOMER_SET, payload: respone.data });
            dispatch({ type: COMMON_MESSAGE_SET, payload: 'Customer is saved' });
            navigate('/customers');
        } else {
            dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
        }
    } catch (error) {
        dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
    }
    dispatch({ type: COMMON_LOADING_SET, payload: false });
};

export const updateCustomer = (id, customer, navigate) => async (dispatch) => {
    try {
        console.log('Update customer');
        dispatch({ type: COMMON_LOADING_SET, payload: true });
        const respone = await service.updateCustomer(id, customer);
        if (respone.status === 200) {
            dispatch({ type: CUSTOMER_SET, payload: respone.data });
            dispatch({ type: COMMON_MESSAGE_SET, payload: 'customer is updated' });
            navigate('/customers');
        } else {
            dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
        }
    } catch (error) {
        dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
    }
    dispatch({ type: COMMON_LOADING_SET, payload: false });
};

export const deleteCustomers = (ids) => async (dispatch) => {
    try {
        console.log('delete customers');
        dispatch({ type: COMMON_LOADING_SET, payload: true });
        const respone = await service.deleteCustomers(ids);
        if (respone.status === 200) {
            dispatch({ type: COMMON_MESSAGE_SET, payload: 'Customers is deleted' });
        } else {
            dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
        }
    } catch (error) {
        dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
    }
    dispatch({ type: COMMON_LOADING_SET, payload: false });
};

export const assignCustomer =
    ({ staffIds, customerId }) =>
    async (dispatch) => {
        try {
            console.log('Assign customer');
            dispatch({ type: COMMON_LOADING_SET, payload: true });
            const respone = await service.assignCustomer({ staffIds, customerId });
            if (respone.status === 200) {
                dispatch({ type: COMMON_MESSAGE_SET, payload: 'Customer is saved' });
            } else {
                dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
            }
        } catch (error) {
            dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
        }
        dispatch({ type: COMMON_LOADING_SET, payload: false });
    };

export const clearCustomerState = () => (dispatch) => {
    console.log('Clear customer state');
    dispatch({ type: CUSTOMER_STATE_CLEAR });
};

export const clearCustomer = () => (dispatch) => {
    console.log('Clear customer');
    dispatch({ type: CUSTOMER_SET, payload: {} });
};
