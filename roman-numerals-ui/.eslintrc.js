module.exports = {
  'env': {
    'node': true,
    'browser': true,
    'es6': true,
    'jest/globals': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:jest/recommended',
    'plugin:react/recommended'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 9,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true
    }
  },
  'parser': '@typescript-eslint/parser',
  'plugins': [
    'react',
    'react-hooks',
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
    'no-console': 'warn',
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
    'react/state-in-constructor': ['error', 'always'],
    'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
    'react/jsx-curly-newline': ['error', { 'multiline': 'require', 'singleline': 'consistent' }],
    'react/jsx-curly-spacing': [2, { 'when': 'always', 'children': true }],
    'react/jsx-first-prop-new-line': [2, 'multiline-multiprop'],
    'react/jsx-key': [2, { 'checkFragmentShorthand': true }],
    'react/jsx-max-props-per-line': [2, { 'maximum': 1, 'when': 'multiline' }],
    'react/jsx-tag-spacing': [2, { 'beforeSelfClosing': 'always' }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-parameter-properties': ['off'],
    '@typescript-eslint/member-ordering': ['warn', { 'default': ['field', 'constructor', 'method'] }],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error']
  }
};
