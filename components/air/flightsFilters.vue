<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{data.info.departCity}} - {{data.info.destCity}}
        /
        {{data.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
          <el-option
            v-for="(item, index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间" @change="handleFlightTimes">
          <el-option
            v-for="(item, index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00-${item.to}:00`"
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司" @change="handleCompany">
          <el-option
            v-for="(item, index) in data.options.company"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" laceholder="机型" @change="handleAirSize">
          <el-option
            v-for="(item, index) in airsize"
            :key="index"
            :label="item.type"
            :value="item.size"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      airport: '', // 机场
      flightTimes: '', // 出发时间
      company: '', // 航空公司
      airSize: '', // 机型大小

      airsize: [
        { type: '大', size: 'L' },
        { type: '小', size: 'M' },
        { type: '中', size: 'S' }
      ]
    }
  },
  //    组件传值
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  methods: {
    // 选择机场时候触发
    handleAirport(value) {
      //  创建一个过滤后只有当前选项的数组
      const arr = this.data.flights.filter(v => {
        return v.org_airport_name === value
      })
      this.$emit('changeFlights', arr)
    },

    // 选择出发时间时候触发
    handleFlightTimes(value) {
      // console.log(value)s
      const [from, to] = value.split(',')
      //  比如 [item.from - 12:00]
      // console.log(from,to)
      const arr = this.data.flights.filter(v => {
        const [start] = v.dep_time.split(':')
        // console.log(this.data.flights)
        return +from <= +start && +start < +to
      })
      this.$emit('changeFlights', arr)
    },

    // 选择航空公司时候触发
    handleCompany(value) {
      // console.log(value)
      //  过滤flights数组里面的数据,留下当前的这一条数据
      const arr = this.data.flights.filter(v => {
        return v.airline_name === value
      })
      //   把过滤后的数据传递给子组件
      this.$emit('changeFlights', arr)
    },

    // 选择机型时候触发
    handleAirSize(value) {
      const arr = this.data.flights.filter(v => {
        return v.plane_size === value
      })
      this.$emit('changeFlights', arr)
    },

    // 撤销条件时候触发
    handleFiltersCancel() {
      ;(this.airport = ''), // 机场
        (this.flightTimes = ''), // 出发时间
        (this.company = ''), // 航空公司
        (this.airSize = ''),
        this.$emit('changeFlights', this.data.flights)
    }
  }
}
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
  margin-top: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>


