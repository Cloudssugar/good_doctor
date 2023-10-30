<template>
  <div>
    <div class="top">
      <van-icon name="arrow-left" />
      <span>开药问诊</span>
      <span class="span" @click="toregister">问诊记录</span>
    </div>
    <div class="aa"></div>
    <!-- 通知栏 -->
    <van-notice-bar wrapable :scrollable="false" text="请如实填写资料以便医生了解您的病情和用用药需求" />
    <!-- 描述症状 -->
    <div class="description">
      <div class="description-title">描述症状</div>
      <textarea name="" id="" cols="30" rows="10" placeholder="请输入症状"></textarea>
    </div>
    <!--  -->
    <div class="physical-condition">
      <div class="description-title">用药人身体情况</div>
      <div class="liver-function">
        <div class="title">肝功能</div>
        <div class="list">
          <button @click="tabac(index)" :class="num == index ? 'ac' : ''">正常</button>
          <button>异常</button>
          <button>不清楚</button>
        </div>
      </div>
      <div class="liver-function">
        <div class="title">肾功能</div>
        <div class="list">
          <button>正常</button>
          <button>异常</button>
          <button>不清楚</button>
        </div>
      </div>
      <div class="liver-function">
        <div class="title">过敏史</div>
        <div class="list">
          <button>正常</button>
          <button>异常</button>
          <button>不清楚</button>
        </div>
      </div>
      <div class="liver-function">
        <div class="title">生育状态及计划</div>
        <div class="list">
          <button>无</button>
          <button>备孕中</button>
          <button>已怀孕</button>
          <button>哺乳期中</button>
        </div>
      </div>
      <div class="liver-function">
        <div class="title">补充病例信息</div>
        <div class="list">
          <van-uploader :after-read="afterRead" />
        </div>
      </div>
      <div style="margin: 20px">
        <van-button @click="getpasslogin" round block color="#16c2a3" native-type="submit">下一步</van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const num = ref(0)

const tabac = (index) => {
  console.log(index)
  num.value = index
}

const afterRead = (file) => {
  // 此时可以自行将文件上传至服务器
  console.log(file)
}
</script>

<style lang="scss" scoped>
$themecolor: #16c2a3;
.top {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  width: 90%;
  height: 0.8rem;
  margin-left: 0.3rem;
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
.description {
  width: 100%;
  .description-title {
    height: 0.8rem;
    margin-left: 0.2rem;
    margin-top: 0.2rem;
    font-size: 0.3rem;
  }
  textarea {
    width: 90%;
    margin-left: 0.4rem;
    height: 1.8rem;
    border: none;
  }
}
.physical-condition {
  width: 100%;
  .description-title {
    height: 0.8rem;
    margin-left: 0.2rem;
    margin-top: 0.2rem;
    font-size: 0.3rem;
  }
}
.liver-function {
  width: 90%;
  margin-left: 0.2rem;
  margin-bottom: 0.4rem;
  .title {
    height: 0.6rem;
    margin-left: 0.25rem;
    font-size: 0.27rem;
    color: #666666;
  }
  .list {
    display: flex;

    button {
      width: 1.4rem;
      height: 0.7rem;
      border: none;
      font-size: 0.27rem;
      margin-left: 0.3rem;
      border-radius: 0.1rem;
      background: rgb(243, 243, 243);
    }
    .ac {
      color: $themecolor;
      background: #e8fffb;
      border: 0.02rem solid $themecolor;
    }
  }
}
</style>
