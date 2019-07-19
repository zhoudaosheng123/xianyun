<template>
  <el-row type="flex" justify="space-between">
    <orderForm @getSetInfo='getSetInfo'/>

    <!-- <asideForm/> -->
  </el-row>
</template>


<script>
import orderForm from '@/components/air/orderForm.vue'
// import asideForm from '@/components/air/asideForm.vue'
export default {
  data() {
    return {
     setInfo:{
         insurances:[]
     } 
    }
  },
  components: {
    orderForm
    //    asideForm
  },
  methods:{
      getSetInfo(data){
          this.setInfo=data
          console.log(this.setInfo)
      }
  }
}
</script>

<style lang="less" scoped>
.main {
  width: 1000px;
  margin: 0 auto;
  margin-top: 20px;
}
</style>
