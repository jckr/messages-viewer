import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { AppState } from './store';
export type FilterState = {
    start: string,
    end: string
}

const initialState: FilterState = {
    start: '2000-01-01',
    end: '2020-01-01'
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setStart: (state, action: PayloadAction<string>) => {
            if (action.payload < state.end) {
                state.start = action.payload;
            }
        },
        setEnd: (state, action: PayloadAction<string>) => {
            if (action.payload > state.start) {
            state.end = action.payload;
            }
        }
    }
});

export const filtersReducer = filtersSlice.reducer;
export const selectFiltersState = (state: AppState) => state.filters;
export const {setStart, setEnd } = filtersSlice.actions;

export default filtersSlice;