import { createSlice } from '@reduxjs/toolkit';

export const formSlice = createSlice({
    name: 'form',
    initialState: {
        toggle: false,
        isSignup: false,
        isProfileOptions: false,
    },
    reducers: {
        toggleForm: (state, action) => {
            state.toggle = action.payload;
        },
        toggleSignInSignOut: (state, action) => {
            state.isSignup = action.payload;
        },
        toggleProfileOptions: (state, action) => {
            state.isProfileOptions = action.payload;
        }
    },
})

export const { toggleForm, toggleSignInSignOut, toggleProfileOptions } = formSlice.actions;
export default formSlice.reducer;