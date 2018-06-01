<template>
  <div class="">
    <el-form :inline="true">
      <el-form-item label="车牌号码">
        <el-input v-model="formInline.plateNum" placeholder="请输入车牌号码"></el-input>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker
          v-model="date"
          value-format="yyyy-MM-dd hh:mm:ss"
          @change="changeDate"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="车辆品牌">
          <!-- multiple
          collapse-tags -->
        <el-select
          filterable

          v-model="formInline.vehicleBrand" placeholder="活动区域">
          <el-option v-for="(item,index) in dataCode.vehicleBrand" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="车辆类型">
        <el-select
          filterable

          v-model="formInline.vehicleType" placeholder="活动区域">
          <el-option v-for="(item,index) in dataCode.vehicleType" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="车身颜色">
        <el-select
          filterable

          v-model="formInline.vehicleColor"
           placeholder="车身颜色">
          <el-option v-for="(item,index) in dataCode.vehicleColor" :key="index" :label="item" :value="item"></el-option>
        </el-select>
        <!-- <el-radio v-model="formInline.vehicleColor" label="1" border>颜色</el-radio>
        <el-radio v-model="formInline.vehicleColor" label="2" border>颜色</el-radio> -->
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click.native="searchFn">查询</el-button>
      </el-form-item>
    </el-form>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="视图" name="1">
        <el-row>
          <el-col class="mb-5">
            <el-col :span="4">车辆信息</el-col>
            <el-col :span="20">
              <el-pagination
                class="tr"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="tableSizes"
                :page-size="tableSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </el-col>
          </el-col>
          <el-col :span="4" v-for="(item, index) in vehicle" :key="index">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="img-box">
                <img v-lazy="item.carUrl" :src="item.carUrl" v-img="{ title: '卡口' }"  class="image"/>
              </div>
              <!-- <img src="http://element-cn.eleme.io/2.3/static/hamburger.50e4091.png" class="image"> -->
              <div style="padding:10px 8px;">
                <span>卡口:{{item.gateName||'暂无信息'}}</span>
                <div class="bottom clearfix">
                  时间:<time class="time">{{item.passDate}}</time>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="列表" name="2">
          <commonTable
            ref="commonTable"
            url="vehicle/list"
            :postData="formInline"
          >
            <el-table-column
              prop="gateName"
              label="通过路段名称"
              width="200">
            </el-table-column>
            <el-table-column
              prop="passDate"
              label="通过时间"
              width="180">
            </el-table-column>

            <el-table-column
              prop="plateType"
              sortable
              label="号牌种类"
              width="120">
            </el-table-column>
            <el-table-column
              prop="plateColor"
              sortable
              label="号牌颜色"
              width="180">
            </el-table-column>
            <el-table-column
              prop="plateNum"
              label="号牌号码"
              width="180">
            </el-table-column>
            <el-table-column
              prop="vehicleColor"
              label="车身颜色">
            </el-table-column>
            <el-table-column
              prop="vehicleType"
              label="车辆类型">
            </el-table-column>
            <el-table-column
              prop="vehicleBrand"
              label="车辆品牌">
            </el-table-column>
          </commonTable>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import * as vehicle from '@/api/vehicle'
// import LangSelect from '@/components/LangSelect'

export default {
  name: 'vehicle',
  data() {
    return {
      formInline:{
        beginTime:'',
        endTime:'',
        vehicleColor:'',
        vehicleType:'',
        plateNum:'',
        vehicleBrand:'',
      },
      date:'',
      currentPage:1,
      tableSizes:['20','50','100'],
      tableSize:20,
      activeName:'1',
      total:20,
      vehicle:[],
      dataCode:[]
    }
  },
  methods: {
    searchFn(){
      console.log(this.activeName)
      if(this.activeName=='1'){
        this.getlist();
      }else{
        console.log(this.$refs.commonTable)
        this.$refs.commonTable.getTableData()
      }
    },
    changeDate(val){
      console.log(val)
      this.$set(this.formInline,'beginTime',val[0]);
      this.$set(this.formInline,'endTime',val[1]);
    },
    getlist(val){
      let param=Object.assign({}, this.formInline)
      param.page=this.currentPage;
      param.rows=this.tableSize;
      vehicle.list(param).then(data=>{
        this.vehicle=data.obj;
        this.total=data.total;
      })
    },
    findCategory(){
      vehicle.findCategory().then(data=>{
        this.dataCode=data.obj;
      })
    },
    handleClick(){},
    handleSizeChange(val){
      this.tableSize=val;
      this.getlist()
    },
    handleCurrentChange(val){
      this.currentPage=val;
      this.getlist()
    },
  },
  created() {
  },
  mounted () {
    this.getlist();
     this.findCategory();
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
.img-box{
    position: relative;
    border: none;
    background: none;
    text-align: center;
    width: 100%;
    padding: 50% 0;
    height: 0;
    background-color: #2196F3;
  img {
      width: 100%;
      height:100%;
      position: absolute;
      top: 0;
      left: 0;
      &[lazy="loading"]{
        width: 10%;
        margin-left: 45%;
      }
  }

}
</style>
