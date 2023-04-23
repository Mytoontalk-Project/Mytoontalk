module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier", "airbnb/hooks"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "react-native"],
  rules: {
    indent: ["error", 2],
    quotes: ["error", "double"],
    semi: ["warn", "always"],
    "import/no-extraneous-dependencies": "off",
    "import/prefer-default-export": "off",
    "react/style-prop-object": "off",
    "react/prop-types": "off",
    "no-param-reassign": "off",
    "no-use-before-define": "off",
    "react/jsx-props-no-spreading": "off",
    "array-callback-return": "off",
    "react/self-closing-comp": "off",
    "react/jsx-filename-extension": ["warn", { extensions: [".js"] }],
    "react-hooks/exhaustive-deps": "off",
    "no-nested-ternary": "off",
    "no-restricted-syntax": "off",
    "guard-for-in": "off",
    "no-await-in-loop": "off",
    "prefer-template": "off",
  },
};
