<template  >
	<view >
		<view id="clock">
		  <view class="hour"> 
		    <view class="min"></view>
		    <view class="min"></view>
		    <view class="min"></view>
		    <view class="min"></view>
		    <view class="min"></view>
		  </view>
		  <view class="hour">
		    <view class="min"></view>
		    <view class="min"></view>
		    <view class="min"></view>
		    <view class="min"></view>
		    <view class="min"></view>
		  </view>
		  <!-- <view id="alarm"> </view> -->
		  <view id="min" :style="{webkitTransform:fen}"></view>
		  <view id="hour" :style="{webkitTransform:shi}"></view>
		  <view id="sec" :style="{webkitTransform:miao}"></view>
		 <!-- <ol>
			<li>{{shijian[0]}}</li>
			<li>{{shijian[1]}}</li>
			<li>{{shijian[2]}}</li>
			<li>{{shijian[3]}}</li>
			<li>{{shijian[4]}}</li>
			<li>{{shijian[5]}}</li>
			<li>{{shijian[6]}}</li>
			<li>{{shijian[7]}}</li>
			<li>{{shijian[8]}}</li>
			<li>{{shijian[9]}}</li>
			<li>{{shijian[10]}}</li>
			<li>{{shijian[11]}}</li>  
		  </ol> -->
		</view>
		 
	</view>

</template>

<script>
	 
	export default {
		data() {
			return {
				  shi:0,
				  fen:0,
				  miao:0,
				  shijian:[],
				  tuichu:false,
				  hours:0,
			 }
		},
		computed:{
		
		},
		
		created() {
			
			this.getcanshu();
			this.tuichu=true;
			if(this.tuichu){
				 this.fristdraw();
				 this.draw();
			}
			  
		},
		onBackPress() {
			this.tuichu=false;
		},
		methods: {
			getcanshu(){
				var now = new Date();
				let then = new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0,0);
				let diffInMil = (now.getTime() - then.getTime());
				let h = (diffInMil/(1000*60*60));
				this.shijian=["1", "2", "3", "4", "5","6","7","8","9","10","11","12"]
				// if(h>11){
				// 	this.shijian=["午", "未", "申", "酉", "戌", "亥"]
				// }else{
				// 	this.shijian=["子", "丑", "寅", "卯", "辰", "巳"]
				// }
			},
			  draw(){
				  setTimeout(() => {
						 var now = new Date(),//now
						  then = new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0,0),//midnight
						  diffInMil = (now.getTime() - then.getTime()),// difference in milliseconds
						  h = (diffInMil/(1000*60*60)),//hours
											 
						  m = (h*60),//minutes
						  s = (m*60);//seconds
						  
						 this.shi= "rotate(" + (h * 30 + (h / 2)-10) + "deg)";
						 this.fen= "rotate(" + (m * 6) + "deg)";
						 this.miao= "rotate(" + (s * 6) + "deg)";
						  
											 
						 if(this.tuichu){
							this.draw();
						 }
				  }, 1000)
				 
			    } ,
				fristdraw(){
				 var now = new Date(),//now
				 then = new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0,0),//midnight
				 diffInMil = (now.getTime() - then.getTime()),// difference in milliseconds
				 h = (diffInMil/(1000*60*60)),//hours			 
				 m = (h*60),//minutes
				 s = (m*60);//seconds
				 this.shi= "rotate(" + (h * 30 + (h / 2)) + "deg)";
				 this.fen= "rotate(" + (m * 6) + "deg)";
				 this.miao= "rotate(" + (s * 6) + "deg)";
				}
		 }
		
			 
			 
	}
</script>

<style>

   @charset "utf-8";
   *, *:before, *:after {
     box-sizing: border-box;
   }
   
  
   
   body {
     font-size: 11rpx;
	 
     font-family: helvetica;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
     background: linear-gradient(to bottom, #969696 0%, #6e6e6e 100%);
   }
   
   #clock {
	 
     position: absolute;
     top: 0;
     left: 10%;
     right: 0;
     bottom:0;
     margin: auto;
     width: 21em;
     height: 21em;
     border-radius: 50%;
     background: #eee;
     border: 0.2em solid #d0d0d0;
     box-shadow: 0 1.2em 0 -1em white, 0 -0.1em 0.3em 0 #fff, 0 0 0 0.6em #e7e7e7, 0 0.6em 1.2em 0 rgba(0, 0, 0, 0.5), inset 0 0.5em 1em 0 rgba(0, 0, 0, 0.3), inset 0 0 8em 0 rgba(0, 0, 0, 0.2);
	transform: scale(0.2);	
   }
