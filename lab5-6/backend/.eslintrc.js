module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint/eslint-plugin"],
  extends: [
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "max-len": ["error", { "code": 100, "ignoreComments": true, "ignoreUrls": true, "ignoreTemplateLiterals": true }],
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "semi": [
      "error",
      "never"
    ],  
    "@typescript-eslint/quotes": [
      "error",
      "double"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "indent": [
      "error",
      4,
      { "SwitchCase": 1 }
    ],
    "@typescript-eslint/prefer-optional-chain": [
      "error"
    ],
    "@typescript-eslint/switch-exhaustiveness-check": [
      "error"
    ],
    "@typescript-eslint/comma-dangle": [
      "error",
      "always-multiline"
    ]
  },
};