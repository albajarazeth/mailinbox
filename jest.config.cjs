module.exports = {
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/src/_mocks_/stylesMocks.js",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!your-esm-package|other-package-to-transform).+\\.js$",
  ],
  testEnvironment: "jest-environment-jsdom",
};
