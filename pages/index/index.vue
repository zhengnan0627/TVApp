<template>
	<view class="content">
		<view class="top">
			<view class="top-logo">
				<image class="logo" :src="logo" mode=""></image>
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
						总金额
					</view>
					<view class="money-num">
						7666,102.00
					</view>
					
					
				</view>
				<view class="left-item">
					<view class="item-flex">
						<view class="itemflex-title">
							总订单量
						</view>
						<view class="itemflex-num">
							200
						</view>
					</view>
					<view class="item-flex">
						<view class="itemflex-title">
							总条目数
						</view>
						<view class="itemflex-num">
							1352
						</view>
					</view>
				</view>
			</view>
			<view class="header-middle">
				<view class="middle-title">
					总&nbsp&nbsp订&nbsp&nbsp单&nbsp&nbsp量
				</view>
				<view class="qiun-chartsPie">					
					<view class="qiun-chartsPie">
						<canvas canvas-id="canvasPie" id="canvasPie" class="charts-pie" ><!-- @touchstart="touchPie" --></canvas>
					</view>
				</view> 
			</view>
			<view class="header-right">
				<view class="right-title">
					区&nbsp&nbsp域&nbsp&nbsp任&nbsp&nbsp务&nbsp&nbsp数
				</view>
				<view class="right-flex">
					<view class="rightflex-item" v-for="item in areaData">
						<view class="rightflex-num">
							{{item.num}}
						</view>
						<view class="rightflex-area">
							区域-{{item.bianhao}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="charts-content">
			<view class="charts-item">
				<block v-if="!chartsShow"> 
					<view class="item-title">
						条目数
					</view>
					<view class="qiun-charts">
						<!-- <canvas :canvas-id="`canvasColumn${timeshow}`" id="canvasColumn1" class="charts"> </canvas> -->
						<canvas canvas-id="canvasColumn1" id="canvasColumn1" class="charts"> </canvas>
					</view>
					 <view class="charts-legend">
					 	拣货排行榜
					 </view>
				</block>
				<block v-if="chartsShow">
					<view class="item-title">
						拣货数据
					</view>
					<view class="item-table">
						<view class="table-top">
							<view class="tabletop-item" v-for="(item,index) in tableData.topData">
								{{item}}
							</view>
						</view>
						<view class="table-content">
							<view class="tablecontent-line" v-for="(linedata,linenum) in tableData.contentData">
								<view class="tableline-item" v-for="(item,index) in linedata">
									{{item}}
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
			<view class="charts-item">
				<block v-if="!chartsShow"> 
					<view class="item-title">
						条目数
					</view>
					<view class="qiun-charts">
						<canvas canvas-id="canvasColumn1" id="canvasColumn1" class="charts"> </canvas>
					</view>
					 <view class="charts-legend">
					 	复核排行榜
					 </view>
				</block>
				<block v-if="chartsShow">
					<view class="item-title">
						复核数据
					</view>
					<view class="item-table">
						<view class="table-top">
							<view class="tabletop-item" v-for="(item,index) in tableData.topData2">
								{{item}}
							</view>
						</view>
						<view class="table-content">
							<view class="tablecontent-line" v-for="(linedata,linenum) in tableData.contentData2">
								<view class="tableline-item" v-for="(item,index) in linedata">
									{{item}}
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
			<view class="charts-item">
				<block v-if="!chartsShow"> 
					<view class="item-title">
						条目数
					</view>
					<view class="qiun-charts">
						<canvas canvas-id="canvasColumn1" id="canvasColumn1" class="charts"> </canvas>
					</view>
					 <view class="charts-legend">
					 	打包排行榜
					 </view> 
				</block>
				<block v-if="chartsShow">
					<view class="item-title">
						打包数据
					</view>
					<view class="item-table">
						<view class="table-top">
							<view class="tabletop-item" v-for="(item,index) in tableData.topData">
								{{item}}
							</view>
						</view>
						<view class="table-content">
							<view class="tablecontent-line" v-for="(linedata,linenum) in tableData.contentData">
								<view class="tableline-item" v-for="(item,index) in linedata">
									{{item}}
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
		<view class="footer">
			<view class="footer-notice">
				<view class="notice-text">
					{{message}}
				</view>
				
			</view>
			<!-- <u-notice-bar mode="horizontal" :is-circular="false" :list="noticedata"></u-notice-bar> -->
			<view class="footer-info">
			<!-- 	<view class="info-banben">
					@copyright 2020
				</view> -->
				<view class="info-gongsi">
					<text  @click="peizhi">广州时空智友信息科技有限公司</text>
				</view>
				<!-- <view class="info-btn" >
					配置

				</view> -->
			</view>
			
		</view>
		<uni-popup ref="popup" type="dialog" >
		    <uni-popup-dialog type="input" title="更改配置" placeholder="请填入配置地址" mode="input" message="成功消息" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
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
				//基本信息数据	
				title:'XX作业展示',//顶部标题
				logo:'/static/logo.png',//公司logo的url地址
				date:'',//服务器端日期
				time: '',//当时new date()时间
				timeshow:1,//时间显示方式判断依赖值 接口字段clock_type:1.数字时钟;2.模拟时钟
				message:'公告信息:即将迎来第2020个中国传统节日-七夕节,在这里,您有什么相对另一半或者未来的另一半想说的,欢迎拨打电话2020771314!!',//测试屏幕宽度		
				qiehuantime:30,//设置页面切换时间
				chartsShow:false,//图表切换判断依赖值
				//区域任务数据
				areaDatasum:[
					{'num':14,'bianhao':'101'},
					{'num':23,'bianhao':'201'},
					{'num':34,'bianhao':'303'},
					{'num':44,'bianhao':'404'},
					{'num':54,'bianhao':'505'},
					{'num':64,'bianhao':'606'},
					{'num':74,'bianhao':'707'},
					{'num':84,'bianhao':'808'},
					{'num':94,'bianhao':'909'},
					{'num':114,'bianhao':'100'}
				],
				areaData:[],//区域任务最终展示数据
				//table相关数据
				tableData:{
					topData:['排名','姓名','条目','折合件数','金额'],
					contentData:[
						['1','罗小龙','110','110','110'],
						['2','曾小康','100','100','100'],
						['3','张大力','90','90','90'],
						['4','王五','80','80','80'],
						['5','蔡坤','70','70','70'],
						['6','刘晓东','60','60','60'],
						['7','周开复','50','50','50'],
						['8','张凯文','40','40','40'],
						['9','李亮达','30','30','30'],
						['10','王子凡','20','20','20'],
						// {'rank':'10','name':'王子凡','item':'20','num':'20','money':'20'},
					],
					topData2:['排名','姓名','条目','折合件数','金额','监管码数'],
					contentData2:[
						['1','罗小龙','110','110','110','110'],
						['2','曾小康','100','100','100','100'],
						['3','张大力','90','90','90','90'],
						['4','王五','80','80','80','80'],
						['5','蔡坤','70','70','70','70'],
						['6','刘晓东','60','60','60','60'],
						['7','周开复','50','50','50','50'],
						['8','张凯文','40','40','40','40'],
						['9','李亮达','30','30','30','30'],
						['10','王子凡','20','20','20','20'],
						// {'rank':'10','name':'王子凡','item':'20','num':'20','money':'20'},
					],
				},
				//u-chart相关数据
				cWidth:'',//树状图高度数据
				cHeight:'',//树状图宽度数据
				cWidthPie:'',//饼图宽度数据
				cHeightPie:'',//饼图高度数据
				pixelRatio:1,
				chartData: {
				  "categories": ["罗小龙", "赵晓刚", "孙晓丽","罗小龙", "赵晓刚", "孙晓丽","罗小龙", "赵晓刚", "孙晓丽","罗小龙"],
				  "series": [{
					// "color":"#0081d4",
					// "textColor":"#ffffff",
					// "name": "拣货排行榜",
					"data": [440, 420, 370,344, 322, 265,243, 212, 203,111],
					// "color": "red"
				  }]
				},
				//饼图数据
				"chartData2": {
				  "series": [{
					"name": "已出订单",
					"data": 102,
					//下列数据项已通过修改源码实现
					// "color":"#fdbb40", 
					// "legendShape":"rect",
					// "textColor":"#ffffff",
					// "format":()=> this.chartData2.series[0].data
				  }, {
					
					"name": "未出订单",
					"data": 98,
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
			if(_self.areaDatasum.length > 6){
				_self.areaData = _self.areaDatasum.slice(0,6)
			}
			else{
				_self.areaData = _self.areaDatasum
			}
			if(_self.timeshow){
				//启动定时器_self.interval，间隔一秒钟实现时钟效果
				let keepinterval = setInterval(_self.interval,1000)
			}
			
			//启动定时器timeout()，实现排行榜和树状图的切换时间掌控
			// _self.timeout(_self.qiehuantime)
		},
		onReady(){
			this.$nextTick(function(){
				const query = uni.createSelectorQuery().in(this);
				setTimeout(()=>{
					query.select('#canvasColumn1').boundingClientRect(data => {
					  console.log("得到布局位置信息" + data);
					  console.log("节点的宽高为" + data.width+'  '+data.height);
					  this.cWidth = data.width - 5;
					  this.cHeight = data.height - 10;
					  console.log(this.cWidth+this.cHeight);
					  this.showColumn("canvasColumn1",this.$data.chartData);		
					}).exec();
					query.select('#canvasPie').boundingClientRect(data => {
					  console.log("得到布局位置信息" + data);
					  console.log("节点的宽高为" + data.width+'  '+data.height);
					  this.cWidthPie = data.width;
					  this.cHeightPie = data.height;
					  this.showPie("canvasPie",this.$data.chartData2);
					}).exec();
					//启动定时器timeout()，实现排行榜和树状图的切换时间掌控
					console.log('在启动定时器timeout()方法前运行');
					_self.timeout(_self.qiehuantime * 1000)
				},2000)
			})
			// this.cWidth=380;
			// this.cHeight=235;
			// this.cWidth=uni.upx2px(380);
			// this.cHeight=uni.upx2px(235); 
			this.request()
		},
		methods: {
			//请求数据接口统一方法
			request(){
				// this.$request({
				// 	url:"PublicUrl.ashx",
				// 	data:{'proc':'Pro_Get_goodInfo','type':'轮播','userid':'18537130666'}
				// }).then(res => {
				// 	this.goodList = res.Msg_info
				// 	console.log(res);
				// });
				this.$request({
					url:"PublicUrl.ashx",
					data:{'proc':'APP_WMS_datamax','type':'基本信息',}
				}).then(res => {
					this.title = res.Msg_info[0].title
					this.logo = res.Msg_info[0].logo
					this.message = res.Msg_info[0].message
					this.timeshow = res.Msg_info[0].clock_type
					this.qiehuantime = res.Msg_info[0].interval
					console.log(res);
				});
			},
			//页面定时器方法
			interval(){
				let datetime = new Date();
				// let month = time.getMonth()*1 + 1
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
				// this.chartsShow = second > 30
				// if(this.chartsShow ){
				// 	if(_self.areaDatasum.length > 6){
				// 		_self.areaData = _self.areaDatasum.slice(6)
				// 	}
				// }else{
				// 	this.$nextTick(function(){
				// 		_self.areaData = _self.areaDatasum.slice(0,6)
				// 		_self.showColumn("canvasColumn1",_self.$data.chartData);
				// 		_self.showPie("canvasPie",_self.$data.chartData2);
				// 	})
				// }
			},
			//数据表和树状图切换方法定时器
			timeout(time){
				if(timer){ clearTimeout(timer)}
				let timer = setTimeout(()=>{
					_self.chartsShow = !_self.chartsShow
					_self.$nextTick(function(){
						if(_self.chartsShow ){
							if(_self.areaDatasum.length > 6){
								_self.areaData = _self.areaDatasum.slice(6)
							}
						}else{
								_self.areaData = _self.areaDatasum.slice(0,6)
								_self.showColumn("canvasColumn1",_self.$data.chartData);
								_self.showPie("canvasPie",_self.$data.chartData2);
						}
					})
					console.log('打印settimeout数据表和树状图切换方法');
					const nexttime = time || 30000;
					_self.timeout(nexttime);
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
			  * @param {Object} done
			  * @param {Object} value
			  */       
			confirm(done,value){
			    // 输入框的值
				done()
				console.log(value)
			    // TODO 做一些其他的事情，手动执行 done 才会关闭对话框
			    // ...
			    
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
							min:100,
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
							width: _self.cWidth*_self.pixelRatio*0.5/chartData.categories.length
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
							  offsetAngle:90
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
	.fixed view {
		height: 8vh;
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
			height: 100%;
			line-height: 100%;
			
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
		width: 8vh;
		height: 8vh;
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
					font-size: 16rpx;
					/*#endif*/
					/*#ifdef APP-PLUS*/
						font-size: 12.5rpx;	
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
	.charts-item:nth-child(2) .item-title{
		// background-color: #C0C0C0;
		padding-left: 8.5rpx !important;
	}
	.item-table{
		box-sizing: border-box;
		width: 100%;
		height: 100%;
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
			border-bottom: 1px solid #FFFFFF;
			display: flex;
			/*#ifndef APP-PLUS*/
			font-size: 16rpx;
			/*#endif*/
			/*#ifdef APP-PLUS*/
				// font-size: 12.5rpx;
				font-size: 11.5rpx;
			/*#endif */
			margin-bottom: 1vh;
			.tabletop-item{
				flex: 1;
				text-align: center;
				flex-grow:1;
			}
			.tabletop-item:nth-of-type(2){
				flex-grow:1.5;
			}
			.tabletop-item:nth-of-type(4),
			.tabletop-item:nth-of-type(6){
				flex-grow:2;
			}
		}
		.table-content{
			box-sizing: border-box;
			padding: 1vh 0;
			width: 100%;
			height: 100%;
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
	.footer{
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
			padding: 0 8px;
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
		.info-banben{
			width: 13vw;
			// width: 35%;
			height: 3vh;
			line-height: 3vh;
			// font-size:14px;
		}
		.info-gongsi{
			width: 30vw;
			// width: 64%;
			height: 3vh;
			line-height: 3vh;
			text-align: right;
			// font-size: 11rpx;
		}
		// .info-btn{
		// 	width: 3vw;
		// 	height: 3vh;
		// 	line-height: 3vh;
		// 	// font-size: 14px;
		// }
	}
</style>
