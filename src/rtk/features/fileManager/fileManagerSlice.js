/* eslint-disable no-unused-vars */
import { toast } from "@/components/ui/toast";
import { createSlice } from "@reduxjs/toolkit";

const defaultDir = {
  id: "root",
  name: "Workspace",
  type: "folder",
  parentId: null,
};

const initialState = {
  filter: "",
  currentDir: defaultDir,
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
    removeDocument: (state) => {
      if (state.selected && state.selected.id == "root") {
        toast.add({
          type: "error",
          description: `${state.selected.type} can not be deleted!`,
        });
      } else {
        const id = state.selected.id;

        const allIds = new Set([id]);

        const selectNestedDocument = (parentId) => {
          state.documents
            .filter((item) => item.parentId == parentId)
            .forEach((item) => {
              allIds.add(item.id);
              selectNestedDocument(item.id);
            });
        };

        selectNestedDocument(id);

        state.documents = state.documents.filter(
          (item) => !allIds.has(item.id),
        );
        toast.add({
          type: "success",
          description: `${state.selected.type} has been deleted!`,
        });
        state.selected = null;
      }
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    setCurrentDir: (state, action) => {
      state.currentDir = action.payload;
    },
  },
});

export const {
  getAllDocuments,
  addDocuments,
  removeDocument,
  setSelected,
  setCurrentDir,
} = fileManagerSlice.actions;
