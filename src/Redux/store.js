import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import alertSlice from './alertSlice';
import userSlice from './userSlice';

export const store = configureStore({
    reducer: {
        form: formReducer,
        alert: alertSlice,
        user: userSlice,
    },
});