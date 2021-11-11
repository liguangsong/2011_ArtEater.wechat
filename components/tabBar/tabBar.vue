<template>
	<view class="tabbar" :style="{'padding-bottom': paddingBottomHeight + 'rpx'}" style='z-index:10;'>
		<view class="tabbar-item" v-for="(item, index) in list" :key="index" @click="tabbarChange(item)">
			<!-- <view v-if="item.midButton" class="midButton">
				<image class="item-img" :src="item.icon_a" v-if="current == index"></image>
				<image class="item-img" :src="item.icon" v-else></image>
				<view class="item-name" :class="{'tabbarActive': current == index}" v-if="item.text">{{item.text}}</view>
			</view> -->
			<view style="position:relative">
				<image class="item-img" :src="item.icon_a" v-if="current == index"></image>
				<image class="item-img" :src="item.icon" v-else></image>
				<view class="item-name" :class="{'tabbarActive': current == index}" v-if="item.text">{{item.text}}
				</view>
				<view class="item-badge" v-if="index==3&&mine">
					<image src="../../static/icon/icon_badge.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			current: String
		},
		data() {
			return {
				mine: false,
				paddingBottomHeight: 0, //苹果X以上手机底部适配高度
				list: [{
						text: '首页',
						icon: '/static/icon/icon_home.png', //未选中图标
						icon_a: '/static/icon/icon_home_active.png', //选中图片
						path: "/pages/index/index" //页面路径
					}, {
						text: '课程',
						icon: '/static/icon/icon_curriculum.png', //未选中图标
						icon_a: '/static/icon/icon_curriculum_active.png', //选中图片
						path: "/pages/curriculum/curriculum"
					},
					//            {
					//                text: '',
					//                icon: '/static/bg_null.png',  //未选中图标
					//                icon_a: '/static/bg_null.png',  //选中图片
					//                path: '/pages/error/error',
					// midButton:true,
					//            },
					{
						text: '题库',
						icon: '/static/icon/icon_questionBank.png', //未选中图标
						icon_a: '/static/icon/icon_questionBank_active.png', //选中图片
						path: "/pages/questionBank/questionBank"
					}, {
						text: '我的',
						icon: '/static/icon/icon_mine.png', //未选中图标
						icon_a: '/static/icon/icon_mine_active.png', //选中图片
						path: "/pages/mine/mine"
					}
				]
			};
		},
		watch: {
			'$store.state.mine': {
				handler(val) {
					this.mine = val;
				},
				immediate: true
			}
		},
		created() {
			let that = this;
			let app = getApp();
			that.paddingBottomHeight = app.globalData.paddingBottomHeight;
		},
		mounted() {
			console.log(1234);
		},
		methods: {
			tabbarChange(path) {
				this.$emit('tabbarChange', path);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.tabbarActive {
		color: #352026 !important;
	}

	.midButton {
		width: 80rpx;
		height: 80rpx;
		background-color: #007AFF;
		border-radius: 50%;
	}

	.tabbar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 999;
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		// height: 116rpx;
		background-color: #ffffff;
		border-top: 2rpx solid #EFEFEF;

		.tabbar-item {
			display: flex;
			width: 100%;
			flex-direction: column;
			align-items: center;
			// justify-content: center;
			height: 116rpx;
			position: relative;

			.item-img {
				width: 76rpx;
				height: 76rpx;
			}

			.item-name {
				font-size: 20rpx;
				color: #352026;
				text-align: center;
				height: 28rpx;
				// line-height: 28rpx;
				margin-top: -4rpx;
				font-family: PingFangSC-Medium, PingFang SC;
			}

			.item-badge {
				top: 12rpx;
				position: absolute;
				box-sizing: border-box;
				display: inline-flex;
				justify-content: center;
				align-items: center;
				z-index: 9;
				width: 16rpx;
				height: 16rpx;
				image{
					width: 100%;
					height: 100%;
				}
				// background: linear-gradient(180deg, #D81E1F 0%, rgba(238, 64, 66, 0.31) 100%);
			}
		}

		.tabbar-item:nth-of-type(1) .item-badge {
			right: 3rpx
		}

		.tabbar-item:nth-of-type(2) .item-badge {
			right: 0rpx
		}

		.tabbar-item:nth-of-type(3) .item-badge {
			right: 0rpx
		}

		.tabbar-item:nth-of-type(4) .item-badge {
			right: 11rpx
		}

	}
</style>
