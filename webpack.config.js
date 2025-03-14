const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const EsbuildLoader = require('esbuild-loader');


const commonConfig = {
  entry: './src/index.js',
  target: 'web',
  resolve: {
    extensions: ['.js', '.jsx', '.json'], // '.ts', '.tsx' for Typescript.
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // /\.(ts|tsx)$/ for Typescript.
        exclude: /node_modules/,
        use: {
          loader: 'esbuild-loader',
          options: {
            target: 'es2015',
            loader: 'jsx', // If using JSX, set to 'jsx'. If using TSX, set to 'tsx'.
            minify: false,
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html')
    })
  ]
};

const devConfig = {
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
  devServer: {
    port: '5000',
    static: {
      directory: path.join(__dirname, 'public')
  },
    open: true,
    hot: true,
    liveReload: true,
  },
};

const prodConfig = {
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
  },
  optimization: {
    minimize: true,
  },
};

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production" ? true : false;
  if (isProduction) {
    return { ...commonConfig, ...prodConfig };
  } else {
    return { ...commonConfig, ...devConfig };
  }
};
