module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'prettier'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/strict',
    'prettier',
  ],
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'error'
  }
};
