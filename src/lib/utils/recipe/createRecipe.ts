export const recipeFields = [
  {
    inputType: "text",
    registerName: "name",
    inputName: "name",
    validation: {
      required: "Name is required",
      pattern: {
        value: /^[A-Za-z\d@$!%*?&]{5,}$/,
        message: "Invalid name format",
      },
      minLength: {
        value: 5,
        message: "Name must be at least 5 characters",
      },
    },
  },
  {
    inputType: "text",
    registerName: "description",
    inputName: "description",
    validation: {
      required: "Description is required",
      pattern: {
        value: /^[A-Za-z\d@$!%*?&]{12,}$/,
        message: "Invalid description format",
      },
      minLength: {
        value: 12,
        message: "Description must be at least 12 characters",
      },
    },
  },
  {
    inputType: "select",
    registerName: "category",
    inputName: "category",
    endpoint: "categories",
    validation: {
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
  },
  {
    inputType: "select",
    registerName: "cuisine",
    inputName: "cuisine",
    endpoint: "cuisine",
    validation: {
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
  },
  {
    inputType: "number",
    registerName: "preptime",
    inputName: "prep time",
    validation: {
      required: "Prep time is required",
      pattern: {
        value: /^[0-9]{1,}$/,
        message: "Invalid prep time format",
      },
      minLength: {
        value: 1,
        message: "Prep time must be at least 1 character",
      },
    },
  },
  {
    inputType: "number",
    registerName: "cooktime",
    inputName: "cook time",
    validation: {
      required: "Cook time is required",
      pattern: {
        value: /^[0-9]{1,}$/,
        message: "Invalid cook time format",
      },
      minLength: {
        value: 1,
        message: "Cook time must be at least 1 character",
      },
    },
  },
  {
    inputType: "number",
    registerName: "servings",
    inputName: "servings",
    validation: {
      required: "Servings is required",
      pattern: {
        value: /^[0-9]{1,}$/,
        message: "Invalid servings format",
      },
      minLength: {
        value: 1,
        message: "Servings must be at least 1 character",
      },
    },
  },
  {
    inputType: "number",
    registerName: "calories",
    inputName: "calories",
    validation: {
      required: "Calories is required",
      pattern: {
        value: /^[0-9]{1,}$/,
        message: "Invalid calories format",
      },
      minLength: {
        value: 1,
        message: "Calories must be at least 1 character",
      },
    },
  },
  {
    inputType: "number",
    registerName: "carbs",
    inputName: "carbs",
    validation: {
      required: "Carbs is required",
      pattern: {
        value: /^[0-9]{1,}$/,
        message: "Invalid carbs format",
      },
      minLength: {
        value: 1,
        message: "Carbs must be at least 1 character",
      },
    },
  },
  {
    inputType: "number",
    registerName: "fat",
    inputName: "fat",
    validation: {
      required: "Fat is required",
      pattern: {
        value: /^[0-9]{1,}$/,
        message: "Invalid fat format",
      },
      minLength: {
        value: 1,
        message: "Fat must be at least 1 character",
      },
    },
  },
  {
    inputType: "number",
    registerName: "protein",
    inputName: "protein",
    validation: {
      required: "Protein is required",
      pattern: {
        value: /^[0-9]{1,}$/,
        message: "Invalid protein format",
      },
      minLength: {
        value: 1,
        message: "Protein must be at least 1 character",
      },
    },
  },
  {
    inputType: "select",
    registerName: "difficulty",
    inputName: "difficulty",
    endpoint: "difficulty",
    validation: {
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
  },
];
