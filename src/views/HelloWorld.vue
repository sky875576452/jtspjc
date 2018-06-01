<template>
  <div class="hello">
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
    console.log(ol)
    var gaodeMapLayer = new ol.layer.Tile({
			source: new ol.source.XYZ({
				url:'http://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}',
        attributions: [

          new ol.Attribution({

            html: 'Developed by chenhailin'
          })
        ],
      }),

		});

		// 创建地图
	  var map = new ol.Map({
			layers: [
				gaodeMapLayer
      ],
      logo:false,
      //加载瓦片时开启动画效果
      loadTilesWhileAnimating: true,
			view: new ol.View({
				center: [113.392767,23.062773],
				projection: 'EPSG:4326',
        zoom: 12,
        minZoom: 4,
      }),

      target: 'map',
      controls: ol.control.defaults({ attribution: false,}).extend([
        new ol.control.FullScreen(), //全屏控件
        new ol.control.Attribution({
          collapsible: false
        }),
        // new ol.control.ScaleLine(), //比例尺
        // new ol.control.OverviewMap(), //鹰眼控件
        // new ol.control.Rotate(),
        // new ol.control.MousePosition(),
        // new ol.control.ZoomSlider(),
      ]),
    });
    // console.log(ol.proj.transform(['3437235.43','38977665.56'], 'EPSG:3857' ,'EPSG:4326'))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map{width:100%;height:100%;}
</style>
