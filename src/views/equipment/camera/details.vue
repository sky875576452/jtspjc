<template>
  <div>
    <div class="content-box videro-details bg1 br4 mb-20">
      <div class="title-box">
        <h3>摄像头监控详情</h3>
      </div>
      <div class="body">
        <el-row>
          <el-col :span="9" :offset="1">
            <el-row :gutter="20" class="form-item-box">
              <el-col :span="5" class="label-box tr">
                报警记录ID
              </el-col>
              <el-col :span="18" class="value-box">
                {{details.id}}
              </el-col>
            </el-row>
            <el-row :gutter="20" class="form-item-box">
              <el-col :span="5" class="label-box tr">
                摄像头名称
              </el-col>
              <el-col :span="18" class="value-box">
                <a class="fr transition navA" href="javascript:void(0)">设备信息&gt;</a>{{details.videoName}}
              </el-col>
            </el-row>
            <el-row :gutter="20" class="form-item-box">
              <el-col :span="5" class="label-box tr">
                摄像头编号
              </el-col>
              <el-col :span="18" class="value-box">
                {{details.videoId}}
              </el-col>
            </el-row>
            <el-row :gutter="20" class="form-item-box">
              <el-col :span="5" class="label-box tr">
                位置名称
              </el-col>
              <el-col :span="18" class="value-box">
                {{details.crossingName}}
              </el-col>
            </el-row>
            <el-row :gutter="20" class="form-item-box">
              <el-col :span="5" class="label-box tr">
                报警时间
              </el-col>
              <el-col :span="18" class="value-box">
                <a class="fr transition navA" href="javascript:void(0)">监控日志&gt;</a>{{details.alarmTime}}
              </el-col>
            </el-row>
            <el-row :gutter="20" class="form-item-box">
              <el-col :span="5" class="label-box tr">
                监测状态
              </el-col>
              <el-col :span="18" class="value-box">
                {{details.alarmTypeName}}
              </el-col>
            </el-row>
            <el-row :gutter="20" class="form-item-box">
              <el-col :span="5" class="label-box tr">
                截止时间
              </el-col>
              <el-col :span="18" class="value-box">
                {{details.updateTime}}
              </el-col>
            </el-row>
            <el-row :gutter="20" class="form-item-box">
              <el-col :span="5" class="label-box tr">
                有效状态
              </el-col>
              <el-col :span="18" class="value-box">
                {{details.activeStatusName}}
              </el-col>
            </el-row>
            <el-row :gutter="20" class="form-item-box">
              <el-col :span="5" class="label-box tr">
                白名单
              </el-col>
              <el-col :span="18" class="value-box">
                {{details.isWhiteName}}
              </el-col>
            </el-row>
            <el-row :gutter="20" class="form-item-box">
              <el-col :span="5" class="label-box tr">
                核警状态
              </el-col>
              <el-col :span="18" class="value-box">
                <a class="fr transition navA" href="javascript:void(0)">核警日志&gt;</a>{{details.activeStatusName}}
              </el-col>
            </el-row>
            <el-row :gutter="20" class="form-item-box">
              <el-col :span="5" class="label-box tr">
                处理状态
              </el-col>
              <el-col :span="18" class="value-box">
                <a class="fr transition navA" href="javascript:void(0)">处理日志&gt;</a>{{details.activeStatusName}}
              </el-col>
            </el-row>
            <el-row :gutter="20" class="form-item-box">
              <el-col :span="5" class="label-box tr">
                检测来源
              </el-col>
              <el-col :span="18" class="value-box">
                <a class="fr transition navA" href="javascript:void(0)">设备详情&gt;</a>{{details.videoName+'-'+details.videoId}}
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12" :offset="1" class="video-box">
            <el-col class="tr mb-10">
              <el-radio-group v-model="radio3">
                <el-radio-button border label="截图"></el-radio-button>
                <el-radio-button border label="视频"></el-radio-button>
              </el-radio-group>
            </el-col>
            <el-col class="mb-20" style="height:300px;background-color:#333;"></el-col>
            <el-col class="form-item-box">
              截取起始时间：XX-XX-XX  XX:XX:XX
            </el-col>
            <el-col class="form-item-box">
              截取截至时间：XX-XX-XX  XX:XX:XX
            </el-col>
            <el-col class="form-item-box">
              视频名称：XXXXXX
            </el-col>
            <el-col class="form-item-box">
              视频大小：XXXM   视频格式：XXX
            </el-col>
            <el-col class="form-item-box">
              视频地址：<a class="transition navA" href="javascript:void(0)">XXXMXXXM</a>
            </el-col>
          </el-col>
        </el-row>
      </div>
    </div>
    <commonTable
      ref="tables"
      url="api/alarminfoLogController/listAlarmLog"
      :postData="{id:$route.query.id}"
      collapse
      title="监控日志"
    >
      <el-table-column
        prop="alarmTime"
        label="监控时间">
      </el-table-column>

      <el-table-column
        prop="alarmTypeName"
        label="监测状态">
      </el-table-column>
      <el-table-column
        prop="isWhiteName"
        label="白名单">
      </el-table-column>
    </commonTable>
  </div>
</template>

<script>
// import { isvalidUsername } from '@/tools/validate'
// import LangSelect from '@/components/LangSelect'
import * as signalLight from '@/api/signalLight'
export default {
  // components: { LangSelect },
  name: 'eCameraDetails',
  data() {
    return {
      radio3:"截图",
      details:{}
    }
  },
  methods: {
    getAlarmininfo(){
      signalLight.getAlarmininfo({id:this.$route.query.id}).then(data=>{
        this.details=data.obj
      })
    }
  },
  created() {
  },
  mounted () {
    this.getAlarmininfo();
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
