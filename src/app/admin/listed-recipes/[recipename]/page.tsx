import DetailRecipe from "@/app/recipe-detail/components/DetailRecipe";
import Link from "next/link";
const ListNewRecipe = ({ params }: { params: { recipename: string } }) => {
  return (
    <div className="RD-content">
      <div className="LR-wrapp">
        <div className="LR-TopHead mt-2">
          <h1 className="LR-Title">Recipe Details</h1>
          <Link
            href={`/admin/manage-recipes/${params?.recipename}`}
            className="btn ms-sm-auto LR_Btn outline px-3 mt-sm-0 mt-3"
          >
            <i className="bi bi-pencil-square"></i>
            Edit Recipe
          </Link>
        </div>
        {/* <!--  --> */}
        <div className="mt-5">
          <div className="row">
            <div className="col-md-12">
              <DetailRecipe recipeName={params?.recipename} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListNewRecipe;
