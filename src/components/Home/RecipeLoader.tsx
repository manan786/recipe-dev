import React from "react";
import RecipeCard from "../skelton/RecipeCar";

const RecipeLoader = () => {
  return (
    <div className="row">
      <div className="col-sm-6 col-md-4 col-lg-3">
        <RecipeCard width="100%" height="275px" />
      </div>
      <div className="col-sm-6 col-md-4 col-lg-3">
        <RecipeCard width="100%" height="275px" />
      </div>
      <div className="col-sm-6 col-md-4 col-lg-3">
        <RecipeCard width="100%" height="275px" />
      </div>
      <div className="col-sm-6 col-md-4 col-lg-3">
        <RecipeCard width="100%" height="275px" />
      </div>
    </div>
  );
};

export default RecipeLoader;
