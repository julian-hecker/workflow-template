// https://simonsmith.io/organising-webpack-config-environments

const fse = require('fs-extra'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    webpack = require('webpack');



let htmlConfig = {
    test: /\.(html|html)$/i,
    use: ['html-loader'],
};


let imgConfig = {
    test: /\.(png|svg|jpe?g|gif|webp)$/i,
    use: [
        {
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                // copies to new file
                outputPath: './img',
                // adjusts references in html
                publicPath: './img',
            },
        },
        {
            loader: 'image-webpack-loader',
            options: {
                disable: true,
                mozjpeg: {
                    progressive: true,
                    quality: 65,
                },
                optipng: {
                    enabled: false,
                },
                pngquant: {
                    quality: 65,
                },
                gifsicle: {
                    optimizationLevel: 3,
                },
                webp: {
                    method: 6,
                },
            },
        },
    ],
};

let fontConfig = {
    test: /\.(woff2?|eot|ttf|otf)$/i,
    use: [
        {
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: './fonts',
                publicPath: './fonts',
            },
        },
    ],
};

let jsConfig = {
    test: /\.js$/i,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: [
                '@babel/preset-env',
                //would add react here
                // '@babel/preset-react'
            ],
        },
    },
};



// foreach html file, run html plugin
let pages = fse.readdirSync('./src')
    .filter((file) => file.endsWith('.html'))
    .map((page) => new HtmlWebpackPlugin({
        filename: page,
        template: `./src/${page}`,
    }));



module.exports = {
    entry: './src/js/index.js',
    module: {
        rules: [
            htmlConfig,
            imgConfig,
            fontConfig,
            jsConfig,
        ],
    },
    plugins: [
        new webpack.EnvironmentPlugin([
            'NODE_ENV',
        ]),
        ...pages,
    ],
};
