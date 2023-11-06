<template>
  <div>
    <div class="top">
      <van-icon @click="toback" name="arrow-left" />
      <span>{{toptitle}}</span>
      <slot name="topcontent"></slot>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

//接收父组件传来的属性值
const props = defineProps({
  toptitle: String
})
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
</style>
