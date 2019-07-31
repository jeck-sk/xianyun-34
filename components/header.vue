<template>
  <div class="header">
    <div class="main">
      <el-row type="flex" justify="space-between">
        <div class="logo">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
        </div>
        <el-row type="flex" class="nav">
          <nuxt-link to="/">首页</nuxt-link>
          <nuxt-link to="/post">旅游攻略</nuxt-link>
          <nuxt-link to="/hotel">酒店</nuxt-link>
          <nuxt-link to="/air">国内机票</nuxt-link>
        </el-row>
        <div v-if="!$store.state.user.userInfo.token">
          <nuxt-link to="/user/login">登录/注册</nuxt-link>
        </div>
        <div v-else>
          <el-dropdown>
            <span class="el-dropdown-link">
               <img :src="$axios.defaults.baseURL + $store.state.user.userInfo.user.defaultAvatar"/>
              {{$store.state.user.userInfo.user.nickname}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="handleLogout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  mothod(){
       this.$store.state.user.userInfo.user.nickname
  },
  methods:{
    handleLogout(){
        this.$store.commit('user/clearUserInfo')
    }
  }
};
</script>
<style scoped lang="less">
.header {
  height: 60px;
  line-height: 60px;
  border-bottom: 1px #ccc solid;
  box-shadow: 0 3px 3px #eee;
}
.main {
  width: 1000px;
  margin: 0 auto;
}
.logo {
  img {
    width: 156px;
    height: 42px;
    vertical-align: middle;
  }
}
.nav {
  flex: 1;
  margin-left: 20px;
  a {
    display: block;
    padding: 0 20px;
    height: 60px;
    box-sizing: border-box;
  }
  a:hover {
    border-bottom: 6px #409eff solid;
    color: #409eff;
  }
  .nuxt-link-exact-active {
    background: #409eff;
    color: #fff;
    &:hover {
      color: #fff;
    }
  }
}
.el-dropdown {
  cursor: pointer;
  img {
    width: 36px;
    height: 36px;
    vertical-align: middle;
    &:hover {
      border: 1px #409eff solid;
      border-radius: 50%;
    }
  }
}
</style>
