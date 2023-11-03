<template>
  <div class="detail">
    <div class="top">
      <van-icon @click="toback" name="arrow-left" />
      <span>{{ detaillist.name }}</span>
      <span class="span"></span>
    </div>
    <div class="aa"></div>
    <div class="img">
      <img :src="detaillist.mainPictures" alt="" />
    </div>
    <div class="title">
      <div>￥{{ detaillist.amount }}</div>
      <div>{{ detaillist.name }}</div>
      <div>{{ detaillist.specs }}</div>
      <div>*处方药须凭处方在执业药师指导下购买和使用</div>
    </div>
    <div class="message">
      <div style="height: 0.2rem"></div>
      <div class="content">
        <div>药品名称</div>
        <div>{{ detaillist.name }}</div>
      </div>
      <div class="content">
        <div>品牌</div>
        <div>{{ detaillist.brand }}</div>
      </div>
      <div class="content">
        <div>功能主治</div>
        <div>{{ detaillist.indicationsFunction }}</div>
      </div>
      <div class="content">
        <div>规格</div>
        <div>{{ detaillist.specs }}</div>
      </div>
      <div class="content">
        <div>药品名称</div>
        <div>{{ detaillist.name }}</div>
      </div>
      <div class="content">
        <div>用量用法</div>
        <div>{{ detaillist.usageDosag }}</div>
      </div>
      <div class="content">
        <div>不良反应</div>
        <div>{{ detaillist.untowardReaction }}</div>
      </div>
      <div class="content">
        <div>禁忌</div>
        <div>{{ detaillist.contraindication }}</div>
      </div>
      <div class="content">
        <div>注意事项</div>
        <div>{{ detaillist.preparation }}</div>
      </div>
      <div class="content">
        <div>有效期</div>
        <div>{{ detaillist.expiration }}</div>
      </div>
      <div class="content">
        <div>执行标准</div>
        <div>{{ detaillist.standard }}</div>
      </div>
      <div class="content">
        <div>批准文号</div>
        <div>{{ detaillist.approvalNo }}</div>
      </div>
      <div class="content">
        <div>生产企业</div>
        <div>{{ detaillist.manufacturer }}</div>
      </div>
    </div>

    <!-- <mydruglist :price="price" :countnum="countnum" :medicinelist="medicinelist" :title="title" :iscart="iscart" @getcarts="getcarts">
      <template v-slot:submitSlot>
        <div> -->
          <van-submit-bar :price="actualPayment * 100" button-color="#16c2a3" :button-text="title" @submit="addmedicine" style="width: 100%; height: 60px">
            <van-icon @click="getcart" size="0.6rem" :badge="countnum" color="#16c2a3" name="bag" />
          </van-submit-bar>
        <!-- </div>
      </template>
    </mydruglist> -->
    <!-- 商品清单 -->
    <div class="box" @click="getcarts" v-show="iscart"></div>
    <div class="cart" v-show="iscart">
      <div class="detailed-list"><span>药品清单</span> 共{{ countnum }}件商品 <van-icon @click="getdelcart" name="delete-o" style="float: rigth" /> 清空</div>
    <!-- 商品列表 -->
    <div class="list">
        <van-card v-for="(item, index) in medicinelist" :key="item.id" :price="item.amount" desc="处方" :title="item.name" :thumb="item.avatar" v-show="item.quantity">
          <template #tags>
            <van-tag plain type="primary">{{ item.specs }}</van-tag>
          </template>
          <template #footer>
            <van-button v-show="item.quantity" @click="jian(item)" plain icon="minus" color="#16c2a3" round size="mini"></van-button>
            <span v-show="item.quantity">x{{ item.quantity }}</span>
            <van-button @click="addmedicine(item)" plain icon="plus" color="#16c2a3" round size="mini"></van-button>
          </template>
        </van-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getmedicinelistAPI, postselectedAPI } from '../../api/home.ts'

import mydruglist from '../../components/comcom/druglist.vue'
import { getmedicinedAPI } from '../../api/home.ts'
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
onMounted(() => {
  getdetail()
  // getdrud()
  getdeug()
})
// console.log(route.params.id)
const detaillist = ref({})
const iscart = ref(false)
const druglists = ref([])
const title = ref('加入药箱')
const addApiList = reactive({
  data: []
})
let druglist = reactive([])
let num = ref('0')
const actualPayment = ref('')

// 获取详情页的数据
const getdetail = async () => {
  let detail = JSON.parse(route.params.id)
  let detailid = detail.id
  console.log(detailid)
  let res = await getmedicinedAPI(detailid)
  detaillist.value = res.data.data
  console.log(detaillist.value)
  Reflect.set(detaillist.value, 'num', 0)
}

// 加入药箱
// const addmedicine=()=>{

// }
// 数量减
// const jian = async (item) => {
//   if (item.druglist == 0) return
//   item.druglist--

//   addApiList.data.push({ id: item.id, quantity: item.druglist })
//   addApiList.data = arrayUnique(addApiList.data, 'id')
//   // 接口请求
//   let res = await postselectedAPI(addApiList.data)
//   console.log(res)
//   druglist = res.data.data.medicines
//   console.log(druglist)
//   localStorage.setItem('druglist', JSON.stringify(druglist))
// }

