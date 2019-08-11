<template>
  <div class="right-box">
    <!-- 搜索 -->
    <div class="search">
      <el-input placeholder="北京" v-model="input" v-on:keyup.native="handleCity(input)">
        <el-button slot="append" @click="handleCity(input)" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <!-- 推荐 -->
    <div class="tuijian">
      推荐:
      <a
        href="javaScript:;"
        v-for="(item,index) in cityData"
        :key="index"
        @click.prevent="handleCity(item)"
      >{{item}}</a>
    </div>
    <div class="tuijian-gonglue cl">
      <h2>推荐攻略</h2>
      <el-button class="tj-btn" @click="handleYouJi" type="primary" icon="el-icon-edit">写游记</el-button>
    </div>
    <div class="tujian-conten" v-for="(item,index) in dataList" :key="index">
      <!-- 图片少 -->
      <div class="nav_imges" v-if="item.images.length<3">
        <div class="nev_left">
          <a
            href
            @click.prevent="handlClick(item.id)"
            v-for="(items,index) in item.images"
            v-if="index<1"
            :key="index"
          >
            <img :src="items" />
          </a>
        </div>
        <div class="nav_list">
          <h2 class="nav_title">
            <a href @click.prevent="handlClick(item.id)">{{item.title}}</a>
          </h2>
          <p v-html="item.content">
            <a href @click.prevent="handlClick(item.id)">{{item.content}}</a>
          </p>
          <div class="nav-tubiao">
            <span>
              <i class="el-icon-location-outline"></i>
              {{item.cityName}}
            </span>
            <span>
              by
              <a href>
                <img class="tj_img" :src="$axios.defaults.baseURL+item.account.defaultAvatar" />
              </a>
              <a href style="color:#ffd484">{{item.account.nickname}}</a>
            </span>
            <span>
              <i class="el-icon-view">{{item.watch}}</i>
            </span>
            <span class="tj-zan">30 赞</span>
          </div>
        </div>
      </div>
      <!-- 图片多 -->
      <div class="nav_foter" v-else>
        <div class="nav_cont">
          <h2 class="nav_titl">
            <a href @click.prevent="handlClick(item.id)">{{item.title}}</a>
          </h2>
          <p class="navtext" v-html="item.content">{{item.content}}</p>
        </div>
        <div class="nev_img">
          <a
            href
            @click.prevent="handlClick(item.index)"
            v-for="(items,index) in item.images"
            v-if="index<3"
            :key="index"
          >
            <img :src="items" alt />
          </a>
        </div>

        <div class="nev-tubiao">
          <div class="tubiao_left">
            <span class="zuo">
              <i class="el-icon-location-outline"></i>
              {{item.cityName}}
            </span>
            <span class="zhong">
              by
              <a href>
                <img class="tj_img" :src="$axios.defaults.baseURL+item.account.defaultAvatar" />
              </a>
              <a href style="color:#ffd484">{{item.account.nickname}}</a>
            </span>
            <span class="you">
              <i class="el-icon-view">{{item.watch}}</i>
            </span>
          </div>
          <span class="tj-zan">30 赞</span>
        </div>
      </div>
    </div>
    <!-- fenye -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[3, 5, 8, 10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      total: 0,
      pageIndex: 1,
      pageSize: 3,
      cityData: ["广州", "上海", "北京"],
      datalist: []
    };
  },
  methods: {
    handleYouJi() {
      this.$router.push("/post/create");
    },
    handlClick(id) {
      console.log(id);
      this.$router.push({
        path: "/post/detail",
        query: {
          id
        }
      });
     
    },

    handleCity(item) {
      if (!item) {
        this.$axios({
          url: "/posts"
        }).then(res => {
          this.data = res.data.data;
          this.$store.commit("post/setCicy", res.data);
        });
      } else {
        this.$axios({
          url: "/posts?city=" + item
        }).then(res => {
          this.data = res.data.data;
          this.$store.commit("post/setCicy", res.data);
        });
      }
    },
    // 每页显示数据
    handleSizeChange(value) {
      this.pageSize = value;
      //  this.dataList()
    },
    // 当前页数
    handleCurrentChange(value) {
      this.pageIndex = value;
      // this.dataList()
    },
    getdata() {
      this.$axios({
        url: "/posts",
        method: "GET"
      }).then(res => {
        this.data = res.data.data;
        this.total = res.data.total;
        console.log(this.data);
        this.$store.commit("post/setCicy", res.data);
      });
    }
  },
  mounted() {
    this.getdata();
  },
  computed: {
    dataList() {
      let data = this.$store.state.post.cityData.data.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageSize * this.pageIndex
      );
      return data;
    }
  }
};
</script>
<style lang="less" scoped>
.right-box {
  width: 720px;
  .search {
    border: 2px solid #ffa500;
    /deep/.el-input__inner {
      border: 0;
    }
    .el-button {
      border-radius: 0 5px 5px 0;
    }
    /deep/.el-input-group__append {
      background: #fff;
    }
    /deep/.el-icon-search:before {
      color: #ffa852;
      font-weight: 600;
      font-size: 18px;
    }
  }
  .tuijian {
    font-size: 12px;
    padding: 15px 0;
    color: #666;
    a {
      margin-left: 10px;
    }
  }
  .tuijian-gonglue {
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
    h2 {
      float: left;
      font-weight: 400;
      line-height: 30px;
      font-size: 18px;
      color: #ffa500;
      padding-bottom: 8px;
      border-bottom: 2px solid #ffa500;
    }
    /deep/.el-button {
      float: right;
    }
  }
  .tujian-conten {
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
    .nav_imges {
      margin-bottom: 20px;
      display: flex;
      .nev_left {
        width: 40%;
        margin-right: 10px;
        img {
          width: 100%;
        }
      }
      .nav_list {
        width: 60%;
        h2 {
          width: 100%;
          height: 30px;
          line-height: 30px;
          font-weight: 400;
          font-size: 18px;
          overflow: hidden;
        }
        p {
          margin: 22px 0;
          height: 80px;
          line-height: 20px;
          font-size: 14px;
          overflow: hidden;
        }
        .nav-tubiao {
          display: flex;
          span {
            margin-left: 10px;
            display: flex;
            img {
              display: block;
              width: 16px;
              height: 16px;
              border-radius: 100px;
              margin: 3px 5px 5px;
            }
          }
          .tj-zan {
            margin-left: 130px;
            color: #ffd484;
          }
        }
      }
    }
    .nav_foter {
      .nav_cont {
        .nav_titl {
          margin-bottom: 20px;
        }
        .navtext {
          height: 60px;
          font-size: 14px;
          line-height: 20px;
          overflow: hidden;
        }
      }
      .nev_img {
        margin-top: 20px;
        width: 720px;
        display: flex;
        a {
          display: block;
          width: 33%;
          padding: 0 20px 0 0;
          img {
            width: 220px;
            height: 150px;
          }
        }
      }
    }
    .nev-tubiao {
      padding: 20px 0;
      display: flex;
      .tubiao_left {
        width: 40%;
        display: flex;
        margin-right: 378px;
        .zuo {
          width: 30%;
        }
        .zhong {
          width: 50%;
          display: flex;
          .tj_img {
            margin-left: 10px;
            display: block;
            width: 20px;
            height: 20px;
          }
        }
        .you {
          width: 20%;
        }
      }
      .tj-zan {
        color: #ffd484;
      }
    }
  }
}
.cl::after {
  content: ".";
  display: block;
  clear: both;
  visibility: hidden;
  height: 0;
  line-height: 0;
}
/deep/.ql-align-justify {
  display: inline;
}
</style>
