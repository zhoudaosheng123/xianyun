<template>
  <div class="main">
    <!-- 筛选机票 -->
    <el-row type="flex" justify="space-between">
      <div>
        <flightsFilters :data="cathFlightsData" @changeFlights="changeFlights" />

        <el-row class="flyInfo" justify="space-between" type="flex" align="middle">
          <span>航空信息</span>
          <span>起飞时间</span>
          <span>到达时间</span>
          <span>价格</span>
        </el-row>

        <!-- 机票信息列表 -->
        <flightsItem v-for="(itme,index) in dataList" :key="index" :data="itme" />

        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
      <!-- 侧边栏 -->
      <flightsAside />
    </el-row>
  </div>
</template>

<script>
import flightsItem from '@/components/air/flightsItem.vue'
import flightsFilters from '@/components/air/flightsFilters.vue'
import flightsAside from '@/components/air/flightsAside.vue'
export default {
  data() {
    return {
      dataList: [],
      flightsListData: {
        flights: [],
        info: [],
        options: []
      },
      //
      cathFlightsData: {
        flights: [],
        info: [],
        options: []
      },
      pageIndex: 1,
      pageSize: 5,
      total: 0
    }
  },

   watch: {
      // 监听路由就直接写路由的函数
      $route() {
        // 路由发生变化时就刷新一次列表
        this.$axios({
          url: '/airs',
          params: this.$route.query
        }).then(res => {
          console.log(res)
          this.flightsListData = res.data
          this.cathFlightsData = { ...res.data }

          this.total = this.flightsListData.flights.length

         
          this.getdataList()
        })
      }
    },

  methods: {
    handleSizeChange(value) {
      // console.log(value)
      this.pageSize = value
      this.pageIndex = 1
      this.dataList = this.flightsListData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      )
    },

    // 切换页的时候触发
    handleCurrentChange(value) {
      //  value是当前的页数,
      // 把value赋值给this.pageSize
      this.pageIndex = value
      // 0-5,5-10,10-15
      // console.log(this.flightsListData.flights)
      // 开始的页数
      this.getdataList()
      console.log(this.flightsListData)
    },

    getdataList() {
      this.dataList = this.flightsListData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      )
    },

    // 监听路由的变化

   

    // 传递一个过滤好的数组给子组件
    changeFlights(arr) {
      //  让过滤好的数组数据覆盖住之前flights里面的数据,只留下当前创建好的这一条数据
      this.flightsListData.flights = arr
      this.getdataList()
    }
  },

  components: {
    flightsItem,
    flightsFilters,
    flightsAside
  },

  mounted() {
    // 获取机票列表数据
    this.$axios({
      url: '/airs',
      params: this.$route.query
    }).then(res => {
      console.log(res)
      this.flightsListData = res.data
      this.cathFlightsData = { ...res.data }

      this.total = this.flightsListData.flights.length

      // 要获取第一页的数据,0-5条,得到
      this.dataList = this.flightsListData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      )
    })
  }
}
</script>

<style lang="less" scoped>
.main {
  width: 1000px;
  margin: 0 auto;

  .flyInfo {
    border: 1px solid #ddd;
    padding: 0 20px;
    font-size: 12px;
    font-style: normal;
    margin-top: 20px;
    background-color: #f6f6f6;
    span {
      display: block;

      width: 25%;
      text-align: center;
      padding: 15px 0;
    }
  }
}
</style>
