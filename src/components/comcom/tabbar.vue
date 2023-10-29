<template>
  <div class="tab">
    <div class="tab_item" v-for="(item, index) in tabBarImg" :key="index" @click="switchToTab(item.path)">
      <img :src="$route.path === item.path ? item.active : item.base" alt="" />
      <span :class="$route.path === item.path ? 'active' : ''">{{ item.title }}</span>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'Tabbar',
  data() {
    return {
      tabBarImg: [
        {
          base: '/src/assets/tabbar/home.png',
          active: '/src/assets/tabbar/home-ac.png',
          path: '/home',
          title: '首页'
        },
        {
          base: '/src/assets/tabbar/health.png',
          active: '/src/assets/tabbar/health-ac.png',
          path: '/health',
          title: '健康百科'
        },
        {
          base: '/src/assets/tabbar/message.png',
          active: '/src/assets/tabbar/message-ac.png',
          path: '/message',
          title: '消息通知'
        },
        {
          base: '/src/assets/tabbar/my.png',
          active: '/src/assets/tabbar/my-ac.png',
          path: '/my',
          title: '我的'
        }
      ]
    }
  },
  methods: {
    switchToTab(path) {
      console.log(path)
      this.$router.replace(path)
    }
  }
}
</script>
<style lang="scss" scoped>
$themecolor: #16c2a3;
* {
  margin: 0;
  padding: 0;
}
.tab {
  font-size: 0.26rem;
  width: 100%;
  height: 8vh;
  display: flex;
  border-top: 1px solid #ccc;
  position: fixed;
  bottom: 0;
  background: #fff;
  z-index: 999;
}
.tab_item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
}
.tab_item img {
  width: 0.5rem;
  height: 0.5rem;
}
.active {
  font-size: 0.26rem;
  color:$themecolor;
}
</style>
<!-- <template>
  <div class="tabs">
    <div v-for="(tab, index) in tabs" :key="index">
      <div class="tab" @click="changeTab(tab, index)">
        <img :src="cur_index == index ? tab.base : tab.active" alt="" class="tab-img" />
        <span class="tab-name" :style="cur_index == index ? 'color: #d00000' : 'color:#1f2024'">{{ tab.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tabbar',
  data() {
    return {
      getnumber: 0,
      cur_index: 0,
      tabs: [
       
        {
          active: require('/src/assets/img/home/home.png'),
          base: require('/src/assets/img/home/home-active.png'),
          path: '/home',
          name: '首页'
        },
        {
          active: require('/src/assets/img/home/category.png'),
          base: require('/src/assets/img/home/category-active.png'),
          path: '/category',
          name: '分类'
        },
        {
          active: require('/src/assets/img/home/shoppingCart.png'),
          base: require('/src/assets/img/home/shoppingCart-active.png'),
          path: '/cart',
          name: '购物车'
        },
        {
          active: require('/src/assets/img/home/my.png'),
          base: require('/src/assets/img/home/my-active.png'),
          path: '/my',
          name: '我的'
        }
      ]
    }
  },
  methods: {
    changeTab(tab, index) {
      this.$router.push(tab.path)
      this.cur_index = index
    },
    prev() {
      this.cur_index = (this.cur_index + this.tabs.length - 1) % this.tabs.length
      this.$router.push(this.tabs[this.cur_index].path)
    },
    next() {
      this.cur_index = (this.cur_index + 1) % this.tabs.length
      this.$router.push(this.tabs[this.cur_index].path)
    }
  },

  mounted() {
    // 避免刷新后tab 显示的高亮按钮与路由对不上
    var test = window.location.href.split('#')[1]
    this.tabs.forEach((item, index) => {
      console.log(item.path, index)
      if (item.path == test) {
        this.cur_index = index
      }
    })
  }
}
</script>

<style lang="less" scoped>
.tabs {
  z-index: 999;
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 60px;
  width: 100%;
  justify-content: space-around;
  background: rgb(255, 255, 255);
  border-top: 1px solid rgb(197, 197, 197);
}

.tab {
  width: 60px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.tab-img {
  background: rgb(255, 255, 255);
  width: 25px;
  height: 25px;
  margin-bottom: -11px;
}

.tab-name {
  font-size: 14px;
}
</style> -->
