import {
  Ingredient,
  Recipe,
  FoodTypes,
  Allergens,
  hasFoodTypes,
  hasAllergens,
  removeAllergens,
  removeFoodTypes,
  removeIngredients,
  doubleIngredients,
  getCalories,
} from "../index";

const eggIngredient: Ingredient = {
  unit: 1,
  name: "egg",
  foodtypes: [FoodTypes.MEAT],
  allergens: [Allergens.EGGS],
  calorie: 10,
};

const beafIngredient: Ingredient = {
  unit: 1,
  name: "beaf",
  foodtypes: [FoodTypes.MEAT],
  allergens: [],
  calorie: 10,
};

const doubleBeafIngredient: Ingredient = {
  unit: 2,
  name: "beaf",
  foodtypes: [FoodTypes.MEAT],
  allergens: [],
  calorie: 20,
};

const doubleEggIngredient: Ingredient = {
  unit: 2,
  name: "egg",
  foodtypes: [FoodTypes.MEAT],
  allergens: [Allergens.EGGS],
  calorie: 20,
};

const eggBeafPizzaDouble = new Recipe("eggBeefPizza", [
  doubleEggIngredient,
  doubleBeafIngredient,
]);
const eggBeafPizza = new Recipe("eggBeefPizza", [
  eggIngredient,
  beafIngredient,
]);

const eggBeafPizzaWithOutEgg = new Recipe("eggBeefPizza", [beafIngredient]);
const eggBeafPizzaWithOutMeat = new Recipe("eggBeefPizza", []);
describe("Recipe", () => {
  test("Recipe show correct ingredients foodtypes allergens", () => {
    expect(eggBeafPizza.name).toBe("eggBeefPizza");
    expect(eggBeafPizza.foodtypes).toStrictEqual(new Set(["MEAT"]));
    expect(eggBeafPizza.allergens).toStrictEqual(new Set(["EGGS"]));
  });
});

describe("hasFoodTypes", () => {
  test("eggBeafPizza have meat return true", () => {
    expect(hasFoodTypes(eggBeafPizza, [FoodTypes.MEAT])).toBe(true);
  });
  test("eggBeafPizza have SEAFOOD return false", () => {
    expect(hasFoodTypes(eggBeafPizza, [FoodTypes.SEAFOOD])).toBe(false);
  });
});

describe("hasAllergens", () => {
  test("eggBeafPizza have eggs return true", () => {
    expect(hasAllergens(eggBeafPizza, [Allergens.EGGS])).toBe(true);
  });
  test("eggBeafPizza have nuts return false", () => {
    expect(hasAllergens(eggBeafPizza, [Allergens.NUTS])).toBe(false);
  });
});

describe("removeAllergens", () => {
  test("eggBeafPizza remove eggs Allergens", () => {
    expect(removeAllergens(eggBeafPizza, [Allergens.EGGS])).toStrictEqual(
      eggBeafPizzaWithOutEgg
    );
  });
});

describe("removeFoodTypes", () => {
  test("eggBeafPizza remove apple Type", () => {
    expect(removeFoodTypes(eggBeafPizza, [FoodTypes.MEAT])).toStrictEqual(
      eggBeafPizzaWithOutMeat
    );
  });
});

describe("removeIngredients", () => {
  test("eggBeafPizza remove egg", () => {
    expect(removeIngredients(eggBeafPizza, [eggIngredient])).toStrictEqual(
      eggBeafPizzaWithOutEgg
    );
  });
});

describe("doubleIngredients", () => {
  test("eggBeafPizza double", () => {
    expect(doubleIngredients(eggBeafPizza, [beafIngredient])).toStrictEqual(
      eggBeafPizzaDouble
    );
  });
});

describe("getCalories", () => {
  test("eggBeafPizza get calories = 30", () => {
    expect(getCalories(eggBeafPizza)).toBe(20);
  });
});
