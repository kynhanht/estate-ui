import { TRANSACTION_SET, TRANSACTIONS_SET, TRANSACTION_STATE_CLEAR } from '~/redux/actions/actionTypes';

const initialState = {
    transaction: {},
    combinationTransactions: [],
};

const transactionReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case TRANSACTION_SET:
            return { ...state, transaction: payload };
        case TRANSACTIONS_SET:
            return { ...state, combinationTransactions: payload };
        case TRANSACTION_STATE_CLEAR:
            return {
                transaction: {},
                combinationTransactions: [],
            };
        default:
            return state;
    }
};

export default transactionReducer;
