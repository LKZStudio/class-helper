module.exports = [
  {
    test: /\.node$/,
    use: 'node-loader',
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@marshallofsound/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    test: /\.(js|ts|tsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader'
    }
  },
  {
    test: /\.css$/,
    use: [{
      loader: "style-loader" // creates style nodes from JS strings
    }, {
      loader: "css-loader" // translates CSS into CommonJS
    }]
  },
  {
    test: /\.(png|svg|jpg|gif)$/,
    use: {
      loader: 'url-loader',
      options: {
        name: 'assets/[name].[ext]',
        limit: 2048
      }
    }
  },
  {
    test: /\.html$/,
    loader: 'html-loader'
  }
]