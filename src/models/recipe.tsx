/**
 * Code by Cloud Camilon.
 * Reuse as a whole or in part is prohibited without permission.
 * Coding Challenge for Security Bank Philippines
 * authors: @vcamilon
 */

import { addRecipe } from "@/store/recipeSlice";

export type TRecipe = {
  id: number;
  name: string;
  email: string;
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  date?: string;
  image?: string;
  isFavorite?: boolean;
};

export type TAddRecipeFormSubmit = Omit<TRecipe, "id" | "date" | "isFavorite">;

export type AddRecipeFulfilledAction = ReturnType<typeof addRecipe.fulfilled>;