// 数量加
const addmedicine = async (item, index) => {
  // detaillist.value.druglist++
   medicinelist.value.map((item1) => {
    if (item.id == item1.id) {
      item1.quantity++
    }
  })
  let arr = []
  arr = medicinelist.value.filter((item) => item.quantity > 0)

  // addApiList.data.push({ id: detaillist.value.id, quantity: detaillist.value.druglist })
  // addApiList.data = arrayUnique(addApiList.data, 'id')
  // 接口请求
  let res = await postselectedAPI(arr)
  // console.log(res.data.data.actualPayment)
  // 商品总价格
  actualPayment.value = res.data.data.actualPayment

  // 将两个数组合并
  medicinelist = medicinelist.concat(res.data.data.medicines)
  console.log(medicinelist)

  localStorage.setItem('druglist', JSON.stringify(druglist))
}

// 去重的方法
const arrayUnique = (arr, name) => {
  let hash = {}
  return arr.reduce((acc, cru, index) => {
    if (!hash[cru[name]]) {
      hash[cru[name]] = { index: acc.length }
      acc.push(cru)
    } else {
      acc.splice(hash[cru[name]]['index'], 1, cru)
    }
    return acc
  }, [])
}

// 商品总价格
// const price = computed(() => {

//   return medicinelist.reduce((p, c) => {
//     return (p += c.druglist * c.amount)
//   }, 0)
// })

// // 商品总数：
// const countnum = computed(() => {
//   return medicinelist.reduce((p, c) => {
//     return (p += c.druglist)
//   }, 0)
// })

//获取到本地存储中购物车的数据
let medicinelist = reactive([])
const getdeug = () => {
  medicinelist = JSON.parse(localStorage.getItem('getdruglist'))
  console.log(medicinelist)
}

// 打开清单模态框
const getcart = () => {
  iscart.value = true
  stopMove()
}
//  关闭清单模态框
const getcarts = () => {
  iscart.value = false
  Move()
}

//停止页面滚动
const stopMove = () => {
  let m = function (e) {
    // 阻止浏览器的默认行为
    e.preventDefault()
  }
  document.body.style.overflow = 'hidden'
  // 元素添加监听事件
  // 有三个参数（事件名称，执行函数,触发类型 布尔值）
  //1. 点击事件直接写："click"，键盘事件写："keyup"，
  //2. 填需要执行的函数
  //  当目标对象事件触发时，会传入一个事件参数，参数名称可自定义，如填写event，不需要也可不填写。 事件对象的类型取决于特定的事件。例如， “click” 事件属于 MouseEvent(鼠标事件) 对象。

  //3. true - 事件在捕获阶段执行   false - 事件在冒泡阶段执行，默认是false
  // passive   来提高浏览器响应速度，提升用户体验
  document.addEventListener('touchmove', m, { passive: false }) //禁止页面滑动
}

//开启页面滚动
const Move = () => {
  let m = function (e) {
    e.preventDefault()
  }
  document.body.style.overflow = '' //出现滚动条
  // 移除事件
  document.removeEventListener('touchmove', m, { passive: true })
}

//
const toback = () => {
  router.push('/chooseMedicine')
}
</script>

<style lang="scss" scoped>
$themecolor: #16c2a3;
.detail {
  background: #eeeeee;
}
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
.img {
  width: 100%;
  height: 5rem;
  img {
    width: 100%;
    height: 5rem;
  }
}
.title {
  width: 100%;
  background: #ffffff;
  div {
    padding-left: 0.4rem;
    line-height: 0.5rem;
  }
  span {
    background: $themecolor;
    color: white;
    font-size: 0.28rem;
  }
}
.title :nth-child(1) {
  color: red;
  font-size: 0.4rem;
}
.title :nth-child(2) {
  font-size: 0.35rem;
}
.title :nth-child(3) {
  font-size: 0.3rem;
}
.title :nth-child(4) {
  color: rgb(83, 83, 83);
  font-size: 0.25rem;
}
.message {
  margin-top: 0.2rem;
  width: 100%;
  background: #ffffff;
  .content {
    width: 90%;
    padding-left: 0.4rem;
    margin-top: 0.3rem;
  }
  .content :nth-child(1) {
    font-size: 0.35rem;
  }
  .content :nth-child(2) {
    color: rgb(79, 79, 79);
    font-size: 0.28rem;
  }
}
.box {
  width: 100%;
  height: 100vh;
  z-index: 99;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(77, 77, 77, 0.522);
}
.cart {
  overflow-y: auto;
  width: 100%;
  height: 60%;
  z-index: 99;
  font-size: 0.26rem;
  position: fixed;
  left: 0;
  bottom: 0;
  color: #7a7a7a;
  background: rgb(255, 255, 255);
  .detailed-list {
    z-index: 100;
    position: sticky; /*兼容*/
    top: 0;
    left: 0;
    width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
    background: white;
    span {
      margin-left: 0.2rem;
      font-size: 0.33rem;
      color: black;
    }
  }
  .list {
  }
}
</style>
