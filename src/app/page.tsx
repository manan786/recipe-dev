import RecipeList from "./components/Home/RecipeList";
import MostSearchRecipe from "./components/Home/MostSearchRecipe";
export default function Home() {
  return (
    <main className="container-fluid">
      <div className="row">
        <div className="col-11 mx-auto max-width py-5">
          <div className="row">
            <div className="col-lg-9 order-1 order-lg-0">
              <div>
                <RecipeList />
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
}
