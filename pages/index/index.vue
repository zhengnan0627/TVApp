<template>
	<view class="content">
		<view class="top">
			<view class="top-logo">
				<image  :src="logo" mode="aspectFit"></image>
			</view>
			<view class="top-title">
				{{title}}
			</view>
			<view class="top-right" v-if="timeshow == 1">
				{{time}}
			</view>
			<view class="top-right" v-if="timeshow == 2">
				<u-clock></u-clock>
			</view>
		</view>
		<view class="header">
			<view class="header-left">
				<view class="left-money">
					<view class="money-title">
						{{leftareadata.area1_name}}
					</view>
					<view class="money-num">
						{{leftareadata.area1_value}}
					</view>
					
					
				</view>
				<view class="left-item">
					<view class="item-flex">
						<view class="itemflex-title">
							{{leftareadata.area2_name}}
						</view>
						<view class="itemflex-num">
							{{leftareadata.area2_value}}
						</view>
					</view>
					<view class="item-flex">
						<view class="itemflex-title">
							{{leftareadata.area3_name}}
						</view>
						<view class="itemflex-num">
							{{leftareadata.area3_value}}
						</view>
					</view>
				</view>
			</view>
			<view class="header-middle">
				<view class="middle-title">
					<!-- 总&nbsp&nbsp订&nbsp&nbsp单&nbsp&nbsp量 -->
					{{leftareadata.area4_name}}
				</view>
				<view class="qiun-chartsPie">					
					<view class="qiun-chartsPie">
						<canvas canvas-id="canvasPie" id="canvasPie" class="charts-pie" ><!-- @touchstart="touchPie" --></canvas>
					</view>
				</view> 
			</view>
			<view class="header-right">
				<view class="right-title">
					<!-- 区&nbsp&nbsp域&nbsp&nbsp任&nbsp&nbsp务&nbsp&nbsp数 -->
					{{leftareadata.area7_name}}
				</view>
				<view class="right-flex">
					<view class="rightflex-item" v-for="item in areaData">
						<view class="rightflex-num">
							{{item.area_mission_num}}
						</view>
						<view class="rightflex-area">
							{{item.area_title}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="charts-content">
			<view class="charts-item" >
				<block v-if="!chartsShow"> 
					<view class="item-title">
						{{rankname.rankname1}}
					</view>
					<view class="qiun-charts">
						<!-- <canvas :canvas-id="`canvasColumn${timeshow}`" id="canvasColumn1" class="charts"> </canvas> -->
						<canvas canvas-id="canvasColumn1" id="canvasColumn1" class="charts"> </canvas>
					</view>
					 <view class="charts-legend">
					 	<!-- 拣货排行榜 -->
						{{rankname.rankname1}}
					 </view>
				</block>
				<block v-if="chartsShow">
					<view class="item-title" :class="{'jgmclass':tableData.topData1.length > 5}">
						{{rankname.rankname1}}
					</view>
					<view class="item-table">
						<view class="table-top">
							<view class="tabletop-item" v-for="(item,index) in tableData.topData1">
								{{item}}
							</view>
						</view>
						<view class="table-content">
							<view class="tablecontent-line" v-for="(linedata,linenum) in tableData.contentData1">
								<view class="tableline-item" v-for="(value,key,index) in linedata">
									{{value}}
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
			<view class="charts-item">
				<block v-if="!chartsShow"> 
					<view class="item-title">
						{{rankname.rankname2}}
					</view>
					<view class="qiun-charts">
						<canvas canvas-id="canvasColumn2" id="canvasColumn2" class="charts"> </canvas>
					</view>
					 <view class="charts-legend">
					 	{{rankname.rankname2}}
					 </view>
				</block>
				<block v-if="chartsShow">
					<view class="item-title" :class="{'jgmclass':tableData.topData2.length > 5}">
						{{rankname.rankname2}}
					</view>
					<view class="item-table">
						<view class="table-top">
							<view class="tabletop-item" v-for="(item,index) in tableData.topData2">
								{{item}}
							</view>
						</view>
						<view class="table-content">
							<view class="tablecontent-line" v-for="(linedata,linenum) in tableData.contentData2">
								<view class="tableline-item" v-for="(value,key,index) in linedata">
									{{value}}
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
			<view class="charts-item">
				<block v-if="!chartsShow"> 
					<view class="item-title">
						{{rankname.rankname3}}
					</view>
					<view class="qiun-charts">
						<canvas canvas-id="canvasColumn3" id="canvasColumn3" class="charts"> </canvas>
					</view>
					 <view class="charts-legend">
					 	{{rankname.rankname3}}
					 </view> 
				</block>
				<block v-if="chartsShow">
					<view class="item-title" :class="{'jgmclass':tableData.topData3.length > 5}">
						{{rankname.rankname3}}
					</view>
					<view class="item-table">
						<view class="table-top">
							<view class="tabletop-item" v-for="(item,index) in tableData.topData3">
								{{item}}
							</view>
						</view>
						<view class="table-content">
							<view class="tablecontent-line" v-for="(linedata,linenum) in tableData.contentData3">
								<view class="tableline-item" v-for="(value,key,index) in linedata">
									{{value}}
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
		<view class="footer">
			<view class="footer-notice">
				<!-- <view class="notice-text">
					 {{message}}
				</view> -->
				<u-notice-bar mode="horizontal" :is-circular="true" :list="message" :font-size="10"
							  type="none" :volume-icon="false"  speed="40"></u-notice-bar>
			</view>
			
			<view class="footer-info">
				<view class="info-gongsi">
					<text  @click="peizhi">河南觅云仓信息科技有限公司</text>
				</view>
			</view>
			
		</view>
		<uni-popup ref="popup" type="dialog" >
		    <uni-popup-dialog type="input" title="更改配置" :placeholder="placeholder" mode="input" message="成功消息" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import uClock from '../../components/u-clock/u-clock.vue';
	import uCharts from '../../components/u-charts/u-charts.js';
	import uPopup from '../../components/u-popup/u-popup.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	var _self;
	var canvaColumn=null;
	var canvaPie=null;
	
	export default {
		 components: {
		        uniPopup,
		        uniPopupMessage,
		        uniPopupDialog
		},
		data() {
			return {
				baseurl:'',//配置URL  152.136.28.147:9009
				//基本信息数据	
				title:'',//顶部标题
				logo:'',//公司logo的url地址 ../../static/logo.png
				date:'',//服务器端日期
				time: '',//当时new date()时间
				timeshow:1,//时间显示方式判断依赖值 接口字段clock_type:1.数字时钟;2.模拟时钟
				keepinterval:null,//数字计时器
				timer:null,//切换时间计时器
				message:[],//公告信息
				qiehuantime:10,//设置页面切换时间
				chartsShow:false,//图表切换判断依赖值
				placeholder:'请填入配置地址',//配置提示文字
				//左侧区域任务数据
				leftareadata:{},
				areaDatasum:[],//区域任务数据暂存字段(超过6个进行切割)
				areaData:[],//区域任务最终展示数据
				rankname:{ //中部图表区域小标题合集对象{'拣货排行榜',"复合排行榜","打包排行榜"}
					rankname1:'',
					rankname2:'',
					rankname3:'',
				},
				//table数据排行榜数据
				tableData:{
					topData1:[],
					contentData1:[],
					topData2:[],
					contentData2:[],
					topData3:[],
					contentData3:[],
				},
				//u-chart相关数据
				cWidth:'',//树状图高度数据
				cHeight:'',//树状图宽度数据
				cWidthPie:'',//饼图宽度数据
				cHeightPie:'',//饼图高度数据
				pixelRatio:1,
				chartData: {
				  "categories": [],
				  "series": [
					  {
					// "color":"#0081d4",
					// "textColor":"#ffffff",
					// "name": "拣货排行榜",
						"data": [],
					// "color": "red"
					},
				  ]
				},
				chartData2: {
				  "categories": [],
				  "series": [
					  {
						"data": [],
					},
				  ]
				},
				chartData3: {
				  "categories": [],
				  "series": [
					  {
						"data": [],
					},
				  ]
				},
				//饼图数据
				"PiechartData": {
				  "series": [{
					"name": "",
					"data": 0,
					//下列数据项已通过修改源码实现
					// "color":"#fdbb40", 
					// "legendShape":"rect",
					// "textColor":"#ffffff",
					// "format":()=> this.chartData2.series[0].data
				  }, {
					"name": "",
					"data": 0,
					//下列数据项已通过修改源码实现
					// "color":"#0186ff",
					// "legendShape":"rect",
					// "textColor":"#ffffff",
					// "format":()=> this.chartData2.series[1].data
				 },
				 // {
				 // 	"name": "总订单",
				 // 	"data": 200,								
				 // },
				 ]
				}
			}
		},
		onLoad() {
			_self = this;	
		},
		onReady(){
			//获取本机缓存baseurl,有则赋值this.baseurl,无则弹出配置框进行配置
			const baseUrl = uni.getStorageSync('baseUrl');
			if (!baseUrl){
				this.$refs.popup.open()
			}else {
				this.baseurl = baseUrl
				// this.placeholder = baseUrl
			}
			this.$nextTick(function(){
				const query = uni.createSelectorQuery().in(this);
			  setTimeout(()=>{ 
				//延迟2s进行获取树状图及饼图相应元素的宽高并赋值随后调用request()及定时器timeout()
					query.select('#canvasColumn1').boundingClientRect(data => {
					  this.cWidth = data.width - 5;
					  this.cHeight = data.height - 10;
					}).exec();
					query.select('#canvasPie').boundingClientRect(data => {
					  this.cWidthPie = data.width;
					  this.cHeightPie = data.height;
					}).exec();
					this.request()
					//启动定时器timeout()，实现排行榜和树状图的切换时间掌控
					_self.timeout(_self.qiehuantime * 1000)
				},2000)
			})			
		},
		methods: {
			//请求数据接口统一方法
			request(){
				//请求基本数据接口
				this.$request({
					url:`http://${this.baseurl}/VXMail/PublicUrl.ashx`,
					data:{'proc':'APP_WMS_datamax','type':'基本信息',}
				}).then(res => {
					this.title = res.Msg_info[0].title
					this.logo = res.Msg_info[0].logo
					this.message.splice(0,1,res.Msg_info[0].message) 
					this.timeshow = res.Msg_info[0].clock_type * 1
					this.qiehuantime = res.Msg_info[0].interval * 1
					if(_self.timeshow == 1){
						//判断接口时钟字段，为1则启动定时器_self.interval()实现数字时钟
						_self.interval()
					}else{
						clearInterval(_self.keepinterval)
					}
					// console.log(this.qiehuantime);
					// console.log(res);
				});
				//请求区域标题数据接口
				this.$request({
					url:`http://${this.baseurl}/VXMail/PublicUrl.ashx`,
					data:{'proc':'APP_WMS_datamax','type':'区域标题数据',}
				}).then(res => {		
					this.leftareadata = res.Msg_info[0];
					//结构赋值的方法拿到饼图相关数据
					// let Piedata ={series:[]};
					// var{area5_name:name,area5_value:data} = res.Msg_info[0];
					// Piedata.series.push({name,data});
					// var{area6_name:name,area6_value:data} = res.Msg_info[0];
					// Piedata.series.push({name,data});
					// Piedata.series.forEach(function(element,index,arr){
					// 	 element.data*1;
					// })
					// console.log(Piedata);
					// this.PiechartData = Piedata
					// this.showPie("canvasPie",Piedata);
					this.PiechartData.series[0].name = res.Msg_info[0].area5_name
					this.PiechartData.series[0].data = res.Msg_info[0].area5_value * 1
					this.PiechartData.series[1].name = res.Msg_info[0].area6_name
					this.PiechartData.series[1].data = res.Msg_info[0].area6_value * 1
					this.showPie("canvasPie",this.PiechartData);
				});
				//请求区域任务数据接口
				this.$request({
					url:`http://${this.baseurl}/VXMail/PublicUrl.ashx`,
					data:{'proc':'APP_WMS_datamax','type':'区域任务数',}
				}).then(res => {
					// console.log(res);
					this.areaDatasum = res.Msg_info
					if(_self.areaDatasum.length > 6){
						_self.areaData = _self.areaDatasum.slice(0,6)
						setTimeout(()=> {
							// console.log('执行切换后6块区域');
							_self.areaData = _self.areaDatasum.slice(6)
						},_self.qiehuantime * 500)
					}
					else{
						_self.areaData = _self.areaDatasum
					}
				});
				//请求数据排行榜数据接口
				this.$request({
					url:`http://${this.baseurl}/VXMail/PublicUrl.ashx`,
					data:{'proc':'APP_WMS_datamax','type':'数据表排行榜',}
				}).then(res => {
					// console.log(res.Msg_info);
					// console.log(JSON.parse(res.Msg_info[0].rank_data_array));
					this.tableData.contentData1 = JSON.parse(res.Msg_info[0].rank_data_array)
					this.tableData.contentData2 = JSON.parse(res.Msg_info[1].rank_data_array)
					this.tableData.contentData3 = JSON.parse(res.Msg_info[2].rank_data_array)
					this.tableData.topData1 = res.Msg_info[0].rank_title.split('+')
					this.tableData.topData2 = res.Msg_info[1].rank_title.split('+')
					this.tableData.topData3 = res.Msg_info[2].rank_title.split('+')
				});
				//请求柱状图排行榜数据接口
				this.$request({
					url:`http://${this.baseurl}/VXMail/PublicUrl.ashx`,
					data:{'proc':'APP_WMS_datamax','type':'柱状图排行榜',}
				}).then(res => {
					// console.log(res.Msg_info);
					this.rankname.rankname1 = res.Msg_info[0].rank_name
					this.rankname.rankname2 = res.Msg_info[1].rank_name
					this.rankname.rankname3 = res.Msg_info[2].rank_name
					// console.log(this.chartData);
					this.chartData.series[0].data = res.Msg_info[0].items.split('+').map(Number)
					this.chartData.categories = res.Msg_info[0].name.split('+')
					
					this.chartData2.series[0].data = res.Msg_info[1].items.split('+').map(Number)
					this.chartData2.categories = res.Msg_info[1].name.split('+')
					
					this.chartData3.series[0].data = res.Msg_info[2].items.split('+').map(Number)
					this.chartData3.categories = res.Msg_info[2].name.split('+')
					// console.log(this.chartData3);
					this.$nextTick(()=>{
						this.showColumn("canvasColumn1",this.$data.chartData);
						this.showColumn("canvasColumn2",this.$data.chartData2);
						this.showColumn("canvasColumn3",this.$data.chartData3);
					})
				});
			},
			//页面定时器方法
			interval(){
				if (_self.keepinterval) {
					clearInterval(_self.keepinterval)
					console.log('清除数字时钟');
					console.log(_self.keepinterval);}
				_self.keepinterval = setInterval(()=>{
					console.log(_self.keepinterval);
					let datetime = new Date();
					let year = datetime.getFullYear();
					let month = datetime.getMonth()+1;//js从0开始取 
					let date = datetime.getDate(); 
					let hour = datetime.getHours(); 
					let minutes = datetime.getMinutes(); 
					let second = datetime.getSeconds();
					if(month<10){
					month = "0" + month;
					}
					if(date<10){
					date = "0" + date;
					}
					if(hour <10){
					hour = "0" + hour;
					}
					if(minutes <10){
					minutes = "0" + minutes;
					}
					if(second <10){
					second = "0" + second ;
					}
					_self.time = year+"-"+month+"-"+date+" "+hour+":"+minutes+":"+second;
				},1000)
			},
			//数据表和树状图切换方法定时器
			timeout(time){
				if(_self.timer){ 
					clearTimeout(_self.timer) ;
					console.log('清除切换状态计时器');
					console.log(_self.timer);}
				_self.timer = setTimeout(()=>{
					console.log(_self.timer);
					_self.chartsShow = !_self.chartsShow
					_self.request()
					console.log(time);
					// _self.$nextTick(function(){
					// 	if(_self.chartsShow ){
					// 		if(_self.areaDatasum.length > 6){
					// 			_self.areaData = _self.areaDatasum.slice(6)
					// 		}
					// 	}else{
					// 			_self.areaData = _self.areaDatasum.slice(0,6)
					// 			// _self.showColumn("canvasColumn1",_self.$data.chartData);
					// 			// _self.showPie("canvasPie",_self.$data.chartData2);
					// 	}
					// })
					// console.log('打印settimeout数据表和树状图切换方法');
					// const nexttime = time || 30000;
					_self.timeout(_self.qiehuantime * 1000);
				},time);
			},
			//右下角配置项
			peizhi(){
				this.$refs.popup.open()
			},
			 close(done){
			    // TODO 做一些其他的事情，before-close 为true的情况下，手动执行 done 才会关闭对话框
			    // ...
			    done()    
			 },
			 /**
			  * 点击确认按钮触发
			  */       
			confirm(done,value){
			    // 输入框的值
				console.log(value)
				const test = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
				const testurl = test.test(value)
				if (testurl){
					this.baseurl = value
					uni.setStorageSync('baseUrl', this.baseurl);
					this.request()
					done()
				}else {
					uni.showToast({
						icon:'none',
						title:'配置输入有误,请重新配置',
						duration:1000
					})
				}
			},     
			 //树状图调用方法
			showColumn(canvasId,chartData){
				// console.log("aaa")
				canvaColumn =new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'column',
					legend:{
						show:false,
						fontColor:"#ffffff",
						},
					fontSize:11,
					colors:['#ffffff',],
					background:'#0076b1',
					padding:[20,3,3,7],
					pixelRatio:_self.pixelRatio,
					animation: false,
					categories: chartData.categories,
					series: chartData.series,
					// enableScroll: true,//开启图表拖拽功能
					xAxis: {
						rotateLabel:true,
						disableGrid:true,
						gridColor:'#cccccc',
						fontColor:'#ffffff',
						axisLineColor:'#cccccc',
						// type:'grid',
						// 	gridType:'dash',
						// 	itemCount:5,//x轴单屏显示数据的数量，默认为5个
						// 	scrollShow:true,//新增是否显示滚动条，默认false
						// 	scrollAlign:'left',//滚动条初始位置
						// 	scrollBackgroundColor:'#F7F7FF',//默认为 #EFEBEF
						// 	scrollColor:'#DEE7F7',//默认为 #A6A6A6
					},
					yAxis: {
						//disabled:true,
						gridColor:"#cccccc",
						data:[{
							// min:100,
							"titleFontColor":"#ffffff",
							"fontColor":"#ffffff",
							"axisLineColor":'#dadada',
						}]			
					},
					dataLabel: true,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						column: {
							type:'group',
							width:chartData.categories.length > 4 ? _self.cWidth*_self.pixelRatio*0.5/chartData.categories.length : 45
						}
					  }
				});
			},
			//饼状图显示方法
			showPie(canvasId,chartData){
				canvaPie=new uCharts({
					$this:_self,
						canvasId: canvasId,
						type: 'pie',
						fontSize:18,
						legend:{
						  fontColor:"#ffffff",
						  show:true,
						  position:'bottom',
						  float:'center',
						  itemGap:5,
						  padding:0,
						  lineHeight:26,
						  margin:5,
						  borderWidth :1,
						  fontSize:15
						},
						background:'#0076b1',
						pixelRatio:_self.pixelRatio,
						series: chartData.series,
						animation: false,
						width: _self.cWidthPie*_self.pixelRatio,
						height: _self.cHeightPie*_self.pixelRatio,
						dataLabel: true,
						dataPointShapeType:"hollow",
						dataPointShape:false,
						extra: {
							pie: {
							  labelWidth:1,
							  offsetAngle:0
							  // border:true
							}
						},
					});
				this.piearr=canvaPie.opts.series;			
			},
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-image: linear-gradient(#00004b, #0076b1);
		// width: 1920px;
		// height: 1080px;
	}
	.content {
		background-image: linear-gradient(#00004b, #0076b1);
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
	}
	.top{
		width: 100vw;
		height: 10vh;
		padding: 1vh 2vw;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.top-logo{
			box-sizing: border-box;
			width: 14vw;
			min-width:200px;
			height: 8vh;
			line-height: 8vh;
			display: flex;
			justify-content: flex-start !important;
			align-items:flex-start !important;
		}
		.top-title{
			flex: 1;
			text-align: center;
			/*#ifndef APP-PLUS*/
			font-size: 30rpx;
			/*#endif*/
			/*#ifdef APP-PLUS*/
				font-size: 23.4rpx;	
			/*#endif */
			
		}
		.top-right{
			position: relative;
			// display: flex;
			// flex-direction: column-reverse;
			// justify-content: end;
			width: 14vw;
			min-width:200px;
			text-align: right;
			/*#ifndef APP-PLUS*/
			font-size: 14rpx;
			/*#endif*/
			/*#ifdef APP-PLUS*/
				font-size: 11rpx;
			/*#endif */
		}
	}
	.top image {
		// width: 100%;
		height: 8vh;
		display: flex;
		justify-content: flex-start !important;
		align-items:flex-start !important;
	}
	.header{
		width: 100vw;
		// height: 21vh;
		box-sizing: border-box;
		padding: 1vh 2vw;
		overflow: hidden;
		display: flex;
		justify-content: space-between;
		.header-middle {
			width: 26vw;
			height: 35vh;
			display: flex;
			background-color:rgba($color: #ffffff, $alpha: 0.3);
			.middle-title {
			// margin-left:1vw;
			width: 3vw;
			height: 100%;
			line-height: 3vw;
			writing-mode: vertical-lr;
			letter-spacing:6rpx;
			/*#ifndef APP-PLUS*/
			font-size: 19rpx;
			/*#endif*/
			/*#ifdef APP-PLUS*/
				font-size: 15rpx;	
			/*#endif */
			text-align: center;
			}
			.qiun-chartsPie{
			width: 100%;
			height: 100%;
			}
			.charts-pie{
				width: 100%;
				height: 100%;
			}
		}
		
	}
	.header-left {
		width: 22vw;
		height: 35vh;
		// background-color:rgba($color: #ffffff, $alpha: 0.3);
		// border: 2px solid #C0C0C0; 
		.left-money{
			margin-bottom: 3vh;
			width: 100%;
			height: 22vh;
			background-color:rgba($color: #ffffff, $alpha: 0.3);
			.money-title{
				padding-top: 10rpx;
				height: 8vh;
				line-height: 8vh;
				/*#ifndef APP-PLUS*/
				font-size: 32rpx;
				/*#endif*/
				/*#ifdef APP-PLUS*/
					font-size: 25rpx;	
				/*#endif */
				text-align: center;
			}
			.money-num{
				height: 12vh;
				line-height: 12vh;
				text-align: center;
				/*#ifndef APP-PLUS*/
				font-size: 36rpx;
				/*#endif*/
				/*#ifdef APP-PLUS*/
					font-size: 28rpx;	
				/*#endif */
			}
		}
		.left-item{
			width: 100%;
			height: 10vh;
			background-color:rgba($color: #ffffff, $alpha: 0.3);
			display: flex;
			align-items: center;
			.item-flex{
				flex: 1;
				text-align: center;
				
				.itemflex-title{
					/*#ifndef APP-PLUS*/
					font-size: 19rpx;
					/*#endif*/
					/*#ifdef APP-PLUS*/
						font-size: 15rpx;	
					/*#endif */
					// color: #3398D8;
				}
				.itemflex-num{
					/*#ifndef APP-PLUS*/
					font-size: 23rpx;
					/*#endif*/
					/*#ifdef APP-PLUS*/
						font-size: 18rpx;	
					/*#endif */
				}
			}
		}
	}
	.header-right {
		width: 45vw;
		height: 35vh;
		display: flex;
		background-color:rgba($color: #ffffff, $alpha: 0.3);
		// border: 2px solid #C0C0C0; 
		.right-title {
			// margin-left:1vw;
			width: 3vw;
			height: 100%;
			line-height: 3vw;
			writing-mode: vertical-lr;
			letter-spacing:6rpx;
			/*#ifndef APP-PLUS*/
			font-size: 19rpx;
			/*#endif*/
			/*#ifdef APP-PLUS*/
				font-size: 15rpx;	
			/*#endif */
			text-align: center;
		}
		.right-flex{
			box-sizing: border-box;
			padding: 1vh 0.6vw ;
			// background-color: #4CD964;
			width: 100%;
			height: 100%;
			display: flex;
			flex-wrap: wrap;
			.rightflex-item{
				margin: 1vh 0.6vw ;
				width: 30%;
				height: 14vh;
				background-color: #C0C0C0;
				border-radius: 6rpx;
				.rightflex-num{
					width: 100%;
					height: 9vh;
					line-height: 9vh;
					/*#ifndef APP-PLUS*/
					font-size: 29rpx;
					/*#endif*/
					/*#ifdef APP-PLUS*/
						font-size: 22.5rpx;	
					/*#endif */
					text-align: center;
				}
				.rightflex-area{
					width: 100%;
					height: 5vh;
					line-height: 5vh;
					/*#ifndef APP-PLUS*/
					font-size: 14rpx;
					/*#endif*/
					/*#ifdef APP-PLUS*/
						font-size: 11rpx;	
					/*#endif */
					text-align: center;
				}
			}
			.rightflex-item:nth-of-type(3),
			.rightflex-item:nth-of-type(6){
				background-color: #0172ce;
			}
			.rightflex-item:nth-of-type(2),
			.rightflex-item:nth-of-type(5){
				background-color: #fa6b43;
			}
			.rightflex-item:nth-of-type(1),
			.rightflex-item:nth-of-type(4){
				background-color: #5ccec6;
			}
		}
	}
	.charts-content{
		box-sizing: border-box;
		width: 100vw;
		padding: 1vh 2vw;
		overflow: hidden;
		display: flex;
		justify-content: space-between;
		.charts-item {
			width: 31vw;
			height: 43vh;
			background-color:rgba($color: #ffffff, $alpha: 0.3);
		}
		.jgmclass .item-title{
				padding-left: 8.5rpx !important;
		}
	}
	.item-title{
		box-sizing: border-box;
		padding-left: 11.8rpx;
		padding-top: 3rpx;
		width: 100%;
		height: 4vh;
		line-height: 4vh;
		/*#ifndef APP-PLUS*/
		font-size: 16rpx;
		/*#endif*/
		/*#ifdef APP-PLUS*/
			font-size: 12.5rpx;	
		/*#endif */
		color: #ffffff;
	}
	// .charts-item:nth-child(2) .item-title{
	// 	// background-color: #C0C0C0;
	// 	padding-left: 8.5rpx !important;
	// }
	.item-table{
		box-sizing: border-box;
		height: 35vh;
		padding: 0 6rpx;
		/*#ifndef APP-PLUS*/
		font-size: 14rpx;
		/*#endif*/
		/*#ifdef APP-PLUS*/
			font-size: 11rpx;	
		/*#endif */
		.table-top{
			width: 100%;
			height: 4vh;
			line-height: 4vh;
			margin-bottom: 1vh;
			border-bottom: 1px solid #FFFFFF;
			display: flex;
			/*#ifndef APP-PLUS*/
			font-size: 16rpx;
			/*#endif*/
			/*#ifdef APP-PLUS*/
				// font-size: 12.5rpx;
				font-size: 11.5rpx;
			/*#endif */
			
			.tabletop-item{
				flex: 1;
				text-align: center;
				flex-grow:1;
			}
			.tabletop-item:nth-of-type(2){
				flex-grow:1.5;
			}
			.tabletop-item:nth-of-type(4),
			.tabletop-item:nth-of-type(5),
			.tabletop-item:nth-of-type(6){
				flex-grow:2;
			}
		}
		.table-content{
			box-sizing: border-box;
			padding: 1vh 0;
			width: 100%;
			height: calc(100% - 1vh);
			overflow: hidden;
			.tablecontent-line{
				width: 100%;
				height: 8%;
				line-height: 8%;
				display: flex;
				.tableline-item{
					flex: 1;
					flex-grow:1;
					text-align: center;
				}
				.tableline-item:nth-of-type(2){
					flex-grow:1.5;
				}
				.tableline-item:nth-of-type(4),
				.tableline-item:nth-of-type(5),
				.tableline-item:nth-of-type(6){
					flex-grow:2;
				}
			}
			.tablecontent-line:nth-of-type(1){
				color: #ff5500;
			}
			.tablecontent-line:nth-of-type(2){
				color: #ffaa00;
			}
			.tablecontent-line:nth-of-type(3){
				color: #ffff00;
			}
		}
	}
	.qiun-charts {
		width: 31vw;
		height: 35vh;
	}
	.charts {
		width: 31vw;
		height: 35vh;
	}
	.charts-legend{
		width: 100%;
		height: 4vh;
		line-height: 4vh;
		/*#ifndef APP-PLUS*/
		font-size: 14rpx;
		/*#endif*/
		/*#ifdef APP-PLUS*/
			font-size: 11rpx;	
		/*#endif */
		text-align: center;
	} 
	/deep/ .footer{
		box-sizing: border-box;
		width: 100vw;
		height: 5vh;
		line-height: 3vh;
		padding: 0 2vw;
		display: flex;
		align-items: center;
		/*#ifndef APP-PLUS*/
		font-size: 14rpx;
		/*#endif*/
		/*#ifdef APP-PLUS*/
			// font-size: 11rpx;	
			font-size: 9.5rpx; 
		/*#endif */
		.footer-notice{
			box-sizing: border-box;
			// font-size: 14rpx;
			width: 63.5vw;
			height: 3vh;
			line-height: 3vh;
			padding: 0 4px;
			// border: 1px solid #ff0000;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.notice-text{
			width: 100%;
			height: 100%;
			animation: 20s wordsLoop linear infinite normal;
		}
		@keyframes wordsLoop {
		            0% {
		                transform: translateX(0);
		                -webkit-transform: translateX(0);
		            }
		          
					100%{
		                transform: translateX(-100%);
		                -webkit-transform: translateX(-100%);
		            }
		        }
	}
	.footer-info {
		box-sizing: border-box;
		// width: 100%;
		width: 32vw;
		padding-left: 2vw;
		display: flex;
		justify-content: space-between;
		/*#ifndef APP-PLUS*/
		font-size: 14px;
		/*#endif*/
		/*#ifdef APP-PLUS */
			font-size: 9.5rpx; 
		/*#endif */
		.info-gongsi{
			width: 30vw;
			height: 3vh;
			line-height: 3vh;
			text-align: right;
			// font-size: 11rpx;
		}
	}
</style>
