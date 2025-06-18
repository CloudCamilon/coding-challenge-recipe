/**
 * Code by Cloud Camilon.
 * Reuse as a whole or in part is prohibited without permission.
 * Coding Challenge for Security Bank Philippines
 * authors: @vcamilon
 */

import { SortingType, TFilterFavoritesType } from "@/models/home";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { JSX, useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";

export default function FilterSection({
  sortValue,
  onSortChange,
  filterFavorites,
  onFilterFavoritesChange,
}: {
  sortValue: SortingType;
  onSortChange: (order: SortingType) => void;
  filterFavorites: TFilterFavoritesType;
  onFilterFavoritesChange: (value: "YES" | "NO" | undefined) => void;
}): JSX.Element {
  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as "ASC" | "DESC" | "";
    onSortChange(value ? (value as "ASC" | "DESC") : undefined);
  };

  const handleFavoriteCheck =
    (selected: "YES" | "NO") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target.checked;

      if (!isChecked) {
        onFilterFavoritesChange(undefined);
      } else {
        onFilterFavoritesChange(selected);
      }
    };

  return (
    <Box
      id="home-recipe-filter-container"
      sx={{
        flex: { xs: 0.5, sm: 0.7 },
        paddingLeft: { xs: 1, sm: "80px" },
        paddingRight: { xs: 1, sm: "58px" },
        paddingY: { xs: 3, sm: 0 },
      }}
    >
      <Box id="home-recipe-filter-sort">
        <Typography
          sx={{
            fontSize: { xs: "16px", sm: "21px" },
          }}
          fontWeight={600}
          marginBottom={2}
        >
          Sort by Title
        </Typography>
        <FormControl
          id="home-recipe-filter-sort"
          sx={{ width: { xs: "100%" } }}
        >
          <InputLabel id="demo-simple-select-label">Select</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sortValue || ""}
            label="Select"
            onChange={handleChange}
          >
            <MenuItem value={"ASC"}>ASC</MenuItem>
            <MenuItem value={"DESC"}>DESC</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        id="home-recipe-filter-favorites"
        sx={{ marginTop: { xs: 1, sm: 7 } }}
      >
        <Typography fontWeight={600} marginBottom={2}>
          Filter
        </Typography>
        <Box
          sx={{
            borderWidth: 1,
            borderColor: "divider",
            paddingX: { xs: 1, sm: 3 },
            paddingY: { xs: 1, sm: 4 },
            borderRadius: 1,
          }}
        >
          <Typography fontWeight={600} fontSize={"16px"} marginBottom={1}>
            Favorites?
          </Typography>
          <FormGroup row sx={{ gap: 1 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filterFavorites === "YES"}
                  onChange={handleFavoriteCheck("YES")}
                  name="favorites-yes"
                />
              }
              label="Yes"
              labelPlacement="end"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={filterFavorites === "NO"}
                  onChange={handleFavoriteCheck("NO")}
                  name="favorites-no"
                />
              }
              label="No"
              labelPlacement="end"
            />
          </FormGroup>
        </Box>
      </Box>
    </Box>
  );
}
