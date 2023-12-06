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

export const getBuilding = (id) => async (dispatch) => {
    try {
        console.log('Get building');
        dispatch({ type: COMMON_LOADING_SET, payload: true });
        const respone = await service.getBuilding(id);
        if (respone.status === 200) {
            dispatch({ type: BUILDING_SET, payload: respone.data });
        } else {
            console.error(respone.message);
            dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
        }
    } catch (error) {
        // console.error(error.response.data ? error.response.data.messages : error.message);
        console.error(error);
        dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
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
            console.error(respone.message);
            dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
        }
    } catch (error) {
        console.error(error);
    } finally {
        dispatch({ type: COMMON_LOADING_SET, payload: false });
    }
};

export const getBuildingTypes = () => async (dispatch) => {
    try {
        console.log('Get BuildingTypes');
        dispatch({ type: COMMON_LOADING_SET, payload: true });
        const respone = await service.getBuildingTypes();
        if (respone.status === 200) {
            dispatch({ type: BUILDING_TYPES, payload: respone.data });
        } else {
            console.error(respone.message);
            dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
        }
    } catch (error) {
        console.error(error);
        dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
    } finally {
        dispatch({ type: COMMON_LOADING_SET, payload: false });
    }
};

export const getBuildingDistricts = () => async (dispatch) => {
    try {
        console.log('Get Building Districts');
        dispatch({ type: COMMON_LOADING_SET, payload: true });
        const respone = await service.getBuildingDistricts();
        if (respone.status === 200) {
            dispatch({ type: BUILDING_DISTRICTS, payload: respone.data });
        } else {
            console.error(respone.message);
            dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
        }
    } catch (error) {
        console.error(error);
        dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
    } finally {
        dispatch({ type: COMMON_LOADING_SET, payload: false });
    }
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
            console.error(respone.message);
            dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
        }
    } catch (error) {
        console.error(error);
        dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
    } finally {
        dispatch({ type: COMMON_LOADING_SET, payload: false });
    }
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
            console.error(respone.message);
            dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
        }
    } catch (error) {
        console.error(error);
        dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
    } finally {
        dispatch({ type: COMMON_LOADING_SET, payload: false });
    }
};

export const deleteBuildings = (ids) => async (dispatch) => {
    try {
        console.log('delete buildings');
        dispatch({ type: COMMON_LOADING_SET, payload: true });
        const respone = await service.deleteBuildings(ids);
        if (respone.status === 200) {
            dispatch({ type: COMMON_MESSAGE_SET, payload: 'Buildings is deleted' });
        } else {
            console.error(respone.message);
            dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
        }
    } catch (error) {
        console.error(error);
        dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
    } finally {
        dispatch({ type: COMMON_LOADING_SET, payload: false });
    }
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
                console.error(respone.message);
                dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
            }
        } catch (error) {
            console.error(error);
            dispatch({ type: COMMON_ERROR_SET, payload: 'An error occurred' });
        } finally {
            dispatch({ type: COMMON_LOADING_SET, payload: false });
        }
    };

export const clearBuildingState = () => (dispatch) => {
    console.log('Clear Building State');
    dispatch({ type: BUILDING_STATE_CLEAR });
};

export const clearBuilding = () => (dispatch) => {
    console.log('Clear Building');
    dispatch({ type: BUILDING_SET, payload: {} });
};
