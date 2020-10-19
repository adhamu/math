import path from 'path'
import HtmlWebPackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'

const config: webpack.Configuration = {
  entry: './src/index.tsx',
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 7000,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@global': path.resolve(__dirname, 'src/'),
      '@layout': path.resolve(__dirname, 'src/layout/'),
      '@components': path.resolve(__dirname, 'src/components/'),
    },
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/math',
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/templates/index.html',
      filename: './index.html',
    }),
  ],
}

export default config
