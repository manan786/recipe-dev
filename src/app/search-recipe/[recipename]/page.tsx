import MostSearchRecipe from "@/components/Home/MostSearchRecipe";
import SearchRecipeList from "../components/SearchRecipeList";
import "./RecipeSearch.css";
import { Metadata } from "next";
type Props = {
  params: { recipename: string };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const metadata = {
    title: params.recipename.replace(/%20/g, " "),
  };
  return metadata;
};

const CoinDetail = ({ params }: { params: { recipename: string } }) => {
  return (
    <main className="container-fluid">
      <div className="row">
        <div className="col-11 mx-auto max-width py-5">
          <div className="row">
            <div className="col-lg-9 order-1 order-lg-0">
              <div>
                <SearchRecipeList recipeCate={params?.recipename} />
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
