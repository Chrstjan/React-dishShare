import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useFetch } from "../hooks/useFetch";
import type {
  UserCommentsInterface,
  UserDataInterface,
} from "../lib/types/auth/user";
import type { DataInterface } from "../lib/types/data/data";
import { updateUser } from "../lib/actions/auth/updateUser";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { UserForm } from "../components/UserForm/UserForm";
import { RecipeCard } from "../components/RecipeCard/RecipeCard";
import { RecipeComment } from "../components/RecipeComment/RecipeComment";

export const ProfilePage = () => {
  const { user } = useContext(UserContext);
  const {
    data: userdata,
    isLoading,
    error,
  } = useFetch<DataInterface<UserDataInterface>>(
    "https://dishshare.up.railway.app/user?limit=1000",
    {
      headers: {
        Authorization: `Bearer ${user?.access_token}`,
      },
    }
  );
  const [userComments, setUserComments] = useState<
    UserCommentsInterface[] | null | undefined
  >();

  useEffect(() => {
    if (userdata && userdata?.data) {
      let comments = userdata?.data?.recipes
        ?.map((recipe) => {
          //Gets the latest comment from the recipe
          const recipeComment = userdata?.data?.comments
            ?.filter((comment) => comment?.recipe_id === recipe?.id)
            .slice(-1)[0];

          //If the recipe dose not have a comment add null
          if (!recipeComment) return null;

          return {
            recipe,
            comments: recipeComment,
          };
        })
        .filter(Boolean);
      //Filters out null so recipes with no comments gets removed
      setUserComments(comments as UserCommentsInterface[]);
    }
  }, [userdata]);

  return (
    <>
      <Wrapper
        sectionHeader
        headerText="Your profile:"
        type="mTopWrapper"
        headerType="leftHeader"
      >
        {userdata && userdata?.data && !isLoading && !error ? (
          <UserForm
            defaultValues={userdata.data}
            submitType={(data) => updateUser(data, user)}
          />
        ) : null}
      </Wrapper>
      <Wrapper
        sectionHeader
        headerText={
          userComments && userComments?.length > 0
            ? "Your latest comments:"
            : ""
        }
        type="mBottomWrapper"
        headerType="leftHeader"
      >
        {userdata && userdata?.data && userComments && userComments?.length > 0
          ? userComments?.map((item: UserCommentsInterface) => {
              return (
                <>
                  <RecipeCard data={[item?.recipe]} type="commentCard" />
                  <RecipeComment
                    data={item?.comments}
                    userId={user?.user?.id}
                  />
                </>
              );
            })
          : null}
      </Wrapper>
      <Wrapper
        sectionHeader
        headerText="Your recipes:"
        type="userRecipes"
        headerType="leftHeader"
      >
        {userdata &&
        userdata?.data?.recipes.length > 0 &&
        !isLoading &&
        !error ? (
          <RecipeCard data={userdata?.data?.recipes} canEdit />
        ) : (
          <h3>No recipes found</h3>
        )}
      </Wrapper>
    </>
  );
};
