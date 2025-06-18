/**
 * Code by Cloud Camilon.
 * Reuse as a whole or in part is prohibited without permission.
 * Coding Challenge for Security Bank Philippines
 * authors: @vcamilon
 */

import { AddRecipeFulfilledAction, TRecipe } from "@/models/recipe";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
const fetchRecipes = createAsyncThunk<TRecipe[]>(
  "recipes/fetchRecipes",
  async () => {
    const response = await fetch("/mock/recipes.json");
    if (!response.ok) throw new Error("Failed to load recipes");
    return await response.json();
  }
);

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

const addRecipe = createAsyncThunk<
  TRecipe,
  Omit<TRecipe, "id">,
  { state: RootState; rejectValue: string }
>("recipes/addRecipe", async (recipeData, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const existingRecipe = state.recipes.recipes.find(
      (r) => r.title.toLowerCase() === recipeData.title.toLowerCase()
    );

    if (existingRecipe) {
      return rejectWithValue("A recipe with that title already exists.");
    }

    const newRecipe = await fakeApiSaveRecipe(
      recipeData,
      state.recipes.recipes
    );

    return newRecipe;
  } catch (error) {
    return rejectWithValue("Something went wrong");
  }
});

const updateRecipe = createAsyncThunk<TRecipe, TRecipe, { state: RootState }>(
  "recipes/updateRecipe",
  async (updatedRecipe, { getState }) => {
    const state = getState();
    await new Promise((resolve) => setTimeout(resolve, 500));

    return updatedRecipe;
  }
);

const deleteRecipe = createAsyncThunk<number, number, { state: RootState }>(
  "recipes/deleteRecipe",
  async (recipeId, { getState, rejectWithValue }) => {
    const state = getState();
    const recipeExists = state.recipes.recipes.some((r) => r.id === recipeId);

    if (!recipeExists) {
      return rejectWithValue("Recipe not found");
    }

    await new Promise((resolve) => setTimeout(resolve, 300));

    return recipeId;
  }
);

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
        state.error = action.payload || "Recipe title must be unique.";
      })
      .addCase(updateRecipe.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateRecipe.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.recipes.findIndex(
          (r) => r.id === action.payload.id
        );
        if (index !== -1) {
          state.recipes[index] = action.payload;
        }
      })
      .addCase(updateRecipe.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to update recipe";
      })
      .addCase(deleteRecipe.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        const recipeId = action.payload;

        state.status = "succeeded";
        state.recipes = state.recipes.filter(
          (recipe) => recipe.id !== recipeId
        );
      })
      .addCase(deleteRecipe.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to delete recipe";
      });
  },
});

export { fetchRecipes, addRecipe, updateRecipe, deleteRecipe };
export const { toggleFavorite } = recipeSlice.actions;
export default recipeSlice.reducer;
