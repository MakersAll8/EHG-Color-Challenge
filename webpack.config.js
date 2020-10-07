const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkerPlugin = require('worker-plugin');

module.exports = {
    // specify entry point and output
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js'
    },
    devtool: "source-map",
    // specify babel loader
    module: {
        rules: [
            // {
            //     test: /\.worker\.js$/,
            //     use: { loader: 'worker-loader' },
            // },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: '[name]__[local]__[hash:base64:5]'
                            }

                        },
                    }
                ]
            },
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 1000,
                },
            },
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[hash].[ext]',
                },
            },
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 9999,
        clientLogLevel: 'debug'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new WorkerPlugin(),
    ]
}
