import axios from 'axios';
import { API_TRANSACTION } from './constant';

export default class TransactionService {
    getTransactionTypes = async () => {
        return await axios.get(`${API_TRANSACTION}/types`);
    };

    getTransactionsByCustomerId = async (customerId) => {
        return await axios.get(`${API_TRANSACTION}/customer/${customerId}`);
    };

    createTransaction = async (transaction) => {
        return await axios.post(API_TRANSACTION, transaction);
    };
}
