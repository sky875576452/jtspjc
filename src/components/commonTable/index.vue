<template>
  <div class="commonTable-box">
    <div class="main">
      <div class="header" v-if="showTitle">
        <el-row>
          <el-col :span="4">
            <h3>{{title}}</h3>
          </el-col>
          <el-col :span="20" class="tr">
            <div class="fr" v-if="collapse">
              <a class="toggleA" v-if="!collapseShow" @click="collapseShow=true">展开<i class="ml-5 el-icon-arrow-down"></i></a>
              <a class="toggleA" v-else @click="collapseShow=false">收起<i class="ml-5 el-icon-arrow-up"></i></a>
            </div>
            <slot class="fr" name="topRight"></slot>
          </el-col>
        </el-row>
      </div>
      <el-collapse-transition>
        <div v-show="collapseShow">
          <el-table
            v-loading="loading"
            :data="tableData"
            :row-class-name="tableRowClassName"
            :highlight-current-row="highlightCurrentRow"
            @selection-change="handleSelectionChange"
            @current-change="rowCurrentChange"
            >
            <el-table-column
              v-if="multiple"
              header-align="center"
              align="center"
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              header-align="center"
              align="center"
              type="index"
              :index="indexMethod"
              width="50">
            </el-table-column>
            <el-table-column
            v-if="columns.length"
            header-align="center"
            align="center"
            v-for="(column, index) in columns"
            :key="column.prop"
            :prop="column.prop"
            :sortable="column.sortable"
            :label="column.label"
            :width="column.width"
            >
            </el-table-column>
            <slot></slot>
          </el-table>
        </div>
      </el-collapse-transition>
    </div>
    <el-collapse-transition>
      <div v-show="collapseShow">
      <el-pagination
        class="tr mt-10"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="tableSizes"
        :page-size="tableSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
// import { isvalidUsername } from '@/tools/validate'
import {ajax} from '@/api/config'

export default {
  // components: { LangSelect },
  name: 'commonTable',
  data() {
    return {
      tableData:[],
      currentPage:this.page||1,
      tableSize:this.size||20,
      tableSizes:this.sizes||[20, 50, 100, 200],
      total:0,
      loading:false,
      collapseShow:true,
    }
  },
  props:{
    page: [String, Number],
    size: [String, Number],
    sizes:[Array],
    height: [String, Number],
    width:[String, Number],
    url: [String],
    showTitle:{
      type: Boolean,
      default: true
    },
    collapse:{
      type: Boolean,
      default: false
    },
    title: [String],
    multiple:{
      type: Boolean,
      default: false
    },
    highlightCurrentRow:{
      type: Boolean,
      default: false
    },
    postData:{
        type: Object,
        default:()=>{
          return {}
        },
    },
    columns: {
      type: Array,
      default: () => []
    },
  },
  computed: {
    tableHeight(){
      console.log(this.height)
      return (this.height-42-50)||300;
    },
    collapses(){
      console.log(this.collapse)
      this.collapseShow=this.collapse?false:true;
    },
  },
  // watch: {
  //   collapse(val){
  //     console.log(this.collapse,val)
  //     this.collapseShow=val?false:true;
  //   },
  // },
  methods: {
    tableRowClassName({row, rowIndex}) {
      if (rowIndex%2!=0) {
        return 'even-row';
      }
      return '';
    },
    handleSelectionChange(val){
      console.log(val)
      this.$emit('selection-change',val);
    },
    rowCurrentChange(val){
      this.$emit('current-change',val);
    },
    indexMethod(index){
      let rowIndex=index+1
      return rowIndex+(this.tableSize*(this.currentPage-1));
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.tableSize=val;
      this.getTableData()

    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage=val;
      this.getTableData()
    },
    getTableData(){
      this.loading=true;
      let params=this.postData;
      console.log(params)
      params.page=this.currentPage;
      params.rows=this.tableSize;
      // let isMock=this.url.indexOf('mock')>-1?'getData':'postData';
      ajax.postData({url:this.url,params}).then(data=>{
        this.loading=false;
        this.tableData=data.obj;
        this.total=data.total;
      }).catch(err=>{
        this.loading=false;
        console.log(err)
      })
    }
  },
  created() {
  },
  mounted () {
    this.getTableData();
    this.collapseShow=this.collapse?false:true;
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
.commonTable-box{

  // overflow-x:scroll;
  /deep/ .el-table{width:100%;
    tr,th{background-color: #f3f7fd;}
    th>.cell{
      color: rgba(48, 52, 58, 0.5);
      font-size:16px;
    }
    .even-row {
      background-color:#e6eaf2;
    }
    // .el-table__body-wrapper{padding:0 8px 8px;box-sizing:border-box;}
  }
  .main{
    box-shadow: 0px 3px 6px 0px
		rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    background-color: #f3f7fd;
  }
  .header{
    padding:9px 32px;border-bottom:solid 1px rgba(48, 52, 58, 0.1);
    line-height: 32px;
    h3{font-size: 18px;

      color: #30343a;
    }
    .toggleA{color: #3699ff;font-size:16px}
  }
}
</style>
