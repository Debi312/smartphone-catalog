export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.jest.json"
      }
    ]
  },
  setupFiles: ["<rootDir>/src/setupTests.ts"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTestsAfterEnv.ts"],
  moduleNameMapper: {
    "\\.(css|scss|sass)$": "identity-obj-proxy"
  }
}