/**
 * Code by Cloud Camilon.
 * Reuse as a whole or in part is prohibited without permission.
 * Coding Challenge for Security Bank Philippines
 * authors: @vcamilon
 */

import { JSX } from "react";
import { Star, StarHollow } from "../../public/icons";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";

export default function FavoriteStarButton({
  isFavorite,
  setFavorite,
}: {
  isFavorite: boolean;
  setFavorite: () => void;
}): JSX.Element {
  const dispatch = useDispatch();

  return (
    <Box sx={{ cursor: "pointer" }} onClick={setFavorite}>
      {isFavorite ? <Star /> : <StarHollow />}
    </Box>
  );
}
