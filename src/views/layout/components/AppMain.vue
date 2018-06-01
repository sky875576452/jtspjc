<template>
  <section class="app-main"
    :style="{'height':viewh}"
  >
    <transition name="fade" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view class="router-box"></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    clientHeight(){
      return Math.max(document.documentElement.scrollHeight,document.documentElement.clientHeight)
    },
    viewh(){
      console.log(this.clientHeight)
      return this.clientHeight-50-60+'px'
    },
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>
<style  rel="stylesheet/scss" lang="scss">
.app-main{padding:24px;box-sizing: border-box;min-height: 100%;
    background-color:#d9dee7;
    .router-box{
      width:100%;height:100%;overflow-y: scroll;
    }
    // position:absolute;top:34px;right:0;bottom:0;left:0;
}
</style>

