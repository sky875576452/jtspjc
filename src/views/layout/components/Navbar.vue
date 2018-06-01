<template>
  <div class="navbar clearfix">
    <div class="system-title fl">
      <h1><img src="../../../assets/logo.png" alt="智能交通视频检测系统"></h1>
    </div>
    <!-- <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger> -->

    <!-- <breadcrumb class="breadcrumb-container"></breadcrumb> -->
    <el-menu
    :default-active="activePath"
    class="header-menu fl"
    mode="horizontal"
    @select="handleSelect"
    background-color="#2563c8" text-color="rgba(231, 240, 255, 0.3)" active-text-color="#e7f0ff">
    <el-menu-item
    v-for="(item,index) in permission_routers"
    v-if="!item.hidden"
    :key="index"
    :index="item.path"
    >
    <i :class="[item.meta.icon]"></i>
    {{item.meta.title}}
    </el-menu-item>
    </el-menu>
    <div class="right-menu">
      <error-log class="errLog-container right-menu-item"></error-log>

      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <screenfull class="screenfull right-menu-item"></screenfull>
      </el-tooltip>

      <!-- <lang-select class="international right-menu-item"></lang-select> -->

      <!-- <el-tooltip effect="dark" content="主题" placement="bottom">
        <theme-picker class="theme-switch right-menu-item"></theme-picker>
      </el-tooltip> -->

      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img class="user-avatar" > -->
          <el-button round size="mini">{{name}}<i class="el-icon-caret-bottom"></i></el-button>
          <!-- <span class="user-avatar">{{name}}</span> -->
           <!-- <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'"> -->
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              主页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import LangSelect from '@/components/LangSelect'
// import ThemePicker from '@/components/ThemePicker'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    LangSelect,
    // ThemePicker
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar',
      'name',
      'avatar'
    ]),
    activePath(){
      let firstPath=this.$route.path.split('/')
      return '/'+firstPath[1]
    }
  },
  data(){
    return{
      activeIndex:'1',
    }
  },
  methods: {
    handleSelect(key, keyPath){
      // console.log(key)
      this.$store.dispatch('setSiderBarRouters',key).then(()=>{
        this.$router.push(key);
      })
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('FedLogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  },
  mounted(){
    console.log(this.permission_routers)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  // position: fixed;
  // top:0;right:0;left:0;z-index:10;
  width:100%;
  height: 64px;
  line-height: 64px;
  border-radius: 0px !important;
  border:none;
  background-color:#2563c8;
  color:#fff;
  .header-menu{
    .el-menu-item{
      height: 64px;
      line-height: 64px;
    }
  }
  .hamburger-container {
    line-height: 64px;
    height: 64px;
    float: left;
    padding: 0 10px;
    /deep/ .hamburger{
      vertical-align: middle;
    }
  }
  .system-title{
    line-height: 64px;
    height: 64px;
    h1{margin:0 55px;font-size:1.2em;
      img{vertical-align: middle;}
    }
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
      vertical-align: text-bottom;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 64px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        // margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
          color:#fff;
        }
      }
    }
  }
}
</style>
