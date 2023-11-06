<template>
  <div>
    <van-button size="small" v-model="code" v-if="!sendMsgDisabled" @click="getcode">获取验证码</van-button>
    <van-button size="small" v-if="sendMsgDisabled">{{ time + '秒后获取' }}</van-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getcodeAPI } from '../../api/login.ts'
// 引入消息 文件
import MessageMainVue from '../ts/message.ts'
//接收父组件传来的属性值
const props = defineProps({
  mobile: Number
})

const sendMsgDisabled = ref(false)
const time = ref(60)

// 定义要发送的emit事件
const emit = defineEmits(['getcode'])
let getcodes = () => {
  emit('getcode')
}

//获取验证码
const getcode = async () => {
  let res = await getcodeAPI({
    mobile: props.mobile,
    type: 'register'
  })
  console.log(res)
  MessageMainVue({ type: 'success', text: res.data.message })
  
  sendMsgDisabled.value = true
  const interVal = window.setInterval(() => {
    if (time.value-- <= 0) {
      time.value = 60
      sendMsgDisabled.value = false
      window.clearInterval(interVal)
    }
  }, 1000)
}
</script>

<style lang="scss" scoped></style>
