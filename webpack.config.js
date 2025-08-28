const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    // JavaScript/JSX 处理规则
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        // 使用 babel-loader 处理这些文件，并配置 @babel/preset-react 预设来转换 JSX
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        // 使用 style-loader 和 css-loader 处理 CSS 文件
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板生成最终的 HTML 文件，并自动注入打包后的 JavaScript 和 CSS 文件
      template: './public/index.html'
    })
  ],
  // 开发服务器配置
  devServer: {
    port: 3000,
    // hot: 启用热模块替换功能，可以在不刷新整个页面的情况下更新模块
    hot: true
  }
};