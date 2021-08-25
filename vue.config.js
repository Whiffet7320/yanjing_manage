module.exports = {
  // devServer: {
  //   proxy: {
  //     "/admin": {
  //       target: "http://water.5laoye.com/admin",
  //       secure: false,
  //       changeOrigin: true,
  //       pathRewrite: {
  //         "^/admin": ""
  //       }
  //     }
  //   },
  // }

  // devServer: {
  //   // proxy: {
  //   //   '/api': { // 访问路径，可以自己设置，
  //   //     // target: 'http://192.168.1.5/shop/admin', // 代理接口，即后端运行所在的端口
  //   //     target:'https://shoptest.5laoye.com/admin',
  //   //     changeOrigin: true, // 设置是否跨域
  //   //     ws: true,
  //   //     pathRewrite: { // 访问路径重写
  //   //       '^/api': ''
  //   //     }
  //   //   }
  //   // }
  //   proxy: {
  //       '/admin': {//这是标识!!!!!!!
  //         target: 'http://water.5laoye.com/admin',//三方接口地址域名
  //         changeOrigin: true,//是否允许跨域
  //       }
  //     },
  // }
}