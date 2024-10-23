const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),  // @ 指向 src 文件夹
    },
  },
};