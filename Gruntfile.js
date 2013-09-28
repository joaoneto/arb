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

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      livereload: {
        files: ['public/**/*'],
        options: { livereload: true }
      },
    },

    connect: {
      livereload: {
        options: {
          port: 9000,
          hostname: '0.0.0.0',
          middleware: function (connect) {
            return [lrSnippet, mountFolder(connect, 'public')];
          }
        }
      },
    },

    clean: { install: { src: ['public/assets'] } },

    copy: {
      install: {
        files: [
          { expand: true,
            cwd: 'bower_components',
            src: [
              'jquery/jquery*.{js,map}',
              'angular/*.js',
              'requirejs/require.js',
              'respond/*.js',
            ],
            dest: 'public/assets' },
          { expand: true, cwd: 'bower_components/html5shiv/dist', src: ['**'], dest: 'public/assets/html5shiv' },
          { expand: true, cwd: 'bower_components/bootstrap/dist', src: ['**'], dest: 'public/assets/bootstrap' },
        ]
      }
    },
  });

  grunt.registerTask('bower_install', 'install bower components', bowerInstall);
  grunt.registerTask('install', 'make install', ['bower_install', 'clean:install', 'copy:install']);
  grunt.registerTask('start', 'start server', ['install', 'connect', 'watch']);
  grunt.registerTask('default', ['test']);
};
