const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    port: 8090, // 端口号
    host: 'localhost',
    https: true, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    proxy: {
      '/api/v1': {
        target: 'http://localhost:7001',
        secure: false,
        changeOrigin: false, //true/false, Default: false - changes the origin of the host header to the target URL,影响请求头
        ws: false,
        pathRewrite: {
          // 路径重写
          '/api/v1': '' // 这个意思就是以api开头的，定向到哪里, 如果你的后边还有路径的话， 会自动拼接上
        }
      }
    }
  },
})
