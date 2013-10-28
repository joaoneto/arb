module.exports = function (config) {
  config.set({
    files: [
      { pattern: 'src/components/**/*.js', included: false },
      { pattern: 'src/scripts/**/*.js', included: false },
      { pattern: 'test/**/*.spec.js', included: false },
      // { pattern: 'src/main.js', included: false },
      'test/test-main.js'
    ],
    exclude: [
      'src/scripts/main.js'
    ],
    frameworks: ['jasmine', 'requirejs'],
    browsers: ['PhantomJS'],
    reporters: ['progress'],
    captureTimeout: 60000,
    autoWatch: true,
    singleRun: false,
    colors: true
  });
};
