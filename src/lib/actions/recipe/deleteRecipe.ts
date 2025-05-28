import { toast } from "react-toastify";
import type { UserInterface } from "../../types/auth/user";

export const deleteRecipe = async (id: number, user?: UserInterface | null) => {
  console.log(id);

  const resp = await fetch(`${import.meta.env.VITE_API_URL}/recipes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.access_token}`,
    },
  });

  const recipeData = await resp.json();

  if (resp.ok) {
    toast.success(recipeData?.message || "Recipe deleted");
  } else {
    toast.error(recipeData.message || "Failed to delete recipe");
  }

  return recipeData;
};
