<template>
  <div>
    <div class="top">
      <van-icon name="arrow-left" />
      <span>开药问诊</span>
      <span class="span" @click="toregister">问诊记录</span>
    </div>
    <div class="aa"></div>
    <!-- 通知栏 -->
    <van-notice-bar wrapable :scrollable="false" text="请如实填写资料以便医生了解您的病情和用用药需求" />
    <!-- 描述症状 -->
    <div class="description">
      <div class="description-title">描述症状</div>
      <textarea @blur="blur" v-model="textareaval" name="" id="" cols="30" rows="10" placeholder="请输入症状"></textarea>
    </div>
    <!--  -->
    <div class="physical-condition">
      <div class="description-title">用药人身体情况</div>
      <div class="liver-function">
        <div class="title">肝功能</div>
        <div class="list">
          <button v-for="(item, index) in obj.one" :key="item.id" @click="tabac(index)" :class="num == index ? 'ac' : ''">{{ item.title }}</button>
        </div>
      </div>
      <div class="liver-function">
        <div class="title">肾功能</div>
        <div class="list">
          <button v-for="(item, index) in obj.tow" :key="item.id" @click="tabac2(index)" :class="num2 == index ? 'ac' : ''">{{ item.title }}</button>
        </div>
      </div>
      <div class="liver-function">
        <div class="title">过敏史</div>
        <div class="list">
          <button v-for="(item, index) in obj.three" :key="item.id" @click="tabac3(index)" :class="num3 == index ? 'ac' : ''">{{ item.title }}</button>
        </div>
      </div>
      <div class="liver-function">
        <div class="title">生育状态及计划</div>
        <div class="list">
          <button v-for="(item, index) in obj.four" :key="item.id" @click="tabac4(index)" :class="num4 == index ? 'ac' : ''">{{ item.title }}</button>
        </div>
      </div>
      <div class="liver-function">
        <div class="title">补充病例信息</div>
        <div class="list">
          <van-uploader :after-read="afterRead" />
        </div>
      </div>
      <div style="margin: 20px" v-show="isbutton">
        <van-button @click="getnext" round block color="#16c2a3" native-type="submit">下一步</van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getmylistAPI } from '../../api/home.ts'
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
onMounted(() => {
  // aa()
})
const num = ref()
const num2 = ref()
const num3 = ref()
const num4 = ref()
const textareaval = ref('')
const isbutton = ref(false)

const obj = reactive({
  one: [
    { id: '1', title: '正常' },
    { id: '2', title: '异常' },
    { id: '3', title: '不清楚' }
  ],
  tow: [
    { id: '1', title: '正常' },
    { id: '2', title: '异常' },
    { id: '3', title: '不清楚' }
  ],
  three: [
    { id: '1', title: '正常' },
    { id: '2', title: '异常' },
    { id: '3', title: '不清楚' }
  ],
  four: [
    { id: '1', title: '无' },
    { id: '2', title: '备孕中' },
    { id: '3', title: '已怀孕' },
    { id: '4', title: '哺乳期中' }
  ]
})

// const blur = () => {
//   console.log(textareaval.value, num.value, '22222')
//   if (textareaval.value == '' || num.value == 'undefined' || num2.value == 'undefined' || num3.value == 'undefined' || num4.value == 'undefined') {
//     isbutton.value = false
//   } else {
//     isbutton.value = true
//   }
// }

const tabac = (index) => {
  // console.log(index)
  num.value = index

  if (textareaval.value == '' || num.value !== 'undefined' || num2.value == 'undefined' || num3.value == 'undefined' || num4.value == 'undefined') {
    isbutton.value = false
  } else {
    isbutton.value = true
  }
}
const tabac2 = (index) => {
  // console.log(index)
  num2.value = index

  if (textareaval.value == '' || num.value == 'undefined' || num2.value !== 'undefined' || num3.value == 'undefined' || num4.value == 'undefined') {
    isbutton.value = false
  } else {
    isbutton.value = true
  }
}
const tabac3 = (index) => {
  // console.log(index)
  num3.value = index

  if (textareaval.value == '' || num.value == 'undefined' || num2.value == 'undefined' || num3.value !== 'undefined' || num4.value == 'undefined') {
    isbutton.value = false
  } else {
    isbutton.value = true
  }
}
const tabac4 = (index) => {
  // console.log(index)
  num4.value = index
  console.log(textareaval.value, num.value, num2.value, num3.value, num4.value)
  if (textareaval.value !== '' && num.value !== 'undefined' && num2.value !== 'undefined' && num3.value !== 'undefined' && num4.value !== 'undefined') {
    isbutton.value = true
  } else {
    isbutton.value = false
  }
}

// 下一步
const getnext = async () => {
  // const res = await getmylistAPI()
  // console.log(res)
  router.push('/choosePatient')
}

const afterRead = (file) => {
  // 此时可以自行将文件上传至服务器
  console.log(file)
}
</script>

<style lang="scss" scoped>
$themecolor: #16c2a3;
.top {
  box-sizing: border-box;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  width: 100%;
  height: 0.8rem;
  padding-left: 0.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  .span {
    color: $themecolor;
    font-size: 0.27rem;
  }
}
.aa {
  width: 90%;
  height: 0.8rem;
}
.description {
  width: 100%;
  .description-title {
    height: 0.8rem;
    margin-left: 0.2rem;
    margin-top: 0.2rem;
    font-size: 0.3rem;
  }
  textarea {
    width: 90%;
    margin-left: 0.4rem;
    height: 1.8rem;
    border: none;
  }
}
.physical-condition {
  width: 100%;
  .description-title {
    height: 0.8rem;
    margin-left: 0.2rem;
    margin-top: 0.2rem;
    font-size: 0.3rem;
  }
}
.liver-function {
  width: 90%;
  margin-left: 0.2rem;
  margin-bottom: 0.4rem;
  .title {
    height: 0.6rem;
    margin-left: 0.25rem;
    font-size: 0.27rem;
    color: #666666;
  }
  .list {
    display: flex;

    button {
      width: 1.4rem;
      height: 0.7rem;
      border: none;
      font-size: 0.27rem;
      margin-left: 0.3rem;
      border-radius: 0.1rem;
      background: rgb(243, 243, 243);
    }
    .ac {
      color: $themecolor;
      background: #e8fffb;
      border: 0.02rem solid $themecolor;
    }
  }
}
</style>
