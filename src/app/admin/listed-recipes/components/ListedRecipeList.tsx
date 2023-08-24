import Link from "next/link";
const ListedRecipeList = ({
  recipeList,
  isFetching,
}: {
  recipeList: Recipe[];
  isFetching: boolean;
}) => {
  if (isFetching) {
    return (
      <tbody>
        <tr>
          <td colSpan={6}>
            <h6 className="text-center">...loading</h6>
          </td>
        </tr>
      </tbody>
    );
  }
  if (recipeList?.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={6}>
            <h6 className="text-center">No Listed Recipe Found</h6>
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {recipeList?.map((recipe: Recipe, key: number) => (
        <tr key={key}>
          <td>
            <Link href={`listed-recipes/${recipe.name}`}>
              <div>{recipe?.name}</div>
            </Link>
          </td>
          <td>
            <Link href={`listed-recipes/${recipe.name}`}>
              <div>{recipe?.category?.name}</div>
            </Link>
          </td>
          <td>
            <Link href={`listed-recipes/${recipe.name}`}>
              <div>
                {recipe?.origin.substring(0, 60)}
                {recipe?.origin.length > 60 && "...."}
              </div>
            </Link>
          </td>
          <td>
            <Link href={`listed-recipes/${recipe.name}`}>
              <div>              {`${recipe?.preparation_time?.hours} Hr ${recipe?.preparation_time?.minutes} Min`}
</div>
            </Link>
          </td>
          <td>
            <Link href={`listed-recipes/${recipe.name}`}>
              <div> {`${recipe?.cook_time?.hours} Hr ${recipe?.cook_time?.minutes} Min`}</div>
            </Link>
          </td>
          <td>
            <Link href={`listed-recipes/${recipe.name}`}>
              <div>{recipe.serves} Loves</div>
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default ListedRecipeList;
