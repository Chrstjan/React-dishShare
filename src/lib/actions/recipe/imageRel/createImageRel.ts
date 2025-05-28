import { toast } from "react-toastify";
import type { UserInterface } from "../../../types/auth/user";

export const createImageRel = async (
  imageId: number,
  recipeId: number,
  user: UserInterface | null
) => {
  const formData = {
    image_id: imageId,
    recipe_id: recipeId,
  };

  const resp = await fetch(`${import.meta.env.VITE_API_URL}/recipe-images`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.access_token}`,
    },
    body: JSON.stringify(formData),
  });

  const data = await resp.json();

  if (resp.ok) {
    toast.success(data?.message || "Image added to recipe");
  } else {
    toast.error(data.message || "Failed to add image to recipe");
  }

  return data;
};
