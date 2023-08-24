"use client";
import Image from "next/image";
import cook3 from "@/assets/cook3.svg";
import restaurentIcon from "@/assets/restaurentIcon.svg";
import DetailTabs from "../components/DetailTabs";
import { useEffect, useState } from "react";
import "./RecipeDetail.css";
import { useGetRecipeByNameQuery } from "@/redux/features/recipe-client/recipeApiSlice";
import RecipeCard from "@/components/skelton/RecipeCar";
import defaultVariable from "@/config/default";
import { useAppDispatch } from "@/redux/store";
import { setPDFRecipe } from "@/redux/features/auth/authSlice";
const DetailRecipe = ({ recipeName }: { recipeName: string }) => {
  const [ReadMore, setReadMore] = useState(false);
  const { data, isLoading, refetch }: any = useGetRecipeByNameQuery(recipeName);
  const recipe: Recipe = data?.data?.data;
  const usedispatch = useAppDispatch();

  useEffect(() => {
    if (recipe) {
      usedispatch(setPDFRecipe(recipe));
    }
  }, [recipe, usedispatch]);

  if (isLoading) {
    return <div className="row">
      <div className="col-md-12">
      <RecipeCard width="100%" height="944px" />
      </div>
    </div>;
  }
  if (!recipe) {
    return (
      <div className="detailPageWrapper py-2 py-md-4 px-2 px-md-4">
        <div className="row">
          <div className="col-12">No Recipe Found</div>
        </div>
      </div>
    );
  }
  return (
    <div className="detailPageWrapper py-2 py-md-4 px-2 px-md-4">
      <div className="row">
        <div className="col-12">
          <div className="detailContentWrapper">
            <div className="text-center text-lg-start">
              <Image
                src={recipe?.imageLink ?? defaultVariable.PlaceholderImg}
                className="img-fluid detailImg roundedImg"
                alt="Picture of the author"
                width={865}
                height={720}
                priority
                sizes="100vw"
              />
            </div>
            <div>
              <h6 className="detailHead mt-md-0 mt-3">{recipe?.name}</h6>
              <span className="detailPara mb-4 d-inline-block">
                {recipe?.origin.substring(0, 344)}
                {recipe?.origin.length > 344 && (
                  <>
                    <span>....</span>
                    <span
                      className="detailReadMore mb-0 ms-1"
                      onClick={() => setReadMore(true)}
                    >
                      Read More
                    </span>
                  </>
                )}
              </span>
              <div className="detailDetail">
                <h6 className="detailDetailText">
                  <span>
                    <i className="bi bi-stopwatch-fill"></i> Prep:{" "}
                  </span>
                  {`${recipe?.preparation_time?.hours} Hr ${recipe?.preparation_time?.minutes} Min`}

                </h6>
                <h6 className="detailDetailText">
                  <span>
                    <Image
                      src={cook3}
                      width={18}
                      className="img-fluid"
                      alt="Picture of the author"
                      sizes="100vw"
                    />
                    Cook:{" "}
                  </span>
                  {`${recipe?.cook_time?.hours} Hr ${recipe?.cook_time?.minutes} Min`}
                </h6>
                <h6 className="detailDetailText">
                  <span className="">
                    <Image
                      src={restaurentIcon}
                      width={18}
                      className="img-fluid"
                      alt="Picture of the author"
                      sizes="100vw"
                    />
                    <span> Serves: </span>
                  </span>
                  {recipe?.serves}
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <DetailTabs origin={ReadMore} recipe={recipe} />
        </div>
      </div>
    </div>
  );
};

export default DetailRecipe;
