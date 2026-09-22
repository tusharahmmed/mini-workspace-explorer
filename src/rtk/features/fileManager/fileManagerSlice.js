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
  },
});

export const { getAllDocuments, addDocuments, removeDocument } =
  fileManagerSlice.actions;
