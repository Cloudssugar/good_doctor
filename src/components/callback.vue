<template>
  <div>
    <div class="top">
      <van-icon @click="toregister" name="arrow-left" />
      <span></span>
    </div>

    <!-- 手机绑定 -->
    <div class="login">
      <p>手机绑定</p>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <!-- 手机号 -->
          <van-field v-model="mobile" name="请输入手机号码" placeholder="请输入手机号码" :rules="[{ required: true, message: '请输入手机号码' }]" />
          <!-- 验证码 -->
          <van-field v-model="code" center clearable placeholder="请输入短信验证码">
            <template #button>
              <van-button @click="getcode" size="small" type="default">获取验证码</van-button>
            </template>
          </van-field>
        </van-cell-group>

        <div style="margin: 20px">
          <van-button @click="getbanding" round block color="#16c2a3" native-type="submit">立即绑定</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
// 引入消息 文件
import MessageMainVue from '../components/ts/message.ts'
import { getcodeAPI, postbindingAPI } from '../api/callback.ts'
import { onMounted, ref } from 'vue'
import router from '../router'

// qq 唯一标识
const openId = ref('')
if (QC.Login.check()) {
  QC.Login.getMe((id) => {
    // 把从qq拿到的openid赋值给定义的变量
    openId.value = id
    axios
      .post('https://youyi-api.itheima.net/login/thirdparty', {
        openId: openId.value,
        source: 'qq'
      })
      .then((res) => {
        console.log(res)
      })
  })
}

const mobile = ref('')
const code = ref('')

const getcode = async () => {
  let res = await getcodeAPI({
    mobile: mobile.value,
    type: 'bindMobile'
  })
  console.log(res)
}

const getbanding = async () => {
  const token = localStorage.getItem('token')
  console.log(token)
  let res = await postbindingAPI({
    mobile: mobile.value,
    code: code.value,
    openId: openId.value
  })
  console.log(res)
  if (res.data.code !== 10000) {
    MessageMainVue({ type: 'success', text: res.data.message })
  } else {
    MessageMainVue({ type: 'success', text: '登录成功' })
    localStorage.setItem('token', res.data.data.token)
    router.push('/home')
  }
}
</script>

<style lang="scss" scoped></style>
