import { dirname, join } from 'path'

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')))
}

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-interactions'),
    {
      name: getAbsolutePath('@storybook/addon-styling'),
      options: {
        postCss: {
          implementation: require.resolve('postcss')
        }
      }
    },
    getAbsolutePath('storybook-dark-mode')
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {}
  },
  docs: {
    autodocs: 'tag'
  }
}
export default config
