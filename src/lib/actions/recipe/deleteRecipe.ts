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

  if (!resp.ok) {
    const errorData = await resp.json();
    console.error(errorData);
  }

  return resp;
};
