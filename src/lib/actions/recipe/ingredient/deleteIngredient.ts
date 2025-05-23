import type { UserInterface } from "../../../types/auth/user";

export const deleteIngredient = async (
  id: number,
  recipeId: number,
  user: UserInterface | null
) => {
  const resp = await fetch(
    `${import.meta.env.VITE_API_URL}/ingredient/${recipeId}/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.access_token}`,
      },
    }
  );

  const data = await resp.json();

  console.log(data);
  return data;
};
