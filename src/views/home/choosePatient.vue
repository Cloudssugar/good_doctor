<template>
  <div>
    <div class="box" v-show="isbox">
      <div class="top">
        <van-icon @click="toback" name="arrow-left" />
        <span>家庭档案</span>
        <span class="span"></span>
      </div>
      <div class="aa"></div>
      <div class="patient">
        <div class="title">请选择患者信息</div>
        <div class="prompt">以便医生给出更准确的治疗，信息仅医生可见</div>
      </div>
      <div class="patientlist" v-show="!patientlist.length == 0">
        <div class="patientitem" v-for="(item, index) in patientlist" :key="item.id">
          <div class="message">
            <span v-show="item.defaultFlag == 1">默认</span> {{ item.idCard }}
            <p>{{ item.name }}</p>
            {{ item.genderValue }} {{ item.age }}岁
          </div>
          <div class="editing">
            <van-icon @click="edit(item)" name="edit" />
          </div>
        </div>
      </div>
      <div class="add-patient" @click="addpatient"><van-icon name="plus" /><span>添加患者</span></div>

      <div style="margin: 20px" v-show="!patientlist.length == 0">
        <van-button @click="getnext" round block color="#16c2a3" native-type="submit">下一步</van-button>
      </div>
    </div>

    <!-- 添加患者 -->
    <div class="box2" v-show="isboxs">
      <div class="top">
        <van-icon @click="back" name="arrow-left" />
        <span>添加患者</span>
        <span class="span" @click="add">保存并选择</span>
      </div>
      <div class="aa"></div>
      <div>
        <van-field v-model="name" name="患者姓名" label="患者姓名" placeholder="用户名" :rules="[{ required: true, message: '请填写真实姓名' }]" />
        <van-field v-model="idCard" @blur="blur" name="患者身份证号" label="患者身份证号" placeholder="用户名" :rules="[{ required: true, message: '请填写身份证号' }]" />
        <!--  -->
        <van-field name="radio" label="单选框">
          <template #input>
            <van-radio-group v-model="gender" direction="horizontal">
              <van-radio name="0">男</van-radio>
              <van-radio name="1">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <van-radio-group style="margin-top: 20px; margin-left: 20px" v-model="defaultFlag">
          <van-radio name="1" label-position="left"> 默认就诊人</van-radio>
        </van-radio-group>
      </div>
    </div>

    <!-- 编辑患者 -->
    <div class="box2" v-show="iseditbox">
      <div class="top">
        <van-icon @click="editback" name="arrow-left" />
        <span>编辑患者</span>
        <span class="span" @click="getedit">保存并选择</span>
      </div>
      <div class="aa"></div>
      <div>
        <van-field v-model="editlist.name" name="患者姓名" label="患者姓名" placeholder="用户名" :rules="[{ required: true, message: '请填写真实姓名' }]" />
        <van-field v-model="editlist.idCard" name="患者身份证号" label="患者身份证号" placeholder="用户名" :rules="[{ required: true, message: '请填写身份证号' }]" />
        <van-field name="radio" label="单选框">
          <template #input>
            <van-radio-group v-model="genders" direction="horizontal">
              <van-radio name="1">男</van-radio>
              <van-radio name="0">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-radio-group style="margin-top: 20px; margin-left: 20px" v-model="defaultFlags">
          <van-radio name="1" label-position="left"> 默认就诊人</van-radio>
        </van-radio-group>
      </div>
      <div style="margin: 20px">
        <van-button @click="delpatient" round block color="#16c2a3" native-type="submit">删除</van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
// 引入消息 文件
import MessageMainVue from '../../components/ts/message.ts'
import { postaddAPI, getmylistAPI, delpatientAPI, deitupdateAPI } from '../../api/home.ts'
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import { showToast } from 'vant'

onMounted(() => {
  getlist()
})

//患者列表请求
const patientlist = ref([])
const isbutton = ref(false)
const getlist = async () => {
  let res = await getmylistAPI()
  console.log(res)
  patientlist.value = res.data.data

  //
  console.log(patientlist.value[0].id)
  localStorage.setItem('userid', patientlist.value[0].id)
}

// 添加页面
const isbox = ref(true)
const isboxs = ref(false)
const addpatient = () => {
  isbox.value = false
  isboxs.value = true
  iseditbox.value = false
}

