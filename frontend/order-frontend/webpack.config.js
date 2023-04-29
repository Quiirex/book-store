const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack'); // only add this if you don't have yet
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies;

const buildDate = new Date();

module.exports = (env, argv) => {
  const mode = 'production';
  console.log({ mode });
  return {
    performance: {
      hints: false,
    },
    entry: `./src/index.ts`,
    output: {
      path: path.resolve(__dirname, '___dist___'),
      filename: 'order-module.js',
    },
    devServer: {
      port: 3001,
      open: false,
    },
    devtool: 'inline-source-map',
    mode,
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
    plugins: [
      new webpack.EnvironmentPlugin({
        BUILD_DATE: buildDate.toISOString(),
      }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env),
      }),
      new ModuleFederationPlugin({
        name: 'order',
        filename: 'order.js',
        exposes: {
          './CounterApp2': './src/components/Counter',
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
