import {
  hasFoodTypes,
  hasAllergens,
  Ingredient,
  Recipe,
  removeIngredients,
  doubleIngredients,
  removeAllergens,
  removeFoodTypes,
  getCalories,
} from "../index";

const mushroomIngredient: Ingredient = {
  name: "mushroom",
  calorie: 10,
};

const appleIngredient: Ingredient = {
  name: "apple",
  calorie: 20,
};

const doubleAppleIngredient: Ingredient = {
  name: "apple",
  calorie: 40,
};
const mushroomPizza: Recipe = {
  name: "mushroom pizza",
  foodtypes: ["mushroom"],
  allergens: ["mushroom"],
  ingredients: [mushroomIngredient],
};

const applePizza: Recipe = {
  name: "apple pizza",
  foodtypes: ["apple"],
  allergens: ["apple"],
  ingredients: [appleIngredient],
};

const appleMushroomPizza: Recipe = {
  name: "apple mushroom pizza",
  foodtypes: ["apple", "mushroom"],
  allergens: ["apple", "mushroom"],
  ingredients: [appleIngredient, mushroomIngredient],
};

const appleMushroomPizzaWithoutApple: Recipe = {
  name: "apple mushroom pizza",
  foodtypes: ["apple", "mushroom"],
  allergens: ["apple", "mushroom"],
  ingredients: [mushroomIngredient],
};

const appleMushroomPizzaAppleDouble: Recipe = {
  name: "apple mushroom pizza",
  foodtypes: ["apple", "mushroom"],
  allergens: ["apple", "mushroom"],
  ingredients: [doubleAppleIngredient, mushroomIngredient],
};

const appleMushroomPizzaAppleRemoveAppleType: Recipe = {
  name: "apple mushroom pizza",
  foodtypes: ["mushroom"],
  allergens: ["apple", "mushroom"],
  ingredients: [appleIngredient, mushroomIngredient],
};

const appleMushroomPizzaAppleRemoveAppleAllergens: Recipe = {
  name: "apple mushroom pizza",
  foodtypes: ["apple", "mushroom"],
  allergens: ["mushroom"],
  ingredients: [appleIngredient, mushroomIngredient],
};
describe("hasFoodTypes", () => {
  test("pizza with mushrooms return true", () => {
    expect(hasFoodTypes(mushroomPizza, ["mushroom"])).toBe(true);
  });
  test("pizza with apple return false", () => {
    expect(hasFoodTypes(applePizza, ["mushroom"])).toBe(false);
  });
});

describe("hasAllergens", () => {
  test("pizza with mushrooms return true", () => {
    expect(hasAllergens(mushroomPizza, ["mushroom"])).toBe(true);
  });
  test("pizza with apple return false", () => {
    expect(hasAllergens(applePizza, ["mushroom"])).toBe(false);
  });
});

describe("removeIngredients", () => {
  test("appleMushroomPizza remove apple", () => {
    expect(
      removeIngredients(appleMushroomPizza, [appleIngredient])
    ).toStrictEqual(appleMushroomPizzaWithoutApple);
  });
});

describe("doubleIngredients", () => {
  test("appleMushroomPizza double apple", () => {
    expect(
      doubleIngredients(appleMushroomPizza, [appleIngredient])
    ).toStrictEqual(appleMushroomPizzaAppleDouble);
  });
});

describe("removeAllergens", () => {
  test("appleMushroomPizza remove apple Allergens", () => {
    expect(removeAllergens(appleMushroomPizza, ["apple"])).toStrictEqual(
      appleMushroomPizzaAppleRemoveAppleAllergens
    );
  });
});

describe("removeFoodTypes", () => {
  test("appleMushroomPizza remove apple Type", () => {
    expect(removeFoodTypes(appleMushroomPizza, ["apple"])).toStrictEqual(
      appleMushroomPizzaAppleRemoveAppleType
    );
  });
});

describe("getCalories", () => {
  test("appleMushroomPizza get calories = 30", () => {
    expect(getCalories(appleMushroomPizza)).toBe(30);
  });
});
