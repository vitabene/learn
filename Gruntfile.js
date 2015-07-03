module.exports = function(grunt) {

	grunt.initConfig({
		uglify: {
			options: {
				mangle: true,
				compress: true,
				sourceMap: 'application.map',
				banner: '/* Vitezslav Benes 2015*/\n'
			},
			target: {
				files: {
					'js/build/connect.js': 'js/build/application.js',
					'js/build/outline.js': 'js/build/order.js'
				}
			}
		},
		// jshint: {
		// 	options: {
		// 		jshintrc: '.jshintrc'
		// 	},
		// 	target: {
		// 		src: 'js/application.js'
		// 	}
		// },
		concat: {
			options: {
				separator: ''
			},
			target: {
				src: ['js/helpers.js', 'js/Pair.js', 'js/App.js'],
				dest: 'js/build/application.js'
			}
		},
		copy: {
			main: {
				src: 'js/order.js',
				dest: 'js/build/order.js',
			}
		},
		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'assets/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'assets/build/'
				}]
			}
		},
		watch: {
			options: {
				livereload: true,
			},
			all: {
				files: ['js/*.js', '*.php', 'css/*.scss'],
				tasks: ['default'],
				options: {
					spawn: false,
				}
			}
		},
		clean: ['assets/build/', 'js/build/', 'css/style.css'],
		autoprefixer: {
			options: {
				browsers: ['last 2 versions', 'ie 7', 'ie 8', 'ie 9']
			},
			css: {
				src: 'css/style.css'
			}
		},
		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'css/style.css': 'css/style.scss'
				}
			}
		},

	});

require('load-grunt-tasks')(grunt);

grunt.registerTask('default', ['clean', 'sass', 'concat', 'copy', 'uglify']);
}