import { RecipeForm } from "../components/RecipeForm/RecipeForm";
import { Wrapper } from "../components/Wrapper/Wrapper";

export const CreatePage = () => {
  return (
    <>
      <Wrapper sectionHeader headerText="Create Recipe">
        <RecipeForm />
      </Wrapper>
    </>
  );
};
