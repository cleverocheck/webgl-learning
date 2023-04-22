import HtmlWebpackPlugin from 'html-webpack-plugin'
import * as path from 'path'
import { Configuration } from 'webpack'

import { EPath } from './data'

const config: Configuration = {
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
    new HtmlWebpackPlugin({
      filename: EPath.entryHTML,
      template: path.join(EPath.src, EPath.entryHTML),
      scriptLoading: 'blocking'
    })
  ],
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: EPath.outputEntryJS,
    path: path.join(process.cwd(), EPath.build),
    clean: true
  }
}

export default config
