import Image from "next/image";
import cardImg1 from "@/app/assets/detailImg.webp";
import cook from "@/app/assets/cook.svg";
import MostSearchRecipe from "@/app/components/Home/MostSearchRecipe";
import "./RecipeSearch.css";
import Link from "next/link";
import SearchRecipeItem from "../components/SearchRecipeItem";
const CoinDetail = () => {
  return (
    <main className="container-fluid">
      <div className="row">
        <div className="col-11 mx-auto max-width py-5">
          <div className="row">
            <div className="col-lg-9 order-1 order-lg-0">
              <div>
                <div className="row">
                  <div className="col-12 mb-2 mb-md-1">
                    <h6 className="searchText">
                      <span>Recipe Found: </span>French Baguette Recipe
                    </h6>
                  </div>
                  <SearchRecipeItem active={false} />
                  <div className="col-12 my-3">
                    <h6 className="searchText">Similar Recipes Shown Below</h6>
                  </div>
                  <SearchRecipeItem active={true} />
                </div>
              </div>
            </div>
            <div className="col-lg-3 order-0 order-lg-1 px-0 px-md-2">
              <MostSearchRecipe />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CoinDetail;
