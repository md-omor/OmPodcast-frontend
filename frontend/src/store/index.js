import { configureStore } from "@reduxjs/toolkit";
import activate from "./activateSlice";
import auth from "./authSlice";
import rooms from "./roomSlice";

export const store = configureStore({
  reducer: {
    auth,
    activate,
    rooms,
  },
});
