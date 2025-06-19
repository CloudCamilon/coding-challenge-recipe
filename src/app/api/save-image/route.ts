/**
 * Code by Cloud Camilon.
 * Reuse as a whole or in part is prohibited without permission.
 * Coding Challenge for Security Bank Philippines
 * authors: @vcamilon
 */

import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

import { NextRequest } from "next/server";

/**
 * POST mock API call for local saving of image.
 *
 * @param {NextRequest} parameterName - Next request type for creation of image.
 * @throws {Response} Response with error 500 of 400 for handling image processing.
 */
export async function POST(req: NextRequest) {
  const formData = await req.json();

  const { title, imageData } = formData;

  if (!title || !imageData) {
    return new Response(
      JSON.stringify({ error: "Missing title or image data" }),
      { status: 400 }
    );
  }

  try {
    const sanitizedTitle = title.toLowerCase().replace(/\s+/g, "-");
    const filename = `${sanitizedTitle}.jpg`;
    const imagePath = join(process.cwd(), "public", "images", filename);

    const base64Data = imageData.replace(/^data:image\/jpeg;base64,/, "");

    await mkdir(join(process.cwd(), "public", "images"), { recursive: true });
    await writeFile(imagePath, base64Data, "base64");

    return new Response(JSON.stringify({ path: `/images/${filename}` }), {
      status: 200,
    });
  } catch (err) {
    console.error("Error saving image:", err);
    return new Response(JSON.stringify({ error: "Failed to save image" }), {
      status: 500,
    });
  }
}
