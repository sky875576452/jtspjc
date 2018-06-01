<template>
  <div ref="user">
    <commonTable
      :height="height"
      @current-change="currentChange"
      url="user/findAll"
    >
      <el-table-column
        prop="yhxm"
        label="用户姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="yhzh"
        label="用户账户"
        width="180">
      </el-table-column>
      <el-table-column
        prop="department"
        sortable
        label="部门"
        width="180">
      </el-table-column>
      <el-table-column
        prop="lxdh"
        label="联系电话">
      </el-table-column>
      <el-table-column
        prop="sfzhm"
        label="身份证号码">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click.native="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </commonTable>
  </div>
</template>

<script>
// import { isvalidUsername } from '@/tools/validate'
import * as user from '@/api/user'
// import commonTable from '@/components/commonTable'
export default {
  name: 'userList',
  data() {
    return {
      height:300,
    }
  },
  components: {
    // commonTable
  },
  methods: {
    currentChange(row){
      console.log(row)
    },
    handleClick(scope){
      console.log(scope)
    },
  },
  created() {
  },
  mounted () {
    // this.queryUser();
    this.height=this.$refs.user.clientHeight
  },
  activated () {

  },
  deactivated () {

  },
  destroyed() {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
