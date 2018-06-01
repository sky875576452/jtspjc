<template>
  <div>
    <navbar></navbar>
    <transition name="fade" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { Navbar} from './components'

export default {
  name: 'mainlayout',
  components: {
    Navbar,
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
