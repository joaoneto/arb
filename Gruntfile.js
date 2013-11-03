var env = process.env.CI ? 'continuous' : 'unit';
var utils = require('./lib/utils');
var config = {
  src_path: 'src',
  build_path: 'build',
  components_path: '<%= config.build_path %>/components',
  coverage_path:  'coverage',
  require: 'config/require.js'
};

module.exports = function (grunt) {
  // grunt plugins
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.loadTasks('lib/tasks');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    config: config,

    karma: {
      // options: {
      //   configFile: 'karma.conf.js'
      // },
      unit: {
        configFile: 'lib/karma.source.conf.js',
        browsers: ['Chrome']
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
      build: {
        options: { livereload: true },
        files: ['<%= config.src_path %>/**/*'],
        tasks: ['build']
      },
      source: {
        options: { livereload: true },
        files: ['<%= config.src_path %>/**/*'],
        tasks: ['env-src']
      },
    },

    connect: {
      build: {
        options: {
          port: 9000,
          hostname: '0.0.0.0',
          livereload: true,
          middleware: function (connect) {
            return [utils.mountFolder(connect, config.build_path)];
          }
        }
      },
      source: {
        options: {
          port: 9000,
          hostname: '0.0.0.0',
          livereload: true,
          middleware: function (connect) {
            return [utils.mountFolder(connect, config.build_path), utils.mountFolder(connect, config.src_path)];
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
            return [utils.mountFolder(connect, dir)];
          }
        }
      },
    },

    clean: {
      source: [
        '<%= config.build_path %>/**/*',
        '!<%= config.components_path %>/**',
        '!<%= config.build_path %>/<%= config.require %>'
      ],
      deps: ['<%= config.components_path %>'],
      coverage: ['<%= config.coverage_path %>'],
      require: ['<%= config.require %>']
    },

    copy: {
      source: {
        files: [{ src: ['**', '!<%= config.require %>'], dest: '<%= config.build_path %>', cwd: '<%= config.src_path %>', expand: true }]
      },
      require: {
        files: [{ src: '<%= config.require %>', dest: '<%= config.build_path %>', cwd: '<%= config.src_path %>', expand: true }]
      },
      test: {},
      release: {},
      cov: {},
      deps: {
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
          { expand: true, cwd: 'bower_components/angular-ui-router', src: ['release/*.js'], dest: '<%= config.components_path %>/angular-ui-router' },
          { expand: true, cwd: 'bower_components/html5shiv', src: ['dist/**'], dest: '<%= config.components_path %>/html5shiv' },
          { expand: true, cwd: 'bower_components/bootstrap', src: ['dist/**'], dest: '<%= config.components_path %>/bootstrap' },
        ]
      }
    },

    bower: {
      options: {
        pathFromTo: { from: '../bower_components', to: '../components' }
      },
      source: {
        rjsConfig: '<%= config.build_path %>/<%= config.require %>'
      },
    },

    require_map: {
      options: {
        fileName: '<%= config.build_path %>/scripts/src.map.js'
      },
      files: {
        src: ['scripts/**/*.js', '!scripts/app.js'],
        cwd: '<%= config.src_path %>'
      }
    }
  });

  grunt.registerTask('deps',           'install bower components and copy to build',       ['bower_install', 'clean:deps', 'copy:deps']);
  grunt.registerTask('source',         'copy source to build',                             ['clean:source', 'copy:source']);
  grunt.registerTask('require',        'copy require to build and resolve deps',           ['clean:require', 'copy:require', 'bower:source', 'require_map']);

  grunt.registerTask('build',          'make build using: [deps|source|require]',   ['deps', 'source', 'require']);
  grunt.registerTask('server_build',   'start server on build',                     ['build', 'connect:build', 'watch:build']);

  grunt.registerTask('env_source',     'create env for source: [deps|require]',     ['deps', 'require']);
  grunt.registerTask('server',         'start server',                              ['env_source', 'connect:source', 'watch:source']);

  grunt.registerTask('release',        '',                                          []);
  grunt.registerTask('server_release', '',                                          []);

  grunt.registerTask('test',           'make test',                                 ['env_source', 'karma:' + env]);

  grunt.registerTask('test_build',     'not implemented',                           []);
  grunt.registerTask('test_release',   'not implemented',                           []);

  grunt.registerTask('coverage',       'make coverage',                             ['install', 'karma:coverage', 'connect:coverage']);
  grunt.registerTask('default',        '',                                          ['test']);
};
