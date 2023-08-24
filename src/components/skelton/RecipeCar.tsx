import "./skelton.css";
const RecipeCard = ({ width, height }: { width: string; height: string }) => {
  return (
    <div className="mb-2">
      <div className="recipeCardWrapp" style={{ width: width, height: height }}>
        <div className="skeleton-animation"></div>
      </div>
    </div>
  );
};

export default RecipeCard;
