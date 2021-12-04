<template>
	<TopNavbar title='分享给好友' bg='#f7f7f7'>
		<view>
			<view style='height: 22rpx;'></view>
			<canvas canvas-id='mycanvas' :disable-scroll="true" class="canvas"></canvas>
			<view class="rect">
				<image @tap.stop v-if="sharePicImg" :src="sharePicImg" mode="aspectFill" class="bgImg"></image>
				<!-- <button class="download" @click="handleSaveImg">保存并分享</button> -->
			</view>
			<view @click="handleSaveImg" class="download">
				<!-- <image src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/icon_sharebg.png"></image> -->
				<view class="title">保存并分享</view>
			</view>
		</view>
	</TopNavbar>
</template>

<script>
	import TopNavbar from '@/components/navBar/topNavbar.vue'
	import config from 'static/config/index.js'
	export default {
		data() {
			return {
				userInfo: {},
				qrcode: '',
				sharePicImg: '',
				title: '',
				minutes: '',
				percent: '',
				action: ''
			}
		},
		components: {
			TopNavbar
		},
		onLoad() {
			var self = this
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('data', function(data) {
				self.title = data.title
				self.minutes = data.time
				self.percent = data.percent
				self.action = data.action
			})
			uni.getStorage({
				key: 'userInfo',
				success(res) {
					console.log(res.data)
					self.userInfo = res.data
					var _config = config
					uni.request({
						method: 'POST',
						url: `${_config.parseRestBaseUrl}/wx/getUnlimitedCode`,
						data: {
							openid: self.userInfo.openid
						},
						header: {
							'X-Parse-Application-Id': _config.ParseAppId,
							'X-Parse-REST-API-Key': _config.parseRestApiKey,
						},
						success: async res => {
							if (res.data.code === 200) {
								self.qrcode = res.data.data
								console.log(self.qrcode)
							}
							var query3 = new self.Parse.Query('Sharebg')
							query3.equalTo('area', self.action)
							await query3.first().then(bg => {
								self.sharePicImg = bg.get('img')
								console.log(self.sharePicImg)
							})
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
			headPic(ctx, url, avatarurl_width, avatarurl_x, avatarurl_y, factor) {
				ctx.save()
				ctx.beginPath(); //开始绘制
				//先画个圆   前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
				ctx.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_width / 2 + avatarurl_y, avatarurl_width / 2, 0, Math
					.PI * 2, false);
				ctx.clip(); //画好了圆 剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内 这也是我们要save上下文的原因
			},
			/* 生成图片 */
			async handleBuild() {
				var self = this
				uni.showLoading()
				await uni.downloadFile({
					url: self.userInfo.avatarUrl,
					success(headRes) {
						uni.downloadFile({
							url: self.qrcode,
							success(qrcodeRes) {
								uni.downloadFile({
									url: self.sharePicImg,
									success(bgRes) {
										uni.downloadFile({
											url: 'https://art-eater.oss-cn-beijing.aliyuncs.com/photo/bg.png',
											success(bg) {
												const sysInfo = uni
											.getSystemInfoSync();
												const screenWidth = sysInfo
													.screenWidth * 3; // 提高画质
												var factor = screenWidth / 750;
												let picWidth = 602
												let picHeight = 1066
												self.screenHeight = picHeight * factor
												const context = uni
													.createCanvasContext('mycanvas')
												context.draw() // 先清空画布
												context.fillRect(0, 0, 602 * factor,
													picHeight * factor)
												context.drawImage(bgRes.tempFilePath,
													0, 0, bgRes.width, bgRes
													.height, 0, 0, picWidth *
													factor, 850 * factor);
												context.drawImage(bg.tempFilePath, 0,
													0, 400, 400, 0, picHeight *
													factor - 500, picWidth *
													factor, 300 * factor);
												// context.setFillStyle('black')
												self.roundRect(context, 0, 850 *
														factor, 602 * factor, 216 *
														factor, 0 * factor
														) // 绘制半透明的圆角背景

												// 绘制二维码
												context.drawImage(qrcodeRes
													.tempFilePath, 456 * factor,
													917 * factor, 120 * factor,
													120 * factor);
												// 绘制头像外层圆形框
												self.headPic(context, '', 42 * factor,
													226 * factor, 985 * factor,
													factor) // 绘制头像外层框
												// 将头像装进头像框
												context.drawImage(headRes.tempFilePath,
													226 * factor, 985 * factor,
													42 * factor, 42 * factor);
												context.restore()

												// 标题
												context.setFontSize(30 * factor)
												context.font = 'normal bold ' +
													parseInt(28 * factor) +
													'px Arial, Helvetica, sans-serif'
												context.setFillStyle('#352026')
												let title = self.title
												// const m1 = context.measureText(user)
												context.fillText(title, 30 * factor,
													874 * factor)

												// 总耗时
												context.setFontSize(18 * factor)
												context.font = 'normal normal ' +
													parseInt(18 * factor) +
													'px PingFangSC-Light'
												context.setFillStyle('rgba(0,0,0,.5)')
												let time = '总耗时：' + self.minutes
												context.fillText(time, 30 * factor,
													910 * factor)

												// 用户名
												context.setFontSize(22 * factor)
												context.font = 'normal normal ' +
													parseInt(22 * factor) +
													'px PingFangSC-Regular'
												context.setFillStyle('#352026')
												let user = self.userInfo.nickName
												const m3 = context.measureText(user)
												context.fillText(user, 280 * factor,
													1020 * factor)

												// 答题正确率百分比
												context.setFontSize(60 * factor)
												context.setFillStyle('#D81E1F')
												context.font = 'normal bold ' +
													parseInt(60 * factor) +
													'px Arial, Helvetica, sans-serif'
												let percent = self.percent + ''
												const m7 = context.measureText(percent)
												context.fillText(percent, 28 * factor,
													1020 * factor)

												// %
												context.setFontSize(22 * factor)
												context.setFillStyle('#352026')
												context.font = 'normal normal ' +
													parseInt(22 * factor) +
													'px Arial, Helvetica, sans-serif'
												const m8 = context.measureText('%')
												context.fillText('%', 28 * factor + m7
													.width + 5 * factor, 1020 *
													factor)

												// 正确率
												context.setFontSize(22 * factor)
												context.setFillStyle('#352026')
												context.font = 'normal normal ' +
													parseInt(22 * factor) +
													'px PingFangSC-Regular'
												const mc = context.measureText('正确率')
												context.fillText('正确率', 28 * factor +
													m7.width + m8.width + 10 *
													factor, 1020 * factor)
												// context.draw(true)
												context.draw(true, function() {
													setTimeout(function() {
														uni.canvasToTempFilePath({
															x: 0,
															y: 0,
															width: 602 *
																5,
															height: 1066 *
																5,
															fileType: 'jpg',
															quality: 1,
															canvasId: 'mycanvas',
															success: function(
																res
																) {
																uni.hideLoading()
																console
																	.log(
																		res
																		.tempFilePath
																		)
																self.sharePicImg =
																	res
																	.tempFilePath
																self.isShowPicImg =
																	true
															}
														})
													}, 500)
												})
											}
										})
									}
								})
							}
						})
					}
				})
			},
			/* 保存图片至本地 */
			handleSaveImg() {
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
							success: function(res) {
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
	page {
		background-color: #fbfbfa;
	}

	.canvas {
		width: 1806rpx;
		margin: 0 auto;
		position: fixed;
		z-index: 9999;
		left: 10000px;
		height: 3178rpx;
	}

	.rect {
		margin: 0 auto 172rpx;
		width: 698rpx;
		position: relative;
		z-index: 999;
		height: 1228rpx;
	}

	.bgImg {
		width: 698rpx;
		height: 1228rpx;
		background-color: rgba(255, 255, 255, 0.69);
		border-radius: 40rpx;
		box-shadow: 0 0 16rpx 4rpx rgba(0, 0, 0, 0.15);
	}

	.download::after {
		border: 0;
	}

	.download {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #fff;
		z-index: 99999;
	}

	.download .title {
		width: 690rpx;
		height: 92rpx;
		background: #ED3535;
		box-shadow: 0 4rpx 8rpx 0 rgba(0,0,0,0.2);
		border-radius: 46rpx;
		margin: 20rpx auto 40rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		font-size: 34rpx;
		text-align: center;
		line-height: 92rpx;
	}

	/* 	.bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.45);
		z-index: 10000;
	} */
</style>
