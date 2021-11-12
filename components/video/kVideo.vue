<template>
	<view class="video-box" @click='switchShowControlsFn'>
		<video
			id='myvideo'
			:src="src"
			play-btn-position='center'
			:show-center-play-btn='true'
			:enable-play-gesture='true'
			:controls="false"
			:page-gesture='true'
			:enable-progress-gesture='true'
			:show-fullscreen-btn='true'
			:vslide-gesture='true'
			@play='videoPlayFn'
			@pause='videoPauseFn'
			@timeupdate='timeupdateFn'
			@ended='endedFn'
			@waiting='waitingFn'
			@loadedmetadata="getVideoTime"
		>
			<view class="bottom-btn">
				 <!-- v-show='showControls' -->
				<text class="play" @click='playFn'>
					{{play ? '暂停' : '播放'}}
				</text>
				<view class="slider">
					<text>{{videoTimeUpdate}}</text>
					<slider :value='sliderVal' :max='videoTime' @changing='_seeking' @change='_seek' block-size='12' />
					<text>{{videoTimeTotal}}</text>
				</view>
				<text class='speed' @click='speedFn'>
					{{speed[speedNum]}}x
				</text>
				<text class='full' @click='fullScreenFn'>
					{{fullScreen ? '取消全屏': '全屏'}}
				</text>
			</view>
			<view class="warning" v-if='warning'>
				视频正在缓冲，请等待...
			</view>
		</video>
	
	</view>
</template>

<script>
	export default {
		name: 'k-video',
		props: {
			src: {
				type: String
			}
		},
		data() {
			return {
				warning: false,
				videoContext: null,
				fullScreen: false,
				speed: [0.5, 0.8, 1, 1.25, 1.5],
				speedNum: 2,
				videoTimeUpdate: '00:00',
				videoTimeTotal: '00:00',
				videoTime: 0,
				play: false,
				sliderVal: 0,
				showControls: false,
				timer: null,
			}
		},
		created() {
			this.videoContext = uni.createVideoContext('myvideo', this);
		},
		beforeDestroy() {
			this.videoContext = null;
		},
		watch: {
			src() {
				this.videoContext.destroy();
				this.contextInit();
			}
		},
		methods: {
			// 获取视频总时长
			getVideoTime(e) {
				this.videoTimeTotal = this.sToHs(e.detail.duration * 1000);
				this.videoTime = Math.floor(e.detail.duration);
			},
			sToHs(s) {
				let h;
				s = s / 1000;
				h = Math.floor(s / 60);
				s = Math.floor(s % 60);
				h += '';
				s += '';
				h = h.length === 1 ? '0' + h : h;
				s = s.length === 1 ? '0' + s : s;
				return h + ':' + s;
			},
			// 点击全屏
			fullScreenFn() {
				this.showControlsFn();
				if (!this.fullScreen) {
					this.videoContext.requestFullScreen();
					this.fullScreen = true;
				} else {
					this.videoContext.exitFullScreen();
					this.fullScreen = false;
				}
			},
			// 点击播放或暂停
			playFn() {
				this.showControlsFn();
				if (this.play) {
					this.videoContext.pause();
				} else {
					this.videoContext.play();
				}
			},
			// 倍速播放
			speedFn() {
				this.showControlsFn();
				if (this.speedNum >= this.speed.length - 1) {
					this.speedNum = 0;
				} else {
					this.speedNum ++;
				}
				this.videoContext.playbackRate(this.speed[this.speedNum])
			},
			// 视频播放触发
			videoPlayFn() {
				this.$emit('changeLearn',true);
				this.play = true;
				if (this.warning) {
					this.warning = false;
				}
				this.showControlsFn();
			},
			// 视频暂停触发
			videoPauseFn() {
				this.play = false;
			},
			// 视频播放中触发
			timeupdateFn(e) {
				if (this.sliderVal != Math.floor(e.detail.currentTime)) {	
					console.log(this.sliderVal);
					this.sliderVal = Math.floor(e.detail.currentTime);
					this.videoTimeUpdate = this.sToHs(e.detail.currentTime * 1000);
				}
			},
			// 视频播放结束触发
			endedFn() {
				this.$emit('changeLearn',false);
				this.play = false;
			},
			// 缓冲时触发
			waitingFn() {
				if (this.play) {
					this.warning = true;
				}
			},
			// 拖动滑块
			_seeking(e) {
				this.videoContext.seek(e.detail.value);
			},
			// 滑块拖动结束
			_seek(e) {
				this.videoContext.seek(e.detail.value);
				this.showControlsFn();
				this.videoContext.play();
			},
			showControlsFn() {
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					this.showControls = false;
				}, 6000)
			},
			switchShowControlsFn() {
				this.showControls = true;
				this.showControlsFn();
			}
		}
	}
</script>

<style>
	video {
		width: 100%;
		position: relative;
	}
	.bottom-btn {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,.3));
		height: 100rpx;
		z-index: 9999;
		line-height: 100rpx;
		color: #fff;
		display: flex;
		width: 100%;
		justify-content: space-between;
		padding: 0 10rpx;
	}
	.slider {
		flex: 1 1 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-right: 20rpx;
	}
	.slider text {
		flex: 0 1 100rpx;
		font-size: 22rpx;
		text-align: center;
	}
	.slider slider {
		flex: 1 1 auto;
		margin: 0;
	}
	.play {
		flex: 0 1 80rpx;
		text-align: center;
	}
	.speed {
		flex: 0 1 80rpx;
		text-align: center;
	}
	.full {
		flex: 0 1 120rpx;
		text-align: center;
	}
	.warning {
		position: absolute;
		width: 100%;
		height: 100%;
		display: none;
		justify-content: center;
		align-items: center;
		color: #fff;
		background: rgba(0,0,0,0.2);
	}
</style>