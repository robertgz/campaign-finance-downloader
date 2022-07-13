
import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  "roots": [
    "<rootDir>/src"
  ],
  transform: {},
  preset: "ts-jest/presets/js-with-ts-esm",
  testEnvironment: "node",
  verbose: true,
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
}
export default config;
