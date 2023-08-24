"use client";
import { useGetRecipesQuery } from "@/redux/features/recipe-client/recipeApiSlice";
import RecipeItem from "./RecipeItem";
import "./RecipeList.css";
import RecipeLoader from "./RecipeLoader";
const RecipeList = () => {
  const { data, isLoading, refetch }: any = useGetRecipesQuery({});
  const recipeList = data?.data?.data;

  if (isLoading) {
    return <RecipeLoader />;
  }
  return (
    <div className="row align-content-stretch">
      {/* <RecipeItem  /> */}
      {recipeList?.length < 0 ? (
        <h3>No Record Found</h3>
      ) : (
        recipeList?.map((recipe: Recipe, key: number) => (
          <RecipeItem key={key} recipe={recipe} />
        ))
      )}
    </div>
  );
};

export default RecipeList;
