const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const PugPlugin = require('pug-plugin');

module.exports = {
  entry: {
    index: path.resolve(__dirname, '../index.pug'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'scripts/[name].[fullhash].js',
    assetModuleFilename: 'assets/[hash][ext][query]',
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: PugPlugin.loader,
        options: {
          method: 'render',
        },
      },
      {
        test: /\.(css|sass|scss)$/,
        use: ['css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jp?g|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'sections/[hash][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext]',
        },
      },
    ],
  },
  plugins: [
    new PugPlugin({
      extractCss: {
        // output filename of CSS files
        filename: 'styles/[name].[contenthash:8].css',
      },
    }),
  ],
};
