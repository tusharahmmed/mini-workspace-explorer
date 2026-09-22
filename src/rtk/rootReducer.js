import { combineReducers } from "@reduxjs/toolkit";
import { fileManagerSlice } from "./features/fileManager/fileManagerSlice";

export const rootReducer = combineReducers({
  [fileManagerSlice.name]: fileManagerSlice.reducer,
});
