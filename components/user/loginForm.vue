<template>
  <el-form class="mainInput" :model="form" ref="form" :rules="rules">
    <el-form-item class="form-item" prop="username">
      <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input v-model="form.password" placeholder="请输入密码"></el-input>
    </el-form-item>

    <p>
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button @click="handelLogo" class="btn">登录</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入名字', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handelLogo() {
      // console.log(this.form)
      // 点击的时候验证是不是有内容
      this.$refs.form.validate(valid => {
        if (valid) {
          // 如果有内容就发送axios请求
          // this.$axios({
          //   url: '/accounts/login',
          //   method: 'POST',
          //   data: this.form
          // }).then(res => {
          //   // console.log(res.data)
          //  
          // })
           this.$store.dispatch('user/login',this.form)
            this.$message({
              type: 'success',
              message: '登录成功,正在跳转'
            })
          setTimeout(() => {
            this.$router.replace('/')
          }, 2000)

          //  调用user.js里面的方法和数据
          //  this.$store.dispatch('user/login',this.form).then(res=>{
          //    console.log(res.data)
          //  })
          //  console.log(user/login)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.mainInput {
  width: 350px;
  margin: 0 auto;
  margin-top: 20px;

  p {
    height: 20px;
    font-size: 12px;
    text-align: right;
  }
  .btn {
    width: 350px;
    margin-bottom: 15px;
  }
}
</style>

