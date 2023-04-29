const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const { ModuleFederationPlugin } = webpack.container;
const deps = require('./package.json').dependencies;

module.exports = (env, argv) => {
  const buildDate = new Date();
  const mode = 'production';
  console.log({ mode });
  return {
    performance: {
      hints: false,
    },
    entry: `./src/index.ts`,
    output: {
      path: path.resolve(__dirname, '___dist___'),
      filename: 'container.frontend.js',
    },
    devtool: 'inline-source-map',
    mode,
    devServer: {
      port: 3000,
      open: true,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|tsx|ts)$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },

    // webpack plugins
    plugins: [
      new webpack.EnvironmentPlugin({
        BUILD_DATE: buildDate.toISOString(),
      }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env),
      }),
      new ModuleFederationPlugin({
        name: 'container',
        remotes: {
          catalog: `catalog@/components/app1.js`,
          order: `order@/components/app2.js`,
          user: `user@/components/app3.js`,
        },
        shared: {
          ...deps,
          react: { singleton: true, eager: true, requiredVersion: deps.react },
          'react-dom': {
            singleton: true,
            eager: true,
            requiredVersion: deps['react-dom'],
          },
        },
      }),
      new HtmlWebpackPlugin({
        template: `./public/index.html`,
      }),
    ],
  };
};
