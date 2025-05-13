const path                    = require( 'path' );
const glob                    = require( 'glob' );
const MiniCssExtractPlugin    = require( 'mini-css-extract-plugin' );
const CssMinimizerPlugin      = require( "css-minimizer-webpack-plugin" );
const TerserPlugin            = require( 'terser-webpack-plugin' );
const SpriteLoaderPlugin      = require( 'svg-sprite-loader/plugin' );
const UnminifiedWebpackPlugin = require( 'unminified-webpack-plugin' );
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const isProduction = process.env.NODE_ENV === 'production';
const mode         = isProduction ? 'production' : 'development';
const BUILD_DIR = path.resolve( __dirname, 'assets' );
const filename = ext => isProduction ? ext + '/[name].min.' + ext : ext + '/[name].min.' + ext;
module.exports = {
    mode,
    devtool:      ! isProduction ? 'source-map' : false,
    entry: {
        "app":                     path.resolve( process.cwd(), 'src/js', 'app.js' ),
        "main":          path.resolve( process.cwd(), 'src/sass', 'main.scss' ),
        "sprite-svg": glob.sync( path.resolve( __dirname, 'src/icons/*.svg' ) ),
    },
    output:       {
        filename: filename( 'js' ),
        path:     BUILD_DIR,
        clean:    true
    },
    optimization: {
        minimize:  true,
        minimizer: [
            new CssMinimizerPlugin( {
                minimizerOptions: {
                    preset: [
                        "default",
                        { "discardComments": { "removeAll": true } }
                    ]
                },
            } ),
            new TerserPlugin( {
                extractComments: false,
            } ),
        ]
    },
    module:       {
        rules: [
            {
                test:    /\.js$/,
                exclude: /node_modules/,
                use:     [
                    require.resolve( 'thread-loader' ),
                    {
                        loader:  require.resolve( 'babel-loader' ),
                        options: {
                            presets: ['@babel/preset-env'],
                            cacheDirectory: process.env.BABEL_CACHE_DIRECTORY || true,
                        },
                    },
                ],
            },
            {
                test:    /\.svg$/,
                include: path.resolve( __dirname, 'src/icons' ),
                use:     [
                    {
                        loader:  'svg-sprite-loader',
                        options: {
                            symbolId:       filePath => {
                                return 'icon-' + path
                                    .basename( filePath )
                                    .replace( ".svg", "" )
                                    .toLowerCase();
                            },
                            extract:        true,
                            spriteFilename: 'images/sprites/sprite.svg',
                            // publicPath: 'images'
                        }
                    },
                    'svgo-loader'
                ]
            },
            {
                test: /\.css$/i,
                use:  [ "style-loader", "css-loader" ],
            },
            {
                test:    /\.s[ac]ss$/i,
                exclude: /node_modules/,
                use:     [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../assets/',
                        },
                    },
                    {
                        loader:  'css-loader',
                        options: {
                            esModule: false,
                            sourceMap: ! isProduction,
                            url: false,
                        },
                    },
                    {
                        loader:  'postcss-loader',
                        options: {
                            sourceMap: ! isProduction,
                        },
                    },
                    {
                        loader:  'sass-loader',
                        options: {
                            sourceMap: ! isProduction,
                        },
                    },
                ],
            },
            {
                test:      /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
                include:   path.resolve( __dirname, 'src/images' ),
                exclude:   path.resolve( __dirname, 'src/icons' ),
                type:      'asset/resource',
                generator: {
                    filename: "images/[name][ext]",
                },
            },
            {
                test:      /\.(woff|woff2|eot|ttf|otf|svg)$/i,
                include:   path.resolve( __dirname, 'src/fonts' ),
                type:      'asset/resource',
                generator: {
                    filename: "fonts/[name][ext]",
                },
            },
        ],
    },
    plugins:      [
        new RemoveEmptyScriptsPlugin(),
            // new FixStyleOnlyEntriesPlugin({
            //     // extensions:['less', 'scss', 'css', 'style','sass'],
            //     ignore:'css.js'
            // }),
        new MiniCssExtractPlugin( {
            filename: filename( 'css' ),
        } ),
        new SpriteLoaderPlugin( {
            plainSprite: true,
        } ),
        new UnminifiedWebpackPlugin({
            exclude: /\/sprite-svg.js/
        }),
        new CopyWebpackPlugin({
            patterns: [
                {from:'src/fonts',to:'fonts'},
                {from:'src/images',to:'images'},
                {from:'src/js/swiper.min.js',to:'js/swiper.min.js'}
            ],
        }),
    ],
    // externals: {
    //     jquery: 'jQuery'
    // }
}