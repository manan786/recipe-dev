"use client";
import SelectIcon from "@/assets/SelectIcon.png";
import { useGetRecipeCategoryQuery } from "@/redux/features/recipe-client/recipeApiSlice";
import Image from "next/image";

const RecipeCate = ({
  ChangeHandler,
  Recipecate,
}: {
  ChangeHandler: any;
  Recipecate: string;
}) => {
  const { data, isFetching, refetch }: any = useGetRecipeCategoryQuery({});
  const recipeCateList = data?.data?.data;
  return (
    <div className="RecipeCategoryWrap ms-sm-3">
      <select
        name=""
        id=""
        className="RecipeCategory"
        value={Recipecate}
        onChange={ChangeHandler}
      >
        <option value={""}>All</option>
        {isFetching ? (
          <option value="" disabled>
            ...loading
          </option>
        ) : recipeCateList?.length == 0 ? (
          <option value="" disabled>
            No Category Found
          </option>
        ) : (
          recipeCateList?.map((recipe: RecipeCate, key: number) => (
            <option value={recipe?.name} key={key}>
              {recipe?.name}
            </option>
          ))
        )}
      </select>
      <span className="selectIcon">
        <Image src={SelectIcon} alt="Select Icon"></Image>
      </span>
    </div>
  );
};

export default RecipeCate;
