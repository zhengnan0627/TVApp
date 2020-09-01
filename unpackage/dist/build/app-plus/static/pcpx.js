;(function (){
	//#ifdef H5
	var u = navigator.userAgent,
		w = window.innerWidth;
	if (true) {
		// console.log(window + '12352321');
		window.innerWidth = 750*(w / 1240);
		window.onload = function() {
			window.innerWidth = w;
		}
	}
	//#endif
	//#ifdef APP-PLUS
	uni.getSystemInfo({
		success:function(res){
			let w = res.windowWidth
			console.log(w);
			res.screenWidth = 750*(w / 1240);
			res.screenWidth = w;
		},

	})
	//#endif
})();