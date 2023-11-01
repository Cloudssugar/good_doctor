<template>
  <div class="box">
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
     <div>
      <van-submit-bar :price="price * 100" button-color="#16c2a3" button-text="申请开方" @submit="onSubmit" style="width: 100%; height: 60px">
        <van-icon @click="getcart" size="0.6rem" :badge="countnum" color="#16c2a3" name="bag" />
      </van-submit-bar>
    </div>
  </div>
</template>

<script setup>
import { getmedicinedAPI } from '../../api/home.ts'
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
onMounted(() => {
  getdetail()
})
// console.log(route.params.id)
const detaillist = ref({})
const getdetail = async () => {
  let detailid = route.params.id
  // console.log(detailid, route.params.id)
  let res = await getmedicinedAPI(detailid)
  // console.log(res.data.data)
  detaillist.value = res.data.data
  console.log(detaillist.value)
}

// 
const toback=()=>{
  router.push('/chooseMedicine')
}
</script>

<style lang="scss" scoped>
$themecolor: #16c2a3;
.box {
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
    font-size: 0.4rem;
  }
  .content :nth-child(2) {
    color: rgb(79, 79, 79);
    font-size: 0.3rem;
  }
}
</style>
