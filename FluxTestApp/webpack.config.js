var webpack = require('webpack');

module.exports = {
    entry: [       
        'react-hot-loader/patch',
        './src/main.js'
    ],
    // devServer: {        
    //    hot: true
    //   },
    // plugins: [
    //     new webpack.NamedModulesPlugin(),
    //     new webpack.HotModuleReplacementPlugin()
    // ],
    output: {
        path: __dirname + '/public/build/',
        publicPath: "build/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            // {
            //     test: /\.js$/,
            //     loader: "babel-loader",
            //     exclude: [/node_modules/, /public/],
            //     query: {
            //         presets: ['es2015', 'react']
            //     }
            // },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader!autoprefixer-loader",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!autoprefixer-loader!less-loader",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.gif$/,
                loader: "url-loader?limit=10000&mimetype=image/gif"
            },
            {
                test: /\.jpg$/,
                loader: "url-loader?limit=10000&mimetype=image/jpg"
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=10000&mimetype=image/png"
            },
            {
                test: /\.svg/,
                loader: "url-loader?limit=26000&mimetype=image/svg+xml"
            },
            {
                test: /\.jsx?$/,
                loaders: ['react-hot-loader/webpack', 'babel-loader?presets[]=react'],
                // loader: "babel-loader",
                exclude: [/node_modules/, /public/]
                // ,
                // query: {
                //     presets: ['react']
                //}           
            },
            // {
            //     test: /\.jsx$/,
            //     loader: "react-hot-loader/webpack",
            //     exclude: [/node_modules/, /public/],
            //     query: {
            //         presets: ['react']
            //     }
            // },
            // {
            //     test: /\.jsx?$/,
            //     exclude: /node_modules/,
            //     loader: 'babel-loader',
            //     query: {
            //       presets:['react', 'stage-2' ]
            //     }
            // },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ]
    }
}
