/**
 * Code by Cloud Camilon.
 * Reuse as a whole or in part is prohibited without permission.
 * Coding Challenge for Security Bank Philippines
 * authors: @vcamilon
 */

import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./navigationSlice";
import recipeReducer from "./recipeSlice";

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    recipes: recipeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
