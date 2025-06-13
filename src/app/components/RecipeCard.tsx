"use client";

import { Box, Paper, Typography } from "@mui/material";
import { JSX } from "react";
import Image from "next/image";
import { TRecipeCard } from "@/models/home";
import { AddIcon } from "../../../public/icons";

/**
 * Code by Cloud Camilon.
 * Reuse as a whole or in part is prohibited without permission.
 * Coding Challenge for Security Bank Philippines
 * authors: @vcamilon
 */

export default function RecipeCard({
  isFirstItem,
  isLastItem,
}: TRecipeCard): JSX.Element {
  return (
    <Box
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
          paddingRight: "16px",
          display: "flex",
          minHeight: "223px",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Box
          id="recipe-card-image-container"
          sx={{
            display: { xs: "inline", sm: "flex" },
            flex: { xs: "undefined", sm: 1 },
            position: "relative",
            maxWidth: { xs: "100%", sm: "310px" },
            height: "224px",
          }}
        >
          <Image
            src={"/assets/curry.png"}
            alt={"Recipe Image"}
            fill
            style={{ objectFit: "fill" }}
          />
        </Box>
        <Box
          id="recipe-card-content-container"
          sx={{ flex: 2, paddingTop: "22px", paddingBottom: "28px" }}
        >
          <Typography variant="h4" fontWeight={600}>
            Title
          </Typography>
          <Typography variant="body1" fontWeight={600} maxWidth={"90%"}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy Lorem
            Ipsum is simply dummy text of the printing and typese
          </Typography>
          <Typography fontSize={12}>See more</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography display={"inline-block"} fontSize={12}>
              Added by: Johnny
            </Typography>
            <Typography display={"inline-block"} fontSize={12}>
              March 6, 2024
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
