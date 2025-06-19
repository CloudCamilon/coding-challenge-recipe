/**
 * Code by Cloud Camilon.
 * Reuse as a whole or in part is prohibited without permission.
 * Coding Challenge for Security Bank Philippines
 * authors: @vcamilon
 */

"use client";

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import { SearchIcon } from "../../public/icons";
import { useDebounce } from "@/hooks/useDebounce";

const Search = styled("div")(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0, 3),
  backgroundColor: "#D9D9D9",
  height: "45px",
  display: "flex",
  alignItems: "center",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: alpha("#fff", 1),
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.common.black,
  flex: 1,
  "& .MuiInputBase-input": {
    width: "506px",
    fontSize: "18px",
    padding: theme.spacing(1, 0),
  },
  [theme.breakpoints.down("sm")]: {
    "& .MuiInputBase-input": {
      width: "150px",
    },
  },
}));

type HeaderProps = {
  onSearchChange?: (query: string) => void;
  isSearchEnabled?: boolean;
};

export default function Header({
  onSearchChange,
  isSearchEnabled,
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const debouncedQuery = useDebounce(searchQuery, 300);

  React.useEffect(() => {
    if (onSearchChange) {
      onSearchChange(debouncedQuery);
    }
  }, [debouncedQuery, onSearchChange]);

  return (
    <AppBar position="sticky" sx={{ paddingTop: "30px", height: "96px" }}>
      {isSearchEnabled ? (
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <Search>
            <StyledInputBase
              placeholder="Search here…"
              inputProps={{ "aria-label": "search" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
          </Search>
        </Toolbar>
      ) : undefined}
    </AppBar>
  );
}
