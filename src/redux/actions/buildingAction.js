import BuildingService from '~/services/buildingService';
import {
    BUILDINGS_SET,
    BUILDING_PAGEABLE,
    BUILDING_SET,
    BUILDING_STATE_CLEAR,
    COMMON_ERROR_SET,
    COMMON_LOADING_SET,
    COMMON_MESSAGE_SET,
} from './actionTypes';

const service = new BuildingService();

export const getBuildingById = (id) => async (dispatch) => {
    try {
        console.log('Get building');
        dispatch({ type: COMMON_LOADING_SET, payload: true });
        const respone = await service.getBuildingById(id);
        if (respone.status === 200) {
            dispatch({ type: BUILDING_SET, payload: respone.data });
        } else {
            dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
        }
    } catch (error) {
        // console.error(error.response.data ? error.response.data.messages : error.message);
        dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
    }
    dispatch({ type: COMMON_LOADING_SET, payload: false });
};

export const searchBuildings = (buildingSearchRequest, params) => async (dispatch) => {
    try {
        console.log('Search buildings');
        dispatch({ type: COMMON_LOADING_SET, payload: true });
        const respone = await service.searchBuildings(buildingSearchRequest, params);
        if (respone.status === 200) {
            dispatch({ type: BUILDINGS_SET, payload: respone.data.content });
            const { size, totalPages, totalElements, pageable } = respone.data;
            const pagination = {
                page: pageable.pageNumber + 1,
                size: size,
                totalPages: totalPages,
                totalElements: totalElements,
            };
            dispatch({ type: BUILDING_PAGEABLE, payload: pagination });
        } else {
            dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
        }
    } catch (error) {
        dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
    }
    dispatch({ type: COMMON_LOADING_SET, payload: false });
};

export const createBuilding = (building, navigate) => async (dispatch) => {
    try {
        console.log('Create building');
        dispatch({ type: COMMON_LOADING_SET, payload: true });
        const respone = await service.createBuilding(building);
        if (respone.status === 201) {
            dispatch({ type: BUILDING_SET, payload: respone.data });
            dispatch({ type: COMMON_MESSAGE_SET, payload: 'Building is saved' });
            navigate('/buildings');
        } else {
            dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
        }
    } catch (error) {
        dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
    }
    dispatch({ type: COMMON_LOADING_SET, payload: false });
};

export const updateBuilding = (id, building, navigate) => async (dispatch) => {
    try {
        console.log('Update building');
        dispatch({ type: COMMON_LOADING_SET, payload: true });
        const respone = await service.updateBuilding(id, building);
        if (respone.status === 200) {
            dispatch({ type: BUILDING_SET, payload: respone.data });
            dispatch({ type: COMMON_MESSAGE_SET, payload: 'Building is updated' });
            navigate('/buildings');
        } else {
            dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
        }
    } catch (error) {
        dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
    }
    dispatch({ type: COMMON_LOADING_SET, payload: false });
};

export const deleteBuildings = (ids) => async (dispatch) => {
    try {
        console.log('delete buildings');
        dispatch({ type: COMMON_LOADING_SET, payload: true });
        const respone = await service.deleteBuildings(ids);
        if (respone.status === 200) {
            dispatch({ type: COMMON_MESSAGE_SET, payload: 'Buildings is deleted' });
        } else {
            dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
        }
    } catch (error) {
        dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
    }
    dispatch({ type: COMMON_LOADING_SET, payload: false });
};

export const assignBuilding =
    ({ staffIds, buildingId }) =>
    async (dispatch) => {
        try {
            console.log('Assign building');
            dispatch({ type: COMMON_LOADING_SET, payload: true });
            const respone = await service.assignBuilding({ staffIds, buildingId });
            if (respone.status === 200) {
                dispatch({ type: COMMON_MESSAGE_SET, payload: 'Building is saved' });
            } else {
                dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
            }
        } catch (error) {
            dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
        }
        dispatch({ type: COMMON_LOADING_SET, payload: false });
    };

export const clearBuildingState = () => (dispatch) => {
    console.log('Clear Building State');
    dispatch({ type: BUILDING_STATE_CLEAR });
};

export const clearBuilding = () => (dispatch) => {
    console.log('Clear Building');
    dispatch({ type: BUILDING_SET, payload: {} });
};
