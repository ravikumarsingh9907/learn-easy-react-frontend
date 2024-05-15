import { createSlice} from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: 'filters',
    initialState: {
        filters: null,
    },
    reducers: {
        setFilterData: (state, action) => {
            state.filters = action.payload;
        },
    }
});

export const { setFilterData } = filterSlice.actions;
export default  filterSlice.reducer;