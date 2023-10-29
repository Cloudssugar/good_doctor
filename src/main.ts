import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// rem
import './rem.ts'

// 引入路由
import router from './router/index'
// 使用路由
// const app = createApp(App)

// main.js 引入样式   使用一个引入一个
import 'vant/lib/index.css'
import { Button } from 'vant';
import { Icon } from 'vant';
import { Form, Field, CellGroup } from 'vant';

createApp(App).use(router).use(Button).use(Icon).use(Form).use(Field).use(CellGroup).mount('#app')
