import Mock from 'mockjs'
import loginAPI from './login'
import articleAPI from './article'
import remoteSearchAPI from './remoteSearch'
import transactionAPI from './transaction'
import user  from './user'
Mock.setup({
  timeout: '350-600'
})

// 登录相关
Mock.mock(/\/mock\/api\/loginController\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/mock\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/mock\/user\/info\.*/, 'post', loginAPI.getUserInfo)

// 文章相关
Mock.mock(/\/article\/list/, 'post', articleAPI.getList)
Mock.mock(/\/article\/detail/, 'post', articleAPI.getArticle)
Mock.mock(/\/article\/pv/, 'post', articleAPI.getPv)
Mock.mock(/\/article\/create/, 'post', articleAPI.createArticle)
Mock.mock(/\/article\/update/, 'post', articleAPI.updateArticle)

// 搜索相关
Mock.mock(/\/search\/user/, 'post', remoteSearchAPI.searchUser)

// 账单相关
Mock.mock(/\/transaction\/list/, 'post', transactionAPI.getList)
//用户管理
Mock.mock(/\/mock\/user.do/,'post',user.getList)
export default Mock
