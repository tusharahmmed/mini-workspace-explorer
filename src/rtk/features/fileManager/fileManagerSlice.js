/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: "",
  selected: null,
  documents: [
    { id: "root", name: "Workspace", type: "folder", parentId: null },
  ],
};

export const fileManagerSlice = createSlice({
  name: "fileManager",
  initialState,
  reducers: {
    getAllDocuments: (state) => {},
    addDocuments: (state) => {},
    removeDocument: (state) => {},
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const { getAllDocuments, addDocuments, removeDocument, setSelected } =
  fileManagerSlice.actions;
