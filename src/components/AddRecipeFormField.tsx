/**
 * Code by Cloud Camilon.
 * Reuse as a whole or in part is prohibited without permission.
 * Coding Challenge for Security Bank Philippines
 * authors: @vcamilon
 */

"use client";

import { JSX } from "react";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { AddRecipeFormTextArea, TAddRecipeForm } from "@/models/add";
import CancelIcon from "@mui/icons-material/Cancel";
import { CheckIcon } from "../../public/icons";

export function AddRecipeFormFieldText({
  title,
  register,
  error,
  name,
  isSubmitted,
  isDisabled,
}: TAddRecipeForm): JSX.Element {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography color="#000" marginBottom={1} fontSize={20} letterSpacing={5}>
        {title}
      </Typography>
      <TextField
        disabled={isDisabled}
        {...register(name)}
        fullWidth
        placeholder="Text field data"
        variant="outlined"
        error={!!error}
        helperText={error}
        sx={{
          backgroundColor: "white",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: !!error && isSubmitted ? "#d32f2f" : undefined,
            },
            "&:hover fieldset": {
              borderColor: !!error && isSubmitted ? "#b71c1c" : undefined,
            },
            "&.Mui-focused fieldset": {
              borderColor: !!error && isSubmitted ? "#d32f2f" : undefined,
            },
          },
          "& .MuiFormHelperText-root": {
            marginLeft: "28px",
          },
        }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                {isSubmitted && error && (
                  <CancelIcon
                    sx={{ color: "#d32f2f", width: 15, height: 15 }}
                  />
                )}
                {isSubmitted && !error && <CheckIcon />}
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
}

export function AddRecipeFormFieldTextArea({
  title,
  rows,
  register,
  error,
  name,
  isSubmitted,
}: AddRecipeFormTextArea): JSX.Element {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography color="#000" marginBottom={1} letterSpacing={5}>
        {title}
      </Typography>
      <TextField
        {...register(name)}
        variant="outlined"
        placeholder="Description here"
        multiline
        rows={rows}
        error={!!error}
        helperText={error}
        sx={{
          backgroundColor: "white",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: !!error && isSubmitted ? "#d32f2f" : undefined,
            },
            "&:hover fieldset": {
              borderColor: !!error && isSubmitted ? "#b71c1c" : undefined,
            },
            "&.Mui-focused fieldset": {
              borderColor: !!error && isSubmitted ? "#d32f2f" : undefined,
            },
          },
          "& .MuiFormHelperText-root": {
            marginLeft: "28px",
          },
        }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                {isSubmitted && error && (
                  <CancelIcon
                    sx={{ color: "#d32f2f", width: 15, height: 15 }}
                  />
                )}
                {isSubmitted && !error && <CheckIcon />}
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
}
