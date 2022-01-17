<template>
	<view class="notice">
		<!-- @touchstart="start" @touchmove="move" @touchend="end" -->
		<view class="content">
			<!-- <view class="mask" @click='changeUrl' v-if='isMask'>
				<view class="linear"></view>
			</view> -->
			<view class="icon">
				<image src="../../static/icon/icon_horn.png" mode=""></image>
			</view>
			<view v-if='noticeArr.length == 3' class="scroll">
				<view class="text">
					<view @click='changeUrl'>
						<view class='txt0'>
							{{noticeArr[active].bulletinName}}
						</view>
					</view>
				</view>
			</view>
			<view v-else class="scroll">
				<view class="text" :style='{left: left + "rpx", transition: transition + "s"}'>
					<view v-for='(item,i) in noticeArr' :key='i' @click='changeUrl' style='padding-left: 6rpx;'>
						<view :class="'txt' + i" :style='{left: tooLong==i ? -tooLongLeft + "px" : 0}'>
							{{item.bulletinName}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			notice: {
				type: Array,
				default: [],
				required: true
			},
			isScroll: {
				type: Boolean
			}
		},
		data() {
			return {
				noticeArr: [],
				timer: null,
				timer1: null,
				left: -680,
				transition: 2,
				w: uni.upx2px(670),
				active: 1,
				startX: 0,
				endX: 0,
				tooLong: null,
				tooLongLeft: 0,
				isMask: false,
			}
		},
		watch: {
			isScroll(){
				// console.log(-this.active * 680, '-------------');
				if (this.isScroll) {
					// clearTimeout(this.timer2)
					this.transition = 0;
					this.left = -this.active * 680;
					this.scroll()
				} else {
					this.transition = 0;
					// this.left = -this.active * 680;
					clearInterval(this.timer)
					// this.timer2 = setTimeout(()=>{
					// 	clearInterval(this.timer)
					// },2000)
				}
			},
			'notice': {
				immediate: true,
				handler() {
					this.noticeArr = [this.notice[this.notice.length-1], ...this.notice, this.notice[0]]
					// this.noticeArr[0].bulletinName = '所以就每个页面都写了一下这个按钮,然后通过emit,on来传递数据 没去写看公共的方法,就酱吧...'
					this.$nextTick(()=>{
						this.checkTextWidth('txt1')
						this.scroll()
					})
				}
			}
		},
		methods: {
			changeUrl() {
				let item = this.noticeArr[this.active]
				console.log(item);
				if (item.type == 1) {
					uni.navigateTo({
						url: '/pages/index/notice?objectId=' + item.objectId
					})
				} else {
					if (!item.link) {
						return
					}
					if (item.link.indexOf('www.arteater.cn/vip') != -1) {
						let path = item.link.split('?')
						uni.navigateTo({
							url: '/pages/index/out?' + path[1] + '&title=' + item.title
						})
					} else {
						uni.navigateTo({
							url: './news?url=' + item.link
						})
					}
				}
			},
			scroll() {
				clearInterval(this.timer)
				let _this = this
				this.timer = setInterval(() => {
					// _this.isMask = false
					this.active ++;
					this.transition = 2;
					this.left = -680
					this.left = -this.active * 680;
					if (this.active == this.noticeArr.length-1) {
						setTimeout(()=>{
							this.transition = 0;
							this.active = 1;
							this.left = -680;
							this.checkTextWidth('txt'+this.active)
						},4000)
						return
					}
					this.checkTextWidth('txt'+this.active)
					_this.tooLongLeft = 0
				}, 5000)
			},
			start(e) {
				clearTimeout(this.timer1)
				clearTimeout(this.timer)
				this.startX = e.touches[0].clientX;
			},
			move(e) {
				this.endX = e.touches[0].clientX;
			},
			end(e) {
				if (this.endX > this.startX) {
					this.active --;
					this.transition = 2;
					this.left = -this.active * 680;
					if (this.active == 0) {
						setTimeout(()=>{
							this.transition = 0
							this.active = this.noticeArr.length - 2;
							this.left = -this.active * 680
						}, 500)
					}
				} else {
					this.active ++
					this.transition = 1;
					this.left = -this.active * 680;
					if (this.active == this.noticeArr.length-1) {
						setTimeout(()=>{
							this.transition = 0;
							this.active = 1;
							this.left = -680;
						}, 500)
					}
				}
				this.timer1 = setTimeout(()=>{
					this.scroll('txt'+this.active)
				},1000)
			},
			checkTextWidth(className) {
				let _this = this;
				let query = uni.createSelectorQuery().in(this)
				query.select('.'+className).boundingClientRect(data => {
					if (data.width > _this.w) {
						clearTimeout(_this.timer)
						setTimeout(()=>{
							_this.tooLong = className[className.length - 1]
							let left = data.width - _this.w
							// _this.isMask = true
							let timer2 = setInterval(() => {
								_this.tooLongLeft ++
								if (_this.tooLongLeft > left) {
									clearInterval(timer2)
									setTimeout(()=>{
										_this.scroll()
									}, 1000)
								}
							},30)
						}, 3000)
					}
				}).exec();
			}
		}
	}
</script>

<style>
	.notice {
		width: 100%;
		height: 72rpx;
		background: #EDE7E6;
	}
	.mask {
		width: 100rpx;
		height: 100%;
		position: absolute;
		z-index: 100;
		top: 0;
		left: 70rpx;
	}
	.linear {
		width: 100%;
		height: 100%;
		background: linear-gradient(to right, rgba(237, 231, 230, 1), rgba(237, 231, 230, 0));
	}

	.content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		overflow: hidden;
		position: relative;
		z-index: 10;
	}

	.icon {
		flex: 0 0 70rpx;
		text-align: center;
		position: relative;
		z-index: 500;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.icon image {
		width: 30rpx;
		height: 30rpx;
	}

	.scroll {
		overflow: hidden;
		height: 72rpx;
	}
	.text {
		white-space: nowrap;
		position: relative;
	}

	.text view {
		width: 680rpx;
		display: inline-block;
		position: relative;
		overflow: hidden;
		line-height: 72rpx;
		height: 72rpx;
	}
	.text view view {
		line-height: 72rpx;
		height: 72rpx;
		width: auto;
		position: absolute;
		align-items: center;
		font-size: 22rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(0, 0, 0, 0.37);
		padding-left: 6rpx;
	}
</style>
