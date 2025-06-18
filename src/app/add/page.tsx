/**
 * Code by Cloud Camilon.
 * Reuse as a whole or in part is prohibited without permission.
 * Coding Challenge for Security Bank Philippines
 * authors: @vcamilon
 */

"use client";

import { JSX, useEffect, useState } from "react";
import { Box, Button, ThemeProvider, Typography } from "@mui/material";
import Header from "@/components/Header";
import { secBankTheme } from "@/styles/theme";
import {
  AddRecipeFormFieldText,
  AddRecipeFormFieldTextArea,
} from "@/components/AddRecipeFormField";
import AddRecipeImage from "@/components/AddRecipeImage";
import { useForm } from "react-hook-form";
import { RecipeFormInputs, RecipeFormSchema } from "@/schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { clearNavigationData } from "@/store/navigationSlice";
import Link from "next/link";
import { TAddRecipeFormSubmit, TRecipe } from "@/models/recipe";
import { addRecipe, deleteRecipe, updateRecipe } from "@/store/recipeSlice";
import { AppDispatch } from "@/store/store";

export default function AddRecipePage({}: {}): JSX.Element {
  const navigationData = useSelector((state: any) => state.navigation.data);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    setError,
  } = useForm<RecipeFormInputs>({
    resolver: zodResolver(RecipeFormSchema),
    mode: "onSubmit",
    defaultValues: navigationData || {
      name: "",
      email: "",
      title: "",
      description: "",
      ingredients: "",
      instructions: "",
    },
  });

  const dispatch = useDispatch<AppDispatch>();

  const [recipeData, setRecipeData] = useState<TRecipe | undefined>(undefined);

  useEffect(() => {
    if (navigationData) {
      setRecipeData(() => {
        return {
          id: navigationData.id,
          name: navigationData.name,
          email: navigationData.email,
          title: navigationData.title,
          description: navigationData.description,
          ingredients: navigationData.ingredients,
          instructions: navigationData.instructions,
          date: navigationData.data,
          image: navigationData.image,
        };
      });
    }
    return () => {
      dispatch(clearNavigationData());
    };
  }, [dispatch]);

  const onSubmit = async (formData: TAddRecipeFormSubmit) => {
    console.log(formData.image);
    if (recipeData) {
      const updatedRecipe = {
        ...formData,
        id: recipeData.id,
      };

      try {
        await dispatch(updateRecipe(updatedRecipe));
        alert("✅ Recipe updated!");
      } catch (err) {
        console.error(err);
      }
    } else {
      const { title, image, ...rest } = formData;

      try {
        const response = await fetch("/api/save-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, imageData: image }),
        });

        const result = await response.json();

        if (!response.ok) {
          setError("image", {
            type: "manual",
            message: "Failed to save image",
          });
          return;
        }

        const recipeToSave = {
          ...rest,
          title,
          image: result.path,
          date: new Date().toISOString(),
          isFavorite: false,
        };

        await dispatch(addRecipe(recipeToSave)).unwrap();
        alert(" Recipe added!");
      } catch (err: any) {
        console.log(err);
        if (err === "A recipe with that title already exists.") {
          setError("title", {
            type: "manual",
            message: err,
          });
        } else {
          alert(" Failed to save recipe");
        }
      }
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteRecipe(recipeData?.id ?? -1));
      alert("✅ Recipe deleted!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ThemeProvider theme={secBankTheme}>
      <Box>
        <Header />
        <Box
          sx={{
            padding: 1,
            paddingTop: 3,
            backgroundColor: "#EBEBEB",
            display: "flex",
            minHeight: "90vh",
            flexDirection: { sm: "row", xs: "column" },
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              paddingLeft: "41px",
              paddingRight: "52px",
              maxWidth: { md: "40%", xs: "100%" },
            }}
          >
            <Link href="/">
              <Typography variant={"h4"} color="black" marginLeft={2}>
                {`< Back`}
              </Typography>
            </Link>

            <Box
              id="recipe-card-image-container"
              sx={{
                marginTop: "43px",
                position: "relative",
                width: { lg: "457px", xs: "100%" },
                height: { lg: "401px", xs: "250px" },
              }}
            >
              <AddRecipeImage register={register} name="image" />
            </Box>
            {errors.image && (
              <Typography color="error">Image is required</Typography>
            )}
          </Box>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 3,
              paddingRight: "149px",
            }}
          >
            <AddRecipeFormFieldText
              title={"YOUR NAME"}
              register={register}
              error={errors.name?.message}
              name="name"
              isSubmitted={isSubmitted}
            />
            <AddRecipeFormFieldText
              title={"EMAIL ADDRESS"}
              register={register}
              error={errors.email?.message}
              name="email"
              isSubmitted={isSubmitted}
            />
            <AddRecipeFormFieldText
              isDisabled={recipeData?.title ? true : false}
              title={"TITLE"}
              register={register}
              error={errors.title?.message}
              name="title"
              isSubmitted={isSubmitted}
            />
            <AddRecipeFormFieldTextArea
              title={"DESCRIPTION"}
              rows={3}
              register={register}
              error={errors.description?.message}
              name="description"
              isSubmitted={isSubmitted}
            />
            <AddRecipeFormFieldTextArea
              title={"INGREDIENTS"}
              rows={4}
              register={register}
              error={errors.ingredients?.message}
              name="ingredients"
              isSubmitted={isSubmitted}
            />
            <AddRecipeFormFieldTextArea
              title={"INSTRUCTIONS"}
              rows={4}
              register={register}
              error={errors.instructions?.message}
              name="instructions"
              isSubmitted={isSubmitted}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 1,
                marginBottom: 6,
                gap: "10px",
              }}
            >
              {recipeData ? (
                <Button
                  onClick={handleDelete}
                  sx={{ width: "160px", backgroundColor: "#EE6400" }}
                  variant="contained"
                >
                  Delete
                </Button>
              ) : undefined}

              <Button type="submit" sx={{ width: "160px" }} variant="contained">
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
