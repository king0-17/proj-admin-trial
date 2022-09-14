var webpack = require('webpack')
module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery",
            })
        ]
    },
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = ".ARA Stream";
                return args;
            })
    },
    devServer: {
        public: process.env.APP_URL,
        host: '0.0.0.0',
        disableHostCheck: true
    },
    publicPath: "/"
}