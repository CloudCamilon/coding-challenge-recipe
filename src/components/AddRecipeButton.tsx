/**
 * Code by Cloud Camilon.
 * Reuse as a whole or in part is prohibited without permission.
 * Coding Challenge for Security Bank Philippines
 * authors: @vcamilon
 */

"use client";

import { JSX } from "react";
import { AddIcon } from "../../public/icons";
import Link from "next/link";

export default function AddRecipeButton(): JSX.Element {
  return (
    <Link href={"/add"}>
      <AddIcon />
    </Link>
  );
}
