enum FoodTypes {
  MEAT = "MEAT",
  VEGETABLE = "VEGETABLE",
  SEAFOOD = "SEAFOOD",
  SPICINESS = "SPICINESS",
}
enum Allergens {
  SOYBEANS = "SOYBEANS",
  PEANUTS = "PEANUTS",
  MILK = "MILK",
  WHEAT = "WHEAT",
  EGGS = "EGGS",
  FISH = "FISH",
  SHELLFISH = "SHELLFISH",
  NUTS = "NUTS",
}
export interface Ingredient {
  name: string;
  foodtypes: FoodTypes[];
  allergens: Allergens[];
  calorie: number;
}
export interface Recipe {
  name: string;
  foodtypes: string[];
  allergens: string[];
  ingredients: Ingredient[];
}

/**
 * we can pass a certain pizza recipe and an array of food types and receive true if this recipe contains any of the food types
 * @param recipe
 * @param foodtypes
 * @returns
 */
export const hasFoodTypes = (recipe: Recipe, foodtypes: string[]): boolean => {
  for (let i = 0; i < foodtypes.length; i++) {
    if (recipe.foodtypes.includes(foodtypes[i])) {
      return true;
    }
  }
  return false;
};

/**
 * we can pass a certain pizza recipe and an array of allergens and receive true if the recipe contains any of the allergens
 * @param recipe
 * @param allergens
 * @returns
 */
export const hasAllergens = (recipe: Recipe, allergens: string[]): boolean => {
  for (let i = 0; i < allergens.length; i++) {
    if (recipe.allergens.includes(allergens[i])) {
      return true;
    }
  }
  return false;
};

/**
 * we can pass a certain pizza recipe and an array of ingredients and receive the pizza recipe without the specified ingredients
 * @param recipe
 * @param allergens
 * @returns
 */
export const removeAllergens = (
  recipe: Recipe,
  allergens: string[]
): Recipe => {
  const _recipe = JSON.parse(JSON.stringify(recipe));
  _recipe.allergens = _recipe.allergens.filter(
    (allergen) => !allergens.includes(allergen)
  );
  return _recipe;
};

/**
 * we can pass a certain pizza recipe and an array of ingredients and receive the pizza recipe without the specified ingredients
 * @param recipe
 * @param foodtypes
 * @returns
 */
export const removeFoodTypes = (
  recipe: Recipe,
  foodtypes: string[]
): Recipe => {
  const _recipe = JSON.parse(JSON.stringify(recipe));
  _recipe.foodtypes = _recipe.foodtypes.filter(
    (foodtype) => !foodtypes.includes(foodtype)
  );
  return _recipe;
};

/**
 * we can pass a certain pizza recipe and an array of ingredients and receive the pizza recipe without the specified ingredients
 * @param recipe
 * @param ingredients
 * @returns
 */
export const removeIngredients = (
  recipe: Recipe,
  ingredients: Ingredient[]
): Recipe => {
  const _recipe = JSON.parse(JSON.stringify(recipe));
  const removedIngredientName = ingredients.map(
    (_ingredient) => _ingredient.name
  );
  _recipe.ingredients = _recipe.ingredients.filter(
    (ingredient) => !removedIngredientName.includes(ingredient.name)
  );
  return _recipe;
};

/**
 * it returns the recipe with the specified ingredients in double amount
 * @param recipe
 * @param ingredients
 * @returns
 */
export const doubleIngredients = (
  recipe: Recipe,
  ingredients: Ingredient[]
): Recipe => {
  const _recipe = JSON.parse(JSON.stringify(recipe));
  const doubleIngredientName = ingredients.map((ingredient) => ingredient.name);
  _recipe.ingredients = _recipe.ingredients.map((ingredient) => {
    if (doubleIngredientName.includes(ingredient.name)) {
      return {
        name: ingredient.name,
        calorie: ingredient.calorie * 2,
      };
    } else {
      return ingredient;
    }
  });
  return _recipe;
};

/**
 * we can pass a certain pizza recipe and it will return the number of total calories in that recipe.
 * @param recipe
 * @returns
 */
export const getCalories = (recipe: Recipe): number => {
  return recipe.ingredients
    .map((ingredient) => ingredient.calorie)
    .reduce((prev, curr) => prev + curr);
};
