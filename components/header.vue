<template>
  <div class="header">
    <!-- logo -->
    <el-row type="flex" justify="space-between" class="main">
      <div class="logo">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
        </nuxt-link>
      </div>
      <!-- 菜单栏 -->
      <el-row type="flex" class="navs">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>

     
      <div v-if="!$store.state.user.userInfo.token">
        <nuxt-link to="/user">登录/注册</nuxt-link>
      </div>
      <div v-if="$store.state.user.userInfo.token">
        <el-dropdown>
          <span class="el-dropdown-link">
            <!-- 头像 -->
            <img :src="$axios.defaults.baseURL + $store.state.user.userInfo.user.defaultAvatar" alt />
            <!-- 用户名 -->
            {{ $store.state.user.userInfo.user.nickname }}
            <i
              class="el-icon-arrow-down el-icon--right"
            ></i>
          </span>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="yourWorld">个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="handelLogoOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-row>

    <!-- 登录和注册 -->

    <!-- 登录成功的页面 -->

    <!-- 登录失败跳转的页面 -->
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  methods: {

   yourWorld(){
   this.$alert('我的世界岂是你能看到的',{
     type:'warning'
   })
   },


    handelLogoOut(){
    //   clearUserInfo(state){
    //     state.userInfo = {
    //         token: "",
    //         user: {}
    //     }
    // }
     
   this.$store.commit('user/clearUserInfo')
   this.$message({
     type:'success',
     message:'退出成功'
   })
    }
  }
}
</script>
<style lang="less" scoped>
.header {
  background-color: #fff;
  height: 60px;
  line-height: 60px;
  box-shadow: 0 3px 3px #ccc;
  box-sizing: border-box;
  .main {
    width: 1000px;
    margin: 0 auto;
    padding-bottom: 8px;

    .logo {
      width: 156px;
      padding-top: 8px;

      img {
        display: block;
        width: 100%;
      }
    }
    .navs {
      flex: 1;
      margin: 0 30px;

      a {
        display: block;
        padding: 0 20px;
        height: 60px;
        line-height: 60px;
        box-sizing: border-box;

        &:hover {
          color: #409eff;
          border-bottom: 2px solid #409eff;
        }
      }

      .nuxt-link-exact-active {
        background: #409eff;
        color: #fff;

        &:hover {
          color: #fff;
        }
      }

      .el-dropdown-link {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
    }
  }
}
.el-dropdown-link {
  img {
    width: 36px;
    height: 36px;
    vertical-align: middle;
  }
}
.messge {
  display: inline-block;
}
</style>


