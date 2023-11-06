<template>
  <div>
    <mytop :toptitle="toptitle">
      <template v-slot:topcontent>
        <span class="span"></span>
      </template>
    </mytop>
    <div class="aa"></div>
    <van-notice-bar color="#16c2a3" background="#EAF8F6" > 已通知医生尽快接诊，24小时内医生未回复将自动退款 </van-notice-bar>
  </div>
</template>

<script setup>
import mytop from '../../components/comcom/top.vue'
import { ref } from 'vue'

const toptitle = ref('医生问诊室')
</script>

<style lang="scss" scoped>
.aa {
  width: 90%;
  height: 0.8rem;
}
</style>
