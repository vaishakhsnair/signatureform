const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://pastebin.com/api',
      changeOrigin: true,
    }),
  )
}
