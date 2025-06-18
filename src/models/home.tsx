/**
 * Code by Cloud Camilon.
 * Reuse as a whole or in part is prohibited without permission.
 * Coding Challenge for Security Bank Philippines
 * authors: @vcamilon
 */

import { TRecipe } from "./recipe";

export type SortingType = "ASC" | "DESC" | undefined;

export type TFilterFavoritesType = "YES" | "NO" | undefined;

export type TRecipeCard = {
  key?: number;
  isFirstItem?: boolean;
  isLastItem?: boolean;
  isFavorite?: boolean;
  recipeCardData: TRecipe;
};

export type TFilter = {
  sortOrderAsc?: SortingType;
  filterFavorites?: boolean;
};
