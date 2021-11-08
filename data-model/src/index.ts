export enum FoodTypes {
  MEAT = "MEAT",
  VEGETABLE = "VEGETABLE",
  SEAFOOD = "SEAFOOD",
  SPICINESS = "SPICINESS",
}

export enum Allergens {
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
  unit: number;
  name: string;
  foodtypes: FoodTypes[];
  allergens: Allergens[];
  calorie: number;
}

export class Recipe {
  name: string;
  ingredients: Ingredient[];
  foodtypes: Set<FoodTypes> = new Set();
  allergens: Set<Allergens> = new Set();
  constructor(name: string, ingredients: Ingredient[]) {
    this.name = name;
    this.ingredients = ingredients;
    ingredients.forEach((ingredient) => {
      ingredient.foodtypes.forEach((foodtype) => this.foodtypes.add(foodtype));
      ingredient.allergens.forEach((allergen) => this.allergens.add(allergen));
    });
  }
}

/**
 * we can pass a certain pizza recipe and an array of food types and receive true if this recipe contains any of the food types
 * @param recipe
 * @param foodtypes
 * @returns
 */
export const hasFoodTypes = (
  recipe: Recipe,
  foodtypes: FoodTypes[]
): boolean => {
  const recipeFoodTypes: FoodTypes[] = [];
  for (let i = 0; i < recipe.ingredients.length; i++) {
    // loop ingredients
    if (Array.from(recipe.foodtypes).includes(foodtypes[i])) {
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
export const hasAllergens = (
  recipe: Recipe,
  allergens: Allergens[]
): boolean => {
  for (let i = 0; i < allergens.length; i++) {
    if (Array.from(recipe.allergens).includes(allergens[i])) {
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
  allergens: Allergens[]
): Recipe => {
  const newIngredients = recipe.ingredients.filter((ingredient) => {
    let flag = true;
    for (let index = 0; index < ingredient.allergens.length; index++) {
      if (allergens.includes(ingredient.allergens[index])) {
        flag = false;
      }
    }
    return flag;
  });
  return new Recipe(recipe.name, newIngredients);
};

/**
 * we can pass a certain pizza recipe and an array of ingredients and receive the pizza recipe without the specified ingredients
 * @param recipe
 * @param foodtypes
 * @returns
 */
export const removeFoodTypes = (
  recipe: Recipe,
  foodtypes: FoodTypes[]
): Recipe => {
  const newIngredients = recipe.ingredients.filter((ingredient) => {
    let flag = true;
    for (let index = 0; index < ingredient.foodtypes.length; index++) {
      if (foodtypes.includes(ingredient.foodtypes[index])) {
        flag = false;
      }
    }
    return flag;
  });
  return new Recipe(recipe.name, newIngredients);
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
  const removedIngredientName = ingredients.map(
    (_ingredient) => _ingredient.name
  );
  const newIngredients = recipe.ingredients.filter(
    (ingredient) => !removedIngredientName.includes(ingredient.name)
  );
  return new Recipe(recipe.name, newIngredients);
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
  const doubleIngredientNames = recipe.ingredients.map(
    (ingredient) => ingredient.name
  );
  let newIngredients: Ingredient[] = recipe.ingredients.map((ingredient) => {
    if (doubleIngredientNames.includes(ingredient.name)) {
      return {
        unit: ingredient.unit * 2,
        name: ingredient.name,
        foodtypes: ingredient.foodtypes,
        allergens: ingredient.allergens,
        calorie: ingredient.calorie * 2,
      };
    } else {
      return ingredient;
    }
  });
  return new Recipe(recipe.name, newIngredients);
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
