import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)

/**
 * 路由格式
//当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面(默认 false)
hidden: true

//当设置 noredirect 的时候该路由不会在面包屑导航中出现
redirect: noredirect

//当设置 true 的时候永远会显示根菜单，不设置的情况下只有当子路由个数大于一个时才会显示根菜单
//当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式。只有一个时会将那个子路由当做根路由
alwaysShow: true

name:'router-name'            //设定路由的名字，一定要填写不然 使用 <keep-alive> 时会出现各种问题
meta : {
  roles: ['admin','editor']   //设置该路由进入的权限，支持多个权限叠加
  title: 'title'              //设置该路由在侧边栏和面包屑中展示的名字
  icon: 'svg-name'            //设置该路由的图标
  noCache: true               //如果设置为true ,则不会被 <keep-alive> 缓存(默认 false)
}
**/
import mainLayout from '@/views/layout/index'
import Layout from '@/views/layout/Layout'
export const constantRouterMap = [
  {
    path: '/home',
    nmae:'home',
    component: mainLayout,
    meta:{
      title:'主页模块',
      icon:'fa fa-home',
    },
    children: [
      {
        path: '/home',
        component: Layout,
        meta: { title: '主页', icon: 'dashboard',  },
        children:[
          {
            path: 'index',
            name: 'index',
            component: _import('HelloWorld'),
            meta: { title: '主页', icon: 'dashboard',  },
            children:[

            ]
          },
          // {
          //   path: 'HelloWorld',
          //   name: 'HelloWorld',
          //   component: _import('HelloWorld'),
          //   meta: { title: 'hello', icon: 'dashboard',  },
          //   children:[]
          // }
        ]
      },

    ]
  },
  {
    path: '/road',
    component: mainLayout,
    name: 'road',
    meta:{
      title:'路况监控',
      icon:'fa fa-desktop',
      roles: ['admin']
    },
    alwaysShow: false,
    children: [
      {
        path: '/road',
        component: Layout,
        meta: { title: '路口溢出检测' },
        children:[
          {
            path: 'list',
            name: 'overflowList',
            component: _import('road/overflow/list'),
            meta: { title: '路口溢出列表' },
          },
          {
            path: 'details',
            name: 'overflowDetails',
            hidden: true,
            component: _import('road/overflow/details'),
            meta: { title: '路口溢出详情' },
          },
          {
            path: 'whiteList',
            name: 'overflowWhiteList',
            component: _import('road/overflow/whiteList'),
            meta: { title: '路口溢出白名单' },
          },
          {
            path: 'statistical',
            name: 'overflowStatistical',
            component: _import('road/overflow/statistical'),
            meta: { title: '统计分析' },
          }
        ]
      },
    ]
  },
  {
    path: '/equipment',
    component: mainLayout,
    name: 'equipment',
    meta:{
      title:'设备监控',
      icon:'fa fa-desktop',
      roles: ['admin']
    },
    alwaysShow: false,
    children: [
      {
        path: '/equipment',
        component: Layout,
        meta: { title: '信号灯检测' },
        children:[
          {
            path: 'list',
            name: 'signalLightList',
            component: _import('equipment/signalLight/list'),
            meta: { title: '信号灯报警列表' },
          },
          {
            path: 'whiteList',
            name: 'whiteList',
            component: _import('equipment/signalLight/whiteList'),
            meta: { title: '信号灯故障白名单' },
          },
          {
            path: 'statistical',
            name: 'statistical',
            component: _import('equipment/signalLight/statistical'),
            meta: { title: '信号灯统计分析' },
          },
        ]
      },
      {
        path: '/camera',
        component: Layout,
        meta: { title: '摄像头监控' },
        children:[
          {
            path: 'list',
            name: 'eCameraList',
            component: _import('equipment/camera/list'),
            meta: { title: '摄像头报警列表' },
          },
          {
            path: 'details',
            name: 'eCameraDetails',
            hidden: true,
            component: _import('equipment/camera/details'),
            meta: { title: '摄像头报警详情' },
          },
          {
            path: 'whiteList',
            name: 'eCameraWhiteList',
            component: _import('equipment/camera/whiteList'),
            meta: { title: '摄像头故障白名单' },
          },
          {
            path: 'statistical',
            name: 'eCameraStatistical',
            component: _import('equipment/camera/statistical'),
            meta: { title: '摄像头统计分析' },
          }
        ]
      },
    ]
  },
  {
    path: '/system',
    component: mainLayout,
    name: 'system',
    redirect: 'noredirect',
    meta:{
      title:'系统管理',
      icon:'fa fa-sun',
      roles: ['admin']
    },
    children: [
      {
        path: '/system',
        component: Layout,
        alwaysShow: true,
        meta: {
          roles: ['admin'],
          title: '常规设置',
        },
        children:[
          {
            path: 'user',
            name: 'userList',
            component: _import('system/user/index'),
            meta: {
              roles: ['admin'],
              title: '用户管理', icon: '' }
          }
        ]
      },
      {
        path: '/camera',
        component: Layout,
        alwaysShow: true,
        meta: {
          roles: ['admin'],
          title: '摄像头管理',
          icon: ''
        },
        children:[
          {
            path: 'cameraList',
            name: 'cameraList',
            component: _import('system/camera/list'),
            meta: {
              title: '摄像头列表',
              // icon: 'fa fa-tasks'
            },
          },
          {
            path: 'cameraAdd',
            name: 'cameraAdd',
            component: _import('system/camera/add'),
            meta: {
              title: '新增摄像头',
              // icon: 'fa fa-tasks'
            },
            hidden: true
          },
          {
            path: 'cameraAdd',
            name: 'cameraAdd',
            component: _import('system/camera/add'),
            meta: {
              title: '摄像头详情',
              // icon: 'fa fa-tasks'
            },
            hidden: true
          },
        ]
      },
      {
        path: '/system/example',
        component: Layout,
        meta: {
          title: '第三方',
          icon: 'example'
        },
        children: [
          {
            path:'iframe-view1',
            name: 'iframeView1',
            component: _import('iframeView/index'),
            meta: { title: '百度', iframeUrl: 'http://www.baidu.com',icon: 'dashboard'}
          },
          {
            path:'iframe-view2',
            name: 'iframeView2',
            component: _import('iframeView/index'),
            meta: { title: '淘宝',iframeUrl: 'http://www.taobao.com', icon: 'dashboard'}
          },
        ]
      },
    ]
  },
  { path: '/', redirect: '/home/index', hidden: true },
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
})

export const asyncRouterMap = [
  { path: '*', redirect: '/404', hidden: true }
]
