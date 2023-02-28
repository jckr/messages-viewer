import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { AppState } from './store';
export type FilterState = {
    start: string,
    end: string,
    min: string,
    max: string
}

type Range = {
    start: string,
    end: string
}

const initialState: FilterState = {
    start: '2000-01-01',
    end: '2020-01-01',
    min: '2000-01-01',
    max: '9999-12-31',
};


const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setMax: (state, action: PayloadAction<string>) => {
            state.max = action.payload;
            if (state.end > state.max) {
                state.end = state.max;
            }
        },
        setMin: (state, action: PayloadAction<string>) => {
            state.min = action.payload;
            if (state.start < state.min) {
                state.start = state.min;
            }
        },
        setStart: (state, action: PayloadAction<string>) => {
            if (action.payload < state.end) {
                state.start = action.payload;
            }
        },
        setEnd: (state, action: PayloadAction<string>) => {
            if (action.payload > state.start) {
            state.end = action.payload;
            }
        },
        setStartEnd: (state, action: PayloadAction<Range>) => {
            state.start = action.payload.start;
            state.end = action.payload.end;
        },
        reset: (state) => {
            state.start = state.min;
            state.end = state.max;
        }
    }
});

export const filtersReducer = filtersSlice.reducer;
export const selectFiltersState = (state: AppState) => state.filters;
export const {setStart, setEnd, setStartEnd, setMin, setMax, reset} = filtersSlice.actions;

export default filtersSlice;