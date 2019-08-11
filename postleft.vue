<template>
  <div class="left-div">
    <div class="left-div-top">
      <div class="menu">
        <div class="nav" v-for="(item,index) in data" :key="index">
          <span>{{item.type}}</span>
          <i class="fr">&gt</i>
          <div class="nev">
            <div class="nav-meun" v-for="(item,index) in item.children" :key="index">
              <span>{{index+1}}</span>
              <a
                href="javascript:,"
                @click.prevent="handleCityClick(item.city)"
                style=" color: #ffa500;"
              >{{item.city}}</a>
              <a href="javascript:,">{{item.desc}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="left-div-bottom">
      <div class="city">推荐城市</div>
      <img src="http://157.122.54.189:9093/images/pic_sea.jpeg" alt />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  },
  methods: {
    handleCityClick(item) {
      console.log(this.item, 123);
      this.$axios({
        url: "/posts?city=" + item
      }).then(res => {
        console.log(res);
        this.$store.commit("post/setCicy", res.data);
        console.log(this.$store.commit("post/setCicy", res.data));
      });
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.left-div {
  margin-right: 40px;
  width: 260px;
  .left-div-top {
    text-indent: 12px;
    border: 1px solid #eee;

    margin-bottom: 20px;
    &:hover {
      border-right: 0;
    }
    .menu {
      position: relative;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      .nav {
        height: 40;
        line-height: 40px;
        padding: 0 12px 0 0;
        border-bottom: 1px solid #eee;

        span i {
          font-size: 16px;
        }
        &:hover > span {
          color: #ffa500;
        }
        .nev {
          background: #fff;
          display: none;
          border: 1px solid #eee;
          width: 330px;
          position: absolute;
          top: 0;
          right: -331px;
          z-index: 1;
        }

        &:hover > .nev {
          display: block;
        }
        .nav-meun span {
          color: #ffa500;
          font-size: 16px;
          font-weight: 600;
        }
        .nav-meun a:hover {
          text-decoration: underline;
        }
      }
    }
  }
  .left-div-bottom {
    width: 260px;
    img {
      width: 100%;
    }
  }
}
.fl {
  float: left;
}

.fr {
  float: right;
}
.cl::after {
  content: ".";
  display: block;
  clear: both;
  visibility: hidden;
  height: 0;
  line-height: 0;
}
.clearfix {
  *zoom: 1;
}
</style>
