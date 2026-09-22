/* eslint-disable no-unused-vars */
import { toast } from "@/components/ui/toast";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: "",
  selected: {
    id: "root",
    name: "Workspace",
    type: "folder",
    parentId: null,
  },
  documents: [
    { id: "root", name: "Workspace", type: "folder", parentId: null },
  ],
};

export const fileManagerSlice = createSlice({
  name: "fileManager",
  initialState,
  reducers: {
    getAllDocuments: (state) => {},
    addDocuments: (state, action) => {
      const data = action.payload;

      // check exist file
      const exist = state.documents.some(
        (item) => item.name == data.name && item.parentId == data.parentId,
      );
      if (exist) {
        toast.add({
          type: "error",
          description: `${data.type} already exist!`,
        });
      } else {
        state.documents.push(data);
      }
    },
    removeDocument: (state) => {},
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const { getAllDocuments, addDocuments, removeDocument, setSelected } =
  fileManagerSlice.actions;
