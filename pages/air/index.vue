<template>
  <div class="main">
    <h3>
      <span class="iconfont iconfeiji"></span>
      <i>国内机票</i>
    </h3>
    <el-row type="flex" justify="space-between">
      <div class="center">
        <div class="one">
          <span @click="handelChangeCity" class="two">换</span>
        </div>

        <el-row class="changeFly" type="flex">
          <span
            :class="{active:index===current}"
            @click="changeColor(index)"
            v-for="(item,index) in tabs"
            :key="index"
          >
            {{item.name}}
            <i :class="item.icon"></i>
          </span>
        </el-row>
        <!-- fetch-suggestions:远程获取建议 -->
        <!-- select:选择下拉框内容触发 -->

        <el-form label-width="80px">
          <el-form-item label="出发城市">
            <el-autocomplete
              :fetch-suggestions="querySearchAsync"
              placeholder="请搜索出发城市"
              v-model="form.departCity"
              @select="handelCity"
            ></el-autocomplete>
          </el-form-item>
          <!-- @select="handleSearch" -->
          <el-form-item label="到达城市">
            <el-autocomplete
              :fetch-suggestions="querySearchAsync"
              placeholder="请搜索到达城市"
              v-model="form.destCity"
              @select="handelArriveCity"
            ></el-autocomplete>
          </el-form-item>

          <el-form-item label="出发时间">
            <el-date-picker
              v-model="form.departDate"
              type="date"
              placeholder="选择日期"
              style="width:80%"
              @change="changeData"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label>
            <el-button @click="Handelsubmit" class="btn">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="right">
        <img src="./pic_sale.jpeg" alt />
      </div>
    </el-row>

    <div class="footer">
      <el-row type="flex" justify="space-around">
        <span class="iconfont iconweibiaoti-_huabanfuben">
          <i>100%航协认证</i>
        </span>
        <i>|</i>
        <span class="iconfont iconbaozheng">
          <i>出行保证</i>
        </span>
        <i>|</i>
        <span class="iconfont icondianhua">
          <i>7x24小时出行保证</i>
        </span>
      </el-row>
    </div>
    <div class="last">
      <h3>
        <span class="iconfont icontejiajipiao"></span>
        <i>特惠机票</i>
      </h3>
    </div>

    <div class="cp">
      <el-row type="flex" class="flytacit" justify="space-between">
        <el-col class="flywhere" v-for="(item,index) in sales" :key="index">
          <nuxt-link
            :to="`/air/flights?departCity=${item.departCity}&departCode=${item.departCode}&destCity=${item.destCity}&destCode=${item.destCode}&departDate=${item.departDate}`"
          >
            <img :src="item.cover" alt />
            <el-row class="flymuch" type="flex" justify="space-between">
              <span>{{item.departCity}}-{{item.destCity}}</span>
              <span>{{item.price}}</span>
            </el-row>
          </nuxt-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data() {
    return {
      current: 0,

      sales: [],

      tabs: [
        { icon: 'iconfont icondancheng', name: '单程' },
        { icon: 'iconfont iconshuangxiang', name: '往返' }
      ],

      form: {
        departCity: '', //出发城市
        departCode: '', //触发城市的代码
        destCity: '', //到达城市
        destCode: '', //到达城市的代码
        departDate: '' //粗发日期
      }
    }
  },
  methods: {
    changeColor(index) {
      this.current = index
      if (index === 1) {
        this.$alert('暂时未开通往返', {
          type: 'warning'
        })
        return
      }
    },
    handelChangeCity() {
      const { departCity, departCode, destCity, destCode } = this.form
      this.form.departCity = destCity
      this.form.departCode = destCode
      this.form.destCity = departCity
      this.form.destCode = departCode
    },
    querySearchAsync(value, cb) {
      if (!value) {
        cb([])
        return
      }
      this.$axios({
        url: '/airs/city',
        params: {
          name: value
        }
      }).then(res => {
        // console.log(res)
        //  这是加value之前的data
        const { data } = res.data
        //这是加value之后的data
        const newData = data.map(v => {
          //   强行把value加进去
          v.value = v.name.replace('市', '')
          return v
        })
        this.form.departCity = newData[0].value
        this.form.departCode = newData[0].sort
        cb(newData)
      })
    },
    querySearchAsync(value, cb) {
      if (!value) {
        cb([])
        return
      }
      this.$axios({
        url: '/airs/city',
        params: {
          name: value
        }
      }).then(res => {
        console.log(res)
        //  这是加value之前的data
        const { data } = res.data
        //这是加value之后的data
        const newData = data.map(v => {
          //   强行把value加进去
          v.value = v.name.replace('市', '')
          return v
        })
        this.form.destCity = newData[0].value
        this.form.destCode = newData[0].sort
        cb(newData)
      })
    },
    handelCity(item) {
      // console.log(item)
      this.form.departCity = item.value
      this.form.departCode = item.sort
    },
    handelArriveCity(item) {
      this.form.destCity = item.value
      this.form.destCode = item.sort
    },
    changeData(value) {
      // console.log(value)
      this.form.departDate = moment(value).format('YYYY-MM-DD')
    },
    Handelsubmit() {
      // 定义规则
      // console.log(this.form)
      const rules = {
        departCity: {
          value: this.form.departCity,
          message: '请选择你的出发城市'
        },
        destCity: {
          value: this.form.destCity,
          message: '请选择你的到达城市'
        },
        departDate: {
          value: this.form.departDate,
          message: '请选择你的出发日期'
        }
      }
      // console.log( Object.keys(rules))

      let valid = true
      Object.keys(rules).forEach(v => {
        if (!valid) return
        if (!rules[v].value) {
          valid = false
          this.$message.warning(rules[v].message)
        }

        //$router跳转时,path:'路径',后面带数据的参数是 query:this.form
        //   name:'名称'跳转,后面带数据用  params:this.form
        if (valid) {
          this.$router.push({ path: '/air/flights', query: this.form })
          // query = this.form
        }
      })

      //把搜索的数据存储到本地
      //  先建立一个JSON格式的数组,并且拿出这个数组
      const airs = JSON.parse(localStorage.getItem('airs')) || []
      airs.push(this.form)
      localStorage.setItem('airs', JSON.stringify(airs))

      // .push(this.form)
      //  把搜索的输出存储到这个数组中
      // airs.push(this.form)
      //  把新生成的数组保存起来
      // localStorage.setItem('airs', JSON.stringify(airs))
    }
  },
  mounted() {
    this.$axios({
      url: '/airs/sale'
    }).then(res => {
      console.log(res)
      this.sales = res.data.data
    })
  }
}
</script>
<style lang="less" scoped>
.main {
  width: 1000px;
  margin: 0 auto;

  h3 {
    height: 50px;
    line-height: 50px;
    color: #fcb404;
    font-weight: 400;
  }
  .center {
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    width: 350px;
    height: 350px;
    position: relative;
    .one {
      height: 57px;
      width: 37px;
      position: absolute;
      top: 92px;
      right: 26px;
      border-top: 1px solid #333;
      border-bottom: 1px solid #333;
      border-right: 1px solid #333;
      z-index: 10;
      .two {
        position: absolute;
        top: 16px;
        right: -10px;
        display: block;
        height: 20px;
        width: 20px;
        line-height: 20px;
        text-align: center;
        background: #ccc;
        color: #fff;
        cursor: pointer;
      }
    }

    .changeFly {
      span {
        display: block;
        width: 179px;
        height: 48px;
        line-height: 48px;
        text-align: center;
        margin-bottom: 20px;
        background: #eeeeee;
        cursor: pointer;
        box-sizing: border-box;
        //  border-top: 3px solid #fcb404;

        &.active {
          background: #fff;
          border-top: 3px solid #fcb404;
        }
      }
    }
    .el-form {
      .el-input {
        width: 214px;
        height: 40px;
      }
      .el-date-picker {
        width: 200px;
        height: 40px;
      }
      .btn {
        width: 214px;
        background: #409eff;
        color: #fff;
      }
    }
  }

  .footer {
    margin-top: 10px;
    border: 1px solid #ccc;
    padding: 20px 0px;

    span {
      color: #409eff;
      i {
        color: #333;
      }
    }
  }
  .last {
    height: 50px;
    line-height: 50px;
    h3 {
      color: #409eff;
    }
  }
  .cp {
    border: 1px solid #ccc;
    padding: 20px;
    margin-bottom: 30px;
    .flywhere {
      width: 225px;
      height: 140px;
      position: relative;

      img {
        width: 100%;
        height: 100%;
      }

      .flymuch {
        position: absolute;
        color: #fff;
        width: 225px;
        background: rgba(0, 0, 0, 0.5);
        bottom: 0;
        left: 0;
      }
    }
  }
}
</style>

