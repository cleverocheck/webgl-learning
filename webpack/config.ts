import HtmlWebpackPlugin from 'html-webpack-plugin'
import * as path from 'path'
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin'
import { Configuration, EnvironmentPlugin } from 'webpack'

import { EPath } from './data'

interface IDevServerConfiguration {
  static: string
  hot: boolean
}

const config: Configuration & {
  devServer: IDevServerConfiguration
} = {
  mode: 'development',
  entry: path.join(process.cwd(), EPath.src, EPath.entryTS),
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new EnvironmentPlugin(['LESSON_NUMBER']),
    new HtmlWebpackPlugin({
      filename: EPath.entryHTML,
      template: path.join(EPath.src, EPath.entryHTML),
      scriptLoading: 'blocking'
    })
  ],
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.ts', '.js']
  },
  output: {
    filename: EPath.outputEntryJS,
    path: path.join(process.cwd(), EPath.build),
    clean: true
  },
  devtool: 'source-map',
  devServer: {
    static: EPath.static,
    hot: false
  }
}

export default config
