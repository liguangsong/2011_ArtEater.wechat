<template>
	<view>
		<view class="introduce">
			<text class='title'>课程介绍</text>
			<rich-text :nodes='detail | formatRichText' v-if="detail"></rich-text>
			
			<!-- <view class="font">
				<text>术查市资建务周二非称向给子走选。</text>
			</view>
			<view class="">
				<image src="../../../static/2.png"></image>
				<image src="../../../static/3.png"></image>
			</view> -->
		</view>
		<view class="unlock" v-if='isVip' @click='gotoVip'>
			立即解锁
		</view>
	</view>
</template>

<script>
	import Curriculum from '../../js/curriculum.js'
	export default {
		props:{
			detail:{
				type:String,
				default:''
			},
			isVip:{
				type:Boolean,
				default:false
			},
		},
		filters:{
		/**
		 * 处理富文本里的图片宽度自适应
		 * 1.查找img标签有无style属性，如果没有，加上style
		 * 2.所有标签style后追加 max-width:100% !important;
		 * 4.去掉<br/>标签
		 */
		formatRichText(html) { //控制小程序中图片大小
			return Curriculum.formatRichText(html);
		    }
		},
		methods:{
			gotoVip() {
				uni.navigateTo({
					url:'/mineSubPackage/pages/vip/vip'
				})
			}
		}
	}
</script>

<style>
	.introduce {
		margin-bottom: 20rpx;
		font-weight: 900;
		padding: 0 48rpx;
	}
	.introduce .title{
		height: 40rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #D81E1F;
		line-height: 40rpx;
	}
	.introduce .title:before {
		display: inline-block;
		content: "";
		width: 10rpx;
		height: 24rpx;
		background: #D81E1F;
		margin-right: 10rpx;
	}
	.font {
		margin: 16rpx 0;
		color: #000;
		font-weight: 400;
	}
	.font text{
		line-height: 40rpx;
		font-size: 24rpx;
	}
	.unlock {
		width: 690rpx;
		height: 92rpx;
		background: #ED3535;
		box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(0,0,0,0.2);
		border-radius: 46rpx;
		font-size: 34rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #FFFFFF;
		line-height: 92rpx;
		position: fixed;
		bottom: 40rpx;
		margin-left: 30rpx;
		z-index: 1;
		text-align: center;
	}
</style>
