/**
 * Code by Cloud Camilon.
 * Reuse as a whole or in part is prohibited without permission.
 * Coding Challenge for Security Bank Philippines
 * authors: @vcamilon
 */

import { TRecipe } from "@/models/recipe";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type NavigationState = {
  data: TRecipe | null;
};

const initialState: NavigationState = {
  data: null,
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setNavigationData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    clearNavigationData: (state) => {
      state.data = null;
    },
  },
});

export const { setNavigationData, clearNavigationData } =
  navigationSlice.actions;

export default navigationSlice.reducer;
