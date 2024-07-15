import { configureStore } from "@reduxjs/toolkit";

const Action = (state = {
  token: "", role: "", User: {
    imagePath: "",
    username: "",
    role: {},
    id: "",
    group: []
  }, Loading: false
}, action) => {
  switch (action.type) {
    case "SET-TOKEN":
      return {
        ...state,
        token: action.payload
      };
    case "SET-ROLE":
      return {
        ...state,
        role: action.payload
      };
    case "SET-USER":
      return {
        ...state,
        User: action.payload
      };
    case "SET-LOADING":
      return {
        ...state,
        Loading: action.payload
      };
    default:
  }
  return state;
}

export const store = configureStore({ reducer: Action })