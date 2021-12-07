<template>
	<TopNavbar title='模拟考试' height='400' fontColor='#000' iconColor='#000' align='center'>
		<view style='background: #f7f7f7;padding-bottom: 40rpx;'>
			<view class="resultView">
				<image class='bg' src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/reselt.png"></image>
				<view class='resBox'>

					<view class="title-info">
						<view class="left">
							<view class="red-block"></view>
							您的得分为
						</view>
						<view class="right right-info">
							<view class="tips">及格分数为：{{history.pass_score}}</view>
							<view class="tips">满分分数为：{{history.allscore}}</view>
						</view>
					</view>
					<view class="scoreView">
						<view class="score">{{history.score}}</view>
						<view class="txt">分</view>
					</view>
				</view>
			</view>
			<view class="view1">
				<view class="title-info">
					<view class="left">
						<view class="red-block"></view>
						答题卡
					</view>
					<view class="right right-info">
						<view class="success">
							正确
						</view>
						<view class="error">
							错误
						</view>
					</view>
				</view>
				<view class="rView">
					<view @click="handleResultClick"
						:class="'resultItem '+ ((item.answer.length==0||item.answer==null)? '': (item.result?'right':'error'))"
						v-for="(item, index) in history.answers" :data-item="item" :data-index="index">{{index + 1}}
					</view>
				</view>
			</view>
			<canvas canvas-id='mycanvas' :disable-scroll="true" class="canvas"></canvas>
			<view class="btn">
				<button @click="handleShare" class="btnShare">分享</button>
				<button v-if="from=='exam'" @click="handHomePage" class="btnPrev">返回</button>
			</view>
			<view :style='{height: from=="exam" ? "264rpx" : "132rpx"}'></view>

			<u-mask :show="isShowPicImg" @click="isShowPicImg = false">
				<view class="warp">
					<view class="rect">
						<image @tap.stop v-if="sharePicImg" :src="sharePicImg" mode="aspectFit"
							style="width: 450rpx; height: 800rpx;"></image>
						<button class="download" @click="handleSaveImg">保存并分享</button>
					</view>
				</view>
			</u-mask>
		</view>
	</TopNavbar>
</template>

