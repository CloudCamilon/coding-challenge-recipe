/**
 * Code by Cloud Camilon.
 * Reuse as a whole or in part is prohibited without permission.
 * Coding Challenge for Security Bank Philippines
 * authors: @vcamilon
 */

"use client";

import { JSX, useRef, useState } from "react";
import Image from "next/image";
import { Box } from "@mui/material";

export default function AddRecipeImage(): JSX.Element {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ cursor: "pointer" }}>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <div onClick={handleImageClick}>
        {image ? (
          <Image
            src={image}
            alt={"Recipe Image"}
            fill
            style={{ objectFit: "fill" }}
          />
        ) : (
          <Image
            src={"/images/placeholder.png"}
            alt={"Recipe Image"}
            fill
            style={{ objectFit: "fill" }}
          />
        )}
      </div>
    </Box>
  );
}
