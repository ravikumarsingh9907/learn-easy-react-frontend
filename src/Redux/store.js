import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import alertSlice from './alertSlice';

export const store = configureStore({
    reducer: {
        form: formReducer,
        alert: alertSlice,
    },
});