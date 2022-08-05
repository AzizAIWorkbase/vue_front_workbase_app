const { defineConfig } = require('@vue/cli-service')

process.env.VUE_APP_VERSION = require('./package.json').version
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/vue_front_workbase_app',
  pwa: {
    name: 'WorkBase',
    themeColor: '#1e40af',
  },
});

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/vue_front_workbase_app'
  : '/'
}