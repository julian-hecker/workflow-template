const baseConfig = require('./webpack.base.js');
// packages
const path = require('path'),
    merge = require('webpack-merge'),
    UglifyJs = require('uglifyjs-webpack-plugin'),
    OptimizeCssAssets = require('optimize-css-assets-webpack-plugin'),
    { CleanWebpackPlugin } = require('clean-webpack-plugin'),
    CssExtract = require('mini-css-extract-plugin');



let postCssPlugins = [
    require('autoprefixer')({
        grid: 'no-autoplace',
        remove: false,
    }),
];

let scssConfig = {
    // select all .sass or .scss files
    test: /\.(sass|scss|css)$/i,
    use: [
        CssExtract.loader,
        'css-loader',
        // autoprefixer
        {
            loader: 'postcss-loader',
            options: { plugins: postCssPlugins },
        },
        // sass loader
        {
            loader: 'sass-loader',
            options: {
                sourceMap: false,
                sassOptions: {
                    outputStyle: 'compact',
                },
            },
        },
    ],
};


module.exports = merge(baseConfig, {
    mode: 'production',
    output: {
        filename: '[name].bundle.[chunkhash].js',
        // name each split module
        chunkFilename: '[name].bundle.[chunkhash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        minimizer: [
            new UglifyJs({
                cache: true,
                parallel: true,
                sourceMap: false,
                uglifyOptions: {
                    compress: true,
                    mangle: true,
                    output: {
                        comments: false,
                    },
                },
            }),
            new OptimizeCssAssets({
                cssProcessorOptions: {
                    safe: true,
                    discardComments: {
                        removeAll: true,
                    },
                },
            }),
        ],
        splitChunks: {
            chunks: 'all',
        },
    },
    module: {
        rules: [scssConfig],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CssExtract({ filename: 'styles.[chunkhash].css' }),
    ],
});
