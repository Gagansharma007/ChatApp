import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices/reducers';
import { apiSlice } from './slices/apiSlice';
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath] : apiSlice.reducer,
        root : rootReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools : true,
});
export default store;