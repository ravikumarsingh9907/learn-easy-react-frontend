import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import alertSlice from './alertSlice';
import userSlice from './userSlice';
import filterSlice from "./filterSlice";

export const store = configureStore({
    reducer: {
        form: formReducer,
        alert: alertSlice,
        user: userSlice,
        filters: filterSlice,
    },
});