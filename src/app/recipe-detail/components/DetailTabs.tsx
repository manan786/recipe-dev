"use client";
import React, { useEffect, useState } from "react";
const DetailTabs = ({
  origin = false,
  recipe,
}: {
  origin: boolean;
  recipe: Recipe;
}) => {
  const [OriginActive, setOriginActive] = useState(false);
  useEffect(() => {
    const id = window.location.hash.substring(1);
    if (id == "nav-Origin-tab" || origin) {
      setOriginActive(true);
    }
  }, [origin]);
  const formattedString = recipe?.preparation
    .replace(/ /g, "&nbsp;") // Replace spaces with non-breaking spaces
    .replace(/\n/g, "<br>");
  // const Preparation = recipe?.preparation.split("^") ?? [];
  return (
    <div>
      <nav className="navTabWrapper">
        <div className="nav nav-tabs dTabsWrapper" id="nav-tab" role="tablist">
          <button
            className={`nav-link dTabs ${!OriginActive && "active"}`}
            id="nav-Ingredients-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-Ingredients"
            type="button"
            role="tab"
            aria-controls="nav-Ingredients"
            aria-selected="true"
          >
            Ingredients
          </button>
          <button
            className="nav-link dTabs"
            id="nav-Preparation-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-Preparation"
            type="button"
            role="tab"
            aria-controls="nav-Preparation"
            aria-selected="false"
          >
            Preparation
          </button>
          <button
            className={`nav-link dTabs ${OriginActive && "active"}`}
            id="nav-Origin-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-Origin"
            type="button"
            role="tab"
            aria-controls="nav-Origin"
            aria-selected="false"
          >
            Origin
          </button>
          <button
            className="nav-link dTabs"
            id="nav-nutrition-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-nutrition"
            type="button"
            role="tab"
            aria-controls="nav-nutrition"
            aria-selected="false"
          >
            Nutrition
          </button>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        {/* <!-- 1 --> */}
        <div
          className={`tab-pane fade ${!OriginActive && "show active"}`}
          id="nav-Ingredients"
          role="tabpanel"
          aria-labelledby="nav-Ingredients-tab"
        >
          <div className="nutritionTableWrapper">
            <table className="table ingredientsTable">
              <thead>
                <tr>
                  <th className="firstTH" scope="col">
                    <div className="nTI">Ingredient</div>
                  </th>
                  <th scope="col">
                    <div className="nTI">Amount</div>
                  </th>
                  <th className="lastTH" scope="col">
                    <div className="nTI">Measurement</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {recipe.ingredients.map((ingr: ingredientsObj, key: number) => (
                  <tr key={key}>
                    <td>
                      <div className="nTI">{ingr.name}</div>
                    </td>
                    <td>
                      <div className="nTI">{ingr.amount}</div>
                    </td>
                    <td>
                      <div className="nTI">{ingr.measurement}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* <!-- 1 --> */}
        {/* <!-- 2 --> */}
        <div
          className="tab-pane fade"
          id="nav-Preparation"
          role="tabpanel"
          aria-labelledby="nav-Preparation-tab"
        >
          <div className="nutritionTableWrapper">
            <ol className="preparationWrapper">
              <div dangerouslySetInnerHTML={{ __html: formattedString }} />
              {/* {Preparation.map((pre: string, key: number) => (
                <li key={key}>{pre}</li>
              ))} */}
            </ol>
          </div>
        </div>
        {/* <!-- 2 --> */}
        {/* <!-- 3 --> */}
        <div
          className={`tab-pane fade ${OriginActive && "show active"}`}
          id="nav-Origin"
          role="tabpanel"
          aria-labelledby="nav-Origin-tab"
        >
          <div className="nutritionTableWrapper">
            <p className="originPara">{recipe?.origin}</p>
          </div>
        </div>
        {/* <!-- 3 --> */}
        {/* <!-- 4 --> */}
        <div
          className="tab-pane fade"
          id="nav-nutrition"
          role="tabpanel"
          aria-labelledby="nav-contact-tab"
        >
          <div className="nutritionTableWrapper">
            <table className="table ingredientsTable">
              <thead>
                <tr>
                  <th className="firstTH lastTH" colSpan={3} scope="col">
                    <div className="nTI2 text-center">
                      NUTRITIONAL FACTS – PER DAILY SERVING
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {recipe.nutrition.map((nutri: nutritionObj, key: number) => (
                  <tr key={key}>
                    <td>
                      <div className="nTI2">{nutri.name}</div>
                    </td>
                    <td>
                      <div className="nTI2">{nutri.quantity}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* <!-- 4 --> */}
      </div>
    </div>
  );
};

export default DetailTabs;

// DetailTabs.defaultProps = {
//   origin: false,
// };
