import { toast } from "react-toastify";
import type { UserInterface } from "../../../types/auth/user";

export const deleteFavorite = async (
  favoriteId: number,
  user: UserInterface | null
) => {
  const resp = await fetch(
    `${import.meta.env.VITE_API_URL}/favorites/${favoriteId}`,
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
    toast.success(data.message || "Favorite removed");
  } else {
    toast.error(data.message || "Failed to remove favorite");
  }

  return data;
};
