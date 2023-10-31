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
          <van-tag plain type="primary">{{ item.specs }}</van-tag>
        </template>
        <template #footer>
          <van-button v-show="item.num" @click="jian(item)" plain icon="minus" color="#16c2a3" round size="mini"></van-button>
          <span v-show="item.num">x{{ item.num }}</span>
          <van-button @click="jia(item)" plain icon="plus" color="#16c2a3" round size="mini"></van-button>
        </template>
      </van-card>
    </div>
    <!-- 提交订单 -->
    <div>
      <van-submit-bar :price="price * 100" button-color="#16c2a3" button-text="申请开方" @submit="onSubmit" style="width: 100%; height: 60px">
        <van-icon @click="getcart" size="0.6rem" :badge="countnum" color="#16c2a3" name="bag" />
      </van-submit-bar>
    </div>

    <!-- 商品清单 -->
    <div class="box" @click="getcarts" v-show="iscart"></div>
    <div class="cart"  v-show="iscart">
      <div class="detailed-list"><span>药品清单</span> 共2件商品 <van-icon name="delete-o" style="float: rigth" /> 清空</div>
      <!-- 商品列表 -->
      <div class="list">
        <van-card v-for="(item, index) in medicinelist" :key="item.id" :price="item.amount" desc="处方" :title="item.name" :thumb="item.avatar">
          <template #tags>
            <van-tag plain type="primary">{{ item.specs }}</van-tag>
          </template>
          <template #footer>
            <van-button v-show="item.num" @click="jian(item)" plain icon="minus" color="#16c2a3" round size="mini"></van-button>
            <span v-show="item.num">x{{ item.num }}</span>
            <van-button @click="jia(item)" plain icon="plus" color="#16c2a3" round size="mini"></van-button>
          </template>
        </van-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getmedicinelistAPI } from '../../api/home.ts'
import { showToast } from 'vant'
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
onMounted(() => {
  getlist()
})

const value = ref('')
const onSearch = (val) => showToast(val)
const onClickButton = () => showToast(value.value)

const medicinelist = ref([])
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
}

// 数量加
const jia = (item) => {
  item.num++
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
const getcart = () => {
  iscart.value = true
}
const getcarts = () => {
  console.log(iscart.value)
  iscart.value = false
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
  overflow-y: scroll;
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
    overflow-y: auto;
    overflow: hidden;
  }
}
</style>
