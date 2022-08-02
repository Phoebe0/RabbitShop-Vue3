<script name="CallbackBind" lang="ts" setup>
import { ref } from 'vue'
import { QQUserInfo } from '@/types/user'
import useStore from '@/store/index.js'
import { useForm, useField } from 'vee-validate'
import { codeRule, mobileRule } from '@/utils/validate'
import Message from '@/components/message/index'
import { useCountDown } from '@/utils/hooks'
import router from '@/router/index.js'

const props = defineProps({
  openID: {
    type: String,
    required: true
  }
})

const { user } = useStore()

// 情况2 有手机号，然后和qq做一次绑定
const info = ref<QQUserInfo>({} as QQUserInfo)
// 获取用户信息
QC.api('get_user_info').success((res: any) => {
  info.value = res.data
})

const { validate } = useForm({
  validationSchema: {
    mobile: mobileRule,
    code: codeRule
  }
})
const { value: mobile, errorMessage: mobileMessage, validate: validateMobile } = useField<string>('mobile')
const { value: code, errorMessage: codeMessage } = useField<string>('code')

// 发送验证码
const mobileRef = ref<HTMLInputElement>()
const { time, start } = useCountDown(6)
const sendCode = async () => {
  // 6. 如果在倒计时期间，禁止点击按钮
  if (time.value > 0) return
  // 1. 要先验证手机号是否合法
  const { valid } = await validateMobile()
  // 2. 校验手机号后，让手机号输入框获取焦点
  if (!valid) return mobileRef.value!.focus()
  // 3. 发送验证码请求
  await user.sendQQbindMsg(mobile.value)
  // 4. 提示
  Message.success('验证码已发送')
  // 5. 为按钮开启倒计时
  start()
}

// 绑定的手机号
const handleSubmit = async () => {
  // 1. 预校验
  const res = await validate()
  if (!res.valid) return
  await user.bindQQLogin(props.openID, mobile.value, code.value)
  Message.success('绑定成功')
  router.push('/')
}

</script>
<template>
  <div class="xtx-form">
    <div class="user-info">
      <img :src="info.figureurl_qq_1" alt="" />
      <p>Hi，{{ info.nickname }} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录</p>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <input ref="mobileRef" v-model="mobile" class="input" type="text" placeholder="绑定的手机号" />
      </div>
      <div class="error">
        {{ mobileMessage }}
      </div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <input v-model="code" class="input" type="text" placeholder="短信验证码" />
        <span class="code" @click="sendCode">{{ time > 0 ? `${time}s后发送` : '发送验证码' }}</span>
      </div>
      <div class="error">
        {{ codeMessage }}
      </div>
    </div>
    <a href="javascript:;" class="submit" @click="handleSubmit">立即绑定</a>
  </div>
</template>

<style scoped lang="less">
.user-info {
  width: 320px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 25px;

  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }

  p {
    padding-left: 10px;
  }
}

.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;

  &:hover {
    cursor: pointer;
  }
}
</style>