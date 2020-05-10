const baseConfig = require('./webpack.base.js');
// packages
const path = require('path'),
    merge = require('webpack-merge');



const postCssPlugins = [
    require('autoprefixer')({
        grid: 'no-autoplace',
        remove: false,
    }),
]

const scssConfig = {
    // select all .sass or .scss files
    test: /\.(sass|scss|css)$/i,
    use: [
        // style-loader, inject style into page
        'style-loader',
        // cssloader
        {
            loader: 'css-loader',
            options: {
                sourceMap: true,
            },
        },
        // postcss, autoprefixer
        {
            loader: 'postcss-loader',
            options: { plugins: postCssPlugins },
        },
        // sass loader
        {
            loader: 'sass-loader',
            options: {
                sourceMap: true,
                sassOptions: {
                    // normal output
                    outputStyle: 'expanded',
                },
            },
        },
    ],
};



module.exports = merge(baseConfig, {
    mode: 'development',
    // creates sourcemaps
    devtool: 'eval-source-map',
    // webpack-dev-server config
    devServer: {
        // don't save changes to file
        writeToDisk: false,
        // directory to serve
        contentBase: path.join(__dirname, 'src'),
        // reload on change content
        watchContentBase: true,
        // inject code into browser
        hot: true,
        // set dev server port
        port: 3000,
        // allows other devices to connect via local ip
        host: '0.0.0.0',
        // opens with local ip instead of 0.0.0.0
        useLocalIp: true,
    },
    module: {
        rules: [scssConfig],
    },
});
