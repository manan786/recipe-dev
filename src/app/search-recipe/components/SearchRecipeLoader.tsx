import RecipeCard from "@/components/skelton/RecipeCar";
import React from "react";

const SearchRecipeLoader = ({ recipeCate }: { recipeCate: string }) => {
  return (
    <div className="row">
      <div className="col-12 mb-2 mb-md-1">
        <h6 className="searchText">
          <span>Search Recipe: </span>
          {recipeCate}
        </h6>
      </div>
      <div className="col-12 mb-2 mb-md-1">
        <RecipeCard width="100%" height="147px" />
      </div>
      <div className="col-12 mb-2 mb-md-1">
        <RecipeCard width="100%" height="147px" />
      </div>
      <div className="col-12 mb-2 mb-md-1">
        <RecipeCard width="100%" height="147px" />
      </div>
      <div className="col-12 mb-2 mb-md-1">
        <RecipeCard width="100%" height="147px" />
      </div>
    </div>
  );
};

export default SearchRecipeLoader;
