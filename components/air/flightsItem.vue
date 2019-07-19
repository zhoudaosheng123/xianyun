<template>
  <div class="main" @click="isShow=!isShow">
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="7">
        <div class="content">
          <span style="text-align:center">{{data.airline_name}}</span>
          {{data.flight_no}}
        </div>
      </el-col>

      <el-col :span="10">
        <div class="grid-content bg-purple-light">
          <el-row type="flex" justify="space-between" class="flight-info-center">
            <el-col :span="8" class="flight-airport">
              <strong>{{data.dep_time}}</strong>
              <span>{{data.org_airport_name}}</span>
            </el-col>
            <el-col :span="8" class="flight-time">
              <span class="theTime">{{rinkTime}}</span>
            </el-col>
            <el-col :span="8" class="flight-airport">
              <strong>{{data.arr_time}}</strong>
              <span>{{data.dst_airport_name}}</span>
            </el-col>
          </el-row>
        </div>
      </el-col>

      <el-col :span="7">
        <div class="grid-content bg-purple">
          <div class="purple">
            <i>￥</i>
            <strong>{{data.base_price / 2}}</strong>
            <i>起</i>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- v-for="(item,index)in data.seat_infos" :key="index" -->
    <div class="flight-recommend" v-show="isShow">
      <!-- 隐藏的座位信息列表 -->
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="4">低价推荐</el-col>
        <el-col :span="20">
          <el-row
            type="flex"
            justify="space-between"
            align="middle"
            class="flight-sell"
            v-for="(item, index) in data.seat_infos"
            :key="index"
          >
            <el-col :span="16" class="flight-sell-left">
              <span>{{ item.name }}</span>
              | {{ item.supplierName }}
            </el-col>
            <el-col :span="5" class="price">￥{{ item.org_settle_price }}</el-col>
            <el-col :span="3" class="choose-button">
              <el-button type="warning" size="mini" @click="chooseAir(data.id,item.seat_xid)">选定</el-button>
              <p>剩余：{{item.discount}}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// import { resolve } from 'dns';
// import { type } from 'os'
export default {
  data() {
    return {
      isShow: false,
     
    }
  },

  props: {
    data: {
      type: Object,
      default: {}
    }
  },

  methods: {
    chooseAir(id,seat_xid){
      this.$router.push({
        path:'order',
        query:{id,seat_xid} 
      })
    }
  },
  //计算时间
  computed: {
    rinkTime() {
      //  转换为分钟

      const dep = this.data.dep_time.split(':')
      //   console.log(dep)
      const dep_time = dep[0] * 60 + +dep[1]
      const arr = this.data.arr_time.split(':')
      const arr_time = arr[0] * 60 + +arr[1]
      let time = arr_time - dep_time
      if (time < 0) {
        time = arr_time + 24 * 60 - dep_time
      }
      //   转换为小时,得到需要的时间
      return `${Math.floor(time / 60)}时${time % 60}分`
    }
  }
}
</script>

<style lang="less" scoped>
.row-bg {
  padding: 20px 30px;
  border: 1px solid #ccc;
  margin-top: 20px;
  //   margin-bottom: 20px;
  .content {
    padding: 20px 40px;
    text-align: center;
  }
  .grid-content {
    .flight-info-center {
      .flight-time {
        padding: 20px;
      }
      .flight-airport {
        padding: 0 25px;
        strong {
          display: block;
          font-size: 20px;
        }
        span {
          font-size: 12px;
        }
      }
    }
  }
}
.purple {
  text-align: center;
  padding: 20px;
  strong {
    font-size: 18px;
    color: orange;
  }
}

.flight-sell {
  border-bottom: 1px #eee solid;
  padding: 10px 0;

  &:last-child {
    border-bottom: none;
  }

  .flight-sell-left {
    font-size: 12px;
    span {
      color: green;
    }
  }

  .price {
    font-size: 20px;
    color: orange;
  }

  .choose-button {
    text-align: center;
    color: #666;
    button {
      display: block;
      width: 100%;
      margin-bottom: 5px;
    }
  }
}
</style>
