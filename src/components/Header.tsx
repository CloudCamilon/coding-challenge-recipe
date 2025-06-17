"use client";

/**
 * Code by Cloud Camilon.
 * Reuse as a whole or in part is prohibited without permission.
 * Coding Challenge for Security Bank Philippines
 * authors: @vcamilon
 */

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import { SearchIcon } from "../../public/icons";

const Search = styled("div")(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0, 3, 0, 3),
  backgroundColor: "#D9D9D9",
  height: "45px",
  display: "flex",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 1),
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.common.black,
  "& .MuiInputBase-input": {
    width: "506px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "150px",
  },
  [theme.breakpoints.up("sm")]: {
    width: "506px",
  },
}));

export default function Header() {
  return (
    <AppBar position="sticky" sx={{ paddingTop: "30px", height: "96px" }}>
      <Toolbar sx={{ justifyContent: "flex-end" }}>
        <Search>
          <StyledInputBase
            placeholder="Search here…"
            inputProps={{ "aria-label": "search" }}
          />
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
        </Search>
      </Toolbar>
    </AppBar>
  );
}
