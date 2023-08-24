type Recipe = {
  id?: string;
  name: string;
  preparation_time: { hours?: string; minutes?: string; days?: string };
  cook_time: { hours?: string; minutes?: string; days?: string };
  serves: string;
  meta_description: string;
  ingredients: ingredientsObj[];
  preparation: string;
  origin: string;
  nutrition: nutritionObj[];
  imageLink: string;
  active?: boolean;
  category: {
    name: string;
  };
};
type ingredientsObj = {
  name: string;
  amount: string;
  measurement: string;
};
type nutritionObj = {
  quantity: string;
  name: string;
};
type RecipeCate = {
  name: string;
};

type CategoryName =
  | "breakfast"
  | "brunch"
  | "lunch"
  | "appetizers"
  | "dinner"
  | "baking"
  | "seasonal"
  | "grilling"
  | "kids";

type LoginUser = {
  email: string;
  password: string;
};
type ResetUser = {
  currentPassword: string;
  newPassword: string;
  email: string;
};

type ingredientsprops = {
  name: string;
  amount: string;
  measurement: string;
};
type nutritionprops = {
  quantity: string;
  name: string;
};

type RecipeFormProps = {
  image: any | null;
  name: string;
  serves: string;
  categoriesId: string;
  preparation_time: string;
  cook_time: string;
  meta_description: string;
  ingredients: string;
  preparation: string;
  origin: string;
  nutrition: string;
};
