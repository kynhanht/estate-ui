import { CUSTOMER_SET, CUSTOMERS_SET, CUSTOMER_PAGEABLE, CUSTOMER_STATE_CLEAR } from '~/redux/actions/actionTypes';

const initialState = {
    customer: {},
    customers: [],
    pagination: {
        page: 1,
        size: 4,
        totalElements: 0,
        totalPages: 1,
    },
};

const customerReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CUSTOMER_SET:
            return { ...state, customer: payload };
        case CUSTOMERS_SET:
            return { ...state, customers: payload };
        case CUSTOMER_PAGEABLE:
            return { ...state, pagination: payload };
        case CUSTOMER_STATE_CLEAR:
            return {
                customer: {},
                customers: [],
                pagination: {},
            };
        default:
            return state;
    }
};

export default customerReducer;
