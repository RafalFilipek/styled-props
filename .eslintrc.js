module.exports = {
  parser: 'babel-eslint',
  extends: 'eslint:recommended',
  plugins: ['react', 'jsx-a11y', 'import', 'flowtype-errors'],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  rules: {
    'flowtype-errors/show-errors': 2,
  },
};
