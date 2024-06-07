//import { createStore } from "redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";

// const initialVal = {
//   count: 0,
// };

const counterSlice = createSlice({
  name: "counter",
  initialState: { counterVal: 0 },
  reducers: {
    increment: (state) => {
      state.counterVal++;
    },
    decrement: (state) => {
      state.counterVal--;
    },
    reset: (state, action) => {
      state.counterVal = 0;
    },
  },
});

// const counterReducer = (store = initialVal, action) => {
//   if (action.type === "Increment") {
//     return { count: store.count + 1 };
//   } else if (action.type === "Decrement") {
//     return { count: store.count - 1 };
//   } else if (action.type === "Reset") {
//     return { count: 0 };
//   }
//   return store;
// };

const counterStore = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

export const counterActions = counterSlice.actions;
export default counterStore;
