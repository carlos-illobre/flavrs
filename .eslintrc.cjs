module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    "consistent-return": 2,
    "indent"           : [1, 2],
    "no-else-return"   : 1,
    "semi"             : [1, "always"],
    "space-unary-ops"  : 2,
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }
    ]
  }
};