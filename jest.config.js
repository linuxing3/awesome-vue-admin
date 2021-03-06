module.exports = {
  setupFiles: ['<rootDir>/tests/unit/setup.ts', '<rootDir>/tests/unit/store-setup.ts'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'ts', 'tsx'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest'
  },
  transformIgnorePatterns: ['node_modules/(?!(vuetify/|@storybook/.*\\.vue$))'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/src/$1'
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: ['**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.spec.(js|jsx|ts|tsx)'],
  testURL: 'http://localhost/',
  globals: {
    'ts-jest': {
      babelConfig: true
    }
  },
  watch: false,
  watchman: true
}
