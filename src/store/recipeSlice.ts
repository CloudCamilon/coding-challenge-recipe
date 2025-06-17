/**
 * Code by Cloud Camilon.
 * Reuse as a whole or in part is prohibited without permission.
 * Coding Challenge for Security Bank Philippines
 * authors: @vcamilon
 */

import { AddRecipeFulfilledAction, TRecipe } from "@/models/recipe";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

// Async thunk to load recipes from JSON
const fetchRecipes = createAsyncThunk<TRecipe[]>(
  "recipes/fetchRecipes",
  async () => {
    const response = await fetch("/mock/recipes.json");
    if (!response.ok) throw new Error("Failed to load recipes");
    return await response.json();
  }
);

// Fake API function
const fakeApiSaveRecipe = async (
  recipeData: Omit<TRecipe, "id">,
  currentRecipes: TRecipe[]
): Promise<TRecipe> => {
  const newId = currentRecipes.length + 1;
  return {
    ...recipeData,
    id: newId,
  };
};

// Thunk
const addRecipe = createAsyncThunk<
  TRecipe,
  Omit<TRecipe, "id">,
  { state: RootState }
>("recipes/addRecipe", async (recipeData, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const currentRecipes = state.recipes.recipes;

    // Simulate saving to backend
    const newRecipe = await fakeApiSaveRecipe(recipeData, currentRecipes);

    return newRecipe;
  } catch (error) {
    return rejectWithValue("Something went wrong");
  }
});

interface RecipeState {
  recipes: TRecipe[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: RecipeState = {
  recipes: [],
  status: "idle",
  error: null,
};

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const recipeId = action.payload;
      state.recipes = state.recipes.map((recipe) =>
        recipe.id === recipeId
          ? { ...recipe, isFavorite: !recipe.isFavorite }
          : recipe
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(addRecipe.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        addRecipe.fulfilled,
        (state, action: AddRecipeFulfilledAction) => {
          state.status = "succeeded";
          state.recipes.push(action.payload);
        }
      )
      .addCase(addRecipe.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Failed to add recipe";
      });
  },
});

export { fetchRecipes, addRecipe };
export const { toggleFavorite } = recipeSlice.actions;
export default recipeSlice.reducer;
