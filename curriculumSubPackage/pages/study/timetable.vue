<template>
	<view class="timetable">
		<view :class="{content: unlock}">
			<text class='title'>课表</text>
			<Tree 
				:list='list'
				@onClickItem='onClickItem'
				:showAllbtn='true'
			/>
		</view>
		<view class="unlock" v-if='unlock' @click='unlock = false'>
			立即解锁
		</view>
		<view class="introduce" v-if='!unlock'>
			<text class='title'>课程介绍</text>
			<view class="">
				<image src="../../../static/icon/icon_action_daka.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import Tree from '../../../components/tree/tree.vue'
	export default {
		props: {
			isVip: {
				type: Boolean
			}
		},
		data() {
			return {
				unlock: !this.isVip,
				list: [
					{
						label: '课程一级标题',
						children: [
							{
								label: '课程二级标题名字名称',
								type: 'mp4'
							},
							{
								label: '课程二级标题名字名称',
								type: 'img'
							},
							{
								label: '课程二级标题名字名称',
								type: 'mp3',
								children: [
									{
										label: '课程二级标题名字名称',
										type: 'mp3'
									}
								]
							},
						]
					},
					{
						label: '课程一级标题',
						children: [
							{
								label: '课程二级标题名字名称',
								type: 'mp3'
							},
							{
								label: '课程二级标题名字名称',
								type: 'mp3'
							},
						]
					},
					{
						label: '课程一级标题',
						children: [
							{
								label: '课程二级标题名字名称',
								type: 'mp3'
							},
							{
								label: '课程二级标题名字名称',
								type: 'mp3'
							},
						]
					},
					{
						label: '课程一级标题',
						children: [
							{
								label: '课程二级标题名字名称',
								type: 'mp3'
							},
							{
								label: '课程二级标题名字名称',
								type: 'mp3'
							},
						]
					},
					{
						label: '课程一级标题',
						children: [
							{
								label: '课程二级标题名字名称',
								type: 'txt',
								upstudy: true
							},
							{
								label: '课程二级标题名字名称',
								type: 'mp3'
							},
						]
					},
					{
						label: '课程一级标题',
						children: [
							{
								label: '课程二级标题名字名称',
								type: 'txt',
								upstudy: true
							},
							{
								label: '课程二级标题名字名称',
								type: 'mp3'
							}
						]
					}
				]
			}
		},
		components: {
			Tree,
		},
		methods: {
			onClickItem(item) {
				console.log(item)
				uni.navigateTo({
				  url: '/curriculumSubPackage/pages/details/details?item=' +encodeURIComponent(JSON.stringify(item))
				});
			}
		}
	}
</script>

<style scoped>
	.title {
		font-size: 36rpx;
		margin-bottom: 20rpx;
		font-weight: 900;
	}
	.content {
		height: 600rpx;
		overflow: hidden;
	}
	.unlock {
		position: fixed;
		bottom: 30rpx;
		width: 80%;
		left: 10%;
		height: 80rpx;
		background: #777;
		color: #fff;
		border-radius: 40rpx;
		text-align: center;
		line-height: 80rpx;
		font-size: 30rpx;
	},
	.introduce {
		margin-top: 20rpx;
	}
</style>