<script>
	import config from 'static/config/index.js'
	// import TopNavbar from '@/components/navBar/topNavbar.vue'
	import TopNavbar from '@/components/navBar/navbar.vue'
	export default {
		data() {
			return {
				userInfo: {},
				history: {},
				from: '',
				examId: '',
				screenHeight: 0,
				isShowPicImg: false,
				sharePicImg: '',
				qrcode: ''
			}
		},
		components: {
			TopNavbar
		},
		onLoad(options) {
			var self = this
			uni.getStorage({
				key: 'userInfo',
				success(res) {
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
							}
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
			if (options.from) {
				this.from = options.from
			}
			if (options.eid) {
				var self = this
				self.examId = options.eid
				const history = this.Parse.Object.extend("TestHistory")
				const query = new this.Parse.Query(history)
				query.get(options.eid).then(res => {
					res.set('minutes', self.createMinutes(res.get('seconds')))
					self.history = res
				})
			}
			uni.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline']
			})
			// this.handleBuild()
		},
		methods: {
			/*点击题目*/
			handleResultClick(e) {
				var _index = e.currentTarget.dataset.index
				var _item = e.currentTarget.dataset.item
				if (_item == null || _item.answer == null) {
					uni.showToast({
						title: '该题目未作答',
						icon: 'none'
					})
				} else {
					uni.navigateTo({
						url: './testdetail?tid=' + this.examId + '&index=' + _index
					})
				}
			},
			createMinutes(seconds) {
				return Math.floor(seconds / 60) + '分钟' + (seconds % 60) + '秒'
			},
			/*返回首页*/
			handHomePage() {
				uni.navigateBack()
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
			headPic(ctx, url, avatarurl_width, avatarurl_x, avatarurl_y, factor) {
				ctx.save()
				ctx.beginPath(); //开始绘制
				//先画个圆   前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
				ctx.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_width / 2 + avatarurl_y, avatarurl_width / 2, 0, Math
					.PI * 2, false);
				ctx.clip(); //画好了圆 剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内 这也是我们要save上下文的原因
			},

			/*分享*/
			handleShare() {
				var self = this
				uni.navigateTo({
					url: '/pages/subject/share',
					success(res) {
						let rightCount = 0
						// self.history.get('answers').forEach(item=>{
						// 	if(item.result==true){
						// 		rightCount++
						// 	}
						// })
						res.eventChannel.emit('data', {
							title: self.history.get('examName'),
							time: self.history.get('minutes'),
							percent: parseInt(rightCount * 100 / self.history.get('answers').length),
							action: 'mnst',
						})
					},
				})
			},
			/* 生成图片 */
			handleBuild() {
				var self = this
				uni.showLoading()
				uni.downloadFile({
					url: self.userInfo.avatarUrl,
					success(headRes) {
						uni.downloadFile({
							url: self.qrcode,
							success(qrcodeRes) {
								const sysInfo = uni.getSystemInfoSync();
								const screenWidth = sysInfo.screenWidth;
								var factor = screenWidth / 750;
								let picWidth = 750
								let picHeight = 1340
								var bili = picWidth / 750
								self.screenHeight = picHeight / factor * bili
								const context = uni.createCanvasContext('mycanvas')
								context.draw() // 先清空画布
								context.fillRect(0, 0, 750 * factor, picHeight * factor)
								context.drawImage('../../static/sharebg.png', 0, 0, picWidth, picHeight);
								context.setFillStyle('black')
								self.roundRect(context, 30 * factor, 220 * factor, 690 * factor, 1072 *
									factor, 40 * factor) // 绘制半透明的圆角背景


								context.restore()
								// context.font = 'bold'
								// 考试名称
								context.setFontSize(54 * factor)
								context.setFillStyle('#352026')
								context.font = 'normal bold ' + parseInt(54 * factor) +
									'px Arial, Helvetica, sans-serif'
								let examName = self.history.get('examName')
								const m1 = context.measureText(examName)
								context.fillText(examName, (750 - m1.width / factor) / 2 * factor, 506 *
									factor)
								// 考试用时
								context.setFontSize(30 * factor)
								context.font = 'normal normal ' + parseInt(30 * factor) +
									'px Arial, Helvetica, sans-serif'
								let time = '考试时间：' + self.history.get('minutes')
								const m2 = context.measureText(time)
								context.fillText(time, (750 - m2.width / factor) / 2 * factor, 556 *
									factor)

								// 用户
								context.setFontSize(34 * factor)
								context.font = 'normal normal ' + parseInt(34 * factor) +
									'px Arial, Helvetica, sans-serif'
								let user = self.userInfo.nickName
								const m3 = context.measureText(user)
								context.fillText(user, (750 - m3.width / factor) / 2 * factor, 666 *
									factor)


								// 用户
								context.setFontSize(34 * factor)
								context.font = 'normal normal ' + parseInt(34 * factor) +
									'px Arial, Helvetica, sans-serif'
								let _user = '本次考试得分：'
								const m_3 = context.measureText(_user)
								context.fillText(_user, (750 - m_3.width / factor) / 2 * factor, 726 *
									factor)

								// 得分				
								context.setFontSize(160 * factor)
								context.setFillStyle('#ff6867')
								context.font = 'normal bold ' + parseInt(160 * factor) +
									'px Arial, Helvetica, sans-serif'
								let score = self.history.get('score')
								const m4 = context.measureText(score + "")
								context.fillText(score + "", (750 - m4.width / factor) / 2 * factor, 886 *
									factor)

								// 分
								context.setFontSize(34 * factor)
								context.setFillStyle('#352026')
								context.font = 'normal normal ' + parseInt(34 * factor) +
									'px Arial, Helvetica, sans-serif'
								const m5 = context.measureText('分')
								context.fillText('分', ((750 - (m4.width / factor)) / 2 * factor) + (m4
									.width), 886 * factor)

								// 绘制二维码
								context.drawImage(qrcodeRes.tempFilePath, 224 * factor, 946 * factor, 300 *
									factor, 300 * factor);

								self.headPic(context, '', 240 * factor, 256 * factor, 100 * factor,
									factor) // 绘制头像外层框
								context.drawImage(headRes.tempFilePath, 256 * factor, 100 * factor, 240 *
									factor, 240 * factor); // 将头像装进头像框
								// context.draw(true)
								context.draw(true, function() {
									setTimeout(function() {
										uni.canvasToTempFilePath({
											x: 0,
											y: 0,
											width: 750,
											height: self.screenHeight,
											fileType: 'jpg',
											quality: 1,
											canvasId: 'mycanvas',
											success: function(res) {
												uni.hideLoading()
												console.log(res.tempFilePath)
												self.sharePicImg = res
													.tempFilePath
												self.isShowPicImg = true
											}
										})
									}, 500)
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
							content: '图片成功保存到相册了，去发圈噻~',
							showCancel: false,
							confirmText: '好哒',
							confirmColor: '#72B9C3',
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
		},
		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function(e) {
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
	.resultView {
		/* padding-top: 52rpx;
		height: 412rpx;
		border-bottom: 2rpx solid #f2f2f2;
		margin: 0 30rpx; */
		position: relative;
		width: 750rpx;
		height: 776rpx;
	}

	.resultView .bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
	}

	.resultView .resBox {
		position: relative;
		z-index: 10;
		padding-top: 224rpx;
	}

	.right-info {
		display: flex;
		flex-direction: row;
	}

	.right-info view {
		display: inline;
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(0, 0, 0, .5);
		line-height: 28rpx;
		margin-right: 20rpx;
	}

	.right-info .success:before,
	.right-info .error:before {
		display: inline-block;
		content: '';
		width: 16rpx;
		height: 16rpx;
		margin-right: 10rpx;
		background: #32CD72;
		border-radius: 50%;
	}

	.right-info .error:before {
		background: #ED3535;
	}

	.resultView .scoreView {
		padding-top: 202rpx;
		height: 154rpx;
		text-align: center;
		margin-bottom: 56rpx;
	}

	.resultView .scoreView .score {
		display: inline;
		font-size: 110rpx;
		font-weight: 500;
		color: #D81E1F;
		line-height: 154rpx;
	}

	.resultView .scoreView .txt {
		display: inline;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #352026;
		line-height: 30rpx;
		margin-left: 10rpx;
	}

	.view1 {
		padding-top: 44rpx;
		padding-left: 4rpx;
	}

	.view1 .title {
		padding-left: 40rpx;
		font-size: 26rpx;
		font-weight: bold;
		color: #352026;
		font-family: PingFangSC-Medium;
	}

	.view1 .rView {
		width: 690rpx;
		margin: 24rpx auto 0;
		background: #fff;
		border-radius: 24rpx;
		padding: 24rpx 34rpx 48rpx 32rpx;
		box-shadow: 0 4rpx 10rpx 0 rgba(0, 0, 0, 0.06);
	}

	.view1 .rView .resultItem {
		display: inline-block;
		margin: 32rpx 25rpx 0;
		width: 56rpx;
		height: 56rpx;
		line-height: 52rpx;
		text-align: center;
		border-radius: 50%;
		font-size: 24rpx;
		color: #DED0CD;
		/* background: #ccc; */
		font-family: PingFangSC-Medium;
	}

	.view1 .rView .resultItem.error {
		color: #ED3535;
		border: 2rpx solid #ED3535;
	}

	.view1 .rView .resultItem.right {
		color: #32CD72;
		border: 2rpx solid #32CD72;
	}

	

	.download {
		height: 92rpx;
		line-height: 92rpx;
		border-radius: 46rpx;
		color: rgba(255, 255, 255, 1);
		font-size: 34rpx;
		border: 2rpx solid #ff776f;
		background: #ED3535;
		box-shadow: 0 4rpx 8rpx 0 rgba(0, 0, 0, 0.2);
	}

	.canvas {
		width: 750rpx;
		margin: 0 auto;
		position: fixed;
		left: 1000px;
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
	}
	.btn {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 16rpx 0;
		background: #f7f7f7;
	}
	.btnShare {
		width: 690rpx;
		height: 92rpx;
		margin: 0 auto 24rpx;
		line-height: 92rpx;
		border-radius: 46rpx;
		color: rgba(255, 255, 255, 1);
		font-size: 34rpx;
		border: 2rpx solid #ff776f;
		background: #ED3535;
		box-shadow: 0 4rpx 8rpx 0 rgba(0, 0, 0, 0.2);
	}
	
	.btnPrev {
		margin: 0 auto 24rpx;
		width: 690rpx;
		height: 92rpx;
		border-radius: 46rpx;
		text-align: center;
		border: 2rpx solid #D81E1F;
		font-size: 34rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #D81E1F;
		line-height: 92rpx;
	}
</style>
