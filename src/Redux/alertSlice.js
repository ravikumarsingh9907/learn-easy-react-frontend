import { createSlice } from '@reduxjs/toolkit';

export const alertSlice = createSlice({
    name: 'form',
    initialState: {
        isVisible: false,
        message: null,
    },
    reducers: {
        showAlert: (state, action) => {
            state.isVisible = action.payload;
        },
        setAlertMessage: (state, action) => {
            state.message = action.payload;
        },
    },
})

export const { showAlert, setAlertMessage } = alertSlice.actions;
export default alertSlice.reducer;