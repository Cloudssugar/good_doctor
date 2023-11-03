<template>
  <div>
    <slot name="submitSlot"></slot>

    <div class="box" @click="getcarts" v-show="iscart"></div>
    <div class="cart" v-show="iscart">
      <div class="detailed-list"><span>药品清单</span> 共{{ countnum }}件商品 <van-icon @click="getdelcart" name="delete-o" style="float: rigth" /> 清空</div>
      <!-- 商品列表 -->
      <div class="list">
        <van-card v-for="(item, index) in getdruglist" :key="item.id" :price="item.amount" desc="处方" :title="item.name" :thumb="item.avatar">
          <template #tags>
            <van-tag plain type="primary">{{ item.specs }}</van-tag>
          </template>
          <template #footer>
            <van-button @click="jian(item)" plain icon="minus" color="#16c2a3" round size="mini"></van-button>
            <span>x{{ item.quantity }}</span>
            <van-button @click="jia(item)" plain icon="plus" color="#16c2a3" round size="mini"></van-button>
          </template>
        </van-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, toRefs } from 'vue'
import { postdelcartAPI, postselectedAPI } from '../../api/home.ts'

//接收父组件传来的属性值
const props = defineProps({
  price: Number,
  countnum: Number,
  getdruglist: Array,
  title: String,
  detaillist: Object,
  iscart: Boolean,
  medicinelist: Array
})
//此处必须用toRefs，否则将失去响应式
const { getdruglist } = toRefs(props)
console.log(props, '000000000')
const detaillist = ref({})
let druglists = reactive({
  aa: []
})
const addApiList = reactive({
  data: []
})

// 数量减
const jian = async (item) => {
  if (item.quantity == 0) return
  item.quantity--
  // 请求接口的参数
  addApiList.data.push({ id: item.id, quantity: item.quantity })
  addApiList.data = arrayUnique(addApiList.data, 'id')
  // 接口请求
  let res = await postselectedAPI(addApiList.data)
  console.log(res)
}

// 数量加
const jia = async (item, index) => {
  // item.quantity++
  medicinelist.map((item1) => {
    if (item.id == item1.id) {
      item1.quantity++
    }
  })
  let arr = []
  arr = medicinelist.filter((item) => item.quantity > 0)
  // quantitys.value = item.quantity
  //  请求接口的字段
  // addApiList.data.push({ id: item.id, quantity: item.quantity })
  // addApiList.data = arrayUnique(addApiList.data, 'id')
  // 接口请求
  let res = await postselectedAPI(arr)
  console.log(res)
  getdruglist = res.data.data.medicines
  console.log(getdruglist)
  localStorage.setItem('getdruglist', JSON.stringify(getdruglist))
  //////////////////////////
  // item.quantity++

  // // 请求接口的参数
  // addApiList.data.push({ id: item.id, quantity: item.quantity })
  // addApiList.data = arrayUnique(addApiList.data, 'id')
  // // 接口请求
  // let res = await postselectedAPI(addApiList.data)
  // console.log(res)
  // getdruglist = res.data.data.medicines
  // console.log(getdruglist)
  // localStorage.setItem('druglist', JSON.stringify(druglist))
  // medicinelist = JSON.parse(localStorage.getItem('druglist'))
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

// 定义要发送的emit事件
const emit = defineEmits(['medicinebox', 'getcarts'])
let medicinebox = () => {
  emit('medicinebox', props.detaillist)
}
let getcarts = () => {
  emit('getcarts', false)
}
</script>

<style lang="scss" scoped>
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
