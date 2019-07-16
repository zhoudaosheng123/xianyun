<template>
  <el-form :model="form" ref="form" :rules="rules">
    <el-form-item prop="username">
      <el-input v-model="form.username" placeholder="用户名手机"></el-input>
    </el-form-item>

    <el-form-item prop="captcha" class="form-item">
      <el-input v-model="form.captcha" placeholder="验证码">
        <template slot="append">
          <el-button @click="handelCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item prop="nickname">
      <el-input v-model="form.nickname" placeholder="你的名字"></el-input>
    </el-form-item>

    <el-form-item prop="password">
      <el-input v-model="form.password" placeholder="密码"></el-input>
    </el-form-item>

    <el-form-item prop="password">
      <el-input v-model="form.checkPassword" placeholder="再次输入密码"></el-input>
    </el-form-item>
    <el-button @click="handelRegister" class="btn">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: '',
        nickname: '',
        captcha: '',
        password: '',
        checkPassword: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名或者手机号', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
        checkPassword: [{ validator: validatePass, trigger: 'blur' }]
      }
    }
  },
  methods: {
    handelRegister() {
      this.$refs.form.validate(valid => {
        if (valid) {
          //  数据库里面没有checkedPassword,要把它解构出来
          const { checkPassword, ...props } = this.form
          // console.log(props, 'gugyuu')
          this.$axios({
            url: '/accounts/register',
            method: 'POST',
            data: props
          }).then(res => {
            console.log(res.data)
            //把数据存储到仓库里面
            var a = this.$store.commit('user/setUserInfo', res.data)
            console.log(a)
            this.$router.back()
          })
        }
      })
    },
    handelCaptcha() {
      if (!this.form.username) {
        this.$message({
          type: 'warning',
          message: '你的手机号,名字为空'
        })
        return
      } else if (this.form.username.trim().length !== 11) {
        this.$message({
          type: 'warning',
          message: '你的手机号格式错误'
        })
        return
      }
      // 发送请求
      const tel = ''
      console.log(tel)
      this.$axios({
        url: '/captchas',
        method: 'POST',
        data: { tel: this.form.username }
      }).then(res => {
        console.log(res)
        // const code =
        this.$message({
          type: 'success',
          message: `你的验证码为${res.data.code}`
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-form-item {
  width: 400px;
}
.btn {
  width: 400px;
  background-color: skyblue;
}
</style>

