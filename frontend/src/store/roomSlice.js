import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  avatar: "",
};

export const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    getAllRooms: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const { setName, setAvatar } = roomSlice.actions;

export default roomSlice.reducer;