// 添加患者
const name = ref('')
const idCard = ref('')
const gender = ref('')
const defaultFlag = ref('0')
const add = async () => {
  if (name.value == '' || idCard.value == '') {
    MessageMainVue({ type: 'success', text: '请添加信息' })
  } else {
    let res = await postaddAPI({
      name: name.value,
      idCard: idCard.value,
      gender: gender.value,
      defaultFlag: defaultFlag.value
    })
    console.log(res)
    if (res.data.message == '请求成功') {
      isbox.value = true
      isboxs.value = false
      iseditbox.value = false
      getlist()
    } else {
      MessageMainVue({ type: 'success', text: res.data.message })
    }
  }
}

// 根据身份证号判断性别
const blur = () => {
  // 通过截取身份证号码的最后两位，进行取余数来判断奇数偶数
  gender.value = idCard.value.substring(17) % 2 // IDcard为用户输入的身份证号码
  if (gender.value == '1') {
    gender.value = '1'
  } else if (gender.value == '0') {
    gender.value = '0'
  }
  console.log(gender.value, 'gender.value')
}

// 编辑患者页面
const iseditbox = ref(false)
const editlist = ref({})
const delid = ref('')
const genders = ref('')
const defaultFlags = ref('')
const edit = (item) => {
  editlist.value = item
  delid.value = item.id
  console.log(editlist.value)
  genders.value = editlist.value.gender.toString()
  defaultFlags.value = editlist.value.defaultFlag.toString()
  console.log(genders.value, '1')
  isbox.value = false
  isboxs.value = false
  iseditbox.value = true
}

// 删除患者
const delpatient = async () => {
  let res = await delpatientAPI(delid.value)
  console.log(res)
  if (res.data.message == '请求成功') {
    MessageMainVue({ type: 'success', text: '删除成功~' })
    isbox.value = true
    isboxs.value = false
    iseditbox.value = false
    getlist()
  } else {
    MessageMainVue({ type: 'success', text: res.data.message })
  }
}

// 保存编辑后的信息
const getedit = async () => {
  console.log(editlist.value)
  let res = await deitupdateAPI({
    name: editlist.value.name,
    idCard: editlist.value.idCard,
    gender: editlist.value.gender,
    defaultFlag: editlist.value.defaultFlag,
    id: editlist.value.id
  })
  console.log(res)

  if (res.data.message == '请求成功') {
    MessageMainVue({ type: 'success', text: '修改成功~' })
    isbox.value = true
    isboxs.value = false
    iseditbox.value = false
    getlist()
  } else {
    MessageMainVue({ type: 'success', text: res.data.message })
  }
}

// 返回
const toback = () => {
  router.go(-1)
}

// 添加返回
const back = () => {
  isbox.value = true
  isboxs.value = false
  iseditbox.value = false
}

// 编辑返回
const editback = () => {
  isbox.value = true
  isboxs.value = false
  iseditbox.value = false
}

// 下一步
const getnext = () => {
  router.push('/chooseMedicine')
}
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100vh;
}
.box2 {
  width: 100%;
  height: 100vh;
}
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
.patient {
  margin-left: 0.2rem;
  .title {
    height: 0.8rem;
    font-size: 0.4rem;
    line-height: 0.8rem;
  }
  .prompt {
    height: 0.6rem;
    line-height: 0.6rem;
    font-size: 0.27rem;
    color: #848484;
  }
}
.add-patient {
  margin-top: 0.2rem;
  margin-left: 5%;
  width: 90%;
  height: 1.3rem;
  background: #fafafa;
  border-radius: 0.10667rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.53333rem 0;
  color: $themecolor;
  font-size: 0.27rem;
}
.patientlist {
  margin-top: 0.2rem;
  margin-left: 5%;
  width: 90%;

  border-radius: 0.10667rem;

  font-size: 0.27rem;
  .patientitem {
    margin-top: 0.2rem;
    width: 100%;
    height: 2.4rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #fafafa;
    .message {
      margin-top: 0.2rem;
      span {
        background: $themecolor;
        color: white;
      }
      p {
        font-size: 0.35rem;
      }
    }
    .editing {
      color: $themecolor;
      float: left;
    }
  }
}
</style>
