import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router";
import { useFetch } from "../hooks/useFetch";
import type { DataInterface } from "../lib/types/data/data";
import type { CategoryInterface } from "../lib/types/category/category";
import type { RecipeInterface } from "../lib/types/recipe/recipe";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { RecipeGroupListing } from "../components/RecipeGroupListing/RecipeGroupListing";
import { RecipeCard } from "../components/RecipeCard/RecipeCard";
import { Button } from "../components/Button/Button";
import { FeaturedUserRecipe } from "../components/FeaturedUserRecipe/FeaturedUserRecipe";

export const LandingPage = () => {
  const { user } = useContext(UserContext);
  const {
    data: categoryData,
    isLoading: categoryLoading,
    error: categoryError,
  } = useFetch<DataInterface<CategoryInterface[]>>(
    "https://dishshare.up.railway.app/categories"
  );

  const {
    data: recipesData,
    isLoading: recipesLoading,
    error: recipesError,
  } = useFetch<DataInterface<RecipeInterface[]>>(
    "https://dishshare.up.railway.app/recipes"
  );

  const [categoryRecipes, setCategoryRecipes] = useState<RecipeInterface[]>();
  const [featuredRecipes, setFeaturedRecipes] = useState<RecipeInterface[]>();

  const navigate = useNavigate();

  useEffect(() => {
    if (recipesData && recipesData.data?.length > 0) {
      let selectedRecipes = recipesData?.data?.filter(
        (item: RecipeInterface) => {
          return item?.rating >= 4.6;
        }
      );
      setFeaturedRecipes(selectedRecipes);
    }
  }, [recipesData]);

  const handleButtonClick = () => {
    navigate("/discover");
  };

  return (
    <>
      {user && user?.user ? (
        <Wrapper>
          <FeaturedUserRecipe user={user} />
        </Wrapper>
      ) : null}
      <Wrapper sectionHeader headerText="Meal Category">
        {categoryData &&
        categoryData?.data?.length > 0 &&
        !categoryLoading &&
        !categoryError ? (
          <RecipeGroupListing
            group="category"
            data={categoryData}
            setGroupRecipes={setCategoryRecipes}
            defaultUrl="https://dishshare.up.railway.app/categories/dinner"
            slug="dinner"
          />
        ) : null}
      </Wrapper>
      <Wrapper type="cardWrapper">
        {categoryRecipes && <RecipeCard data={categoryRecipes} />}
      </Wrapper>
      <Wrapper
        type="cardWrapper"
        sectionHeader
        headerType="leftHeader"
        headerText="Featured Recipes"
      >
        {featuredRecipes &&
        featuredRecipes.length > 0 &&
        !recipesLoading &&
        !recipesError ? (
          <RecipeCard data={featuredRecipes} />
        ) : null}
        <Button action={handleButtonClick} text="See more >" type="bottomBtn" />
      </Wrapper>
    </>
  );
};
