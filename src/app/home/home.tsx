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

/**
 * This function serves as the functional component
 * for the Home Recipe page. UI component that houses
 * functionalaties like sorting, display, search, etc
 *
 * @returns {JSX.Element} Returns home page.
 */
export default function HomeContent(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { recipes, status } = useSelector((state: any) => state.recipes);
  const [sortValue, setSortValue] = useState<"ASC" | "DESC" | undefined>(
    undefined
  );
  const [filterFavorites, setFilterFavorites] = useState<
    "YES" | "NO" | undefined
  >(undefined);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleFilterFavoritesChange = (value: "YES" | "NO" | undefined) => {
    setFilterFavorites(value);
  };

  const filteredAndSortedRecipes = useMemo(() => {
    let result = [...recipes];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((r) => r.title.toLowerCase().includes(query));
    }

    if (filterFavorites === "YES") {
      result = result.filter((r) => r.isFavorite);
    } else if (filterFavorites === "NO") {
      result = result.filter((r) => !r.isFavorite);
    }

    if (sortValue === "ASC") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortValue === "DESC") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    return result;
  }, [recipes, sortValue, filterFavorites, searchQuery]);

  useEffect(() => {
    console.log(recipes);
  }, []);

  useEffect(() => {
    if (recipes.length === 0) {
      dispatch(fetchRecipes());
    }
  }, [dispatch, recipes.length]);

  const handleSortChange = (newOrder: "ASC" | "DESC" | undefined) => {
    setSortValue(newOrder);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <Box>
      <Header onSearchChange={handleSearchChange} isSearchEnabled={true} />
      {status === "loading" || status === "failed" ? (
        <></>
      ) : (
        <Box
          sx={{
            paddingTop: { xs: "10px", md: "49px" },
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
