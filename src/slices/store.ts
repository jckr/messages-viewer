import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import filtersSlice, {filtersReducer} from "./filters-slice";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () =>
  configureStore({
    reducer: {
      [filtersSlice.name]: filtersReducer,
    },
    devTools: true,
  });

  export type AppStore = ReturnType<typeof makeStore>;
  export type AppState = ReturnType<AppStore["getState"]>;
  export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
  >;
  
  const wrapper = createWrapper<AppStore>(makeStore)
  
  export default wrapper;
  