var env = process.env.CI ? 'continuous' : 'unit';
var path = require('path');
var config = {
  src_path: 'src',
  build_path: 'build/app',
  components_path: 'build/components',
  coverage_path:  'coverage',
  require: 'config/require.js',
};


module.exports = function (grunt) {
  // grunt plugins
  var mountFolder = function (connect, dir) {
    return connect.static(path.resolve(dir));
  };

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.loadTasks('lib/tasks');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    config: config,

    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      unit: {
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
            return [mountFolder(connect, config.build_path)];
          }
        }
      },
      source: {
        options: {
          port: 9000,
          hostname: '0.0.0.0',
          livereload: true,
          middleware: function (connect) {
            return [mountFolder(connect, config.build_path), mountFolder(connect, config.src_path)];
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
      build: ['<%= config.build_path %>'],
      deps: ['<%= config.components_path %>'],
      coverage: ['<%= config.coverage_path %>'],
      require: ['<%= config.require %>']
    },

    copy: {
      build: {
        files: [{ src: ['**', '!<%= config.require %>'], dest: '<%= config.build_path %>', cwd: '<%= config.src_path %>', expand: true }]
      },
      require: {
        files: [{ src: '<%= config.require %>', dest: '<%= config.src_path %>/<%= config.build_path %>', cwd: '.', expand: true }]
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
      source: {        
        rjsConfig: '<%= config.src_path %>/<%= config.require %>'
      }
    },

    require_map: {
      options: {
        fileName: '<%= config.src_path %>/scripts/src.map.js'
      },
      files: {
        src: ['scripts/**/*.js', '!scripts/app.js'],
        cwd: '<%= config.src_path %>'
      }
    }
  });

  grunt.registerTask('deps',           'install bower components and copy to build',            ['bower_install', 'clean:deps', 'copy:deps']);
  grunt.registerTask('source',         'copy source to build',                                  ['clean:build', 'copy:build']);
  grunt.registerTask('require',        'copy require to build and resolve deps',                ['clean:require', 'copy:require', 'bower', 'require_map']);

  grunt.registerTask('build',          'make build using: [deps|source|require]',               ['source', 'deps', 'require']);
  grunt.registerTask('server_build',   'start server on build',                                 ['build', 'connect:build', 'watch:build']);

  grunt.registerTask('server',         'start server',                                          ['deps', 'require', 'connect:source', 'watch:source']);

  grunt.registerTask('release',        '',                                                      []);
  grunt.registerTask('server_release', '',                                                      []);

  grunt.registerTask('require_test',   'copy require to build and resolve deps on test',        ['clean:require', 'copy:require', 'bower:test', 'require_map']);
  grunt.registerTask('build_test',     'make build using for test: [deps|source|require_test]', ['deps', 'source', 'require_test']);
  grunt.registerTask('test',           'make test',                                             ['build_test', 'karma:' + env]);

  grunt.registerTask('test_build',     'not implemented',                                       []);
  grunt.registerTask('test_release',   'not implemented',                                       []);

  grunt.registerTask('coverage',       'make coverage',                                         ['install', 'karma:coverage', 'connect:coverage']);
  grunt.registerTask('default',        '',                                                      ['test']);
};
