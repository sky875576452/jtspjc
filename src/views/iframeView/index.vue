<template>
  <div class="iframe-box">
    <!-- <iframe 
      v-for="(item,index) in iframeArr"
      v-show="item==$route.query.src"
      :src="item" frameborder="0" width="100%" height="100%"></iframe> -->
      <iframe 
      :src="$route.query.src" frameborder="0" width="100%" height="100%"></iframe>
  </div>
</template>

<script>
export default {
  name:'iframeView',
  data() {
    return {
      msg:'11',
      iframeArr:[],
      src:this.$route.query.src,
    }
  },
  activated () {
    console.log(this.iframeArr)
  },
  mounted () {
    if(this.$route.query.src&&!this.iframeArr.includes(this.$route.query.src)){
      this.iframeArr.push(this.$route.query.src);
      console.log(this.iframeArr)
    }
  }
}
</script>
</script>
<style rel="stylesheet/scss" lang="scss">
.iframe-box{height:100%}
</style>
