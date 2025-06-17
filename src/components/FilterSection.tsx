/**
 * Code by Cloud Camilon.
 * Reuse as a whole or in part is prohibited without permission.
 * Coding Challenge for Security Bank Philippines
 * authors: @vcamilon
 */

import { TFilter } from "@/models/home";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { JSX, useState } from "react";

export default function FilterSection(): JSX.Element {
  const [filter, setFilter] = useState<TFilter>({});

  const handleChange = (event: SelectChangeEvent) => {
    setFilter((filter) => {
      return {
        ...filter,
        sortOrderAsc: event.target.value,
      };
    });
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
            value={filter.sortOrderAsc?.toString()}
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
        <Typography
          sx={{
            fontSize: { xs: "16px", sm: "21px" },
          }}
          fontWeight={600}
          marginBottom={2}
        >
          Filter
        </Typography>
        <Box
          id="home-recipe-filter-favorites-area"
          sx={{
            borderWidth: 1,
            height: { xs: "100%", sm: "182px" },
            paddingX: { xs: 1, sm: 3 },
            paddingY: { xs: 1, sm: 4 },
            borderRadius: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              marginBottom: { xs: 0, sm: 2 },
            }}
            fontWeight={600}
          >
            Favorites?
          </Typography>
          <FormControl
            component="fieldset"
            sx={{ marginLeft: { xs: 0, sm: 4 } }}
          >
            <FormGroup
              aria-label="position"
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "row",
                  sm: "column",
                },
              }}
            >
              <FormControlLabel
                value="end"
                control={<Checkbox />}
                label={
                  <Typography fontSize={"16px"} color="textSecondary">
                    Yes
                  </Typography>
                }
                labelPlacement="end"
              />
              <FormControlLabel
                value="end"
                control={<Checkbox />}
                label={
                  <Typography fontSize={"16px"} color="textSecondary">
                    No
                  </Typography>
                }
                labelPlacement="end"
              />
            </FormGroup>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
}
