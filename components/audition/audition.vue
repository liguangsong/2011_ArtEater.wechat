<template>
	<view class="list" v-if="list.length">
			<view class="title" v-if="title">
				<text class="title-before"></text>
			   {{title}}
			</view>
			<text class="more" v-if="showMore" @click="gotolist">查看更多 ></text>
			
		<view class="auditon">
			<view class="item" v-for='(item,i) in list' :key='i' @click='jump(item)'>
				<view class="image-info">
					<image :src="item.surface[0]" mode="widthFix" class="main-image"></image>
					<view class="image-bottom-info">
						<view class="view">
							<image src="../../static/icon/play.png" class="play-image"></image>
							<text class="play-num">
							{{(item.baseNum+item.N*(item.realNum||0))<10000?item.baseNum+item.N*(item.realNum||0):((item.baseNum+item.N*(item.realNum||0))/10000).toFixed(1)+'w'}}
							</text> 
						</view>
						<text class='time' v-if="item.course.duration&&item.course.duration!='00:00'">
							{{item.course.duration || ''}}
						</text>
					</view>
					<view class="opcity"></view>
				</view>
				<image src="../../static/icon/icon_vip.png" class="icon-vip" v-if="item.course.vip"></image>
				<view class="txt-info">
					<view class="txt-title">
						{{item.title}}
					</view>
					<text class='tag' v-if="item.subTitle">
						{{item.subTitle||''}}
					</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import Parse from '@/parse/index.js'
	export default {
		name: 'audition',
		props: {
			title:{
				type:String
			},
			showMore:{
				type:Boolean,
				default:false
			},
			list: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
			}
		},
		created() {
			uni.loadFontFace({
				family: 'PingFangSC-Medium, PingFang SC',
				source: 'url("https://www.arteater.cn/PingFang.ttc")',
				success: function() {
					console.log('load font success')
				}
			})
			// uni.loadFontFace ({
			// 			  family: 'PingFangSC-Medium',
			// 			  source: 'url("https://www.arteater.cn/PingFangSCMedium.ttf")',
			// 			  success: function(){
			// 				  console.log('load font success')
			// 			  }
			// 			})
		},
		methods: {
			gotolist() {
				// uni.navigateTo({
				// 	url:'/homeSubPackage/pages/curriculumList/curriculumList?objId='+this.list[0].module.objectId+'&moduleName='+this.title
				// })
				this.$emit('checkMore', {objectId:this.list[0].module.objectId,moduleName:this.title});
			},
			async jump(item) {
				this.$emit('changeUrl', item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list{
		position: relative;
		// margin:20rpx 0;
		.title-before{
			display: inline-block;
			margin-right: 8rpx;
			width: 10rpx;
			height: 24rpx;
			background: #D81E1F;
			border-radius: 4rpx;
		}
		.title{
			height: 40rpx;
			font-size: 28rpx;
			letter-spacing: 0rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 600;
			color: #000000;
			line-height: 40rpx;
			padding-left: 30rpx;
			margin: 24rpx 0 0rpx 0;
		}
		.more{
			// width: 80rpx;
			font-size: 16rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 600;
			color: #000000;
			position: absolute;
			top:10rpx;
			opacity: 0.4;
			right: 50rpx;
			z-index: 1;
		}
	}
	.auditon {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 0rpx 30rpx 0rpx 30rpx;
		justify-content: space-between;
	}
	// .auditon::after{
	// 	content: '';
	// 	flex-grow: 4;
	// }
	.item {
		width: 336rpx;
		position: relative;
		margin-top:24rpx;
		.icon-vip{
			position: absolute;
			right: 0;
			top: -5rpx;
			width: 98rpx;
			height: 28rpx;
		}
	}
	.image-info {
		width: 336rpx;
		height: 176rpx;
		overflow: hidden;
		position: relative;
		background: #fff;
		border-radius: 20rpx;
		margin-bottom: 8rpx;
	}
	.image-bottom-info {
		width: 100%;
		box-sizing: border-box;
		position: absolute;
		bottom: 8rpx;
		display: flex;
		justify-content: space-between;
		font-size: 22rpx;
		z-index: 1;
	}
	.opcity{
		position: absolute;
		bottom: 0;
		width: 336rpx;
		height: 32rpx;
		background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 33%, rgba(0, 0, 0, 0.6) 100%);
	}
	.image-info .main-image {
		width: 100%;
		height: 176rpx;
	}
	.txt-info {
		padding-left: 18rpx;
	}
	.txt-info .txt-title {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		height: 34rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		letter-spacing: 0rpx;
		font-weight: 600;
		color: #171717;
		line-height: 34rpx;
	}
	.txt-info .tag {
		height: 22rpx;
		font-size: 16rpx;
		letter-spacing: 0rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #989898;
		display: inherit;
		line-height: 22rpx;
	}
	.view{
		height: 24rpx;
		font-size: 16rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 600;
		color: #FFFFFF;
		margin-left: 12rpx;
		// line-height: 24rpx;
		.play-image{
			width: 24rpx;
			height: 24rpx;
			line-height: 24rpx;
			vertical-align: middle;
		}
		.play-num{
			display: inline-block;
			height: 22rpx;
			font-size: 16rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			vertical-align: middle;
			font-weight: 600;
			color: #FFFFFF;
		}
		
	}
	.time{
		height: 24rpx;
		font-size: 16rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 600;
		color: #FFFFFF;
		line-height: 24rpx;
		margin-right: 12rpx;
	}
</style>
