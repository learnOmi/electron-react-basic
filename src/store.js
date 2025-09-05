import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  files: {},
  activeId: '',
  openIds: [],
  unSaveIds: [],
  searchFiles: [],
  isNew: false,
};

const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILES':
      return { ...state, files: action.payload };
    case 'SET_ACTIVE_ID':
      return { ...state, activeId: action.payload };
    case 'SET_OPEN_IDS':
      return { ...state, openIds: action.payload };
    case 'SET_UNSAVE_IDS':
      return { ...state, unSaveIds: action.payload };
    case 'SET_SEARCH_FILES':
      return { ...state, searchFiles: action.payload };
    case 'SET_IS_NEW':
      return { ...state, isNew: action.payload };
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: {
    file: fileReducer,
  },
});