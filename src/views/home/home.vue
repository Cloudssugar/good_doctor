<template>
  <div>
    <div class="box">
      <div class="top">
        <span>在线问诊</span>
        <div class="search">
          <input type="text" placeholder="搜一搜：疾病/症状/医生/健康知识" />
        </div>
      </div>
      <!--  -->
      <div class="menus-container">
        <div class="menu-first-list">
          <div class="menu-first-item" @click="tofindDoctor">
            <img src="/src/assets/home/yisheng.png" alt="" />
            <div class="title">问医生</div>
            <div class="title2">按科室查问医生</div>
          </div>
          <div class="menu-first-item">
            <img src="https://youyi.itheima.net/static/inquiry-prescribe.a792b5e7.png" alt="" />
            <div class="title">图文问诊</div>
            <div class="title2">20s医生快速回复</div>
          </div>
          <div class="menu-first-item" @click="toprescribe">
            <img src="https://youyi.itheima.net/static/inquiry-graphic.f62a14ff.png" alt="" />
            <div class="title">开药问诊</div>
            <div class="title2">线上买药更方便</div>
          </div>
        </div>
        <div class="menu-second-list">
          <div class="menu-second-item">
            <img src="/src/assets/home/dingdan.png" alt="" />
            <div class="title">药品订单</div>
          </div>
          <div class="menu-second-item">
            <img src="/src/assets/home/dangan.png" alt="" />
            <div class="title">健康档案</div>
          </div>
          <div class="menu-second-item">
            <img src="/src/assets/home/chufang.png" alt="" />
            <div class="title">我的处方</div>
          </div>
          <div class="menu-second-item">
            <img src="/src/assets/home/chaxun.png" alt="" />
            <div class="title">疾病查询</div>
          </div>
        </div>
      </div>
    </div>

    <tabbar></tabbar>
  </div>
</template>

<script setup>
import tabbar from '../../components/comcom/tabbar.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

// 开药问诊
const toprescribe = () => {
  router.push('/prescribe')
}

//问医生
const tofindDoctor = () => {
  router.push('/findDoctor')
}
</script>

<style lang="scss" scoped>
$themecolor: #16c2a3;
.box {
  .top {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 1.6rem;
    background: $themecolor;
    color: white;
    display: flex;
    align-items: center;
    span {
      font-size: 0.36rem;
      margin-left: 0.4rem;
    }
    .search {
      position: absolute;
      top: 80%;
      left: 7%;
      width: 85%;
      height: 0.7rem;
      border: 0.03rem solid rgb(187, 187, 187);
      border-radius: 50px;
      background: white;
      input {
        font-size: 0.27rem;
        width: 100%;
        height: 0.7rem;
        border-radius: 50px;
        border: 0.03rem solid rgb(187, 187, 187);
      }
    }
  }

  .menus-container {
    margin-top: 0.5rem;
    width: 100%;
    height: 4rem;
    .menu-first-list {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 2.34rem;
      .menu-first-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 2.1rem;
        height: 2.34rem;
        img {
          width: 0.92rem;
          height: 0.92rem;
        }
        .title {
          font-size: 0.3rem;
        }
        .title2 {
          font-size: 0.25rem;
          color: rgb(124, 124, 124);
        }
      }
    }
    .menu-second-list {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      height: 1.34rem;
      .menu-second-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 1.1rem;
        height: 1.34rem;
        img {
          width: 0.62rem;
          height: 0.62rem;
        }
        .title {
          font-size: 0.25rem;
        }
      }
    }
  }
}
</style>
