<template>
  <div class="container">
    <!-- 幻灯片 -->
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <div
          class="banner-image"
          :style="`
                background: url(${$axios.defaults.baseURL +item.url})  center center no-repeat;
                background-size:contain contain;
                `"
        ></div>
      </el-carousel-item>
    </el-carousel>
    <!-- tab栏 -->

    <el-row class="tabs">
      <el-row type="flex" class="tab">
        <span
          v-for="(item,index) in tabs"
          :key="index"
          @click="handClick(index)"
          :class="{active:current===index}"
        >
          <i>{{item.title}}</i>
        </span>
      </el-row>
      <el-row type="flex" class="searchBox">
        <el-input type="flex" class="serch" :placeholder="tabs[this.current].placeholder"></el-input>
        <i class="el-icon-search"></i>
      </el-row>
    </el-row>
  </div>
</template>
 
<script>
// import axios from 'axios'
export default {
  data() {
    return {
      banners: [],
      tabs: [
        {
          title: '攻略',
          placeholder: '搜索城市'
        },
        { title: '酒店', placeholder: '请输入城市搜索酒店' },
        { title: '机票', placeholder: '' }
      ],
      // 记录当前显示页面的下标
      current: 0
    }
  },
  // 请求轮播图的数据接口
  mounted() {
    // 怎么把axios添加到实例
    // Vue.prototype.$axios = axios
    // console.log(1111111111111111111)
    // 请求轮播图接口
    // axios({
    //   //  在nuxt.congig里面配置过url
    //   url: '/scenics/banners'
    // }).then(res => {
    //   console.log(res.data)
    // })
    // console.log(11111111111111111111111111111111111111111111)
    this.$axios({
      url: '/scenics/banners'
    }).then(res => {
      console.log(res.data)
      const { data } = res.data
      this.banners = data
    })
  },
  methods: {
    handClick(index) {
      this.current = index
      if (index === 2) {
        this.$router.push('/air')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;

  /deep/ .el-carousel__container {
    height: 700px;
  }
  .banner-image {
    width: 100%;
    height: 100%;
  }
  .banner-content {
    z-index: 9;
    width: 1000px;
    position: absolute;
    left: 50%;
    top: 45%;
    margin-left: -500px;
    border-top: 1px transparent solid;
  }
  //  tab栏的样式
  .tabs {
    position: absolute;
    top: 45%;
    left: 50%;
    margin-left: -500px;
    width: 1000px;
    z-index: 100;
    .tab {
      margin-left: 219px;

      .active {
        i {
          color: #333;
        }
        &::after {
          background: #eee;
        }
      }
      span {
        width: 82px;
        height: 36px;
        display: block;
        position: relative;
        margin-right: 8px;
        cursor: pointer;

        i {
          position: absolute;
          z-index: 2;
          display: block;
          width: 100%;
          height: 100%;
          line-height: 30px;
          text-align: center;
          color: #fff;
        }

        &:after {
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          content: '';
          width: 100%;
          height: 100%;
          border: 1px rgba(255, 255, 255, 0.2) solid;
          border-bottom: none;
          transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
          transform-origin: bottom left;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 1px 2px 0 0;
          box-sizing: border-box;
        }
      }
    }
  }
}

.searchBox {
  position: relative;
  width: 562px;
  margin: 0 auto;
  .serch {
    width: 562px;
    height: 47px;
    box-sizing: unset;
  }
  i {
    display: inline-block;
    position: absolute;
    right: 0;
    top: 0;
    font-size: 20px;
    font-weight: 700;
    width: 47px;
    height: 47px;
    line-height: 47px;
    text-align: center;
  }
}
</style>

