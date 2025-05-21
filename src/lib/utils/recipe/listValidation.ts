export const listValidation = [
  {
    required: "Name is required",
    pattern: {
      value: /^[A-Za-z\d@$!%*?&]{3,}$/,
      message: "Invalid name format",
    },
    minLength: {
      value: 5,
      message: "Name must be at least 3 characters",
    },
  },
  {
    required: "Amount is required",
    pattern: {
      value: /^(?!0$)(?!0\.0+$)\d*(\.\d+)?$/,
      message: "Invalid amount format",
    },
    minLength: {
      value: 0.1,
      message: "Amount must be more than 0",
    },
  },
  {
    required: "Step is required",
    pattern: {
      value: /^[A-Za-z\d@$!%*?&]{5,}$/,
      message: "Invalid step format",
    },
    minLength: {
      value: 5,
      message: "Step must be at least 5 characters",
    },
  },
];
