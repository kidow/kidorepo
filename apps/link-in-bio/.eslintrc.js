module.exports = {
  root: true,
  extends: ['next/core-web-vitals', 'custom'],
  parserOptions: {
    babelOptions: {
      presets: [require.resolve('next/babel')]
    }
  }
}
