import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomName: "",
  // avatar: "",
};

export const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    getRoomsName: (state, action) => {
      // const { roomName } = action.payload;
      const { topic } = action.payload;
      state.roomName = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getRoomsName } = roomSlice.actions;

export default roomSlice.reducer;
