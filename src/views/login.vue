<template>
  <div>
    <div class="top">
      <van-icon name="arrow-left" />
      <span @click="toregister">注册</span>
    </div>
    <!-- 手机验证码登录 -->
    <div class="login" v-if="islogin">
      <p>手机验证码登录</p>
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
        <div class="agreement">
          <input type="radio" name="" id="" />
          我已同意 <a href="#">用户协议</a>
          <span>忘记密码？</span>
        </div>
        <div style="margin: 20px">
          <van-button @click="getcodelogin" round block color="#16c2a3" native-type="submit">登录</van-button>
        </div>
      </van-form>
      <div class="cipher-login" @click="showlogin">密码登录<van-icon name="arrow" /></div>
    </div>
    <!-- 密码登录 -->
    <div class="login" v-else>
      <p>密码登录</p>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <!-- 手机号 -->
          <van-field v-model="mobiles" name="请输入手机号码" placeholder="请输入手机号码" :rules="[{ required: true, message: '请输入手机号码' }]" />
          <!-- 密码 -->
          <van-field v-model="password" type="password" name="请填写密码" placeholder="请填写验证码" :rules="[{ required: true, message: '请填写密码' }]" />
        </van-cell-group>
        <div class="agreement">
          <input type="radio" name="" id="" />
          我已同意 <a href="#">用户协议</a>
          <span>忘记密码？</span>
        </div>
        <div style="margin: 20px">
          <van-button @click="getpasslogin" round block color="#16c2a3" native-type="submit">登录</van-button>
        </div>
      </van-form>
      <div class="cipher-login" @click="showlogin">手机验证码登录<van-icon name="arrow" /></div>
    </div>
    <!-- 第三方登录 -->
    <div class="qq">
      <p>-- 第三方登录 --</p>
      <img src="/src/assets/QQ.svg" alt="" />
    </div>
  </div>
</template>

<script setup>
import MessageMainVue from '../components/ts/message.ts'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getcodeAPI, postcodeloginAPI, postpasswordrAPI } from '../api/login.ts'
const router = useRouter()

// 手机号
const mobile = ref('')
const mobiles = ref('')
// 验证码
const code = ref('')
// 密码
const password = ref('')
const onSubmit = (values) => {
  console.log('submit', values)
}
//
const islogin = ref(false)
const showlogin = () => {
  islogin.value = !islogin.value
}

//获取验证码
const getcode = async () => {
  let res = await getcodeAPI({
    mobile: mobile.value,
    type: 'login'
  })
  console.log(res)
  MessageMainVue({ type: 'success', text: res.data.message })
}

// 验证码登录
const getcodelogin = async () => {
  let res = await postcodeloginAPI({
    mobile: mobile.value,
    code: code.value
  })
  console.log(res)
  if (res.data.message == '请求成功') {
    router.push('/home')
    localStorage.setItem('token', res.data.data.token)
    MessageMainVue({ type: 'success', text: '登录成功~' })
  } else {
    MessageMainVue({ type: 'success', text: res.data.message })
  }
  // MessageMainVue({ type: 'success', text: res.data.message })
}
// =.==.==.==.==.==.==.==.==.==.==.==.==.==.==.==.==.==.=
// 密码登录
const getpasslogin = async () => {
  let res = await postpasswordrAPI({
    mobile: mobiles.value,
    password: password.value
  })
  console.log(res)
  if (res.data.message == '请求成功') {
    router.push('/home')
    localStorage.setItem('token', res.data.data.token)
    MessageMainVue({ type: 'success', text: '登录成功~' })
  } else {
    MessageMainVue({ type: 'success', text: res.data.message })
  }
}

const toregister = () => {
  router.push('/register')
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
    width: 88%;
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
  flex-direction: column;
  width: 100%;
  position: fixed;
  bottom: 0.2rem;
  left: 0;
  font-size: 0.23rem;
  color: rgb(135, 135, 135);
  img {
    width: 0.6rem;
  }
}
</style>
