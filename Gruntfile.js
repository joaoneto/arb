var env = process.env.CI ? 'continuous' : 'unit';

var config = {
  src_path: './src',
  components_path: '<%= config.src_path %>/components',
  coverage_path:  './coverage',
  test_path:  './test',
  packages: [
    { name: 'controllers' },
    { name: 'directives' },
    { name: 'services' }
  ],
  deps: {
    jquery: '../components/jquery/jquery',
    angular: '../components/angular/angular',
    ngMockE2E: '../components/angular-mocks/angular-mocks',
    ngResource: '../components/angular-resource/angular-resource.min',
    ngBootstrap: '../components/angular-bootstrap/ui-bootstrap-tpls.min',
    ngUiRouter: '../components/angular-ui-router/angular-ui-router.min',
  }
};

var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

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

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    config: config,

    // requirejs: {
    //   compile_test: {
    //     options: {
    //       baseUrl: 'path/to/base',
    //       mainConfigFile: '<%= config.test_path %>/main.js',
    //       out: '<%= config.test_path %>/main.js'
    //     }
    //   }
    // },

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
      livereload: {
        files: ['<%= config.src_path %>/**/*'],
        options: { livereload: true }
      },
    },

    connect: {
      livereload: {
        options: {
          port: 9000,
          hostname: '0.0.0.0',
          middleware: function (connect) {
            return [lrSnippet, mountFolder(connect, config.src_path)];
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
      install: { src: ['<%= config.components_path %>'] },
      coverage: { src: ['<%= config.coverage_path %>'] },
    },

    copy: {
      main: {
        options: {
          processContent: (function (content) {
            return grunt.template.process(content, { data: { type: 'main' } });
          })
        },
        files: [{ src: ['<%= config.src_path %>/main.js.tmpl'], dest: '<%= config.src_path %>/main.js' }],
      },
      test_main: {
        options: {
          processContent: (function (content) {
            return grunt.template.process(content, { data: { type: 'test' } });
          })
        },
        files: [{ src: ['<%= config.src_path %>/main.js.tmpl'], dest: '<%= config.src_path %>/main.js' }],
      },
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
  });


  grunt.registerTask('bower_install', 'install bower components', bowerInstall);
  grunt.registerTask('install',       'make install',  ['bower_install', 'clean:install', 'copy:install']);

  grunt.registerTask('test',          'make test',     ['install', 'copy:test_main', 'karma:' + env]);
  grunt.registerTask('coverage',      'make coverage', ['install', 'karma:coverage', 'connect:coverage']);

  grunt.registerTask('start',         'start server',  ['install', 'connect:livereload', 'watch']);

  grunt.registerTask('default',       '',              ['test']);
};
