export const signUpValidation = [
  {
    required: "Email is required",
    pattern: {
      value:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      message: "Invalid email format",
    },
    minLength: {
      value: 8,
      message: "Email must be at least 8 characters long",
    },
  },
  {
    required: "Password is required",
    pattern: {
      value: /^[A-Za-z\d@$!%*?&]{5,}$/,
      message: "Invalid password format",
    },
    minLength: {
      value: 5,
      message: "Password must be at least 5 characters",
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
