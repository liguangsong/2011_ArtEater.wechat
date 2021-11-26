<template>
	<TopNavbar title='分享给好友' paddingTop="-1">
		<view>
			<canvas canvas-id='mycanvas' :disable-scroll="true" class="canvas"></canvas>
			<view class="rect">
				<image @tap.stop v-if="sharePicImg" :src="sharePicImg" mode="aspectFill" class="bgImg"></image>
				<!-- <button class="download" @click="handleSaveImg">保存并分享</button> -->
				<view @click="handleSaveImg" class="download">
					<image src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/icon_sharebg.png"></image>
					<view class="title">保存并分享</view>
				</view>
			</view>
		</view>
	</TopNavbar>
</template>

<script>
	import TopNavbar from '@/components/navBar/topNavbar.vue'
	import config from '../../../static/config/index.js'
	export default {
		data() {
			return {
				userInfo: {},
				qrcode: '',
				sharePicImg:'',
				days: 0,
				rightCount: 0,
				percent: '0',
				complateCount: 0,
				
			}
		},
		components: {
			TopNavbar
		},
		onLoad() {
			var self = this
			uni.getStorage({
				key:'userInfo',
				success(res) {
					self.userInfo = res.data
					var _config = config
					uni.request({
						method: 'POST',
						url: `${_config.parseRestBaseUrl}/wx/getUnlimitedCode`,
						data: { openid: self.userInfo.openid},
						header: {
							'X-Parse-Application-Id': _config.ParseAppId,
							'X-Parse-REST-API-Key': _config.parseRestApiKey,
						},
						success: async res => {
							if (res.data.code === 200) {
								self.qrcode = res.data.data
							}
							var query3 = new self.Parse.Query('Sharebg')
							query3.equalTo('area','grzx')
							await query3.first().then(bg=>{
								self.sharePicImg = bg.get('img')
							})
							
							self.days =parseInt((new Date().getTime() - self.Parse.User.current().get('createdAt').getTime())/1000/60/60/24)
							var query = new self.Parse.Query("RightHistory")
							query.equalTo('openid',self.userInfo.openid)
							await query.first().then(r=>{
								if(r){
									self.complateCount = r.get('questions').length
								}
							})
							var query1 = new self.Parse.Query("ExamRecord")
							query1.equalTo('openid', self.userInfo.openid)
							await query1.count().then(count=>{
								self.allCount = count
							})
							var query2 = new self.Parse.Query("ExamRecord")
							query2.equalTo('openid', self.userInfo.openid)
							query2.equalTo('result', true)
							await query2.count().then(count=>{
								self.rightCount = count
							})
							self.percent = (self.rightCount*100/self.allCount).toFixed(2)
							self.handleBuild()
						},
						fail: (error) => {
							uni.showToast({
								icon: 'none',
								title: '生成二维码失败',
								duration: 2000
							})
							console.log(error)
						}
					});
				}
			})
		},
		methods: {
			/**
			 * 画一个圆角矩形
			 */
			roundRect(ctx, x, y, w, h, r) {
				ctx.save()
				// 开始绘制
				ctx.beginPath()
				ctx.setFillStyle('#ffffff')
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
				// ctx.fill()
				ctx.clip();//画好了圆 剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内 这也是我们要save上下文的原因
			},
			/* 绘制头像圆型范围 */
			headFill(ctx, url, avatarurl_width, avatarurl_x, avatarurl_y,factor){
				ctx.save()
				ctx.beginPath(); //开始绘制
				//先画个圆   前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
				ctx.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_width / 2 + avatarurl_y, 94, 0, Math.PI * 2, false);
				ctx.setFillStyle('#fff')
				ctx.fill()
			},
			/* 生成图片 */
			async handleBuild(){
				var self = this
				uni.showLoading()
				await uni.downloadFile({
					url: self.userInfo.avatarUrl,
					success (headRes) {
						uni.downloadFile({url: self.qrcode, success (qrcodeRes) {
							uni.downloadFile({url: 'https://art-eater.oss-cn-beijing.aliyuncs.com/photo/bg.png', success (bg) {
							uni.downloadFile({url: self.sharePicImg, success (bgRes) {	
								const sysInfo = uni.getSystemInfoSync();
								const screenWidth = sysInfo.screenWidth*3; // 提高画质
								var factor = screenWidth / 750;
								let picWidth = 602
								let picHeight = 1066
								self.screenHeight=  picHeight*factor 
								const context = uni.createCanvasContext('mycanvas')
								context.draw() // 先清空画布
								context.fillRect(0, 0, 750 * factor, picHeight * factor)
								context.drawImage(bgRes.tempFilePath, 0, 0, bgRes.width, bgRes.height, 0 , 0, picWidth*factor, picHeight*factor);
								context.drawImage(bg.tempFilePath, 0, 0, 400, 400, 0 , picHeight*factor-400, picWidth*factor, 338*factor);
								// console.log(uni.upx2px(338),'///')
								context.setFillStyle('black')
								self.roundRect(context, 462 * factor, 24 * factor, 106 * factor, 106 * factor, 53 * factor) // 绘制半透明的圆角背景
								
								// 绘制二维码
								context.drawImage(qrcodeRes.tempFilePath, 466 * factor, 28 * factor, 98 * factor,98 * factor);
								// 绘制头像外层圆形框
								// console.log(factor, 'factor[[[[]]]]');
								self.headFill(context, '',  112 * factor, 250 * factor, 770 * factor) // 绘制头像外层框
								self.headPic(context, '',  112 * factor, 250 * factor, 770 * factor, factor) // 绘制头像外层框
								
								
								// 将头像装进头像框
								context.drawImage(headRes.tempFilePath, 220 * factor, 730 * factor,160 * factor,160 * factor);
								context.restore()
								
								// 用户名
								context.setFontSize(26*factor)
								context.font = 'normal normal ' + parseInt(26 * factor) + 'px Arial, Helvetica, sans-serif'
								context.setFillStyle('#000')
								let user = self.userInfo.nickName
								const m3 = context.measureText(user)
								context.fillText(user, 270 * factor, 910 * factor )
								
								
								// 已学习时间
								context.setFontSize(20 * factor)
								context.setFillStyle('rgba(0, 0, 0, .69)')
								context.font = 'normal normal ' + parseInt(20 * factor) + 'px Arial, Helvetica, sans-serif'
								const ma = context.measureText('已学习时间')
								context.fillText('已学习时间', (190 - ma.width / factor) / 2 * factor, 1022 * factor )
								
								// 已消灭题目
								context.setFontSize(20 * factor)
								context.setFillStyle('rgba(0, 0, 0, .69)')
								context.font = 'normal normal ' + parseInt(20 * factor) + 'px Arial, Helvetica, sans-serif'
								const mb = context.measureText('已消灭题目')
								context.fillText('已消灭题目', 200 *factor + ((200 - mb.width / factor) / 2 * factor), 1022 * factor )
								
								
								// 答题正确率
								context.setFontSize(20 * factor)
								context.setFillStyle('rgba(0, 0, 0, .69)')
								context.font = 'normal normal ' + parseInt(20 * factor) + 'px Arial, Helvetica, sans-serif'
								const mc = context.measureText('答题正确率')
								context.fillText('答题正确率', 400 * factor + ((200 - mc.width / factor) / 2 * factor), 1022 * factor )
								
								// 时间
								context.setFontSize(54*factor)
								context.setFillStyle('rgba(237, 53, 53, 1)')
								context.font = 'normal bold ' + parseInt(54 * factor) + 'px Arial, Helvetica, sans-serif'
								let days = self.days + ''
								const m4 = context.measureText(days)
								context.fillText(days, (190 - m4.width / factor) / 2 * factor, 988 * factor )
								// 天
								context.setFontSize(22*factor)
								context.setFillStyle('rgba(237, 53, 53, 1)')
								context.font = 'normal normal ' + parseInt(22 * factor) + 'px Arial, Helvetica, sans-serif'
								const m5 = context.measureText('天')
								context.fillText('天', ((190 - (m4.width / factor)) / 2 * factor) + (m4.width), 988*factor )
								
								// 以消灭题目数
								context.setFontSize(54*factor)
								context.setFillStyle('rgba(237, 53, 53, 1)')
								context.font = 'normal bold ' + parseInt(54 * factor) + 'px Arial, Helvetica, sans-serif'
								let complateCount = self.complateCount + ''
								const m6 = context.measureText(complateCount)
								context.fillText(complateCount, 200 * factor + (200 - m6.width / factor) / 2 * factor, 988 * factor )
								
								// 答题正确率百分比
								context.setFontSize(54*factor)
								context.setFillStyle('rgba(237, 53, 53, 1)')
								context.font = 'normal bold ' + parseInt(54 * factor) + 'px Arial, Helvetica, sans-serif'
								let percent = self.percent + ''
								const m7 = context.measureText(percent)
								context.fillText(percent, 400* factor + (200 - m7.width / factor) / 2 * factor, 988 * factor )
								// %
								context.setFontSize(22*factor)
								context.setFillStyle('rgba(237, 53, 53, 1)')
								context.font = 'normal normal ' + parseInt(22 * factor) + 'px Arial, Helvetica, sans-serif'
								const m8 = context.measureText('%')
								context.fillText('%', 400 * factor + ((200 - (m7.width / factor)) / 2 * factor) + (m7.width), 988*factor )
								
								// context.draw(true)
								context.draw(true,function(){
									setTimeout(function () {
										uni.canvasToTempFilePath({
											x:0,
											y:0,
											width: 602 * 5,
											height: 1066 * 5,
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
							}})
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
							content: '快去分享给朋友们吧！',
							showCancel: false,
							confirmText: 'ok',
							// confirmColor: '#72B9C3',
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
		}
	}
</script>

<style>
	page{
		background-color: #fbfbfa;
	}
	.canvas{
		width:1806rpx;
		margin:0 auto;
		position:fixed;
		z-index: 999999;
		left:10000px;
		height: 3198rpx;
	}
	.rect {
		margin: 198rpx auto 0;
		width: 602rpx;
		position: relative;
		z-index: 99999;
	}
	.bgImg{
		width: 602rpx;
		height: 1066rpx;
		background-color: rgba(255, 255, 255, 0.69);
		border-radius: 40rpx;
	}
	.download::after{
		border: 0;
	}
	
	.download{
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
		margin-top: 92rpx;
		margin-bottom: 40rpx;
	}
	.download image{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: 46rpx;
	}
	.download .title{
		position: absolute;
		z-index: 1;
		width: 100%;
		text-align: center; 
		background: #ED3535;
		box-shadow: 0 4rpx 8rpx 0 rgba(0,0,0,0.2);
		border-radius: 46rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #FFFFFF;
	}
	.bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.45);
		z-index: 10000;
	}
</style>
