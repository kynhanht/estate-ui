import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import rootReducer from './rootReducer';
// import logger from 'redux-logger';
import { thunk } from 'redux-thunk';

// export const store = configureStore({
//     reducer: rootReducer,
//     middleware: [thunk, logger],
// });

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
});

export const persistor = persistStore(store);

// const initialState = {};
// function configureAppStore(preLoadedState) {
//     const store = configureStore({
//         reducer: rootReducer,
//         preloadedState: preLoadedState,
//         middleware: [thunk, logger],
//     });

//     if (process.env.NODE_ENV !== 'production' && module.hot) {
//         module.hot.accept('./rootReducer');

//         store.replaceReducer(rootReducer);
//     }
//     return store;
// }

// export default configureAppStore(initialState);
