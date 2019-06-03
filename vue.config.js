const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, './build'),
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
    },
    about: {
      entry: 'src/landing.js',
      template: 'public/landing.html',
      filename: 'landing.html',
    },
  },
};
