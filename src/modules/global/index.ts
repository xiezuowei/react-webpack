import { createSlice } from '@reduxjs/toolkit';

interface IGlobalState {
    loading: boolean;
}

const namespace = 'global';

const initialState: IGlobalState = {
    loading: false
}

export const globalSlice = createSlice({
    name: namespace,
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});

export const { setLoading } = globalSlice.actions;

export default globalSlice.reducer;