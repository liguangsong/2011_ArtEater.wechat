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
							{{(item.cardinalNum+item.N*(item.realNum||0))<10000?item.cardinalNum+item.N*(item.realNum||0):((item.cardinalNum+item.N*(item.realNum||0))/10000).toFixed(1)+'w'}}
						</view>
						<text class='time' v-if="item.course.duration&&item.course.duration!='00:00'">
							{{item.course.duration || ''}}
						</text>
					</view>
				</view>
				<image src="../../static/icon/icon_vip.png" class="icon-vip" v-if="item.course.isVipCourse"></image>
				<view class="txt-info">
					<view class="txt-title">
						{{item.title}}
					</view>
					<text class='tag' v-if="item.subheading">
						{{item.subheading||''}}
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
			uni.loadFontFace ({
						  family: 'PingFangSC-Medium',
						  source: 'url("https://www.arteater.cn/PingFangSCMedium.ttf")',
						  success: function(){
							  console.log('load font success')
						  }
						})
		},
		// watch:{
		// 	list:{
		// 		handler() {
		// 			this.reload=false
		// 			this.$nextTick(()=>{
		// 				console.log(this.list,444)
		// 				this.reload=true;
		// 			})
		// 		},
		// 		deep:true,
		// 		immediate:true
		// 	}
		// },
		methods: {
			gotolist() {
				uni.navigateTo({
					url:'/homeSubPackage/pages/curriculumList/curriculumList?objId='+this.list[0].module.objectId+'&moduleName='+this.title
				})
			},
			async jump(item) {
				let ModuleAssociatedCourses= new Parse.Query('ModuleAssociatedCourses');
				    ModuleAssociatedCourses.equalTo('objectId',item.objectId);
				let res= await ModuleAssociatedCourses.first();
					if(res){
				   let realNum=res.get('realNum');
					   realNum=realNum||0;
					   realNum+=1;
					   res.set('realNum',realNum);
					   await res.save();
					}
				if(item.course.flag==1){
					// 系列课程点击时到详情页有介绍有详情
					uni.navigateTo({
						url:'/curriculumSubPackage/pages/study/study'
					})
				}else if(!item.course.isVipCourse&&item.course.flag==2){
					//非vip单课程点击时直接播放页
					uni.navigateTo({
						url:'/curriculumSubPackage/pages/details/details'
					})
				}else if(item.course.isVipCourse&&item.course.flag==2){
					//vip单课程点击时跳转到开通会员
					uni.navigateTo({
						url:'/mineSubPackage/pages/vip/vip'
					})
				}
				// this.$emit('changUrl', item)
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
		position: relative;
		.icon-vip{
			position: absolute;
			right: 0;
			top: -6rpx;
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
		.play-image{
			width: 24rpx;
			height: 24rpx;
			vertical-align: middle;
		}
		
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
