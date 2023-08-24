import Link from "next/link";
const ListedRecipeList = ({
  recipeList,
  isFetching,
  OpenModalHandler,
  LoadingStatus
}: {
  recipeList: Recipe[];
  isFetching: boolean;
    OpenModalHandler: (id: string, key: string) => void;
    LoadingStatus:boolean
}) => {
  if (isFetching) {
    return (
      <tbody>
        <tr>
          <td colSpan={7}>
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
          <td colSpan={7}>
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
                {recipe?.origin.substring(0, 25)}
                {recipe?.origin.length > 25 && "...."}
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
              <div>
                {" "}
                {`${recipe?.cook_time?.hours} Hr ${recipe?.cook_time?.minutes} Min`}
              </div>
            </Link>
          </td>
          <td>
            <Link href={`listed-recipes/${recipe.name}`}>
              <div>{recipe.serves} Loves</div>
            </Link>
          </td>
          <td>
            <div className="actionWrapp">
              <Link href={`manage-recipes/${recipe.name}`}>
                <i className="bi bi-pencil-square"></i>
              </Link>
              <button disabled={LoadingStatus} onClick={() => OpenModalHandler(recipe.id ?? "", "view")}>
                {recipe.active ? (
                  <i className="bi bi-eye-fill"></i>
                ) : (
                  <i className="bi bi-eye-slash"></i>
                )}
              </button>
              {/* <Link href={`listed-recipes/${recipe.name}`}> */}
              {/* </Link> */}
              <button
                onClick={() => OpenModalHandler(recipe.id ?? "", "delete")}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default ListedRecipeList;
