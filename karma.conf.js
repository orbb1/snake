const webpackCfg = require('./webpack.config');

function conifigFunc(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'test/**/*.test.js',
    ],
    exclude: [
    ],
    preprocessors: {
      'test/**/*.test.js': ['webpack', 'sourcemap'],
    },
    plugins: [
      'karma-webpack',
      'karma-jasmine-html-reporter',
      'karma-jasmine',
      'karma-firefox-launcher',
      'karma-chrome-launcher',
      'karma-spec-reporter',
      'karma-sourcemap-loader',
    ],
    reporters: ['kjhtml', 'spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Firefox'],
    singleRun: false,
    concurrency: Infinity,
    webpack: webpackCfg,
    client: {
      clearContext: false,
    },
  });
}

module.exports = conifigFunc;
