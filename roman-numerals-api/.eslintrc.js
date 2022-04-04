module.exports = {
  'env': {
    'node': true,
    'es6': true,
    'jest/globals': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:jest/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 9,
    'sourceType': 'module'
  },
  'parser': '@typescript-eslint/parser',
  'plugins': [
    'jest',
    '@typescript-eslint'
  ],
  'rules': {
    'linebreak-style': [ 'error', 'unix' ],
    'semi': ['error', 'always'],
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    'eol-last': ['error', 'always'],
    'indent': ['error', 2, { 'MemberExpression': 1, 'SwitchCase': 1 }],
    'no-new-symbol': 'error',
    'no-trailing-spaces': ['error'],
    'no-undef': ['error'],
    'no-unused-vars': ['error'],
    'no-extra-boolean-cast': 0,
    'no-console': 'error',
    'object-curly-spacing': ['error', 'always'],
    'object-shorthand': 0,
    'prefer-const': 2,
    'quotes': ['error', 'single'],
    'space-in-parens': ['error', 'never'],
    'strict': [2, 'never'],
    'no-useless-escape': 0,
    'no-multiple-empty-lines': ['error', { 'max': 2, 'maxEOF': 1 }],
    'comma-dangle': ['error', 'never'],
    'max-len': ['error', { 'code': 150, 'tabWidth': 2, 'ignoreComments': true, 'ignoreTrailingComments': true }],
    'block-spacing': ['error', 'always'],
    'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
    'camelcase': 1,
    'jsx-quotes': ['error', 'prefer-double'],
    'no-nested-ternary': 1,
    'keyword-spacing': 'error',
    'arrow-spacing': 'error',
    'template-curly-spacing': ['error', 'always'],
    '@typescript-eslint/no-parameter-properties': ['off'],
    '@typescript-eslint/member-ordering': ['error', { 'default': ['field', 'constructor', 'method'] }]
  }
};
