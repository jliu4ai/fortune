module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/fortune/'
    : '/',
  transpileDependencies: ['@dcloudio/uni-ui']
} 