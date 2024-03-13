import { configureStore } from "@reduxjs/toolkit";
import {rooteReducer} from "./reducer";

export const store = configureStore({
    reducer: rooteReducer,
});