<template>
  <div class="contain">
    <el-row type="flex" class="main" justify="center" align="middle">
      <div class="form-warp">
        <el-row type="flex" justify="center" class="login">
          <span
            :class="{ active:index===current}"
            v-for="(item,index) in ['登录','注册']"
            :key="index"
            @click="handClick(index)"
          >{{item}}</span>

          <!-- 登录 -->

          <!-- 注册 -->
        </el-row>
        <loginForm v-if="current===0" />
        <RegisterForm v-if="current===1" />
      </div>
    </el-row>
  </div>
</template>

<script>
import loginForm from '@/components/user/loginForm.vue'
import RegisterForm from '@/components/user/RegisterForm.vue'
export default {
  data() {
    return {
      // 当前点击的角标项
      current: 0
    }
  },

  components: {
    loginForm,
    RegisterForm
  },
  methods: {
    handClick(index) {
      this.current = index
      console.log(123)
    }
  }
}
</script>
<style lang="less" scoped>
.contain {
  height: 700px;
  background: url('../../assets/jjy.jpg');

  .main {
    height: 100%;
    width: 1000px;
    margin: 0 auto;

    .form-warp {
      // background: #fff;
      //  height:250px;
      background: rgba(255, 255, 255, 0.4);
      .login {
        width: 400px;

        span {
          display: block;
          text-align: center;
          height: 40px;
          line-height: 40px;
          width: 200px;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.4);

          &.active {
            color: orange;
            border-top: 1px solid orange;
            background: #fff;
          }
        }
      }
    }
  }
}
</style>
