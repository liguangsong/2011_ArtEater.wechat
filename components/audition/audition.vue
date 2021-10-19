<template>
	<view class="auditon">
		<view class="item" v-for='(item,i) in list' :key='i'>
			<view class="image-info">
				<image :src="item.img" mode="widthFix" @click='jump(item)'></image>
				<view class="image-bottom-info">
					<view>
						<u-icon name="play-circle-fill" />{{item.play_num}}
					</view>
					<text class='time'>
						{{item.time}}
					</text>
				</view>
			</view>
			<view class="txt-info" @click='jump(item)'>
				<view class="txt-title">
					{{item.title}}
				</view>
				<text class='tag'>
					{{item.tag_title}}
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'audition',
		props: {
			// list: {
			// 	type: Array,
			// 	default: () => []
			// }
		},
		data() {
			return {
				list: [
					{
						type: 'mp4',
						time: '6:31',
						play_num: '12.1w',
						tag_title: '这是副标题，一般是标签',
						title: '先秦美术发展历程视频术发展历程视频',
						img: '../../static/icon/icon_question.png',
						src: '3',
					},{
						type: 'mp4',
						time: '6:31',
						play_num: '12.1w',
						tag_title: '这是副标题，一般是标签',
						title: '先秦美术发展历程视频术发展历程视频',
						img: '../../static/icon/icon_question.png',
						src: '2',
					},{
						type: 'mp4',
						time: '6:31',
						play_num: '12.1w',
						tag_title: '这是副标题，一般是标签',
						title: '先秦美术发展历程视频术发展历程视频',
						img: '../../static/icon/icon_question.png',
						src: '1',
					},
				]
			}
		},
		methods: {
			jump(item) {
				this.$emit('changUrl', item)
			}
		}
	}
</script>

<style>
	.auditon {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.item {
		flex: 0 1 50%;
		overflow: hidden;
		padding: 10rpx 20rpx;
	}
	.image-info {
		width: 100%;
		height: 200rpx;
		overflow: hidden;
		position: relative;
		border: 1px solid #ccc;
		border-radius: 20rpx;
		margin-bottom: 10rpx;
	}
	.image-bottom-info {
		width: 100%;
		padding: 10rpx;
		box-sizing: border-box;
		position: absolute;
		bottom: 0;
		display: flex;
		justify-content: space-between;
		font-size: 22rpx;
	}
	.image-info image {
		width: 100%;
	}
	.txt-info {
		height: 80rpx;
	}
	.txt-info .txt-title {
		font-weight: 800;
		font-size: 28rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.txt-info .tag {
		font-size: 22rpx;
		color: #aaa;
		position: relative;
		top: -6rpx;
	}
</style>
