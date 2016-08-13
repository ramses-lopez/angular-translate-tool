var gulp = require('gulp');
// var server = require( 'gulp-develop-server' );
// var livereload = require( 'gulp-livereload' );
// var jshint = require('gulp-jshint');
var nodemon = require('nodemon');
// var nodeInspector = require('gulp-node-inspector');

gulp.task('debug', () => {
	gulp.src([])
	.pipe(nodeInspector({
		webHost: 'localhost',
		webPort: 3003,
		saveLiveEdit: false
	}))
})

// var serverFiles = [
// 	'./app.js',
// 	'./gulpfile.js',
// 	'./route/*.js',
// 	'./model/*.js',
// 	'./config/*.js'
// ];

// gulp.task('jshint', function () {
// 	gulp.src(serverFiles)
// 	.pipe(jshint())
// 	.pipe(jshint.reporter('jshint-stylish'))
// 	.pipe(jshint.reporter('fail'));
// });

gulp.task('nodemon', () => {
	nodemon({
		exec: 'node --debug',
		script: 'app.js',
		ext: 'js csv'
	})
	.on('restart', () => console.info('restarting... ⎈ \n\n\n\n\n'))
	.on('start', () => console.info('Starting...'))
	.on('quit', () => {})
})

gulp.task( 'default', ['nodemon','debug'], () => {})
