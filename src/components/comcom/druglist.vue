<template>
  <div>
    <!-- 提交订单 -->
    <div>
      <van-submit-bar :price="price * 100" button-color="#16c2a3" :button-text="title" @click="medicinebox" style="width: 100%; height: 60px">
        <van-icon @click="getcart" size="0.6rem" :badge="countnum" color="#16c2a3" name="bag" />
      </van-submit-bar>
    </div>

    <!-- 商品清单 -->
    <div class="box" v-if="countnum !== 0" @click="getcarts" v-show="iscart"></div>
    <div class="cart" v-if="countnum !== 0" v-show="iscart">
      <div class="detailed-list"><span>药品清单</span> 共{{ countnum }}件商品 <van-icon name="delete-o" style="float: rigth" /> 清空</div>
      <!-- 商品列表 -->
      <div class="list">
        <van-card v-for="(item, index) in props.druglist" :key="item.id" :price="item.amount" desc="处方" :title="item.name" :thumb="item.avatar">
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
import { reactive, ref, defineProps, defineEmits, toRefs } from 'vue'

//接收父组件传来的属性值
const props = defineProps({
  price: Number,
  countnum: Number,
  druglist: Array,
  title: String,
  detaillist: Object
})
//此处必须用toRefs，否则将失去响应式
const { druglist } = toRefs(props)
console.log(props.druglist, '000000000')
const iscart = ref(false)
const detaillist = ref({})

// 数量减
const jian = (item) => {
  if (item.num == 0) return
  item.num--
  localStorage.setItem('druglist', JSON.stringify(props.druglist))
}

// 数量加
const jia = async (item) => {
  item.num++
  // if (item.num <= 1) {
  //   druglist.push(item)
  // }
  // localStorage.setItem('druglist', JSON.stringify(druglist))
  // console.log(druglist)

  addApiList.data.push({ id: item.id, quantity: item.num })

  addApiList.data = arrayUnique(addApiList.data, 'id')
  // 接口请求
  let res = await postselectedAPI(addApiList.data)
  console.log(res)
  druglist = res.data.data.medicines
  console.log(druglist)
  price.value = res.data.data.actualPayment
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

// // 数量加
// const jia = async (item) => {
//   item.num++
//   localStorage.setItem('druglist', JSON.stringify(props.druglist))
//   // let res = await postselectedAPI({
//   //   id: item.id,
//   //   quantity: item.num
//   // })
//   // console.log(res)
// }

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

// 定义要发送的emit事件
const emit = defineEmits(['medicinebox'])
let medicinebox = () => {
  emit('medicinebox', props.detaillist)
}
// let getcarts = () => {
//   emit('getcarts', false)
// }
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
