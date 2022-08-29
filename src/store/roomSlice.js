import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomName: "",
  name: "",
};

export const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    getRoomsName: (state, action) => {
      // const { roomName } = action.payload;
      state.roomName = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getRoomsName } = roomSlice.actions;

export default roomSlice.reducer;
