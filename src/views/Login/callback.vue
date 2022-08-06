<script lang="ts" setup name="LoginCallback">
import LoginHeader from './components/LoginHeader.vue'
import LoginFooter from './components/LoginFooter.vue'
import CallbackBind from './components/CallbackBind.vue'
import CallbackPatch from './components/CallbackPatch.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import useStore from '@/store'
import Message from '@/components/message'

const { user } = useStore()

const router = useRouter()

const activeName = ref<'bind' | 'edit'>('bind')

// QQ三方登录中使用到的openAPI
// QC.Login.getMe((openId, accessToken) => {
//   // openId  是用户身份的唯一标识，使用QQ登陆后会返回一个字符串，openId要携带发送请求
//   // accessToken  是QQ三方提供的token ，如果项目中没有自己的token ，可以使用这个
//   console.log(openId)

// })

/* 
  三种情况：
  1. 验证了openId 是在数据库中存储的，信息都是完善的 ===> 直接去首页
*/

const openID = ref('')

// 情况1. 获取是否QQ三方登陆成功
if (QC.Login.check()) {
  // 2. 获取openId
  QC.Login.getMe(async (openId: string) => {
    openID.value = openId
    // 3. 携带openId向服务器发送请求，告诉我们第三方登录失败
    await user.qqLogin(openId)
    Message.success('第三方登录成功')
    router.push('/')
  })
}

</script>

<template>
  <LoginHeader>联合登陆</LoginHeader>
  <section class="container">
    <nav class="tab">
      <a href="javascript:;" @click="activeName = 'bind'" :class="{ active: activeName === 'bind' }">
        <i class="iconfont icon-bind" />
        <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a href="javascript:;" @click="activeName = 'edit'" :class="{ active: activeName === 'edit' }">
        <i class="iconfont icon-edit" />
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <div class="tab-content" v-if="activeName === 'bind'">
      <CallbackBind :openID="openID"></CallbackBind>
    </div>
    <div class="tab-content" v-else>
      <CallbackPatch></CallbackPatch>
    </div>
  </section>
  <LoginFooter></LoginFooter>
</template>

<style scoped lang="less">
.container {
  padding: 25px 0;
}

.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;

  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;

    i {
      font-size: 22px;
      vertical-align: middle;
    }

    span {
      vertical-align: middle;
      margin-left: 4px;
    }

    &.active {
      color: @xtxColor;
      border-color: @xtxColor;
    }
  }
}

.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>