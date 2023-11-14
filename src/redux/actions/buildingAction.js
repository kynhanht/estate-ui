import BuildingService from '~/services/buildingService';
import {
    BUILDING_DISTRICTS,
    BUILDING_SEARCH,
    BUILDING_SET,
    BUILDING_STATE_CLEAR,
    BUILDING_TYPES,
    COMMON_ERROR_SET,
    COMMON_LOADING_SET,
    COMMON_MESSAGE_SET,
} from './actionTypes';

const service = new BuildingService();

export const createBuilding = (building, navigate) => async (dispatch) => {
    try {
        console.log('Create building');
        dispatch({ type: COMMON_LOADING_SET, payload: true });
        const respone = await service.createBuilding(building);
        if (respone.status === 201) {
            dispatch({ type: BUILDING_SET, payload: respone.data });
            dispatch({ type: COMMON_MESSAGE_SET, payload: 'Building is saved' });
            navigate('/buildings/list');
        } else {
            dispatch({ type: COMMON_ERROR_SET, payload: respone.message });
        }
    } catch (error) {
        console.error(error.response.data ? error.response.data.messages : error.message);
        dispatch({ type: COMMON_ERROR_SET, payload: 'Có lỗi xảy ra' });
    } finally {
        dispatch({ type: COMMON_LOADING_SET, payload: false });
    }
};

export const searchBuildings = (buildingSearchRequest) => async (dispatch) => {
    try {
        console.log('Search buildings');
        dispatch({ type: COMMON_LOADING_SET, payload: true });
        const respone = await service.searchBuildings(buildingSearchRequest);
        if (respone.status === 200) {
            dispatch({ type: BUILDING_SEARCH, payload: respone.data });
        } else {
            dispatch({ type: COMMON_ERROR_SET, payload: respone.message });
        }
    } catch (error) {
        console.error(error.response.data ? error.response.data.messages : error.message);
    } finally {
        dispatch({ type: COMMON_LOADING_SET, payload: false });
    }
};

export const getBuildingTypes = () => async (dispatch) => {
    try {
        dispatch({ type: COMMON_LOADING_SET, payload: true });
        console.log('Get BuildingTypes');
        const respone = await service.getBuildingTypes();
        if (respone.status === 200) {
            dispatch({ type: BUILDING_TYPES, payload: respone.data });
        }
    } catch (error) {
        console.error(error.response.data ? error.response.data.messages : error.message);
    } finally {
        dispatch({ type: COMMON_LOADING_SET, payload: false });
    }
};

export const getBuildingDistricts = () => async (dispatch) => {
    try {
        dispatch({ type: COMMON_LOADING_SET, payload: true });
        console.log('Get Building Districts');
        const respone = await service.getBuildingDistricts();
        if (respone.status === 200) {
            dispatch({ type: BUILDING_DISTRICTS, payload: respone.data });
        }
    } catch (error) {
        console.error(error.response.data ? error.response.data.messages : error.message);
    } finally {
        dispatch({ type: COMMON_LOADING_SET, payload: false });
    }
};

export const clearBuildingState = () => (dispatch) => {
    dispatch({ type: BUILDING_STATE_CLEAR });
};
