import MostSearchRecipe from "@/components/Home/MostSearchRecipe";
import DetailRecipe from "../components/DetailRecipe";
import type { Metadata } from "next";
import defaultVariable from "@/config/default";
// import GeneratePDF from "../components/GeneratePDF";
type Props = {
  params: { recipename: string };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const product = await fetch(
    `${defaultVariable?.BackendURL}/api/recipe/read-single-recipe/${params.recipename}`
  );
  const dt = await product.json();
  const metadata = {
    title: params.recipename.replace(/%20/g, " "),
    description: dt?.data?.data.meta_description.replace(/%20/g, " "),
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
              {/* <GeneratePDF /> */}
              <DetailRecipe recipeName={params?.recipename} />
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
