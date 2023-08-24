import RecipeForm from "../components/RecipeForm";
const UpdateRecipe = ({
  params,
}: {params:{recipename:string}}) => {
  return (
    <div className="RD-content">
      <div className="LR-wrapp">
        <h1 className="LR-Title">Update Recipe</h1>
        {/*  */}
        <RecipeForm updateRecipe={params.recipename} />
      </div>
    </div>
  );
};

export default UpdateRecipe;
