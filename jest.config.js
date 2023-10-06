module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      '<rootDir>/jest/fileMock.js',
  },
  collectCoverageFrom: ['src/**/*.ts*', 'src/**/*.js*'],
  fakeTimers: {
    enableGlobally: true,
  },
}
