import React from "react";
import RecipeForm from "./components/RecipeForm";
const ListedNewRecipe = () => {
  return (
    <div className="RD-content">
      <div className="LR-wrapp">
        <h1 className="LR-Title">List New Recipe</h1>
        <RecipeForm />
      </div>
    </div>
  );
};

export default ListedNewRecipe;
