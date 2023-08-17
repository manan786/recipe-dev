"use client";
import React, { useEffect, useState } from "react";
const DetailTabs = ({ origin }: { origin: boolean }) => {
  const [OriginActive, setOriginActive] = useState(false);
  useEffect(() => {
    const id = window.location.hash.substring(1);
    if (id == "nav-Origin-tab" || origin) {
      setOriginActive(true);
    }
  }, [origin]);

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
                <tr>
                  <td>
                    <div className="nTI">All-Purpose Flour</div>
                  </td>
                  <td>
                    <div className="nTI">6</div>
                  </td>
                  <td>
                    <div className="nTI">cups</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="nTI">lukewarm water</div>
                  </td>
                  <td>
                    <div className="nTI">3</div>
                  </td>
                  <td>
                    <div className="nTI">cups</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="nTI">yeast</div>
                  </td>
                  <td>
                    <div className="nTI">2</div>
                  </td>
                  <td>
                    <div className="nTI">Table Spoon</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="nTI">honey</div>
                  </td>
                  <td>
                    <div className="nTI">2</div>
                  </td>
                  <td>
                    <div className="nTI">Table Spoon</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="nTI">salt</div>
                  </td>
                  <td>
                    <div className="nTI">1</div>
                  </td>
                  <td>
                    <div className="nTI">Table Spoon</div>
                  </td>
                </tr>
                <tr>
                  <td className="firstTD">
                    <div className="nTI">olive oil</div>
                  </td>
                  <td>
                    <div className="nTI">1</div>
                  </td>
                  <td className="lastTD">
                    <div className="nTI">Table Spoon</div>
                  </td>
                </tr>
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
              <li>Add honey and water and incorporate well.</li>
              <li>In a separate bowl, add flour, yeast and salt.</li>
              <li>Combine wet and dry ingredients.</li>
              <li>
                Oil a large bowl and place your dough in it, cover with plastic
                wrap and allow to sit overnight – do not refrigerate.
              </li>
              <li>
                Your dough will be significantly bigger, bubbly and wet when you
                remove the plastic wrap.
              </li>
              <li>
                Flour your board and shape your baguettes – this recipe is so
                easy you may want to consider purchasing French Bread baking
                pans.
              </li>
              <li>Cover with a towel and allow to set for up to two hours.</li>
              <li>
                Place one rack on the lowest part of your oven and the other in
                the middle.
              </li>
              <li>Place a large cookie sheet on the lowest rack.</li>
              <li>Pre-heat your oven to 450˚ F.</li>
              <li>Boil approximately two cups of water.</li>
              <li>
                When your oven is ready, carefully pour the boiling water into
                the cookie sheet – it will spit and steam – be careful.
              </li>
              <li>Remove towel and places baguettes on middle rack.</li>
              <li>Allow to bake for 10 minutes.</li>
              <li>Carefully remove cookie sheet and water.</li>
              <li>Allow to bake an additional 25 minutes.</li>
              <li>Remove from oven and allow to cool on a baking rack.</li>
              <li>Enjoy :)</li>
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
            <p className="originPara">
              Baguette – long a staple of French cuisine – is defined by its
              look, taste and texture. Long and thin, the golden, crispy outer
              crust of a baguette hides a soft, tender, chewy interior. For the
              new cook, this classic French loaf or French stick baguette recipe
              is deceptively simple with few ingredients and little fuss. In
              fact, it doesn’t even require kneading. <br />
              From the French, the word “baguette” means “stick” and it is the
              most popular bread served in France. Popularized in the 19th
              century, the baguette has a storied history dating back to the
              French Revolution when a shortage of bread lead to protests and
              riots in the streets of France. (It is also worth noting that with
              its long, slender shape, the baguette is easily portable making it
              ideal for soldiers and workers alike as it can be torn easily for
              eating.) The classic baguette is protected by law – in fact – more
              than once. In 1993, the French enacted a law – The Bread Decree --
              stating the baguette “tradition” could – by law – only contain
              four ingredients: Flour, leavening, water and salt. (We added
              honey.) An earlier law of 1920 restricted baking hours meaning
              bakers had to find a way to make their bread faster – the long,
              think shape of the baguette means it bakes faster. And the
              baguette is protected by UNESCO’s list of Intangible Cultural
              Heritage. <br />
              Delicious on its own fresh baked from the oven, the baguette also
              makes a great sandwich bread, or bruschetta vessel and it pairs
              perfectly with hearty soups, charcuterie plates and – of course –
              mussels.
            </p>
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
                <tr>
                  <td>
                    <div className="nTI2">Servings</div>
                  </td>
                  <td>
                    <div className="nTI2">6</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="nTI2">Total Fat 1.3g</div>
                  </td>
                  <td>
                    <div className="nTI2">2%</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="nTI2">Saturated Fat 0.2g</div>
                  </td>
                  <td>
                    <div className="nTI2">1%</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="nTI2">Cholesterol 0mg</div>
                  </td>
                  <td>
                    <div className="nTI2">0%</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="nTI2">Total Carbohydrate 97.8g</div>
                  </td>
                  <td>
                    <div className="nTI2">36%</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="nTI2">Dietary Fiber 3.7g</div>
                  </td>
                  <td>
                    <div className="nTI2">13%</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="nTI2">Total Sugars</div>
                  </td>
                  <td>
                    <div className="nTI2">2.3g</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="nTI2">Protein</div>
                  </td>
                  <td>
                    <div className="nTI2">13.4g</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="nTI2">Vitamin D 0mcg</div>
                  </td>
                  <td>
                    <div className="nTI2">0%</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="nTI2">Calcium 24mg</div>
                  </td>
                  <td>
                    <div className="nTI2">2%</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="nTI2">Iron 6mg</div>
                  </td>
                  <td>
                    <div className="nTI2">34%</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="nTI2">Potassium 163mg</div>
                  </td>
                  <td>
                    <div className="nTI2">3%</div>
                  </td>
                </tr>
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

DetailTabs.defaultProps = {
  origin: false,
};
