<script lang="ts" setup name="AppTopnav">
import useStore from '@/store'
import { useRouter } from 'vue-router'

const { user } = useStore()
const router = useRouter()
const logout = () => {
  // 1. 确认消息提示
  // 2. 清除本地和Pinia中的个人信息
  user.logout()
  // 3. 跳转至登陆页面
  router.push('/login')
}
</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <!-- 登陆成功显示 -->
        <template v-if="user.userInfo.token">
          <li>
            <RouterLink to="/"><i class="iconfont icon-user"></i>
              {{ user.userInfo.nickname || user.userInfo.account }}
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/" @click="logout">退出登录</RouterLink>
          </li>
        </template>
        <!-- 未登陆显示 -->
        <template v-else>
          <li>
            <RouterLink to="/login">请先登录</RouterLink>
          </li>
          <li>
            <RouterLink to="/">免费注册</RouterLink>
          </li>
        </template>

        <li>
          <RouterLink to="/">我的订单</RouterLink>
        </li>
        <li>
          <RouterLink to="/">会员中心</RouterLink>
        </li>
        <li>
          <RouterLink to="/">帮助中心</RouterLink>
        </li>
        <li>
          <RouterLink to="/">关于我们</RouterLink>
        </li>
        <li>
          <RouterLink to="/"><i class="iconfont icon-phone"></i>手机版</RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="less">
.app-topnav {
  background: #333;

  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;

    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: @xtxColor;
        }
      }

      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>