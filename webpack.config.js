const path = require( 'path' );

const VueLoader = require('vue-loader/lib/plugin');
//const WorkboxPlugin = require( 'workbox-webpack-plugin');
const CopyPlugin = require( 'copy-webpack-plugin');
const HtmlWebpackPlugin = require( 'html-webpack-plugin');

const webpack = require('webpack');

module.exports = (env, argv)=> {

	// intended buildpath from script.
	const outDir = argv['buildpath'] || 'dev';
	// absolute buildpath in system.
	const outPath = path.resolve( __dirname, outDir );

	const __DIST = env.production ? true : false;
	const __MODE = __DIST ? 'production': 'development';

	return {

	mode: __MODE,
	entry:{
		name:"./src/index.js"
	},
	module: {

		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader']
			}
		],
	},
	plugins: [
		new VueLoader({
			compilerOptions:{
				whitespace:'condense'
			}
		}),
		new webpack.DefinePlugin({
		__DEBUG:true,
		__DIST:__DIST
	}),
	new HtmlWebpackPlugin({

		template:'index.ejs',
		title:"Vue-template",
		filename:path.resolve( outDir, 'index.html'),
		__DIST:__DIST

	}),
	new CopyPlugin(
		{pattern:[

		{
			from:'data',
			noErrorOnMissing:true,
			to:path.resolve( outPath, 'data')
		},
		{
			from:'css',
			noErrorOnMissing:true,
			to:path.resolve( outPath, 'css' )
		},
		{
			from:'assets',
			noErrorOnMissing:true,
			to:outPath
		}
	]})
	],
	output:{

		filename: "[name].js",
		chunkFilename: "[name].bundle.js",
		path:path.resolve( outPath, 'js/' ),
		publicPath:'js/',
		library: "[name]"
	},
	resolve:{
		modules:[
			path.resolve( __dirname, "src"),
			"node_modules"
		],

		alias:{
			'config':'config',
			"data":"../data",
			'ui': 'ui'
		}
	}
};

};