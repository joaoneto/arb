var env = process.env.CI ? 'continuous' : 'unit';

var config = {
  src_path: 'src',
  components_path: '<%= config.src_path %>/components'
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
      }
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
    },

    clean: { install: { src: ['<%= config.components_path %>'] } },

    copy: {
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

  grunt.registerTask('test', 'run tests', ['bower_install', 'karma:' + env]);
  grunt.registerTask('bower_install', 'install bower components', bowerInstall);
  grunt.registerTask('install', 'make install', ['bower_install', 'clean:install', 'copy:install']);
  grunt.registerTask('start', 'start server', ['install', 'connect', 'watch']);
  grunt.registerTask('default', ['test']);
};
