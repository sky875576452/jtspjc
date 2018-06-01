<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <tags-view></tags-view>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import {  Sidebar, AppMain, TagsView } from './components'

export default {
  name: 'layout',
  components: {
    Sidebar,
    AppMain,
    TagsView
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/style/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    .main-container{position:relative;}
  }
</style>
