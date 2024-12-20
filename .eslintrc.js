module.exports = {
  extends: [
    "./node_modules/poetic/config/eslint/eslint-config.js",
    "plugin:storybook/recommended",
  ],
  settings: {
    "import/core-modules": ["recharts", "papaparse", "react-chartjs-2"],
  },
  // Add custom rules here
  rules: {
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "@typescript-eslint/no-unused-vars": ["warn"],
    "react/jsx-props-no-spreading": "off",
    "object-shorthand": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "no-shadow": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "import/prefer-default-export": "off",
    "no-debugger": "warn",
    "lines-between-class-members": [
      "error",
      "always",
      { exceptAfterSingleLine: true },
    ],
    "react/require-default-props": "off",
    "no-undef": "off", // Typescript fills this role for us
    camelcase: "off",
    "jsx-a11y/label-has-associated-control": "off",
    "@typescript-eslint/no-floating-promises": "error",
    "no-void": ["error", { allowAsStatement: true }],
    "no-await-in-loop": "off",
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "jsx-a11y/img-redundant-alt": "off",
    "no-useless-constructor": "off",

    "@typescript-eslint/await-thenable": "error",

    // Prolific in our codebase but became errors after update. Could
    // re-enable these if motivated
    "arrow-body-style": "off",
    "react/jsx-no-useless-fragment": "off",
    "react/function-component-definition": "off",
    "no-plusplus": "off",
    "no-restricted-syntax": [
      "error",
      {
        selector: "MemberExpression[object.name='_'][property.name='groupBy']",
        message:
          "_.groupBy has cause a number of bugs in the past due to it handling missing groups as undefined instead of as empty arrays, and is now forbidden in the codebase. Consider using an alternative like filter.",
      },
      {
        selector: "CallExpression[callee.name='booleanOverlap']",
        message:
          "booleanOverlap does not account for booleanContains, and it is better to use !booleanDisjoint instead.",
      },
    ],
    "react/no-unescaped-entities": ["error", { forbid: [">", "}"] }],
  },
  parserOptions: {
    project: "./tsconfig.json",
  },
};
