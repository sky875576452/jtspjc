<template>
  <div ref="user">
    <el-row>
      <el-col :span="24" class="bg1 mb-10 pt-10">

        <el-form :inline="true" label-width="100px">
          <el-col :span="6">
          <el-form-item label="摄像头编号">
            <el-input size="small" v-model="formInline.code" placeholder="请输入编号"></el-input>
          </el-form-item>
          </el-col>
          <el-col :span="6">
          <el-form-item label="组织机构">
              <!-- multiple
              collapse-tags -->
            <el-select
              size="small"
              filterable
              v-model="formInline.affiliationOrg" placeholder="请选择">
              <el-option v-for="(item,index) in optionData.ORG"  :key="index" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          </el-col>
          <el-col :span="6">
          <el-form-item label="路口名称">
            <el-select
              size="small"
              filterable
              v-model="formInline.crossingName" placeholder="请输入">
              <el-option v-for="(item,index) in dataCode.vehicleType" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          </el-col>
          <el-col :span="6">
          <el-form-item label="接入方式">
            <el-select
              size="small"
              filterable
              v-model="formInline.accessWay"
              placeholder="请选择">
              <el-option v-for="(item,index) in optionData.DEVICE_ACCESS_WAY" :key="index" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          </el-col>


          <el-col :span="6">
          <el-form-item label="摄像头名称">
            <el-input size="small" v-model="formInline.name" placeholder="请输入编号"></el-input>
          </el-form-item>
          </el-col>
          <el-col :span="6">
          <el-form-item label="所属区域">
            <el-select
              size="small"
              filterable
              v-model="formInline.affiliationArea" placeholder="活动区域">
              <el-option v-for="(item,index) in optionData.AREA" :key="index" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          </el-col>
          <el-col :span="6">
          <el-form-item label="设备状态">
            <el-select
              size="small"
              filterable
              v-model="formInline.state"
              placeholder="请选择">
              <el-option v-for="(item,index) in optionData.DEVICE_STATE" :key="index" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          </el-col>
          <el-col :span="6">
          <el-form-item label="支持云台">
            <el-select
              size="small"
              filterable
              v-model="formInline.yuntai"
              placeholder="请选择">
              <el-option v-for="(item,index) in optionData.DEVICE_ACCESS_WAY" :key="index" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          </el-col>
          <el-col :span="23" class="tr">
            <el-form-item label="">
              <el-button size="small" type="primary" @click.native="searchFn">查询</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-col>
    </el-row>
    <commonTable
      ref="tables"
      :height="height"
      title="摄像头列表"
      url="api/videoDeviceController/listVideoDevice"
      :postData="formInline"
    >
      <el-table-column
        prop="code"
        label="摄像头编号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="摄像头名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="affiliationOrgName"
        label="归属组织"
        width="180">
      </el-table-column>
      <el-table-column
        prop="affiliationAreaName"
        sortable
        label="归属区域"
        width="180">
      </el-table-column>
      <el-table-column
        prop="crossingName"
        label="路口名称">
      </el-table-column>
      <el-table-column
        prop="stateName"
        label="设备状态">
      </el-table-column>
      <el-table-column
        prop="yuntai"
        label="支持云台">
      </el-table-column>
      <el-table-column
        prop="accessWayName"
        label="接入方式">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="220">
        <template slot-scope="scope">
          <el-button plain type="primary" size="mini" @click.native="handleClick(scope.row)">查看</el-button>
          <el-button plain type="primary" size="mini">编辑</el-button>
          <el-button plain type="primary" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </commonTable>
  </div>
</template>

<script>
// import { isvalidUsername } from '@/tools/validate'
import * as camera from '@/api/camera'
// import commonTable from '@/components/commonTable'
export default {
  name: 'cameraList',
  data() {
    return {
      height:300,
      formInline:{
        code:'',
        name:'',
        affiliationArea:'',
        affiliationOrg:'',
        crossingName:'',
        state:'',
        yuntai:'',
        accessWay:'',
      },
      vehicle:[],
      dataCode:[],
      optionData:{}
    }
  },
  components: {
    // commonTable
  },
  methods: {
    listSysSetting(row){
      camera.listSysSetting().then(data=>{
        this.optionData=data.obj;
      })
    },
    searchFn(){
      this.$nextTick(()=>{
        this.$refs.tables.getTableData();
      })
    },
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
