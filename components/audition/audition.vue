<template>
	<view class="list" v-if="reload &&list.length">
			<view class="title" v-if="title">
				<text class="title-before"></text>
			   {{title}}
			</view>
			<text class="more" v-if="showMore">查看更多 ></text>
			
		<view class="auditon">
			<view class="item" v-for='(item,i) in list' :key='i'>
				<view class="image-info">
					<image :src="item.img" mode="widthFix" @click='jump(item)'></image>
					<view class="image-bottom-info">
						<view class="view">
							<u-icon name="play-circle" />{{item.play_num}}
						</view>
						<text class='time'>
							{{item.duration || ''}}
						</text>
					</view>
				</view>
				<view class="txt-info" @click='jump(item)'>
					<view class="txt-title">
						{{item.subjectName}}
					</view>
					<text class='tag' v-if="item.subheadingOne||item.subheadingTwo">
						{{item.subheadingOne || item.subheadingTwo||''}}
					</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
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
				reload:false,
				// list: [
				// 	{
				// 		type: 'mp4',
				// 		time: '6:31',
				// 		play_num: '12.1w',
				// 		tag_title: '这是副标题，一般是标签',
				// 		title: '先秦美术发展历程视频术发展历程视频',
				// 		img: '../../static/icon/icon_question.png',
				// 		src: '3',
				// 	},{
				// 		type: 'mp4',
				// 		time: '6:31',
				// 		play_num: '12.1w',
				// 		tag_title: '这是副标题，一般是标签',
				// 		title: '先秦美术发展历程视频术发展历程视频',
				// 		img: '../../static/icon/icon_question.png',
				// 		src: '2',
				// 	},{
				// 		type: 'mp4',
				// 		time: '6:31',
				// 		play_num: '12.1w',
				// 		tag_title: '这是副标题，一般是标签',
				// 		title: '先秦美术发展历程视频术发展历程视频',
				// 		img: '../../static/icon/icon_question.png',
				// 		src: '1',
				// 	},
				// ]
			}
		},
		created() {
			uni.loadFontFace ({
						  family: 'PingFangSC-Medium',
						  source: 'url("https://www.arteater.cn/PingFangSCMedium.ttf")',
						  success: function(){
							  console.log('load font success')
						  }
						})
		},
		watch:{
			list:{
				handler() {
					this.reload=false
					this.$nextTick(()=>{
						console.log(this.list,444)
						this.reload=true;
					})
				},
				deep:true,
				immediate:true
			}
		},
		methods: {
			jump(item) {
				this.$emit('changUrl', item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list{
		position: relative;
		margin:20rpx 0;
		.title-before{
			display: inline-block;
			margin-right: 8rpx;
			width: 10rpx;
			height: 24rpx;
			background: #D81E1F;
			border-radius: 2rpx;
		}
		.title{
			height: 40rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 600;
			color: #000000;
			line-height: 40rpx;
			padding-left: 30rpx;
		}
		.more{
			width: 80rpx;
			font-size: 16rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #000000;
			position: absolute;
			top:10rpx;
			right: 50rpx;
			z-index: 1;
		}
	}
	.auditon {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 20rpx 30rpx 12rpx 30rpx;
		justify-content: space-between;
	}
	// .auditon::after{
	// 	content: '';
	// 	flex-grow: 4;
	// }
	.item {
		width: 336rpx;
		overflow: hidden;
		// padding: 10rpx 30rpx;
	}
	.image-info {
		width: 336rpx;
		height: 176rpx;
		overflow: hidden;
		position: relative;
		background: #666;
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
	}
	.image-info image {
		width: 100%;
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
		font-weight: 600;
		color: #171717;
		line-height: 34rpx;
	}
	.txt-info .tag {
		height: 22rpx;
		font-size: 16rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #989898;
		display: inherit;
		line-height: 22rpx;
	}
	.view{
		height: 22rpx;
		font-size: 16rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		margin-left: 12rpx;
		line-height: 22rpx;
	}
	.time{
		height: 22rpx;
		font-size: 16rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 22rpx;
		margin-right: 12rpx;
	}
</style>