/*   #clock:before {
     display: block;
     content: "";
     position: absolute;
     background: #dedede;
     left: -2em;
     top: -2em;
     width: 25em;
     height: 25em;
     border-radius: 4.6em;
     z-index: -1;
     box-shadow: inset 0 -0.2em 0.2em 0 rgba(0, 0, 0, 0.2), inset 0 0.2em 2em 0 #fff;
   }
   #clock:after {
     display: block;
     content: "";
     position: absolute;
     height: inherit;
     width: inherit;
     background: transparent;
     top: 0;
     left: 0;
     border-radius: inherit;
     box-shadow: inset 12em 14em 0 -10em rgba(255, 255, 255, 0.25);
     z-index: 4;
   } */
   #clock .hour {
     position: absolute;
     top: 0;
     left: 0;
     right: 0;
     bottom: 0;
     margin: auto;
     width: 0.5em;
     height: 16.4em;
     background: transparent;
     box-shadow: 0 -1em 0 -0.1em #383838, 0 1em 0 -0.1em #383838;
     transform: rotate(30deg);
   }
   #clock .hour:after, #clock .hour:before {
     display: block;
     content: "";
     position: absolute;
     height: inherit;
     width: inherit;
     background: inherit;
     box-shadow: inherit;
     backface-visibility: hidden;
   }
   #clock .hour:before {
     transform: rotate(30deg);
   }
   #clock .hour:after {
     transform: rotate(-30deg);
   }
   #clock .hour:nth-of-type(1) {
     transform: rotate(-60deg);
   }
   #clock .min {
     position: absolute;
     top: 0;
     left: 0;
     right: 0;
     bottom: 0;
     margin: auto;
     width: 0.3em;
     height: 17em;
     background: transparent;
     box-shadow: 0 -0.6em 0 -0.1em #383838, 0 0.6em 0 -0.1em #383838;
     z-index: -1;
     transform: rotate(-54deg);
   }
   #clock .min:after, #clock .min:before {
     display: block;
     content: "";
     position: absolute;
     height: inherit;
     width: inherit;
     background: inherit;
     box-shadow: inherit;
     backface-visibility: hidden;
     z-index: 0;
   }
   #clock .min:before {
     transform: rotate(6deg);
    
   }
   #clock .min:after {
     transform: rotate(12deg);
   }
   #clock .min:nth-child(2) {
     transform: rotate(-36deg);
   }
   #clock .min:nth-child(3) {
     transform: rotate(-18deg);
   }
   #clock .min:nth-child(4) {
     transform: rotate(6deg);
   }
   #clock .min:nth-child(5) {
   	
     transform: rotate(24deg);
   }
   
   #alarm {
     position: absolute;
     top: 0;
     left: 0;
     right: 0;
     bottom: 0;
     margin: auto;
     background: #f8f8f8;
     width: 2.6em;
     height: 2.6em;
     border-radius: 50%;
     transform: rotate(-45deg);
     box-shadow: 0 0.2em 0.4em 0 rgba(0, 0, 0, 0.1);
   }
   #alarm:after {
     display: block;
     content: "";
     position: absolute;
     width: 0.4em;
     height: 4.8em;
     top: -4.6em;
     background: linear-gradient(to bottom, #f6f6f6 0%, #f8f8f8 100%);
     left: 0;
     right: 0;
     margin: 0 auto;
     z-index: -3;
     box-shadow: inset 0 1.2em 0 #4ca440, -0.2em -0.2em 0.3em 0 rgba(0, 0, 0, 0.1);
   }
   
   #sec {
     position: absolute;
     top: 0;
     left: 0;
     right: 0;
     bottom: 0;
     margin: auto;
     background: radial-gradient(ellipse at center, #ffd322 0%, #000000 100%);
     width: 2em;
     height: 2em;
     border-radius: 50%;
     border: 0.14em solid #000000;
     z-index: 99;
   }
   #sec:before, #sec:after {
     display: block;
     content: "";
     position: absolute;
   }
   #sec:before {
     background: #000000;
     width: 0.8em;
     height: 1.5em;
     top: 1.8em;
     left: 0;
     right: 0;
     margin: 0 auto;
     border-radius: 0 0 2em 2em;
   }
   #sec:after {
     width: 0.18em;
     height: 7.6em;
     top: -7.6em;
     background: #000000;
     left: 0;
     right: 0;
     margin: 0 auto;
   }
   
   #min,
   #hour {
     z-index: 99;
     position: absolute;
     top: 0;
     left: 0;
     right: 0;
     bottom: 0;
     margin: auto;
     background: #000000;
     transform-origin: bottom center;
   }
   
   #min {
     width: 0.6em;
     height: 8.6em;
     top: -8.6em;
     border-radius: 2em 2em 0 0;
     box-shadow: inset 0 0 0 0.16em #303030, inset 0 -6em 0 0 #303030, -0.2em -0.2em 0.4em 0 rgba(0, 0, 0, 0.2);
   }
   
   #hour {
     width: 0.7em;
     height: 7em;
     top: -7em;
     border-radius: 2em 2em 0 0;
     box-shadow: inset 0 0 0 0.16em #303030, inset 0 -4.2em 0 0 #303030, -0.2em -0.2em 0.4em 0 rgba(0, 0, 0, 0.2);
   }
   
   ol {
     position: relative;
     height: inherit;
     width: inherit;
   }
   ol li {
     counter-increment: customlistcounter;
     font-size: 1.2rem;
     display: inline-block;
     position: absolute;
     letter-spacing: -0.1em;
     color: #383838;
     text-align: center;
   }
   ol li:before {
    /* content: counter(customlistcounter) ""; */
   }
   ol li:nth-child(1){
    
   	    top: 2.5em;
   	    right: 5.4em;
   	  
   	   
   }
   
   ol li:nth-child(2) {
       top: 2.7em;
           position: absolute;
           right: 2.5em;
   }
   ol li:nth-child(3) {
     top: 7.8em;
 
         right: 2.4em;
          
   }
   ol li:nth-child(4) {
        top: 6.1em;
        right: 2.5em;
   }
   ol li:nth-child(5) {
        top: 12.90em;
        right: 4.9em;
      
   }
   
   ol li:nth-child(7) {
          top: 12.90em;
          right: 11.0em;
   }
   ol li:nth-child(8) {
     top: 6.1em;
         right: 7.5em;
   }
   ol li:nth-child(10) {
        top: 2.59em;
     
        right: 7.9em;
   }
   ol li:nth-child(11) {
       top: 2.6em;
       right: 10.9em;
   }
   ol li:nth-child(9) {
     top: 7.8em;
         position: absolute;
         left: 1.9em;
   }
   ol li:nth-child(6) {
           bottom: 1.1em;
           left: 4.7em;
           position: absolute;
   }
   ol li:nth-child(12) {
         top: 1.0em;
         left: 4.7em;
   }
 
</style>
