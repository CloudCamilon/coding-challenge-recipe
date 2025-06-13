"use client";

import { ThemeProvider } from "@emotion/react";
import { Box, List, Paper } from "@mui/material";
import { JSX } from "react";
import RecipeCard from "../components/RecipeCard";
import { AddIcon } from "../../../public/icons";
import { secBankTheme } from "@/styles/theme";
/**
 * Code by Cloud Camilon.
 * Reuse as a whole or in part is prohibited without permission.
 * Coding Challenge for Security Bank Philippines
 * authors: @vcamilon
 */

export default function HomeContent(): JSX.Element {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { sm: "row", xs: "column" },
      }}
    >
      <Box
        id="home-recipe-filter-container"
        sx={{
          backgroundColor: "lightsalmon",
          flex: { xs: 0.5, sm: 1 },
        }}
      >
        Thank youu, I'll say goodbye soon Though it's the end of the world,
        don't blame yourself, now And if it's true, I will surround you and give
        life to a world That's our own Thank you, I'll say goodbye now Though
        it's the end of the world, don't blame yourself And if it's true, I will
        surround you and give life to a world That's our own
      </Box>
      <Box
        id="home-recipe-list-container"
        sx={{
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
            paddingY: { sm: "47px", xs: "10px" },
            borderRadius: 2,
            paddingX: { xs: 1, sm: 0 },
            paddingLeft: { sm: "40px" },
            paddingRight: { sm: "27px" },
            paddingTop: "49px",
            width: "100%",
          }}
        >
          <Box
            id="home-recipe-list-area-content"
            sx={{
              position: "relative",
              display: "flex",
              maxHeight: "500px",
              overflow: "auto",
              zIndex: 1,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                zIndex: 10000,
              }}
            >
              <AddIcon />
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
              <RecipeCard />
              <RecipeCard />
              <RecipeCard />
              <RecipeCard />
              <RecipeCard isLastItem={true} />
            </List>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
