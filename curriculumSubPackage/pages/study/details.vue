<template>
	<view>
		<view class="introduce">
			<text class='title'>课程详情</text>
			<rich-text class='regular ql-editor' :nodes='detail | formatRichText' v-if="detail"></rich-text>
			
			<!-- <view class="font">
				<text>术查市资建务周二非称向给子走选。</text>
			</view>
			<view class="">
				<image src="../../../static/2.png"></image>
				<image src="../../../static/3.png"></image>
			</view> -->
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
				type:Boolean
			},
		},
		created() {
			console.log(this.isVip,'///////------');
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
			
		}
	}
</script>

<style>
	.introduce {
		margin-top: 4rpx;
		margin-bottom:14rpx;
		font-weight: 900;
		padding: 0 48rpx;
	}
	.introduce .title{
		display: block;
		font-size: 28rpx;
		margin-bottom: 36rpx;
		font-weight: 500;
		color: #D81E1F;
	}
	.introduce .title:before {
		display: inline-block;
		content: "";
		width: 10rpx;
		height: 24rpx;
		background: #D81E1F;
		margin-right: 10rpx;
		border-radius: 1px;
		transform: translateY(2rpx);
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
	
</style>
