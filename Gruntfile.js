var env = process.env.CI ? 'continuous' : 'unit';

var config = {
  src_path: 'src',
  build_path: 'build',
  components_path: '<%= config.build_path %>/components',
  coverage_path:  './coverage',
  require: 'config/require.js'
};

var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};
        
module.exports = function (grunt) {

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
      build: {
        options: { livereload: true },
        files: ['<%= config.src_path %>/**/*'],
        tasks: ['build']
      },
      src: {
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
      src: {
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
      source: [
        '<%= config.build_path %>/**/*',
        '!<%= config.components_path %>/**', 
        '!<%= config.build_path %>/<%= config.require %>'
      ],
      deps: ['<%= config.components_path %>'],
      coverage: ['<%= config.coverage_path %>'],
      require: ['<%= config.build_path %>/<%= config.require %>']
    },

    copy: {
      source: {
        files: [{ src: ['**', '!<%= config.require %>'], dest: '<%= config.build_path %>' ,cwd: '<%= config.src_path %>', expand: true }]
      },
      require: {
        files: [{ src: '<%= config.require %>', dest: '<%= config.build_path %>' ,cwd: '<%= config.src_path %>', expand: true }]
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
        target: {
            rjsConfig: '<%= config.build_path %>/<%= config.require %>',
        }
    },

    'require-map': {
      options: {
        fileName: '<%= config.build_path %>/scripts/src.map.js'
      },
      files: { 
        src: ['scripts/**/*.js', '!scripts/app.js'],
        cwd: '<%= config.src_path %>'
      }
    }
  });

  grunt.registerTask('bower_install', function () {
    var done = this.async();
    var spawn = require('child_process').spawn;
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


  grunt.registerMultiTask('require-map', 'Generate require map of src', function() {

    var head = '/* Automatic generetad by require-map */'
    var template = '<%= head %>\n\ndefine([\n<%= files %>\n])';
    var files = '\t"' + this.filesSrc.join('",\n\t"') + '"';
    var data = {
      files: files,
      head: head
    }
    var contents = grunt.template.process(template, { data: data }  );

    grunt.file.write(this.options().fileName, contents);  
    grunt.log.ok('Success generate file:' + this.options().fileName);

  });


  grunt.registerTask('deps',           'install bower and copy to build',           ['bower_install', 'clean:deps', 'copy:deps']);
  grunt.registerTask('source',         'copy source to build',                      ['clean:source', 'copy:source']);
  grunt.registerTask('require',        'copy require to build and resolve deps',    ['clean:require', 'copy:require', 'bower', 'require-map']);

  grunt.registerTask('build',          'make build using: [deps, source, require]', ['deps', 'source', 'require']);
  grunt.registerTask('server-build',   'start server on build',                     ['build', 'connect:build', 'watch:build']);

  grunt.registerTask('env-src',        'create env for src: [deps, require]',       ['deps', 'require']);
  grunt.registerTask('server',         'start server',                              ['env-src', 'connect:src', 'watch:src']);

  grunt.registerTask('release',        '', []);
  grunt.registerTask('server-release', '', []);

  grunt.registerTask('test-build',     '', []);
  grunt.registerTask('test',           'make test',   ['install', 'karma:' + env]);
  grunt.registerTask('test-release',   '', []);

  grunt.registerTask('coverage',       'make coverage', ['install', 'karma:coverage', 'connect:coverage']);
  grunt.registerTask('default',        '',              ['test']);

};
