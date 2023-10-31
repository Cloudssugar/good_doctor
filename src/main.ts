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
import { NoticeBar } from 'vant';
import { Uploader } from 'vant';
import { RadioGroup, Radio } from 'vant';
import { AddressList } from 'vant'
import { Search } from 'vant';
import { Card } from 'vant';
import { SubmitBar } from 'vant';

createApp(App).use(router).use(Button).use(Icon).use(Form).use(Field).use(CellGroup).use(NoticeBar).use(Uploader).use(Radio).use(RadioGroup).use(AddressList).use(Search).use(Card).use(SubmitBar).mount('#app')
