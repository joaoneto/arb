var env = process.env.CI ? 'continuous' : 'unit';

var config = {
  src_path: './src',
  build_path: './build',
  components_path: '<%= config.build_path %>/components',
  coverage_path:  './coverage',
  src_require: '<%= config.src_path %>/config/require.js',
  build_require: '<%= config.build_path %>/config/require.js'
};

var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  var bowerInstall = function () {
    var exec = require('child_process').exec,
        cb = this.async();
    grunt.log.writeln('Install bower components');
    exec('node_modules/.bin/bower install', { cwd: './' }, function (err, stdout, stderr) {
      grunt.log.writeln('Done.');
      cb();
    });
  };

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    config: config,

    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      unit: {
        browsers: ['ChromeCanary']
      },
      continuous: {
        autoWatch: false,
        singleRun: true
      },
      coverage: {
        autoWatch: false,
        singleRun: true,
        reporters: ['progress', 'coverage'],
        preprocessors: {
          'src/scripts/**/*.js': ['coverage']
        },
        coverageReporter: {
          type: 'html',
          dir: 'coverage/'
        }
      },
    },

    watch: {
      server: {
        options: { livereload: true },
        files: ['<%= config.src_path %>/**/*']
      },
    },

    connect: {
      build: {
        options: {
          port: 9000,
          hostname: '0.0.0.0',
          livereload: true,
          middleware: function (connect) {
            return [mountFolder(connect, config.build_path)];
          }
        }
      },
      server: {
        options: {
          port: 9000,
          hostname: '0.0.0.0',
          livereload: true,
          middleware: function (connect) {
            return [mountFolder(connect, config.src_path)];
          }
        }
      },
      coverage: {
        options: {
          port: 5555,
          // hostname: '0.0.0.0',
          keepalive: true,
          open: true,
          middleware: function (connect) {
            var dir = grunt.file.glob.sync(require('path').resolve(config.coverage_path + '/PhantomJS*'))[0];
            return [mountFolder(connect, dir)];
          }
        }
      },
    },

    clean: {
      build: { src: ['<%= config.build_path %>'] },
      install: { src: ['<%= config.components_path %>'] },
      coverage: { src: ['<%= config.coverage_path %>'] },
    },

    copy: {
      build: {
        files: [{ src: '**', dest: '<%= config.build_path %>' ,cwd: '<%= config.src_path %>', expand: true }]
      },
      test: {},
      release: {},
      cov: {},
      install: {
        files: [
          { expand: true,
            cwd: 'bower_components',
            src: [
              'jquery/jquery*.{js,map}',
              'angular*/*.js',
              '!angular-ui-router/**',
              'requirejs/require.js',
              'respond/*.js',
            ],
            dest: '<%= config.components_path %>' },
          { expand: true, cwd: 'bower_components/angular-ui-router/release', src: ['*.js'], dest: '<%= config.components_path %>/angular-ui-router' },
          { expand: true, cwd: 'bower_components/html5shiv/dist', src: ['**'], dest: '<%= config.components_path %>/html5shiv' },
          { expand: true, cwd: 'bower_components/bootstrap/dist', src: ['**'], dest: '<%= config.components_path %>/bootstrap' },
        ]
      }
    },

    bower: {
        options: {
            pathFromTo: { from: '../bower_components', to: 'components' }
        },
        target: {
            rjsConfig: '<%= config.build_require %>',
        }
    },
  });


  grunt.registerTask('bower_install', 'install bower components', bowerInstall);
  grunt.registerTask('install',       'make install',  ['bower_install', 'clean:install', 'copy:install']);

  grunt.registerTask('test',          'make test',     ['install', 'karma:' + env]);
  grunt.registerTask('coverage',      'make coverage', ['install', 'karma:coverage', 'connect:coverage']);

  grunt.registerTask('build',         'make build',    ['clean:build', 'copy:build', 'bower', 'connect:build']);
  grunt.registerTask('start',         'start server',  ['install', 'bower', 'connect:server', 'watch:server']);

  grunt.registerTask('default',       '',              ['test']);
};
