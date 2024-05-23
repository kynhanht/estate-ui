import api from '~/helpers/api';
import { API_TRANSACTION } from './constant';

export default class TransactionService {
    getTransactionTypes = async () => {
        return await api.get(`${API_TRANSACTION}/types`);
    };

    getTransactionsByCustomerId = async (customerId) => {
        return await api.get(`${API_TRANSACTION}/customer/${customerId}`);
    };

    createTransaction = async (transaction) => {
        return await api.post(API_TRANSACTION, transaction);
    };
}
