import { COMMON_ERROR_SET, COMMON_LOADING_SET, COMMON_MESSAGE_SET } from './actionTypes';

export const setError = (error) => (dispatch) => {
    dispatch({
        type: COMMON_ERROR_SET,
        payload: error,
    });
};
export const setMessage = (message) => (dispatch) => {
    dispatch({
        type: COMMON_MESSAGE_SET,
        payload: message,
    });
};

export const setLoading = (isLoading) => (dispatch) => {
    console.log(isLoading ? 'Loading' : 'Displaying');
    dispatch({
        type: COMMON_LOADING_SET,
        payload: isLoading,
    });
};
