var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

var bowerInstall = function () {
  var exec = require('child_process').exec,
      cb = this.async();
  console.log('Install bower components');
  exec('node_modules/.bin/bower install', { cwd: './' }, function (err, stdout, stderr) {
    console.log('Done.');
    cb();
  });
};

module.exports = function (grunt) {
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
            src: ['jquery/jquery*.{js,map}', 'angular/*.js', 'requirejs/require.js'],
            dest: 'public/assets' },
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