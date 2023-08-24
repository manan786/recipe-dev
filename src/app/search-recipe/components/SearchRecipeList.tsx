"use client";
import { useGetRecipesByCategoryQuery } from "@/redux/features/recipe-client/recipeApiSlice";
import React from "react";
import SearchRecipeItem from "./SearchRecipeItem";
import RecipeCard from "@/components/skelton/RecipeCar";
import SearchRecipeLoader from "./SearchRecipeLoader";
const SearchRecipeList = ({ recipeCate }: { recipeCate: string }) => {
  const { data, isFetching, refetch }: any =
    useGetRecipesByCategoryQuery(recipeCate);
  const SearchList = data?.data?.data;
  if (isFetching) return <SearchRecipeLoader recipeCate={recipeCate} />;
  if (!isFetching && SearchList?.length == 0)
    return <h5>No Found any Recipe</h5>;
  return (
    <div className="row">
      <div className="col-12 mb-2 mb-md-1">
        <h6 className="searchText">
          <span>Search Recipe: </span>
          {recipeCate}
        </h6>
      </div>
      {SearchList?.map((item: Recipe, key: number) => (
        <SearchRecipeItem active={false} key={key} item={item} />
      ))}
    </div>
  );
};

export default SearchRecipeList;
