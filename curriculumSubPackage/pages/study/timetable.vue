<template>
	<view class="timetable">
		<!-- <view :class="{content: unlock}"> -->
		<view>
			<view class="catalogue">
				<text>课程目录</text>
			</view>
			<Tree 
				:list='list'
				@onClickItem='onClickItem'
				:showAllbtn='true'
			/>
		</view>
		<!-- <view class="unlock" v-if='unlock' @click='unlock = false'>
			立即解锁
		</view> -->
		
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
						leave: 0,
						children: [
							{
								label: '课程二级标题名字名称',
								leave: 1,
								type: 'mp4'
							},
							{
								label: '课程二级标题名字名称',
								leave: 1,
								type: 'img'
							},
							{
								label: '课程二级标题名字名称',
								type: 'mp3',
								leave: 1,
								children: [
									{
										label: '课程二级标题名字名称',
										leave: 2,
										type: 'mp3',
										children: [
											{
												label: '课程二级标题名字名称',
												leave: 3,
												type: 'mp3',
												children: [
													{
														label: '课程二级标题名字名称',
														leave: 4,
														type: 'mp3'
													}
												]
											}
										]
									}
								]
							},
						]
					},
					{
						label: '课程一级标题',
						leave: 0,
						children: [
							{
								label: '课程二级标题名字名称',
								leave: 1,
								type: 'mp3'
							},
							{
								label: '课程二级标题名字名称',
								leave: 1,
								type: 'mp3'
							},
						]
					},
					{
						label: '课程一级标题',
						leave: 0,
						children: [
							{
								label: '课程二级标题名字名称',
								leave: 1,
								type: 'mp3'
							},
							{
								label: '课程二级标题名字名称',
								leave: 1,
								type: 'mp3'
							},
						]
					},
					{
						label: '课程一级标题',
						leave: 0,
						children: [
							{
								label: '课程二级标题名字名称',
								leave: 1,
								type: 'mp3'
							},
							{
								label: '课程二级标题名字名称',
								leave: 1,
								type: 'mp3'
							},
						]
					},
					{
						label: '课程一级标题',
						leave: 0,
						children: [
							{
								label: '课程二级标题名字名称',
								leave: 1,
								type: 'txt',
								upstudy: true
							},
							{
								label: '课程二级标题名字名称',
								leave: 1,
								type: 'mp3'
							},
						]
					},
			
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
	.catalogue {
		font-size: 30rpx;
		margin-bottom: 20rpx;
		font-weight: 900;
		padding-left: 48rpx;
		color: #D81E1F;
	}
	.catalogue text:before {
		display: inline-block;
		content: "";
		width: 10rpx;
		height: 24rpx;
		background: #D81E1F;
		margin-right: 10rpx;
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
	}

</style>
