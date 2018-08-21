module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    // '@vue/airbnb',
    '@vue/typescript',
  ],
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  // extends: 'standard',
  // required to lint *.vue files
  // plugins: [
  //   'html'
  // ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: [2, 'never'],
    "key-spacing": [0, { "beforeColon": false, "afterColon": true }],
    'no-alert': process.env.NODE_ENV === 'production' ? 2 : 0,
    'space-before-function-paren': 0,
    'no-new': 0,
    'prefer-promise-reject-errors': 0,
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
  },
  "globals": {
    "ypp": true
  },
  parserOptions: {
    parser: 'typescript-eslint-parser',
  },
}
