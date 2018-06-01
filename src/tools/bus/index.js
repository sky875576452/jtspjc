export default {
  install (Vue) {
    const bus = new Vue({})
    Vue.mixin({
      created: function () {
        if (this.$bus) {
          this.$bus = bus
        } else {
          this.$bus = bus
        }
      }
    })
  }
}
