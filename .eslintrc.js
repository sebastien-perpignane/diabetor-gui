module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    semi: 'off',
    '@typescript-eslint/semi': ['error', 'never'],
  },
  ignorePatterns: ['coverage/*'],
}
