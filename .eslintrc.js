module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12
  },
  plugins: [
    'react'
  ],
  rules: {
    indent: ['error', 2, {
      SwitchCase: 1
      // offsetTernaryExpressions: true
    }],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'space-before-function-paren': [
      'error', {
        named: 'never'
      }
    ]
  },
  settings: {
    react: {
      version: 'latest'
    }
  }
}
