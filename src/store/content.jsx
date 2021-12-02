import { createSlice } from "@reduxjs/toolkit";

const initialContentState = {content: 'inbox', callDetails: {}};

const contentSlice = createSlice({
  name: "content",
  initialState: initialContentState,
  reducers: {
    setInbox(state){
      state.content = 'inbox';
    },
    setArchived(state){
      state.content = 'archived';
    },
    setDetails(state, action){
      state.content = 'details';
      state.callDetails = action.payload;
    },
  }
})

export const contentActions = contentSlice.actions;
export default contentSlice.reducer;
