export const updateValidation = [
  {
    pattern: {
      value: /^[A-Za-z\d@$!%*?&]{3,}$/,
      message: "Invalid avatar format",
    },
    minLength: {
      value: 10,
      message: "URL must be at least 10 characters long",
    },
    maxLength: {
      value: "500",
      message: "URL can not be longer than 500 characters",
    },
  },
  {
    required: "Username is required",
    pattern: {
      value: /^[A-Za-z\d@$!%*?&]{3,}$/,
      message: "Invalid username format",
    },
    minLength: {
      value: 3,
      message: "Username must be at least 3 characters long",
    },
  },
];
