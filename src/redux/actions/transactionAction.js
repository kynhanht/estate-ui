import TransactionService from '~/services/transactionService';
import {
    TRANSACTION_SET,
    TRANSACTIONS_SET,
    TRANSACTION_STATE_CLEAR,
    COMMON_LOADING_SET,
    COMMON_ERROR_SET,
    COMMON_MESSAGE_SET,
} from './actionTypes';

const service = new TransactionService();

export const getTransactionsByCustomerId = (customerId) => async (dispatch) => {
    try {
        console.log('Get transactions');
        dispatch({ type: COMMON_LOADING_SET, payload: true });
        const respone = await service.getTransactionsByCustomerId(customerId);
        if (respone.status === 200) {
            dispatch({ type: TRANSACTIONS_SET, payload: respone.data });
        } else {
            dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
        }
    } catch (error) {
        console.error(error);
        dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
    }
    dispatch({ type: COMMON_LOADING_SET, payload: false });
};

export const createTransaction = (transaction, navigate) => async (dispatch) => {
    try {
        console.log('Create transaction');
        dispatch({ type: COMMON_LOADING_SET, payload: true });
        const respone = await service.createTransaction(transaction);
        if (respone.status === 201) {
            dispatch({ type: TRANSACTION_SET, payload: respone.data });
            dispatch({ type: COMMON_MESSAGE_SET, payload: 'Transaction is saved' });
            navigate('/customers');
        } else {
            dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
        }
    } catch (error) {
        console.error(error);
        dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
    }
    dispatch({ type: COMMON_LOADING_SET, payload: false });
};

export const clearTransactionrState = () => (dispatch) => {
    console.log('Clear transaction state');
    dispatch({ type: TRANSACTION_STATE_CLEAR });
};
