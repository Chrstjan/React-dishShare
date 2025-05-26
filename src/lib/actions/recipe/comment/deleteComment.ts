import type { UserInterface } from "../../../types/auth/user";

export const deleteComment = async (id: number, user: UserInterface | null) => {
  const resp = await fetch(`${import.meta.env.VITE_API_URL}/comments/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.access_token}`,
    },
  });

  const commentData = await resp.json();

  console.log(commentData);
  return commentData;
};
