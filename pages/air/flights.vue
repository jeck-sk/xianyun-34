<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div>
          <FlightsFilters :data="cacheFlightsData" @setdatalist='setdatalist'/>
        </div>

        <!-- 航班头部布局 -->
        <div>
          <FlightsListHead />
        </div>

        <!-- 航班信息 -->
        <div>
          <FlightsItem v-for="(item,index) in dataList" :key="index" :data="item" />

          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="cacheFlightsData.total"
          ></el-pagination>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside/>
      </div>
    </el-row>
  </section>
</template>

<script>
// import moment from "moment";
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
import FlightsFilters from "@/components/air/flightsFilters.vue";
import FlightsAside from "@/components/air/flightsAside.vue";

export default {
   watch: {
        $route(){
             this.getdata();
        }
    },
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
  data() {
    return {
     cacheFlightsData: {
        flights: {},
        info: {},
        options: {}
      },
      dataList: [],
      // 页数
      pageIndex: 1,
      //   条数
      pageSize: 5,
      //   总数
        total: 0
    };
  },
  methods: {
    //   条数
    handleSizeChange(value) {
      this.pageSize = value;
      this.pageIndex = 1;
      this.setdatalist();
    },
    //   页数
    handleCurrentChange(value) {
      this.pageIndex = value;
      this.setdatalist();
    },
    setdatalist(arr) {
      if(arr){
       
        this.flightsData.flights = arr;
        this.cacheFlightsData.total = arr.length;
      }
      const start = (this.pageIndex - 1) * this.pageSize;
      const end = start + this.pageSize;
    //   console.log(start);
      this.dataList = this.flightsData.flights.slice(start, end);
    },
    //  封装
    getdata() {
      this.$axios({
        url: '/airs',
        params: this.$route.query //url的五个参数
      }).then(res => {
        this.flightsData = res.data
        // this.total=this.flightsData.flights.length
        this.cacheFlightsData = {...res.data}
        this.setdatalist();
      });
    }
  },
  mounted() {
    this.getdata();
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>