module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: [
      'jasmine',
      'requirejs',
      'chai',
      'chai-as-promised',
      'sinon-chai',
    ],

    files: [
      {pattern: 'bower_components/**/*.js',                    included: false},
      {pattern: 'src/**/*.js',                  watched: true, included: false},
      {pattern: 'test/**/*.spec.js',            watched: true, included: false},
      'bower_components/requirejs/require.js',
      'test/test-main.js'
    ],

    // list of files to exclude
    exclude: [
      'src/main.js'
    ],

    reporters: ['spec'],

    // web server port
    port: 8089,

    // cli runner port
    runnerPort: 9109,

//    urlRoot: '/__test/',

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    //logLevel: config.LOG_DEBUG,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // polling interval in ms (ignored on OS that support inotify)
    autoWatchInterval: 0,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari
    // - PhantomJS
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true

  });
};
