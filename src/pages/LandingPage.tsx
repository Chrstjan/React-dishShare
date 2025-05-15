import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import type { DataInterface } from "../lib/types/data/data";
import type { CategoryInterface } from "../lib/types/category/category";
import type { RecipeInterface } from "../lib/types/recipe/recipe";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { RecipeGroupListing } from "../components/RecipeGroupListing/RecipeGroupListing";
import { RecipeCard } from "../components/RecipeCard/RecipeCard";

export const LandingPage = () => {
  const {
    data: categoryData,
    isLoading: categoryLoading,
    error: categoryError,
  } = useFetch<DataInterface<CategoryInterface[]>>(
    "https://dishshare.up.railway.app/categories"
  );

  const [categoryRecipes, setCategoryRecipes] = useState<RecipeInterface[]>();

  useEffect(() => {
    if (categoryRecipes !== undefined) {
      console.log(categoryRecipes);
    }
  }, [categoryRecipes]);

  return (
    <>
      <Wrapper type="listingWrapper" sectionHeader headerText="Meal Category">
        {categoryData &&
        categoryData?.data?.length > 0 &&
        !categoryLoading &&
        !categoryError ? (
          <RecipeGroupListing
            group="category"
            data={categoryData}
            defaultUrl="https://dishshare.up.railway.app/categories/dinner"
            setGroupRecipes={setCategoryRecipes}
          />
        ) : null}
      </Wrapper>
      <Wrapper type="cardWrapper">
        {categoryRecipes && <RecipeCard data={categoryRecipes} />}
      </Wrapper>
    </>
  );
};
