/**
 * Code by Cloud Camilon.
 * Reuse as a whole or in part is prohibited without permission.
 * Coding Challenge for Security Bank Philippines
 * authors: @vcamilon
 */

"use client";

import { Box } from "@mui/material";
import { JSX, useEffect, useMemo, useState } from "react";
import FilterSection from "@/components/FilterSection";
import { RecipeList } from "@/components/RecipeList";
import Header from "@/components/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "@/store/recipeSlice";
import type { AppDispatch } from "@/store/store";

export default function HomeContent(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { recipes, status, error } = useSelector((state: any) => state.recipes);
  const [sortValue, setSortValue] = useState<"ASC" | "DESC" | undefined>(
    undefined
  );
  const [filterFavorites, setFilterFavorites] = useState<
    "YES" | "NO" | undefined
  >(undefined);

  const handleFilterFavoritesChange = (value: "YES" | "NO" | undefined) => {
    setFilterFavorites(value);
  };

  const filteredAndSortedRecipes = useMemo(() => {
    let result = [...recipes];

    // 🔁 Filter by favorites
    if (filterFavorites === "YES") {
      result = result.filter((r) => r.isFavorite);
    } else if (filterFavorites === "NO") {
      result = result.filter((r) => !r.isFavorite);
    }

    // 🔁 Sort by title
    if (sortValue === "ASC") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortValue === "DESC") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    return result;
  }, [recipes, sortValue, filterFavorites]);

  useEffect(() => {
    if (recipes.length === 0) {
      dispatch(fetchRecipes());
    }
  }, [dispatch, recipes.length]);

  const handleSortChange = (newOrder: "ASC" | "DESC" | undefined) => {
    setSortValue(newOrder);
  };

  return (
    <Box>
      <Header />
      {status === "loading" || status === "failed" ? (
        <></>
      ) : (
        <Box
          sx={{
            paddingTop: "49px",
            maxHeight: "100%",
            display: "flex",
            flexDirection: { sm: "row", xs: "column" },
          }}
        >
          <FilterSection
            sortValue={sortValue}
            filterFavorites={filterFavorites}
            onSortChange={handleSortChange}
            onFilterFavoritesChange={handleFilterFavoritesChange}
          />
          <RecipeList recipeList={filteredAndSortedRecipes} />
        </Box>
      )}
    </Box>
  );
}
