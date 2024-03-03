const CracoAlias = require('craco-alias')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
const isProduction = process.env.NODE_ENV === 'production'
console.log(process.env)
module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        tsConfigPath: 'tsconfig.paths.json',
      },
    },
  ],
  babel: {
    presets: [
      [
        '@babel/preset-react',
        { runtime: 'automatic', importSource: '@emotion/react' },
      ],
    ],
    plugins: ['@emotion/babel-plugin'],
  },
  webpack: {
    plugins: isProduction
      ? []
      : [new BundleAnalyzerPlugin.BundleAnalyzerPlugin()],
  },
}
