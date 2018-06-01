<template>
  <div class="iframe-box">
    <iframe-view></iframe-view>
  </div>
</template>

<script>
import  iframeView from "./components";
export default {
  name:'baidu',
  components:{
    iframeView
  },
  data() {
    return {
      msg:'11',
      iframeArr:[],
    }
  },
  mounted(){
    alert(0)
  },
  activated() {
    alert(1);
    // if(this.$route.query.src&&!this.iframeArr.includes(this.$route.query.src)){
    //   this.iframeArr.push(this.$route.query.src);
    // }
  }
}
</script>
</script>
<style rel="stylesheet/scss" lang="scss">
.iframe-box{height:100%}
</style>
