/**
 * Code by Cloud Camilon.
 * Reuse as a whole or in part is prohibited without permission.
 * Coding Challenge for Security Bank Philippines
 * authors: @vcamilon
 */

import { createTheme } from "@mui/material/styles";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const secBankTheme = createTheme({
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  palette: {
    background: { default: "#EBEBEB" },
    primary: {
      light: "#EE6400",
      main: "#435490",
    },
  },
});
