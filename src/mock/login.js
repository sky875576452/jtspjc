import { param2Obj,getQueryObject } from '@/tools'

const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  chl: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  editor: {
    roles: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default {
  loginByUsername: config => {
    // console.log(config)
    // const { username } = getQueryObject(config.body)
    const username='admin'
    return {
      total: 0,
      obj: userMap[username],
      msg:'登录成功',
      success:true,
    }
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    return{
      total: 0,
      obj: userMap['admin'],
      msg:'获取个人信息成功',
      success:true,
    }
    // if (userMap[token]) {
    //   return userMap[token]
    // } else {
    //   return false
    // }
  },
  logout: () => {
    return {
      total: 0,
      obj: '',
      msg:'登出成功',
      success:true,
    }
  }
}
