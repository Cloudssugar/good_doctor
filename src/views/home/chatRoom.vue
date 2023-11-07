<template>
  <div class="box">
    <mytop :toptitle="toptitle">
      <template v-slot:topcontent>
        <span class="span"></span>
      </template>
    </mytop>
    <div class="aa"></div>
    <van-notice-bar v-show="isbar" color="#16c2a3" background="#EAF8F6"> 已通知医生尽快接诊，24小时内医生未回复将自动退款 </van-notice-bar>
    <!-- 咨询中 -->
    <div class="consult" v-show="isconsult"><span>咨询中</span><span>剩余时间：38:09:00</span></div>

    <!-- 时间 -->
    <div class="item">2002-09-11 13:34:00</div>

    <!-- 病人信息 -->
    <div class="case-card">
      <div class="information">
        <p>布布 男 35岁</p>
        <p>肝功能正常 | 肾功能正常 | 过敏史正常 | 生育状态正常</p>
      </div>
      <div class="medical-record">
        <div><span>病情描述</span><span class="cont">000</span></div>
        <div><span>用药需求</span><span class="cont">000</span></div>
      </div>
    </div>
    <!-- 提示 -->
    <div class="tips">医护人员正在赶来，请耐心等待</div>
    <!-- 温馨提示 -->
    <div class="warm-tips"><span>温馨提示：</span> 在线咨询不代表面诊，仅供参考</div>
    <!-- 药品信息 -->
    <div v-show="iscard">
      <div class="restoratives-card">
        <div class="information">
          <div><span>电子处方</span><span>原始处方</span></div>
          <p>布布 男 35岁</p>
          <p>肝功能正常 | 肾功能正常 | 过敏史正常 | 生育状态正常</p>
        </div>
        <div class="medical-record">
          <div><span>病情描述</span><span class="cont">000</span> <span class="num">x1</span></div>
          <div><span>用药需求</span><span class="cont">000</span></div>
        </div>
      </div>
      <div class="buy">购买药品</div>
    </div>

    <!-- 输入框 -->
    <div class="input-field">
      <input type="text" />
      <img src="../../assets/QQ.svg" alt="" />
    </div>
  </div>
</template>

<script >
import mytop from '../../components/comcom/top.vue'
import { getdetaildAPI, postorderAPI } from '../../api/home.ts'
import { ref, onMounted, onBeforeUnmount } from 'vue'



onMounted(() => {
  timer = setInterval(() => {
    //设置定时器
    getTime() //自定义事件
  }, 3000)

  getorder()
  getdetaild()
})

const toptitle = ref('医生问诊室')
const isbar = ref(true)
const isconsult = ref(false)
const iscard = ref(false)
let timer = 0

const getTime = () => {
  isbar.value = false
  isconsult.value = true
  iscard.value = true
}

const getorder = async () => {
  let res = await postorderAPI()
  console.log(res)
}

const getdetaild = async () => {
  let userid = localStorage.getItem('userid')
  // let res = await getdetaildAPI({orderId:userid})
  // console.log(res)
}
</script>

<style lang="scss" scoped>
$themecolor: #16c2a3;
.box {
  height: 100vh;
  background: rgb(247, 247, 247);
}
.aa {
  width: 90%;
  height: 0.8rem;
}
.consult {
  font-size: 0.27rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
}
.item {
  margin-top: 0.2rem;
  margin-left: 25%;
  width: 50%;
  height: 0.5rem;
  text-align: center;
  border-radius: 0.4rem;
  font-size: 0.27rem;
  line-height: 0.5rem;
  color: rgb(85, 85, 85);
  background: rgb(236, 236, 236);
}
.case-card {
  margin-top: 0.2rem;
  background: white;
  color: rgb(80, 80, 80);
  margin-left: 0.4rem;
  border-radius: 0.2rem;
  width: 90%;

  .information {
    padding: 0.1rem;
    font-size: 0.27rem;
    border-bottom: 0.02rem solid rgb(215, 215, 215);
  }
  .medical-record {
    padding: 0.1rem;
    font-size: 0.27rem;
    div {
      display: flex;
      align-items: center;
      .cont {
        padding: 0.1rem;
        margin-left: 0.3rem;
      }
    }
  }
}
.tips {
  margin-top: 0.2rem;
  margin-left: 20%;
  width: 60%;
  height: 0.5rem;
  text-align: center;
  border-radius: 0.4rem;
  font-size: 0.27rem;
  line-height: 0.5rem;
  color: rgb(133, 133, 133);
  background: rgb(255, 255, 255);
}
.warm-tips {
  margin-top: 0.2rem;
  margin-left: 10%;
  width: 80%;
  height: 0.5rem;
  text-align: center;
  border-radius: 0.4rem;
  font-size: 0.27rem;
  line-height: 0.5rem;
  color: rgb(133, 133, 133);
  background: rgb(255, 255, 255);
  span {
    color: $themecolor;
  }
}
.restoratives-card {
  margin-top: 0.2rem;
  background: white;
  color: rgb(80, 80, 80);
  margin-left: 0.4rem;
  border-radius: 0.2rem;
  width: 90%;
  .information {
    padding: 0.1rem;
    font-size: 0.27rem;
    border-bottom: 0.02rem solid rgb(215, 215, 215);
    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .medical-record {
    width: 100%;
    padding: 0.1rem;
    font-size: 0.27rem;
    div {
      width: 100%;
      display: flex;
      align-items: center;
      .cont {
        padding: 0.1rem;
        margin-left: 0.3rem;
      }
      .num {
        margin-left: 0.3rem;
      }
    }
  }
}
.buy {
  width: 90%;
  height: 0.7rem;
  color: $themecolor;
  font-size: 0.27rem;
  margin-left: 0.4rem;
  background: #eaf8f6;
  text-align: center;
  line-height: 0.7rem;
}
.input-field {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 1rem;
  background: white;
  input {
    width: 80%;
    height: 0.7rem;
    border: none;
    border-radius: 0.2rem;
    background: #f4f4f4;
  }
  img {
    width: 0.6rem;
    height: 0.6rem;
  }
}
</style>
