module.exports = function (config) {
  config.set({
    basePath: '../',
    files: [
      'build/components/angular/*.js',
      'build/components/angular-mocks/*.js',
      'build/components/angular-resource/*.js',
      'build/components/angular-bootstrap/*-tpls.js',
      'build/components/angular-ui-router/release/*-router.js',
      'src/scripts/**/*.js',
    ],
    // exclude: [
    //   'src/main.js',
    // ],
    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],
    reporters: ['progress'],
    captureTimeout: 60000,
    autoWatch: true,
    singleRun: false,
    colors: true
  });
};
