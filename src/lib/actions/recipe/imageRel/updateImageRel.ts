import type { UserInterface } from "../../../types/auth/user";

export const updateImageRel = async (
  relId: number,
  imageId: number,
  recipeId: number,
  user: UserInterface | null
) => {
  const formData = {
    id: relId,
    image_id: imageId,
    recipe_id: recipeId,
  };

  const resp = await fetch(
    `${import.meta.env.VITE_API_URL}/recipe-images/${recipeId}/${relId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.access_token}`,
      },
      body: JSON.stringify(formData),
    }
  );

  return resp;
};
