interface Ingredient {
  name: string;
  calorie: number;
}
interface Recipe {
  name: string;
  foodtypes: string[];
  allergens: string[];
  ingredient: Ingredient[];
}

class Menu {
  recipes: Recipe[];
  selectedRecipe: Recipe;
  s;
}
