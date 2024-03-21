const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://9e38-2403-3800-1206-c8c8-b17e-b3da-6a52-a643.ngrok-free.app',
      changeOrigin: true,
    })
  );
};
