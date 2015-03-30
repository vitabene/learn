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
				src: 'js/build/application.js',
				dest: 'js/build/application.min.js'
			}
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			target: {
				src: 'js/application.js'
			}
		},
		concat: {
			options: {
				separator: ''
			},
			target: {
				src: ['js/helpers.js', 'js/Line.js', 'js/Pair.js', 'js/App.js'],
				dest: 'js/build/application.js'
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

	grunt.registerTask('default', ['clean', 'sass', 'concat', 'uglify']);
}