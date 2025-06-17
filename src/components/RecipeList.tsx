/**
 * Code by Cloud Camilon.
 * Reuse as a whole or in part is prohibited without permission.
 * Coding Challenge for Security Bank Philippines
 * authors: @vcamilon
 */

import { secBankTheme } from "@/styles/theme";
import { Box, List, SelectChangeEvent, Typography } from "@mui/material";
import { JSX, useState } from "react";
import RecipeCard from "./RecipeCard";
import AddRecipeButton from "./AddRecipeButton";
import { TRecipe } from "@/models/recipe";

export function RecipeList({
  recipeList,
}: {
  recipeList: TRecipe[];
}): JSX.Element {
  const hasRecords = true;

  return (
    <Box
      id="home-recipe-list-container"
      sx={{
        paddingBottom: { md: 5 },
        flex: 2,
        paddingRight: { sm: "55px" },
        display: "flex",
        justifyContent: { xs: "center", sm: "flex-start" },
      }}
    >
      <Box
        id="home-recipe-list-area"
        sx={{
          backgroundColor: secBankTheme.palette.common.white,
          borderRadius: 2,
          paddingTop: { md: hasRecords ? "50px" : 0 },
          paddingX: { xs: 1, sm: 0 },
          paddingLeft: { sm: "40px" },
          paddingRight: { sm: "27px" },
          width: "100%",
          position: "relative",
        }}
      >
        <div
          style={{
            display: hasRecords ? "none" : "block",
            position: "absolute",
            top: 24,
            right: 39,
            zIndex: 30,
          }}
        >
          <AddRecipeButton />
        </div>
        <Box
          id="home-recipe-list-area-content"
          sx={{
            position: "relative",
            display: "flex",
            minHeight: "100%",
            height: { xs: "450px", lg: "500px", xl: "650px" },
            overflow: "auto",
            zIndex: 1,
            justifyContent: hasRecords ? "flex-start" : "center",
            alignItems: hasRecords ? "flex-start" : "center",
          }}
        >
          {hasRecords ? (
            <>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  zIndex: 30,
                }}
              >
                <AddRecipeButton />
              </div>
              <List
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  zIndex: 1,
                }}
              >
                {recipeList.map((recipe, i) => {
                  return (
                    <RecipeCard
                      key={i}
                      isFirstItem={i === 0}
                      isLastItem={i === recipeList.length - 1}
                      isFavorite={recipe.isFavorite}
                      recipeCardData={{
                        id: recipe.id,
                        name: recipe.name,
                        email: recipe.email,
                        title: recipe.title,
                        description: recipe.description,
                        ingredients: recipe.ingredients,
                        instructions: recipe.instructions,
                        date: recipe.date,
                        image: recipe.image,
                        isFavorite: recipe.isFavorite,
                      }}
                    />
                  );
                })}
              </List>
            </>
          ) : (
            <Typography variant="h3" fontWeight={600}>
              No Record Found!
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
