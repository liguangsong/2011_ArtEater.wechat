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
	</view>
</template>

<script>
	import Tree from '../../../components/tree/tree.vue'
	export default {
		props: {
			list:{
				type:Array,
				default:[]
			}
		},
		data() {
			return {
			// 	list: [
			// 		{
			// 			label: '课程一级标题',
			// 			leave: 0,
			// 			children: [
			// 				{
			// 					label: '课程二级标题名字名称',
			// 					leave: 1,
			// 					type: 'mp4'
			// 				},
			// 				{
			// 					label: '课程二级标题名字名称',
			// 					leave: 1,
			// 					type: 'img'
			// 				},
			// 				{
			// 					label: '课程二级标题名字名称',
			// 					type: 'mp3',
			// 					leave: 1,
			// 					children: [
			// 						{
			// 							label: '课程二级标题名字名称',
			// 							leave: 2,
			// 							type: 'mp3',
			// 							children: [
			// 								{
			// 									label: '课程二级标题名字名称',
			// 									leave: 3,
			// 									type: 'mp3',
			// 									children: [
			// 										{
			// 											label: '课程二级标题名字名称',
			// 											leave: 4,
			// 											type: 'mp3'
			// 										}
			// 									]
			// 								}
			// 							]
			// 						}
			// 					]
			// 				},
			// 			]
			// 		},
			// 		{
			// 			label: '课程一级标题',
			// 			leave: 0,
			// 			children: [
			// 				{
			// 					label: '课程二级标题名字名称',
			// 					leave: 1,
			// 					type: 'mp3'
			// 				},
			// 				{
			// 					label: '课程二级标题名字名称',
			// 					leave: 1,
			// 					type: 'mp3'
			// 				},
			// 			]
			// 		},
			// 		{
			// 			label: '课程一级标题',
			// 			leave: 0,
			// 			children: [
			// 				{
			// 					label: '课程二级标题名字名称',
			// 					leave: 1,
			// 					type: 'mp3'
			// 				},
			// 				{
			// 					label: '课程二级标题名字名称',
			// 					leave: 1,
			// 					type: 'mp3'
			// 				},
			// 			]
			// 		},
			// 		{
			// 			label: '课程一级标题',
			// 			leave: 0,
			// 			children: [
			// 				{
			// 					label: '课程二级标题名字名称',
			// 					leave: 1,
			// 					type: 'mp3'
			// 				},
			// 				{
			// 					label: '课程二级标题名字名称',
			// 					leave: 1,
			// 					type: 'mp3'
			// 				},
			// 			]
			// 		},
			// 		{
			// 			label: '课程一级标题',
			// 			leave: 0,
			// 			children: [
			// 				{
			// 					label: '课程二级标题名字名称',
			// 					leave: 1,
			// 					type: 'txt',
			// 					upstudy: true
			// 				},
			// 				{
			// 					label: '课程二级标题名字名称',
			// 					leave: 1,
			// 					type: 'mp3'
			// 				},
			// 			]
			// 		},
			
			// 	]
			}
		},
		components: {
			Tree,
		},
		watch:{
			list() {
				console.log(this.list,3456789)
			}
		},
		mounted() {
			
		},
		methods: {
			onClickItem(item) {
				console.log('777888')
				let app = getApp();
				let member = app.globalData.member;
				let vip=false;
				if(member && member.memberType!=2 && (member.endTime > Date.now())){
                  vip=true;
				}
				console.log(vip,45678)
				if(item.kind!=4){
					if(item.isVipCourse && !vip){
						uni.navigateTo({
						  url: '/mineSubPackage/pages/vip/vip'
						});
					}else{
						uni.navigateTo({
						  url: '/curriculumSubPackage/pages/details/details?objectId='+item.objectId
						});
						
					}
					
				}else{
					
				}
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
</style>
