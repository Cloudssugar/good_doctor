import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    host:true,
    port:80
  },
 
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: '@import "./src/assets/style/main.scss";'
  //     }
  //   }
  // }
})
// chainWebpack=>{
//   config.decServer.disableHostCheck(true)
// }
