import { toast } from "react-toastify";
import type { UserInterface } from "../../../types/auth/user";

export const deleteImageRel = async (
  relId: number,
  recipeId: number,
  user: UserInterface | null
) => {
  const resp = await fetch(
    `${import.meta.env.VITE_API_URL}/recipe-images/${recipeId}/${relId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.access_token}`,
      },
    }
  );

  const data = await resp.json();

  if (resp.ok) {
    toast.success(data?.message || "Image removed from recipe");
  } else {
    toast.error(data.message || "Failed to remove image from recipe");
  }
  return data;
};
