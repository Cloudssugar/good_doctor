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
              <mycode @getcodes="getcode" :mobile="mobile"></mycode>
            </template>
          </van-field>
        </van-cell-group>
        <div class="agreement">
          <input type="radio" @change="toselect" name="" id="" />
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
          <van-field @blur="blur" v-model="mobiles" name="请输入手机号码" placeholder="请输入手机号码" :rules="[{ required: true, message: '请输入手机号码' }]" />
          <!-- 密码 -->
          <van-field v-model="password" type="password" name="请填写密码" placeholder="请填写密码" :rules="[{ required: true, message: '请填写密码' }]" />
        </van-cell-group>
        <div class="agreement">
          <input type="radio" @change="toselect" name="" id="" />
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
      <img @click="qqLogin" src="/src/assets/QQ.svg" alt="" />
    </div>
  </div>
</template>

<script setup>
import mycode from '../components/comcom/code.vue'
import MessageMainVue from '../components/ts/message.ts'
import { ref } from 'vue'
import { getcodeAPI, postcodeloginAPI, postpasswordrAPI } from '../api/login.ts'
import { useRouter } from 'vue-router'
const router = useRouter()

// 手机号
const mobile = ref('')
const mobiles = ref('')
// 验证码
const code = ref('')
const sendMsgDisabled = ref(false)
const time = ref(60)
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

  sendMsgDisabled.value = true
  const interVal = window.setInterval(() => {
    if (time.value-- <= 0) {
      time.value = 60
      sendMsgDisabled.value = false
      window.clearInterval(interVal)
    }
  }, 1000)
}

// 单选框
const checkedval = ref(false)
// 单击时获取单选框的值
const toselect = (e) => {
  console.log(e.target.checked)
  checkedval.value = e.target.checked
}

// 验证码登录
const getcodelogin = async () => {
  // 如果值为false 没有勾选
  if (checkedval.value !== true) {
    // 提示
    MessageMainVue({ type: 'success', text: '请勾选用户协议' })
  } else {
    // 发送请求
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
  }
}

// =.==.==.==.==.==.==.==.==.==.==.==.==.==.==.==.==.==.=

// const checkedval = ref(false)
// const toselect = (e) => {
//   console.log(e.target.checked)
//   checkedval.value = e.target.checked
// }

// 失去焦点
const blur = () => {
  const reg = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/
  if (mobiles.value == '' || mobiles.value.length <= 10 || !reg.test(mobiles.value)) {
    MessageMainVue({ type: 'success', text: '请填写正确的手机号码' })
  }
}

// 密码登录
const getpasslogin = async () => {
  //
  const reg = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/
  if (mobiles.value == '' || mobiles.value.length <= 10 || !reg.test(mobiles.value)) {
    MessageMainVue({ type: 'success', text: '请填写正确的手机号码' })
  } else {
    if (checkedval.value !== true) {
      MessageMainVue({ type: 'success', text: '请勾选用户协议' })
    } else {
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
  }
}
// 去注册
const toregister = () => {
  router.push('/register')
}

// qq登录
const qqLogin = () => {
  console.log('qqqqqq')
  window.location.href = QC.Login.insertButton._getPopupUrl({
    appId: '102015968',
    redirectURI: 'http://consult-patients.itheima.net/login/callback'
  })
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
