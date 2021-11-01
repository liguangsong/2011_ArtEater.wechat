<template>
	<view>
		<view class="resultView">
			<view class="tips" style="font-weight: bold;">您的正确率为：</view>
			<view class="scoreView">
				<view class="score">{{score}}</view>
				<view class="txt">%</view>
			</view>
			<view class="tips">总耗时：{{minutes}}</view>
		</view>
		<canvas canvas-id='mycanvas' :disable-scroll="true" class="canvas"></canvas>
		<!-- <button @click="handleShare" class="btnShare">分享</button> -->
		<view @click="handleShare" class="btnShare">
			<image src="../../../static/icon_sharebg.png"></image>
			<view class="title">分享</view>
		</view>
		<button @click="handHomePage" class="btnPrev">返回</button>
		
		<u-mask :show="isShowPicImg" @click="isShowPicImg = false">
			<view class="warp">
				<view class="rect">
					<image @tap.stop v-if="sharePicImg" :src="sharePicImg" mode="aspectFit" style="width: 450rpx; height: 800rpx;"></image>
					<button class="download" @click="handleSaveImg">保存并分享</button>
				</view>
			</view>
		</u-mask>
	</view>
</template>

<script>
	// import config from 'static/config/index.js'
	export default {
		data() {
			return {
				userInfo:{},
				questionHistory:{},
				screenHeight:0,
				isShowPicImg: false,
				sharePicImg: '',
				history:null,
				qrcode:'',
				minutes: '',
				score: ''
			}
		},
		onLoad(options) {
			var self = this
			uni.loadFontFace ({
			  family: 'PingFangSC-Medium',
			  source: 'url("https://www.arteater.cn/PingFangSCMedium.ttf")',
			  success: function(){
				  console.log('load font success')
			  }
			})
			// uni.getStorage({
			// 	key:'userInfo',
			// 	success(res) {
			// 		self.userInfo = res.data
			// 		var _config = config
			// 		uni.request({
			// 			method: 'POST',
			// 			url: `${_config.parseRestBaseUrl}/wx/getUnlimitedCode`,
			// 			data: { openid: self.userInfo.openid},
			// 			header: {
			// 				'X-Parse-Application-Id': _config.ParseAppId,
			// 				'X-Parse-REST-API-Key': _config.parseRestApiKey,
			// 			},
			// 			success: async res => {
			// 				if (res.data.code === 200) {
			// 					self.qrcode = res.data.data
			// 				}
			// 			},
			// 			fail: (error) => {
			// 				uni.showToast({
			// 					icon: 'none',
			// 					title: '生成二维码失败',
			// 					duration: 2000
			// 				})
			// 				console.log(error)
			// 			}
			// 		});
			// 	}
			// })
			uni.getStorage({
				key:'userInfo',
				success(res) {
					self.userInfo = res.data
					if(options.sid){
						self.examId = options.sid
						// const history = self.Parse.Object.extend("QuestionHistory")
						const query = new self.Parse.Query('QuestionHistory')
						query.equalTo('openid', res.data.openid)
						query.equalTo('subjectId', options.sid)
						query.equalTo('isImportant', parseInt(options.important))
						query.first().then(qres => {
							// qres.set('minutes', self.createMinutes(options.time))
							self.minutes = self.createMinutes(options.time)
							let answers = qres.get('answers')
							let right = answers.filter(t=>{
								return (t && t.result && t.result == true)
							})
							self.score = parseFloat((right.length*100/answers.length).toFixed(0)) + ''
							self.history = qres
						})
					}
				}
			})
			uni.showShareMenu({
				withShareTicket: true,
				  menus: ['shareAppMessage', 'shareTimeline']
			})
			// this.handleBuild()
		},
		methods: {
			/*点击题目*/
			handleResultClick(e){
				var _index = e.currentTarget.dataset.index
				var _item = e.currentTarget.dataset.item
				if(_item==null || _item.answer == null) {
					uni.showToast({
						title:'该题目未作答',
						icon:'none'
					})
				} else {
					uni.navigateTo({
						url:'./testdetail?tid=' + this.examId + '&index=' + _index
					})
				}
			},
			createMinutes(seconds){
				return Math.floor(seconds/60)+'分钟'+(seconds%60)+'秒'
			},
			/*返回首页*/
			handHomePage(){
				uni.navigateBack({
					delta: 1
				})
			},
			/**
			 * 画一个圆角矩形
			 */
			roundRect(ctx, x, y, w, h, r) {
				ctx.save()
				// 开始绘制
				ctx.beginPath()
				ctx.setFillStyle('rgba(255,255,255,0.69)')
				// ctx.setStrokeStyle('transparent')
				// 绘制左上角圆弧
				ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)
			
				// 绘制border-top
				ctx.moveTo(x + r, y)
				ctx.lineTo(x + w - r, y)
				ctx.lineTo(x + w, y + r)
				// 绘制右上角圆弧
				ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)
			
				// 绘制border-right
				ctx.lineTo(x + w, y + h - r)
				ctx.lineTo(x + w - r, y + h)
				// 绘制右下角圆弧
				ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)
			
				// 绘制border-bottom
				ctx.lineTo(x + r, y + h)
				ctx.lineTo(x, y + h - r)
				// 绘制左下角圆弧
				ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)
			
				// 绘制border-left
				ctx.lineTo(x, y + r)
				ctx.lineTo(x + r, y)
				
				ctx.fill()
				// ctx.stroke()
				ctx.closePath()
				// 剪切
				ctx.clip()
				ctx.restore()
			},
			/* 绘制头像圆型范围 */
			headPic(ctx, url, avatarurl_width, avatarurl_x, avatarurl_y,factor){
				ctx.save()
				ctx.beginPath(); //开始绘制
				//先画个圆   前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
				ctx.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_width / 2 + avatarurl_y, avatarurl_width / 2, 0, Math.PI * 2, false);
				ctx.clip();//画好了圆 剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内 这也是我们要save上下文的原因
			},
			/*分享*/
			handleShare(){
				var self = this
				uni.navigateTo({
					url:'/pages/subject/share',
					success(res) {
						res.eventChannel.emit('data', {
							title: '恭喜你顺利完成！美院离你更近了',
							time: self.minutes,
							percent: self.score,
							action: 'kmwc',
						})
					},
				})
			},
			/* 生成图片 */
			handleBuild(){
				var self = this
				uni.showLoading()
				uni.downloadFile({
					url: self.userInfo.avatarUrl,
					success (headRes) {
						uni.downloadFile({url: self.qrcode,success (qrcodeRes) {
							const sysInfo = uni.getSystemInfoSync();
							const screenWidth = sysInfo.screenWidth;
							var factor = screenWidth / 750;
							let picWidth = 750
							let picHeight = 1340
							var bili = picWidth / 750
							self.screenHeight= picHeight/factor*bili
							const context = uni.createCanvasContext('mycanvas')
							context.draw() // 先清空画布
							context.fillRect(0, 0, 750 * factor, picHeight * factor)
							context.drawImage('../../../static/sharebg.png', 0, 0, picWidth, picHeight);
							context.setFillStyle('black')
							self.roundRect(context, 30*factor, 220 * factor, 690 * factor, 1072 * factor, 40 * factor) // 绘制半透明的圆角背景
							
							
							context.restore()
							// context.font = 'bold'
							// 考试名称
							context.setFontSize(54*factor)
							context.setFillStyle('#352026')
							// context.font = 'normal bold ' + parseInt(54 * factor) + 'px Arial, Helvetica, sans-serif'
							// let examName = self.history.get('examName')
							// const m1 = context.measureText(examName)
							// context.fillText(examName, (750 - m1.width / factor) / 2 * factor, 506*factor )
							// 考试用时
							context.setFontSize(30*factor)
							context.font = 'normal normal ' + parseInt(30 * factor) + 'px Arial, Helvetica, sans-serif'
							let time = '考试时间：' + self.minutes
							const m2 = context.measureText(time)
							context.fillText(time, (750 - m2.width / factor) / 2 * factor, 556*factor )
							
							// 用户
							context.setFontSize(34*factor)
							context.font = 'normal normal ' + parseInt(34 * factor) + 'px Arial, Helvetica, sans-serif'
							let user = self.userInfo.nickName
							const m3 = context.measureText(user)
							context.fillText(user, (750 - m3.width / factor) / 2 * factor, 666*factor )
							
							
							// 用户
							context.setFontSize(34*factor)
							context.font = 'normal normal ' + parseInt(34 * factor) + 'px Arial, Helvetica, sans-serif'
							let _user = '本次答题的正确率为：'
							const m_3 = context.measureText(_user)
							context.fillText(_user, (750 - m_3.width / factor) / 2 * factor, 726*factor )
							
							// 得分				
							context.setFontSize(160*factor)
							context.setFillStyle('#ff6867')
							context.font = 'normal bold ' + parseInt(160 * factor) + 'px Arial, Helvetica, sans-serif'
							let score = self.score
							const m4 = context.measureText(score + "")
							context.fillText(score+"", (750 - m4.width / factor) / 2 * factor, 886*factor )
							
							// 分
							context.setFontSize(34*factor)
							context.setFillStyle('#352026')
							context.font = 'normal normal ' + parseInt(34 * factor) + 'px Arial, Helvetica, sans-serif'
							const m5 = context.measureText('%')
							context.fillText('%', ((750 - (m4.width / factor)) / 2 * factor) + (m4.width), 886*factor )
							
							// 绘制二维码
							context.drawImage(qrcodeRes.tempFilePath, 224 * factor, 946 * factor, 300 * factor,300 * factor);
							
							self.headPic(context, '', 240 * factor, 256 * factor, 100 * factor, factor) // 绘制头像外层框
							context.drawImage(headRes.tempFilePath, 256 * factor, 100 * factor,240 * factor,240 * factor); // 将头像装进头像框
							// context.draw(true)
							context.draw(true,function(){
								setTimeout(function () {
									uni.canvasToTempFilePath({
										x:0,
										y:0,
										width: 750,
										height: self.screenHeight,
										fileType: 'jpg',
										quality: 1,
										canvasId: 'mycanvas',
										success: function (res) {
											uni.hideLoading()
											console.log(res.tempFilePath)
											self.sharePicImg = res.tempFilePath
											self.isShowPicImg = true
										}
									})
								}, 500)
							})
						}})
					}
				})
			},
			/* 保存图片至本地 */
			handleSaveImg(){
				var self = this
				uni.saveImageToPhotosAlbum({
					filePath: self.sharePicImg,
					success(res) {
						console.log(res);
						uni.showModal({
							title: '图片保存成功',
							content: '图片成功保存到相册了，去发圈噻~',
							showCancel: false,
							confirmText: '好哒',
							confirmColor: '#72B9C3',
							success: function (res) {
							  if (res.confirm) {
								console.log('用户点击确定');
							  }
							  self.canvasHidden = true
							}
						})
					}
				})
			}
		},
		/**
		   * 用户点击右上角分享
		   */
		onShareAppMessage: function (e) {
			return {
			  path: '/pages/exam/share?hid=' + this.history.id,
			  success: (res) => {
				// 分享成功
			  },
			  fail: (res) => {
				// 分享失败
			  }
			}
		}
	}
