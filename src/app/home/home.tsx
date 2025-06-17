/**
 * Code by Cloud Camilon.
 * Reuse as a whole or in part is prohibited without permission.
 * Coding Challenge for Security Bank Philippines
 * authors: @vcamilon
 */

"use client";

import { Box } from "@mui/material";
import { JSX, useEffect, useState } from "react";
import FilterSection from "@/components/FilterSection";
import { RecipeList } from "@/components/RecipeList";
import Header from "@/components/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "@/store/recipeSlice";
import type { AppDispatch } from "@/store/store";

export default function HomeContent(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { recipes, status, error } = useSelector((state: any) => state.recipes);
  useEffect(() => {
    if (recipes.length === 0) {
      dispatch(fetchRecipes());
    }
  }, [dispatch, recipes.length]);

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
          <FilterSection />
          <RecipeList recipeList={recipes} />
        </Box>
      )}
    </Box>
  );
}
