// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import "babel-polyfill";


import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import '@/style/index.scss' // global css
Vue.use(ElementUI)


import App from './App'
import router from './router'
import store from './store'
import jsPlumb from 'jsplumb';
import 'jsplumb/dist/css/jsplumbtoolkit-defaults.css';
import VueJsonp from 'vue-jsonp'
import util from './tools/util/util'
import BusPlugin from './tools/bus/index.js'
import TransferDom from './directives/transfer-dom'
import Clickoutside from './directives/click-outside/index'
import Multiselect from 'vue-multiselect'// 使用的一个多选框组件，element-ui的select不能满足所有需求
import 'vue-multiselect/dist/vue-multiselect.min.css'// 多选框组件css
import commonTable from '@/components/commonTable'
import VueImg from 'v-img';
import VueLazyload from 'vue-lazyload'
import ol from 'openlayers';
import 'openlayers/dist/ol.css'
window.ol=ol;

import './permission'
import './mock'

import * as filters from './filters' // global filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.use(VueJsonp)
Vue.use(BusPlugin)
Vue.use(Multiselect)
Vue.use(VueImg)
import img404 from '@/assets/404.png'
import loadsvg from '@/assets/loading-spin.svg'
Vue.use(VueLazyload, {
  lazyComponent: true,
  preLoad: 1.3,
  error: img404,
  loading: loadsvg,
  attempt: 1
})
Vue.component(commonTable.name, commonTable);
Vue.directive('TransferDom', TransferDom);
Vue.directive('Clickoutside',Clickoutside);

Vue.prototype.$jsPlumb = jsPlumb.jsPlumb
Vue.prototype.baseJs = util;
/* eslint-disable no-new */

if (process.env.NODE_ENV === 'production') {
  console.log = function() {}
  console.warn = function() {}
  Vue.config.productionTip = false
  Vue.config.devtools = false;
}

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
