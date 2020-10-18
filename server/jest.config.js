module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: [`${__dirname}/src/jest.setup.ts`],
};
