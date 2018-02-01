const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin({
    filename: "dist/bundle.css",
    allChunks: true,
    disable: false
    // disable: process.env.NODE_ENV === "development"
});

module.exports = {
    entry: ['./index.js', './styles/app.scss'],
    output: {
        filename: 'dist/bundle.js',
        // path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: { // options are passed to the loader
                        /* Each yearly preset only compiles what was ratified in that year. 
                        *  babel-preset-env replaces es2015, es2016, es2017 and latest 
                        */
                        presets: ['env'], // List of presets (a set of plugins) to load and use.
                        // plugins: [require('')] // List of plugins to load and use.
                    }
                }
            },
            {
                test: /\.(scss|sass)$/,
                // exclude: /(node_modules)/,
                // use: ["style-loader", "css-loader", "sass-loader"]
                use: extractSass.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"]
                    // use style-loader in development
                })
            }
        ]
    },
    plugins: [extractSass]
}