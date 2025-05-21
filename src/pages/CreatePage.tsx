import { Wrapper } from "../components/Wrapper/Wrapper";
import { RecipeForm } from "../components/RecipeForm/RecipeForm";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { submitRecipe } from "../lib/service/createRecipeService";

export const CreatePage = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <Wrapper sectionHeader headerText="Create Recipe">
        <RecipeForm
          submitType={(data) => submitRecipe(data, user)}
          message="Create"
        />
      </Wrapper>
    </>
  );
};
