import type { FieldValues } from "react-hook-form";
import { RecipeForm } from "../components/RecipeForm/RecipeForm";
import { Wrapper } from "../components/Wrapper/Wrapper";

export const CreatePage = () => {
  const formTest = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <>
      <Wrapper sectionHeader headerText="Create Recipe">
        <RecipeForm submitType={(data) => formTest(data)} message="Create" />
      </Wrapper>
    </>
  );
};
