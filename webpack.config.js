const path = require('path');

module.exports = {
  // 기타 설정
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
};
