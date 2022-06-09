
import type { InitialOptionsTsJest } from 'ts-jest'
import { defaults as tsjPreset } from 'ts-jest/presets'

const config: InitialOptionsTsJest = {
  "roots": [
    "<rootDir>/src"
  ],
  transform: {
    ...tsjPreset.transform,
  },
  testEnvironment: 'node',
}

export default config

// /** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
// };
