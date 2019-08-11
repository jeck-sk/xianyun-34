<template>
  <div class="right_Gonglue">
    <h3>相关攻略</h3>
    <div class="correlationList">
      <li v-for="(item,index) in correlationList" :key="index" @click.prevent="handleShow(item.id)">
        <div class="correlation_image">
          <img :src="item.images[0]" alt />
        </div>
        <div class="correlation_text">
          <p>{{item.title}}</p>
          <div class="correlation_detail">
            <span>{{item.updated_at |formatDate}}</span>
            <span>阅读{{item.watch}}</span>
          </div>
        </div>
      </li>
    </div>
  </div>
</template>
<script>
import { formatDate } from "assets/data.js";
export default {
  data() {
    return {
      correlationList: []
    };
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  methods: {
    handleShow(id) {
        console.log (id)
      this.$router.push("/post/detail?id=" + id);
    
    }
  },
   
  mounted() {
    this.$axios({
      url: "/posts/recommend",
      parmas: {
        id: this.$route.query.id
      }
    }).then(res => {
      console.log(res, 123);
      this.correlationList = res.data.data;
    });
  }
};
</script>
<style lang="less" scoped>
.right_Gonglue {
  h3 {
    height: 40px;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
  }
}
.correlation_image {
  width: 30%;
  margin-right: 10px;
  img {
    display: block;
    width: 100%;
    height: 80px;
  }
}
li {
  list-style: none;
}
.correlationList li {
  position: relative;
  cursor: pointer;
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  .correlation_detail {
    position: absolute;
    bottom: 8px;
    display: flex;
  }
}
</style>
