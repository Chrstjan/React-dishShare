export const createRecipe = [
  {
    required: "Category is required",
    pattern: {
      value: /^[0-9]{1,}$/,
      message: "Invalid category format",
    },
    minLength: {
      value: 1,
      message: "Recipe must belong to a category",
    },
  },
];

export const createRecipeRelations = [
  {
    required: "Category is required",
    pattern: {
      value: /^[0-9]{1,}$/,
      message: "Invalid category format",
    },
    minLength: {
      value: 1,
      message: "Recipe must belong to a category",
    },
  },
  {
    required: "Cuisine is required",
    pattern: {
      value: /^[0-9]{1,}$/,
      message: "Invalid cuisine format",
    },
    minLength: {
      value: 1,
      message: "Recipe must belong to a cuisine",
    },
  },
  {
    required: "Difficulty is required",
    pattern: {
      value: /^[0-9]{1,}$/,
      message: "Invalid difficulty format",
    },
    minLength: {
      value: 1,
      message: "Recipe must belong to a difficulty",
    },
  },
];
