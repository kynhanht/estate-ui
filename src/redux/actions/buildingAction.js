export const createBuilding = (building, navigate) => async (dispatch) => {
    // const service = {};

    try {
        console.log('insert category');
    } catch (error) {
        console.log('Error: ' + error);

        navigate('buildings/list');
    }
};
