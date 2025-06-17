/**
 * Code by Cloud Camilon.
 * Reuse as a whole or in part is prohibited without permission.
 * Coding Challenge for Security Bank Philippines
 * authors: @vcamilon
 */

"use client";

import { Box, Paper, Typography } from "@mui/material";
import { JSX } from "react";
import Image from "next/image";
import { TRecipeCard } from "@/models/home";
import Link from "next/link";
import { setNavigationData } from "@/store/navigationSlice";
import { toggleFavorite } from "@/store/recipeSlice";
import { useDispatch } from "react-redux";
import { TRecipe } from "@/models/recipe";
import FavoriteStarButton from "./FavoriteStarButton";

export default function RecipeCard({
  isFirstItem,
  isLastItem,
  isFavorite,
  recipeCardData,
}: TRecipeCard): JSX.Element {
  const dispatch = useDispatch();

  const handleClick = () => {
    const data: TRecipe = {
      id: recipeCardData.id,
      name: recipeCardData.name,
      email: recipeCardData.email,
      title: recipeCardData.title,
      description: recipeCardData.description,
      ingredients: recipeCardData.ingredients,
      instructions: recipeCardData.instructions,
      date: recipeCardData.date,
      image: recipeCardData.image,
    };
    dispatch(setNavigationData(data));
  };

  const handleFavorite = () => {
    console.log(recipeCardData.id);
    dispatch(toggleFavorite(recipeCardData.id));
  };

  return (
    <Box
      id="recipe-card"
      sx={{
        paddingLeft: { sm: "13px" },
        paddingRight: { sm: "18px" },
        borderBottomWidth: isLastItem ? 0 : 1,
        paddingBottom: 2,
        zIndex: 1,
      }}
    >
      <Paper
        id="recipe-card-container"
        elevation={3}
        sx={{
          borderRadius: "15px",
          border: 1,
          position: "relative",
          gap: "24px",
          paddingRight: { sm: "16px", xs: 2 },
          paddingLeft: { sm: 0, xs: 2 },
          display: "flex",
          minHeight: "223px",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Box
          id="recipe-card-image-container"
          sx={{
            display: { xs: "inline", sm: "flex" },
            flex: { xs: "undefined", sm: 1.5 },
            position: "relative",
            maxWidth: { xs: "100%", sm: "310px" },
          }}
        >
          <Image
            src={"/images/curry.png"}
            alt={"Recipe Image"}
            fill
            style={{ objectFit: "fill" }}
          />
          <Box
            sx={{
              cursor: "pointer",
              zIndex: 1,
              position: "absolute",
              right: 0,
              paddingRight: "10px",
              paddingTop: 1,
            }}
          >
            <FavoriteStarButton
              isFavorite={isFavorite ?? false}
              setFavorite={handleFavorite}
            />
          </Box>
        </Box>
        <Box
          id="recipe-card-content-container"
          sx={{ flex: 2, paddingTop: "22px", paddingBottom: "28px" }}
        >
          <Typography
            variant="h4"
            fontWeight={600}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              marginBottom: "12px",
            }}
          >
            {recipeCardData.title}
          </Typography>
          <Typography
            variant="body1"
            fontWeight={600}
            maxWidth={"90%"}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: { md: 4, xs: 3 },
              WebkitBoxOrient: "vertical",
              marginBottom: "12px",
            }}
          >
            {recipeCardData.description}
          </Typography>
          <Link href={"/add"} onClick={handleClick}>
            <Typography fontWeight={600} fontSize={12} display="inline">
              See more
            </Typography>
          </Link>
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="body1"
              display={"inline-block"}
              fontWeight={600}
            >
              {`Added by: ${recipeCardData.name}`}
            </Typography>
            <Typography
              variant="body1"
              display={"inline-block"}
              fontWeight={600}
            >
              {recipeCardData.date}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
