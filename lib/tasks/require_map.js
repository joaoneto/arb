module.exports = function (grunt) {
  grunt.registerMultiTask('require_map', 'Generate require map of src', function() {
    var head = '/* Automatic generetad by require_map */'
    var files = '  "' + this.filesSrc.join('",\n  "') + '"';
    var template = '<%= head %>\ndefine([\n<%= files %>\n])';
    var data = {
      files: files,
      head: head
    };
    var contents = grunt.template.process(template, { data: data });

    grunt.file.write(this.options().fileName, contents);
    grunt.log.ok('Success generate file:' + this.options().fileName);
  });
};
