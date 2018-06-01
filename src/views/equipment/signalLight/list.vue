<template>
  <div ref="user">
    <el-row class="bg1 mb-10 pt-10">
    <el-form
       :inline="true" label-width="100px">
      <el-col :span="6">
        <el-form-item label="位置名称">
            <!-- multiple
            collapse-tags -->
          <el-input size="small" v-model="formInline.videoName" placeholder="请输入"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">

        <el-form-item label="监测状态">
          <el-select
            size="small"
            filterable
            v-model="formInline.isWhite" placeholder="请选择">
            <el-option v-for="(item,index) in option" :key="index" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="白名单">
          <el-select
            size="small"
            filterable
            v-model="formInline.isWhite" placeholder="请选择">
            <el-option v-for="(item,index) in option" :key="index" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
      <el-form-item label="核警状态">
        <el-select
          size="small"
          filterable
          v-model="formInline.checkStatus"
          placeholder="请选择">
          <el-option v-for="(item,index) in optionData.CHECK_STATUS" :key="index" :label="item.name" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      </el-col>
      <el-col :span="6">
      <el-form-item label="处理状态">
        <el-input size="small" v-model="formInline.plateNum" placeholder="请选择"></el-input>
      </el-form-item>
      </el-col>
      <el-col :span="6">
      <el-form-item label="有效状态">
        <el-select
          size="small"
          filterable
          v-model="formInline.activeStatus" placeholder="请选择">
          <el-option v-for="(item,index) in dataCode.vehicleType" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      </el-col>
      <el-col :span="12">
      <el-form-item label="灯组类型">
        <el-select
          size="small"
          filterable
          v-model="formInline.vehicleColor"
          placeholder="请选择">
          <el-option v-for="(item,index) in dataCode.vehicleColor" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      </el-col>
      <el-col>
        <el-col :span="10">
          <el-form-item label=" " label-width="40px">
            <el-date-picker
              v-model="times"
              type="datetimerange"
              size="small"
              @change="changTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="13" class="tr">
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
      url="api/alarminfoController/listAlarm"
      :postData="formInline"
      title="信号灯报警列表"
    >
      <div slot="topRight">
        <el-select
          class="mr-10"
          size="mini"
          filterable
          @change="dateTypeChange"
          v-model="dateType.value"
          placeholder="请选择">
          <el-option v-for="(item,index) in dateType.option" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select>
        <el-select
          filterable
          size="mini"
          v-model="formInline.vehicleColor"
          placeholder="请选择">
          <el-option v-for="(item,index) in dataCode.vehicleColor" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </div>
      <el-table-column
        prop="alarmTime"
        label="报警时间"
        width="160">
      </el-table-column>
      <el-table-column
        prop="videoId"
        label="信号灯编号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="videoName"
        label="位置名称"
        width="120">
      </el-table-column>
      <!-- <el-table-column
        prop="lxdh"
        label="灯组类型">
      </el-table-column> -->
      <el-table-column
        prop="alarmTypeName"
        label="监测状态">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="截止时间">
      </el-table-column>
      <el-table-column
        prop="activeStatusName"
        label="有效状态">
        <template slot-scope="scope">
          <span :style="{'color':scope.row.activeStatus=='0'?'#ff3636':'#30343a'}">{{scope.row.activeStatusName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="isWhiteName"
        label="白名单">
      </el-table-column>
      <el-table-column
        prop="checkStatusName"
        label="核警状态">
        <template slot-scope="scope">
          <span :style="{'color':scope.row.checkStatus=='0'?'#ff9000':scope.row.checkStatus=='1'?'#3699ff':'#30343a'}">{{scope.row.checkStatusName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="处理状态">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="160">
        <template slot-scope="scope">
          <el-button plain type="primary" @click.native="handleClick(scope.row)" size="mini">核查</el-button>
          <el-button plain type="primary" size="mini">处理</el-button>
        </template>
      </el-table-column>
    </commonTable>
  </div>
</template>

<script>
// import { isvalidUsername } from '@/tools/validate'
import * as signalLight from '@/api/signalLight'
// import commonTable from '@/components/commonTable'
export default {
  name: 'signalLightList',
  data() {
    return {
      height:300,
      formInline:{
        videoName:'',
        vehicleColor:'',
        vehicleType:'',
        plateNum:'',
        vehicleBrand:'',
        alarmType:'06',
        isWhite:'',
        checkStatus:'',
        alarmTimeStart:'',
        alarmTimeEnd:''
      },
      times:[],
      vehicle:[],
      dataCode:[],
      option:[{name:'是',value:1},{name:'否',value:0}],
      dateType:{
        option:[{name:'今日',value:1},{name:'本周',value:2},{name:'本月',value:3},{name:'最近三天',value:5},{name:'全部',value:0}],
        value:'',
      },
      optionData:{}
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
    dateTypeChange(val){
      let start='',end='';
      switch (val) {
        case 1:
          let today=this.baseJs.getToday()
          start=today;
          end=today;
          break;
        case 2:
          let week=this.baseJs.getWeekDay();
          start=week[0];
          end=week[1];
          break;
        case 3:
          start=this.baseJs.getCurrentMonthFirst();
          end=this.baseJs.getCurrentMonthLast();
          break;
        case 5:
          let numDay=this.baseJs.getRecentlyDat(3);
          console.log(numDay)
          start=numDay[0];
          end=numDay[1];
          break;
        default:
          start='';
          end='';
          break;
      }
      let arr=[]
      // console.log(val,start)
      if(start){
        this.formInline.alarmTimeStart=start+' 00:00:00';
        this.formInline.alarmTimeEnd=end+' 23:59:59';
        arr[0]=start+' 00:00:00';
        arr[1]=end+' 23:59:59';
      }else{
        this.formInline.alarmTimeStart='';
        this.formInline.alarmTimeEnd='';
      }
      this.times=arr
      this.searchFn()
    },
    currentChange(row){
      console.log(row)
    },
    handleClick(scope){
      console.log(scope)
    },
    listSysSetting(){
      signalLight.listSysSetting().then(data=>{
        this.optionData=data.obj;
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
