import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        isAdmin: false,
        isLoggedIn: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setIsAdmin: (state, action) => {
            console.log("setIsAdmin", action.payload);
            state.isAdmin = action.payload;
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        }
    },
})

export const { setUser, setIsAdmin, setIsLoggedIn } = userSlice.actions;
export default userSlice.reducer;