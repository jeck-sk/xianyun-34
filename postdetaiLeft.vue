<template>
  <div class="left_content">
    <h1>{{data.title}}</h1>
    <div class="content"  v-html="data.content">{{data.content}}</div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      data: {},
    };
  },
  methods: {
    init() {
      const { id } = this.$route.query
      // setTimeout(() => {
      this.$axios({
        url: "/posts",
        params: { 
             id}
      }).then(res => {
        console.log(res, 777);
        console.log(this.$route.query);
        this.data = res.data.data[0]
        this.$store.commit("post/setPostData", res.data.data[0])
      })
    }
  },
  mounted(){
   this.init()
  },
  watch: {
    $route() {
      this.init()
    },
  }
};
</script>
<style <style lang="less" scoped>
.left_content {
  h1 {
    border-bottom: 2px solid #eeee;
  }
  .content{
       margin-top: 20px;
     width: 700px;
     overflow: hidden;
   /deep/ p:nth-child(2){
        margin: 10px 0;
      
      /deep/span:nth-child(1){
          img{
               width:700px;
          }
        }
    }
   
  }
  
   /deep/ p:nth-child(9){
      img{
           width: 700px;
      }
    } 
    /deep/ p:nth-child(3){
      img{
           width: 700px;
      }
    } 
     /deep/ p:nth-child(10){
      img{
           width: 700px;
      }
    } 
     /deep/ p:nth-child(30){
      img{
           width: 700px;
      }
    } 
      /deep/ p:nth-child(36){
      img{
           width: 700px;
      }
    } 
      /deep/ p:nth-child(39){
      img{
           width: 700px;
      }
    } 
   
}
</style>
