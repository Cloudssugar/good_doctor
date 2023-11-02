<template>
  <div>
    <div class="top">
      <van-icon @click="toback" name="arrow-left" />
      <span>选择药品</span>
      <span class="span"></span>
    </div>
    <div class="aa"></div>
    <!-- 搜索 -->
    <div class="search">
      <van-search v-model="value" show-action placeholder="请输入搜索关键词" @search="onSearch">
        <template #action>
          <div @click="onClickButton">取消</div>
        </template>
      </van-search>
    </div>
    <!-- 商品列表 -->
    <div class="list">
      <van-card v-for="(item, index) in medicinelist" :key="item.id" :price="item.amount" desc="处方" :title="item.name" :thumb="item.avatar">
        <template #tags>
          <van-tag @click="todetail(item)" plain type="primary">{{ item.specs }}2</van-tag>
        </template>
        <template #footer>
          <van-button v-show="item.num" @click="jian(item)" plain icon="minus" color="#16c2a3" round size="mini"></van-button>
          <span v-show="item.num">x{{ item.num }}</span>
          <van-button @click="jia(item)" plain icon="plus" color="#16c2a3" round size="mini"></van-button>
        </template>
      </van-card>
    </div>

    <drudlist :price="price" :countnum="countnum" :druglist="druglist" :title='title'></drudlist>
    <!-- 提交订单 -->
    <!-- <div>
      <van-submit-bar :price="price * 100" button-color="#16c2a3" button-text="申请开方" @submit="onSubmit" style="width: 100%; height: 60px">
        <van-icon @click="getcart" size="0.6rem" :badge="countnum" color="#16c2a3" name="bag" />
      </van-submit-bar>
    </div> -->

    <!-- 商品清单 -->
    <!-- <div class="box" @click="getcarts" v-show="iscart"></div>
    <div class="cart" v-show="iscart">
      <div class="detailed-list"><span>药品清单</span> 共{{ countnum }}件商品 <van-icon @click="getdelcart" name="delete-o" style="float: rigth" /> 清空</div> -->
    <!-- 商品列表 -->
    <!-- <div class="list">
        <van-card v-for="(item, index) in medicinelist" :key="item.id" v-show="item.num" :price="item.amount" desc="处方" :title="item.name" :thumb="item.avatar">
          <template #tags>
            <van-tag plain type="primary">{{ item.specs }}</van-tag>
          </template>
          <template #footer>
            <van-button @click="jian(item)" plain icon="minus" color="#16c2a3" round size="mini"></van-button>
            <span>x{{ item.num }}</span>
            <van-button @click="jia(item)" plain icon="plus" color="#16c2a3" round size="mini"></van-button>
          </template>
        </van-card>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import drudlist from '../../components/comcom/druglist.vue'
import { getmedicinelistAPI, postselectedAPI } from '../../api/home.ts'
import { showToast } from 'vant'
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
onMounted(() => {
  getlist()
})
const title=ref('申请开方')
const value = ref('')
// const druglists =ref([])
const onSearch = (val) => showToast(val)
const onClickButton = () => showToast(value.value)

const medicinelist = ref([])
const druglist = ref([])
const iscart = ref(false)

// 请求药品列表
const getlist = async () => {
  let res = await getmedicinelistAPI()
  console.log(res)
  for (var i = 0; i < res.data.data.rows.length; i++) {
    res.data.data.rows[i].num = 0
  }
  medicinelist.value = res.data.data.rows
}

// 数量减
const jian = (item) => {
  if (item.num == 0) return
  item.num--
  if (item.num <= 1) {
    druglist.value.splice(1)
  }
  localStorage.setItem('druglist', JSON.stringify(druglist.value))
  console.log(druglist.value)
}

// 数量加
const jia = async (item) => {
  item.num++
  if (item.num <= 1) {
    druglist.value.push(item)
  }
  localStorage.setItem('druglist', JSON.stringify(druglist.value))
  console.log(druglist.value)

  // let res = await postselectedAPI({
  //   id: item.id,
  //   quantity: item.num
  // })
  // console.log(res)
}

// 商品总价格
const price = computed(() => {
  return medicinelist.value.reduce((p, c) => {
    return (p += c.num * c.amount)
  }, 0)
})

// 商品总数：
const countnum = computed(() => {
  return medicinelist.value.reduce((p, c) => {
    return (p += c.num)
  }, 0)
})

//
const getdelcart = async () => {
  // let res = await postdelcartAPI()
  // console.log(res)
}

// 进入药品详情页
const todetail = (item) => {
  router.push({
    name: 'medicineDetail',
    params: { id: item.id }
  })
}

// 打开清单模态框
const getcart = () => {
  iscart.value = true
  stopMove()
}
//  关闭清单模态框
const getcarts = () => {
  // console.log(iscart.value)
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

// 返回
const toback = () => {
  router.go(-1)
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
.van-button {
  z-index: 99;
}
</style>
