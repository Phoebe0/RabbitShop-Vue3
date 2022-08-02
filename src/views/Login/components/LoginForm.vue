<script lang="ts" setup name="LoginForm">
import { ref, watch } from 'vue'
import useStore from '@/store'
import Message from '@/components/message/index'
import { useRouter } from 'vue-router'
import { useForm, useField } from 'vee-validate'
import { useCountDown } from '@/utils/hooks'
import { accountRule, passwordRule, isAgreeRule, mobileRule, codeRule } from '@/utils/validate'


const { user } = useStore()
const router = useRouter()

const { validate, resetForm } = useForm({
  // 定义数据的默认值【真正开发中不写】
  // initialValues: {
  //   acount: 'cdshi0074',
  //   password: '123456',
  //   isAgree: true,
  //   mobile: '13012345756',
  //   code: '123456'
  // },
  validationSchema: {
    account: accountRule,
    password: passwordRule,
    isAgree: isAgreeRule,
    mobile: mobileRule,
    code: codeRule
  }
})
const { value: account, errorMessage: accountMessage } = useField<string>('account')
const { value: password, errorMessage: passwordMessage } = useField<string>('password')
const { value: isAgree, errorMessage: isAgreeMessage } = useField<boolean>('isAgree')
const { value: mobile, errorMessage: mobileMessage, validate: validateMobile } = useField<string>('mobile')
const { value: code, errorMessage: codeMessage } = useField<string>('code')

const activeName = ref<'account' | 'mobile'>('account')


// 登录
const handleLogin = async () => {
  // 0. 发送请求之前，需要表单预校验
  const res = await validate()
  console.log(res)
  // if (!res.valid) return // 校验规则没通过，不发请求
  if (activeName.value === 'account') {
    if (res.errors.account || res.errors.password || res.errors.isAgree) return
    // 1.1 发送登录请求 (账号+密码登录)
    await user.login({ account: account.value, password: password.value })
  } else {
    if (res.errors.mobile || res.errors.code || res.errors.isAgree) return
    // 1.2 发送登录请求 (手机号+验证码登录)
    await user.mobileLogin({ mobile: mobile.value, code: code.value })
  }
  // 2. 消息提示  需要等待登录成功之后在弹出提示，否则永远弹出的是success提示
  Message.success('恭喜小兔儿成功登录')
  // 3. 跳转到首页
  router.push('/')

}
// 监听activeName的变化 重置表单
watch(() => activeName.value, () => {
  resetForm()
})

// 发送验证码
const mobileRef = ref<HTMLInputElement>()
const { time, start } = useCountDown(60)
const sendCode = async () => {
  // 6. 如果在倒计时期间，禁止点击按钮
  if (time.value > 0) return
  // 1. 要先验证手机号是否合法
  const { valid } = await validateMobile()
  // 2. 校验手机号后，让手机号输入框获取焦点
  if (!valid) return mobileRef.value!.focus()
  // 3. 发送验证码请求
  await user.getCode(mobile.value)
  // 4. 提示
  Message.success('验证码已发送')
  // 5. 为按钮开启倒计时
  start()
}

</script>
<template>
  <div class="account-box">
    <!-- 右上角切换的标题 -->
    <div class="toggle">
      <a href="javascript:;" @click="activeName = 'account'" v-if="activeName === 'mobile'">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a href="javascript:;" @click="activeName = 'mobile'" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <div class="form">
      <!-- 表单（两个，互斥渲染） -->
      <template v-if="activeName === 'account'">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <input v-model="account" type="text" placeholder="请输入用户名或手机号" />
          </div>
          <div class="error" v-if="accountMessage">
            <i class="iconfont icon-warning" />
            {{ accountMessage }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <input v-model="password" type="password" placeholder="请输入密码" />
          </div>
          <div class="error" v-if="passwordMessage">
            <i class="iconfont icon-warning" />
            {{ passwordMessage }}
          </div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <input ref="mobileRef" v-model="mobile" type="text" placeholder="请输入手机号" />
          </div>
          <div class="error" v-if="mobileMessage">
            <i class="iconfont icon-warning" />
            {{ mobileMessage }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <input v-model="code" type="password" placeholder="请输入验证码" />
            <span class="code" @click="sendCode">{{ time > 0 ? `${time}s后重新发送` : '发送验证码' }}</span>
          </div>
          <div class="error" v-if="codeMessage">
            <i class="iconfont icon-warning" />
            {{ codeMessage }}
          </div>
        </div>
      </template>
      <!-- 同意条款 -->
      <div class="form-item">
        <div class="agree">
          <XtxCheckbox v-model="isAgree"></XtxCheckbox>
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <div class="error" v-if="isAgreeMessage">
          <i class="iconfont icon-warning" />
          {{ isAgreeMessage }}
        </div>
      </div>
      <!-- 登录按钮 -->
      <a href="javascript:;" class="btn" @click="handleLogin">登录</a>
    </div>
    <!-- 第三方登录 -->
    <div class="action">
      <a
        href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback">
        <img width="20"
          src="https://img1.baidu.com/it/u=2351789609,2312769628&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=592" alt="">
      </a>
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    a {
      color: @xtxColor;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 40px;

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        >i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            border-color: @priceColor;
          }

          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }

      >.error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
      cursor: pointer;
    }

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>