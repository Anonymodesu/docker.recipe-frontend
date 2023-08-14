/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    'd3': '<rootDir>/node_modules/d3-dsv/dist/d3-dsv.min.js',
    "\\.(css|scss|svg)$": "<rootDir>/src/__mocks__/styleMock.js",
  },
  modulePaths: ['<rootDir>'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
};