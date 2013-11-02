var spawn = require('child_process').spawn;

module.exports = function (grunt) {
  grunt.registerTask('bower_install', 'Install bower components', function () {
    var done = this.async();
    var ls = spawn('bower', ['install']);

    ls.stdout.on('data', function (data) {
      grunt.log.write(data);
    });

    ls.stderr.on('data', function (data) {
      grunt.log.write(data);
    });

    ls.on('close', function (code) {
      grunt.log.writeln('child process exited with code ' + code);
      done();
    });
  });
};
