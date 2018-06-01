<template>
  <div>
    <el-button @click.native="save">保存</el-button>
    <el-row :gutter="10">
      <el-col :span="4" >
        <div class="border-box">
          <el-button
          draggable="true"
          @dragstart.native="btnDragstart">测试</el-button>

        </div>
      </el-col>
      <el-col :span="20">
        <div class="container border-box">
          <div id="canvas"
            @drop.prevent="DropFn"
            @dragover.stop.prevent>
            <div
            class="node-div"
            v-for="(item,index) in nodeList"
            :id="item.id"
            :style="{'top':item.top+'px','left':item.left+'px','width':item.width+'px','height':item.height+'px','lineHeight':item.height+'px'}"
            >
            {{item.text+index}}
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: 'jsplumb',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      instance:{},
      lineData:[],
      nodeList:[
        {
          id:'1',text:'node',width:'120',height:'50',top:'20',left:'60',
          port:[{type:'output',num:['out']},{type:'input',num:['in']}],
        },
        {id:'2',text:'node',width:'120',height:'50',top:'140',left:'240',
          port:[{type:'output',num:['out']},{type:'input',num:['in']}],
        },
        {id:'3',text:'node',width:'120',height:'50',top:'40',left:'540',
          port:[{type:'output',num:['out']},{type:'input',num:['in']}],
        }
      ]
    }
  },
  methods:{
    save(){
      // endpoints[i].anchor.type
      let getAllConnections=this.instance.getAllConnections(),
          endpointObj={};
      getAllConnections.map((item,index)=>{
          let arr=[];
          item.endpoints
          arr[0]=item.sourceId+item.endpoints[0].anchor.type;
          arr[1]=item.targetId+item.endpoints[1].anchor.type;
          endpointObj[index]=arr
      })
      let jsplumbData={
        nodeList:this.nodeList,
        lineData:endpointObj,
      }
      console.log(jsplumbData)
      this.baseJs.setLoca('jsplumbData',jsplumbData)
    },
    DropFn(ev){
      console.log(ev,ev.target.className)
      if (ev.target.className.indexOf('_jsPlumb') >= 0 ) {
        return;
      }
      let mx =ev.offsetX,
          my =ev.offsetY;

      console.log( ev.offsetX ,'on drop : ' + ev.dataTransfer.getData('text'));
      let obj={
        left:mx,top:my,
        text:ev.dataTransfer.getData('text'),
        id:new Date().getTime(),
        width:'120',height:'50',
        port:[{type:'output',num:['out']},{type:'input',num:['in']}]
      }
      this.nodeList.push(obj);
      this.$nextTick(()=>{
        this.addPorts(obj);
        this.instance.draggable(document.getElementsByClassName('node-div'));
      })
    },
    //拖入时设置文本
    btnDragstart(ev,item){
      console.log(ev,item)
      ev.dataTransfer.setData('text',ev.target.textContent);
    },
    //生成节点四个连接点
    addPorts(item) {
      let hollowCircle = {
          endpoint: ["Dot",{ cssClass: "endpointcssClass"}], //端点形状
          connectorStyle: {
              strokeWidth: 2,
              stroke: "#84ACB3",
              outlineWidth: 2,
              outlineStroke: "#84ACB3"
          },
      //  connectorHoverStyle: connectorHoverStyle,
          paintStyle: {
              fill: "#84ACB3",
              radius: 6
          },      //端点的颜色样式
          isSource: true, //是否可拖动（作为连接线起点）
          connector: ["Flowchart", {stub: 30, gap: 0, coenerRadius: 0, alwaysRespectStubs: true, midpoint: 0.5 }],
          isTarget: true, //是否可以放置（连接终点）
          maxConnections: -1
      };
      let objId=document.getElementById(item.id)
      this.instance.addEndpoint(objId, {uuid:item.id+'RightMiddle', anchors: "RightMiddle" }, hollowCircle);
      this.instance.addEndpoint(objId, {uuid:item.id+'LeftMiddle', anchors: "LeftMiddle" }, hollowCircle);
      this.instance.addEndpoint(objId, {uuid:item.id+'TopCenter', anchors: "TopCenter" }, hollowCircle);
      this.instance.addEndpoint(objId, {uuid:item.id+'BottomCenter', anchors: "BottomCenter" }, hollowCircle);
    },
    //根据节点树生产连接点
    getAllNodePorts(){
      console.log(this.nodeList)
      this.nodeList.map(item=>{
        this.addPorts(item)
      })
    },
    //生成连接点
    // addPorts( node, ports, type) {
    //     this.nodeList.map(item=>{
    //       item.port.map((items,indexs)=>{
    //         let y=0,y_offset=1 / ( items.num.length + 1);
    //         items.num.map(nums=>{
    //           let anchor = [0,0,0,0],
    //           paintStyle = { radius:5, fillStyle:'#FF8891' },
    //           isSource = false,
    //           isTarget = false;
    //           if(items.type=='output'){
    //             anchor[0] = 1;
    //             paintStyle.fillStyle = '#D4FFD6';
    //             isSource = true;
    //           }else{
    //             isTarget =true;
    //           }
    //           anchor[1] = y + y_offset;
    //           y = anchor[1];
    //           // console.log(this.$jsPlumb.getId(item.id))

    //           this.instance.addEndpoint(document.getElementById(item.id), {
    //             uuid:item.id + "-" + nums,
    //             paintStyle: paintStyle,
    //             anchor:anchor,
    //             maxConnections:-1,
    //             isSource:isSource,
    //             isTarget:isTarget
    //           });
    //         })

    //       })
    //     })
    // },
          // 连接事件
      // jsPlumb.bind("jsPlumbConnection", function(conn, originalEvent) {
      //   if (conn.connection.sourceId == conn.connection.targetId) {
      //     jsPlumb.detach(conn);
      //     alert("不能连接自己！");
      //   }
      //   $.each(jsPlumb.getEndpoints(conn.source), function(i, el) {
      //     if (conn.connection != el.connections[0] &&
      //       (el.connections[0].targetId == conn.targetId || (el.connections[0].sourceId == conn.targetId && el.connections[0].targetId == conn.sourceId))) {
      //       jsPlumb.detach(conn);
      //       alert("不能重复连接！");
      //       return false;
      //     }
      //   });

      //   nodeFlow.onConnectionChange && nodeFlow.onConnectionChange(conn);
      //   conn.connection.bind("editCompleted", function(o) {
      //     if (typeof console != "undefined")
      //       console.log("connection edited. path is now ", o.path);
      //   });
      // });
      // // 取消连接事件
      // jsPlumb.bind("jsPlumbConnectionDetached", function(conn) {
      //   nodeFlow.onConnectionChange && nodeFlow.onConnectionChange(conn);
      // });
      // // 双击取消连接
      // jsPlumb.bind("dblclick", function(conn, originalEvent) {
      //   jsPlumb.detach(conn);
      // });
      //删除 点
      // jsPlumb.removeAllEndpoints($(this).parent().attr("id"));
    //链接节点
    connectPorts( node1, port1, node2 , port2) {
      // var uuid_source = node1.getAttribute("id") + "-" + port1;
      // var uuid_target = node2.getAttribute("id") + "-" + port2;
      // this.instance.connect({
      //   source:"1",
      //   target:"2",
      //   paintStyle:{ strokeWidth:1, stroke:"blue" }
      // });
      // this.instance.connect({
      //   source:"1",
      //   target:"3",
      //   paintStyle:{ strokeWidth:1, stroke:"blue" }
      // });
      console.log(this.lineData)
      if(!this.lineData){
        return
      }
      for(let item in this.lineData){
        console.log(this.lineData[item])
        this.instance.connect({uuids:this.lineData[item],paintStyle:{ strokeWidth:1, stroke:"blue" }})
      }

      // this.instance.connect({uuids:['1t', '2t'],paintStyle:{ strokeWidth:1, stroke:"blue" }})
      //设置连接线文本
      // if(connection){
      //     connection.getOverlay('label').setLabel(_line.label);
      // }
    },
  },
  mounted(){
    let jsPlumbData=this.baseJs.getLoca('jsplumbData')
    if(jsPlumbData){
      this.lineData=jsPlumbData.lineData
      this.nodeList=jsPlumbData.nodeList
    }
    console.log(jsPlumbData,this.lineData)
    this.$jsPlumb.ready(()=>{
      console.log('jsplumb is ready')
      let color = "#E8C870";
      this.instance=this.$jsPlumb.getInstance({
        Connector : [ "Bezier", { curviness:250 } ],
        DragOptions : { cursor: "pointer", zIndex:2000 },
        PaintStyle : { strokeStyle:color, lineWidth:2 },
        EndpointStyle : { radius:5, fillStyle:color },
        HoverPaintStyle : {strokeStyle:"#7073EB" },
        EndpointHoverStyle : {fillStyle:"#7073EB" },
        PaintStyle : { lineWidth : 8, stroke : "#456" },//连线样式
        Container: "canvas"
      });
      this.getAllNodePorts();
      this.instance.draggable(document.getElementsByClassName('node-div'));
      this.connectPorts()
      // });
      console.log(this.instance)
      this.$jsPlumb.fire("jsFlowLoaded", this.instance);
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.border-box{
  border:solid 1px #ccc;height:400px;
}
.container{
  position: relative;
}
#canvas{
  position: absolute;height:100%;width:100%;
  .node-div{position:absolute;text-align:center;border:solid 1px #ccc;padding:2px 4px}
}
</style>
