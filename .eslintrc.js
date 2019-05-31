module.exports = {
  parser:  '@typescript-eslint/parser',
  env: {
    es6: true,
    jasmine: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'indent': [ 'error', 2 ],
    '@typescript-eslint/indent': [ 'error', 2 ],
    'linebreak-style': [ 'error', 'unix' ],
    'quotes': [ 'error', 'single' ],
    'semi': [ 'error', 'always' ],
    'comma-dangle': ['error', 'only-multiline'],
    '@typescript-eslint/explicit-function-return-type': false,
    '@typescript-eslint/no-explicit-any': false,
    '@typescript-eslint/no-parameter-properties': false,
  }
};
