<template>
  <div>
    <div class="top">
      <van-icon name="arrow-left" />
      <span @click="tologin">登录</span>
    </div>
    <div class="login">
      <p>注册</p>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <!-- 手机号 -->
          <van-field v-model="mobile" name="请输入手机号码" placeholder="请输入手机号码" :rules="[{ required: true, message: '请输入手机号码' }]" />
          <!-- 验证码 -->
          <van-field v-model="code" center clearable placeholder="请输入短信验证码">
            <template #button>
              <van-button @click="getcode" v-model="code" size="small" type="default">获取验证码</van-button>
            </template>
          </van-field>
          <!-- 密码 -->
          <van-field v-model="password" type="password" name="请填写密码" placeholder="请填写密码" :rules="[{ required: true, message: '请填写密码' }]" />
        </van-cell-group>
        <div class="agreement">
          <input @change="toselect" type="radio" name="" id="" />
          我已同意 <a href="#">优医协议</a>
        </div>
        <div style="margin: 20px">
          <van-button @click="getregister" round block color="#16c2a3" native-type="submit">确定</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup>
// 引入消息 文件
import MessageMainVue from '../components/ts/message.ts'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getcodeAPI, postregisterAPI } from '../api/login.ts'
const router = useRouter()

// 手机号
const mobile = ref('')
// 验证码
const code = ref('')
// 密码
const password = ref('')
const onSubmit = (values) => {
  console.log('submit', values)
}

//获取验证码
const getcode = async () => {
  let res = await getcodeAPI({
    mobile: mobile.value,
    type: 'register'
  })
  console.log(res)
  MessageMainVue({ type: 'success', text: res.data.message })
}
const checkedval = ref(false)
const toselect = (e) => {
  console.log(e.target.checked)
  checkedval.value = e.target.checked
}

// 注册
const getregister = async () => {
  if (checkedval.value !== true) {
    MessageMainVue({ type: 'success', text: '请勾选用户协议' })
  } else {
    let res = await postregisterAPI({
      code: code.value,
      mobile: mobile.value,
      password: password.value
    })
    console.log(res)
    if (res.data.message === '请求成功') {
      router.push('/login')
      MessageMainVue({ type: 'success', text: '登录成功~' })
    } else {
      MessageMainVue({ type: 'success', text: res.data.message })
    }
  }
}
// 去登录
const tologin = () => {
  router.push('/login')
}
</script>

<style scoped lang="scss">
$themecolor: #16c2a3;
.top {
  width: 90%;
  height: 0.8rem;
  margin-left: 0.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    color: $themecolor;
  }
}
.login {
  p {
    font-size: 0.5rem;
    padding-left: 5%;
  }
  .van-form {
    margin-top: 1rem;
  }
  .agreement {
    margin-top: 0.2rem;
    font-size: 0.26rem;
    margin-left: 5%;
    a {
      color: $themecolor;
    }
    span {
      float: right;
    }
  }
  .cipher-login {
    text-align: center;
    color: $themecolor;
  }
}
.qq {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  font-size: 0.23rem;
  color: rgb(135, 135, 135);
}
</style>
