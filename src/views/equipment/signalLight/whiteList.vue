<template>
  <div ref="user">
    <el-row class="bg1 mb-10 pt-10">
    <el-form
       :inline="true" label-width="100px">
      <el-col :span="6">
        <el-form-item label="位置名称">
          <el-input size="small" v-model="formInline.crossingName" placeholder="请输入"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
      <el-form-item label="信号灯编号">
          <!-- multiple
          collapse-tags -->
        <el-input size="small" v-model="formInline.videoId" placeholder="请输入"></el-input>
        <!-- <el-select
          size="small"
          filterable
          v-model="formInline.vehicleBrand" placeholder="请选择">
          <el-option v-for="(item,index) in dataCode.vehicleBrand" :key="index" :label="item" :value="item"></el-option>
        </el-select> -->
      </el-form-item>
      </el-col>
      <el-col :span="6">
      <el-form-item label="监控状态">
        <el-select
          size="small"
          filterable
          v-model="formInline.isWhite" placeholder="请选择">
          <el-option v-for="(item,index) in option" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      </el-col>
      <el-col :span="6">
      <el-form-item label="检测来源">
        <el-input size="small" v-model="formInline.plateNum" placeholder="请输入"></el-input>
      </el-form-item>
      </el-col>
      <el-col>
        <el-col :span="6">
          <el-form-item label="有效状态">
            <el-select
              size="small"
              filterable
              v-model="formInline.state" placeholder="请选择">
              <el-option v-for="(item,index) in optionObj.WHITE_LIST_STATE" :key="index" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="17" class="tr">
          <el-form-item>
            <el-button size="small" type="primary" @click.native="searchFn">查询</el-button>
          </el-form-item>
        </el-col>
      </el-col>
    </el-form>
    </el-row>
    <commonTable
      ref="tables"
      :height="height"
      @current-change="currentChange"
      url="api/alarmWhiteListController/listWhiteList"
      :postData="formInline"
      title="信号灯检测事件白名单"
    >
      <el-table-column
        prop="updateTime"
        label="更新时间"
        width="160">
      </el-table-column>
      <el-table-column
        prop="name"
        label="检测来源"
        width="160">
      </el-table-column>
      <el-table-column
        prop="signalLightCode"
        label="信号灯编号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="crossingName"
        label="位置名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="alarmTypeName"
        label="故障类型">
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="起始时间">
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="截止时间">
      </el-table-column>
      <el-table-column
        prop="stateName"
        label="有效状态">
        <template slot-scope="scope">
          <span :style="{'color':scope.row.state=='2'?'#ff3636':scope.row.state=='1'?'#30343a':'#ff9000'}">{{scope.row.stateName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="addUsername"
        label="操作人">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="160">
        <template slot-scope="scope">
          <el-button plain type="primary" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </commonTable>
  </div>
</template>

<script>
// import { isvalidUsername } from '@/tools/validate'
// import * as signalLight from '@/api/signalLight'
import * as white from '@/api/white'
// import commonTable from '@/components/commonTable'
export default {
  name: 'whiteList',
  data() {
    return {
      height:300,
      formInline:{
        crossingName:'',
        state:'',
        plateNum:'',
        videoId:'',
        isWhite:'',
        alarmType:'06',
      },
      times:[],
      vehicle:[],
      dataCode:[],
      optionObj:{},
      option:[{name:'是',value:1},{name:'否',value:0}]
    }
  },
  components: {
    // commonTable
  },
  methods: {
    searchFn(){
      this.$refs.tables.getTableData();
    },
    changTime(val){
      console.log(val)
      if(val){
        this.formInline.alarmTimeStart=val[0]
        this.formInline.alarmTimeEnd=val[1]
      }else{
        this.formInline.alarmTimeStart='';
        this.formInline.alarmTimeEnd='';
      }

    },
    currentChange(row){
      console.log(row)
    },
    handleClick(scope){
      console.log(scope)
    },
    listSysSetting(){
      white.listSysSetting({group:'06'}).then(data=>{
        this.optionObj=data.obj
      })
    }
  },
  created() {
  },
  mounted () {
    this.listSysSetting();
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