</script>

<style>
	page{
		background-color: #fbfbfb;
	}
	.resultView{
		padding-top: 112rpx;
		height: 482rpx;
		/* border-bottom: 2rpx solid #f2f2f2; */
		margin: 0 30rpx;
	}
	.resultView .tips{
		padding-left: 78rpx;
		font-size: 26rpx;
		height: 42rpx;
		line-height: 42rpx;
		color: #352026;
		font-family: PingFangSC-Medium;
	}
	.resultView .scoreView{
		height: 224rpx;
		text-align: center;
		margin-bottom: 22rpx;
		margin-top: 10rpx;
	}
	.resultView .scoreView .score{
		height: 224rpx;
		display: inline;
		font-size: 160rpx;
		font-weight: bold;
		color: #ff6867;
		font-family: PingFangSC-Medium;
	}
	.resultView .scoreView .txt{
		display: inline;
		font-size: 34rpx;
		font-weight: bold;
		color: #352026;
		font-family: PingFangSC-Medium;
	}
	.view1{
		padding-top:44rpx;
		padding-left: 4rpx;
	}
	.view1 .title{
		padding-left: 40rpx;
		font-size: 26rpx;
		font-weight: bold;
		color: #352026;
		font-family: PingFangSC-Medium;
	}
	.view1 .rView{
		margin-top: 26rpx;
	}
	.view1 .rView .resultItem{
		display: inline-block;
		margin-left: 36rpx;
		margin-top: 22rpx;
		width: 82rpx;
		height:82rpx;
		line-height:82rpx;
		text-align: center;
		border-radius: 50%;
		background-color: #fbfbfb;
		font-size: 34rpx;
		color: rgba(53,32,38,0.4);
		font-family: PingFangSC-Medium;
	}
	.view1 .rView .resultItem.error{
		background-color: #ffefef;
		color: rgba(250,81,81,0.8);
	}
	.view1 .rView .resultItem.right{
		background-color: #eaf1f4;
		color: #3CC0DA;
	}
	.btnShare{
		position: relative;
		height: 92rpx;
		line-height: 92rpx;
		text-align: center;
		background-image: linear-gradient(1deg, 
			#ffa394 0%, 
			#ff9d83 10%, 
			#ff6666 60%, 
			#fc4c4c 89%, 
			#f93131 100%);
		border-radius: 46rpx;
		color: #ffffff;
		font-weight: bold;
		font-size: 34rpx;
		font-family: PingFangSC-Medium;
		margin: 30rpx;
		margin-top: 54rpx;
	}
	.btnShare image{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: 46rpx;
	}
	.btnShare .title{
		position: absolute;
		z-index: 1;
		width: 100%;
		text-align: center;
	}
	.btnShare::after{
		border: 0;
	}
	.btnPrev{
		height: 92rpx;
		line-height: 92rpx;
		background-color: #ffd4d4;
		border-radius: 46rpx;
		color: #ff6867;
		font-weight: bold;
		font-size: 34rpx;
		font-family: PingFangSC-Medium;
		margin: 30rpx;
		margin-top: 24rpx;
	}
	.btnPrev::after{
		border: 0;
	}
	.download{
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 94rpx;
		color: #ff776f;
		font-size: 34rpx;
		font-family: PingFangSC-Medium;
		border: 2rpx solid #ff776f;
		border-radius: 92rpx;
		background-color: #ffffff;
	}
	.canvas{
		width:750rpx;margin:0 auto;
		position:fixed;
		left:1000px;
		height: 1340rpx;
	}
	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.rect {
		width: 450rpx;
		height: 890rpx;
		/* background-color: #fff; */
	}
</style>
