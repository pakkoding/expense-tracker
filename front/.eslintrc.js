module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'node': true
  },
  'parser': 'babel-eslint',
  'extends': ['standard', 'standard-react'],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'jsx-quotes': ['error', 'prefer-double'],
    'semi': ['error', 'never'],
    'react/jsx-indent-props': ['error', 'first'],
    'indent': ['error', 2, {
      'ignoredNodes': ['JSXElement *', 'JSXElement'],
      'SwitchCase': 1
    }]
    // "babel/semi": 1,
  }
}
