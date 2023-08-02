const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './'
})

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(md|mdx)$': 'jest-transformer-mdx'
  }
}

module.exports = createJestConfig(customJestConfig)
