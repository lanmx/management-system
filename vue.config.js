/*
 * @Author: your name
 * @Date: 2021-11-09 23:38:40
 * @LastEditTime: 2021-11-18 07:26:04
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \lanmxvuets\vue.config.js
 */
module.exports = {
  devServer: {
    open:true
  },
  // resolve: {
	// 	alias: {
	// 		"@": joinPath("./src"), // 配置别名
	// 	},
	// },
}

// // 配置跨域
// module.exports = {
//   devServer: {  
//     open: true,
//     host: 'localhost',
//     port: 8080,
//     https: false,
//     hotOnly: false,
//     proxy: {
//       '/api':{  //代码加载的时候 用 /api 替换 target的地址    
//         target:'http://222.6.10.14:70',  //API服务器的地址 报跨域的地址(外源的地址)
//         ws:true,
//         changeOrigin: true,  //是否跨域
//         pathRewrite: {
//           '^/api': ''   //需要rewrite的 把请求接口中多余的/api替换掉,
//         }
//       }
//     }
//   }
// }