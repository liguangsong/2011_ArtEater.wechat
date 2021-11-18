<template>
	<view class='study'>
		<view class="navbar" :style='{height:tabbarheight + "rpx" }'>
			<view class="nav" :style='{height:navbarheight + "rpx", top:tabbarheight - navbarheight + "rpx"}'>
				<view  @click='back' class="icon">
					<u-icon name="arrow-left" color="#000" size="28"></u-icon>
				</view>
				<view class="title" :style='{color: fontColor, textAlign: align, paddingLeft: icon ? 0 : titleLeft}'>
					<text>{{title}}</text>
				</view>
			</view>
		</view>
		<view class="img" style='height: 478rpx;'>
			<image style='width: 100%; height: 100%;' :src="curriculumInfo.headImg[0]" mode='aspectFill'></image>
		</view>
		<view class="head radius">
			<view class="title semibold">{{curriculumInfo.subjectName}}</view>
			<view class="info">
				<view>
					<text v-if="curriculumInfo.subTitle1" class='studynum'>{{curriculumInfo.subTitle1}}</text>
					<text v-if="curriculumInfo.subTitle2">{{curriculumInfo.subTitle2}}</text>
				</view>
				<view class="teacher">
					<image v-if="curriculumInfo.portrait&&curriculumInfo.portrait.length" :src="curriculumInfo.portrait[0]"></image>
					<text>{{curriculumInfo.lecturerName}}</text>
				</view>
			</view>
			<view class="tabber">
				<view style='padding: 0 20rpx;' @click='tabbar = false'>
					<view :style='{color: !tabbar ? "#D81E1F":""}'>详情</view>
					<view v-if='!tabbar' class='br'></view>
				</view>
				<view style='padding: 0 20rpx;' @click='tabbar = true'>
					<view :style='{color: tabbar ? "#D81E1F":""}'>目录</view>
					<view v-if='tabbar' class='br'></view>
				</view>
			</view>
		</view>
		<view class="tab">
			<Timetable v-if='tabbar ' :list="timetableList"/>
			<Details v-else :detail="curriculumInfo.introduce" :isVip="vip"/>
		</view>
	</view>
</template>

<script>
	import Curriculum from '../../js/curriculum.js'
	import Timetable from './timetable.vue';
	import Details from './details.vue';
	export default {
		data() {
			return {
				tabbarheight: 0,
				navbarheight: 0,
				opacity: 0,
				screenHeight: 0,
				height: '0',
				tabbar: false,
				isVip: false,
				vip: false,
				item: null,
				curriculumInfo:{},//详情root节点的
				timetableList:[],//课表页面
			}
		},
		created() {
			uni.getSystemInfo({
				success: (e) => {
					this.screenHeight = e.screenHeight;
					let statusBar = 0
					let customBar = 0
					statusBar = e.statusBarHeight
					let custom = wx.getMenuButtonBoundingClientRect()
					customBar = custom.bottom + custom.top - e.statusBarHeight
					this.tabbarheight = customBar * 2;
					this.navbarheight = customBar * 2 - e.statusBarHeight * 2;
				}
			})
		},
		components: {
			Timetable,
			Details
		},
		onLoad(options) {
			this.item = options;
		},
		onShow() {
			var app = getApp();
			var member = app.globalData.member;
			if (member && member.memberType != 2) {
				if (member.endTime > Date.now()) {
					this.tabbar = true;
					this.vip = true;
				}
			}
			this.getCurriculum();
		},
		methods: {
			back() {
				if(!this.customEvent){
					uni.navigateBack({
						delta: 1
					})
				}else{
					this.$emit('navEvent')
				}
				
			},
			// 获取详情
			async getCurriculum() {
				let res = await Curriculum.getCurriculum(this.item.objectId);
				let info = res[0];
				if(!info){
					this.curriculumInfo=undefined;
					return false;
				}
				this.curriculumInfo=info;
				if(info.headImg&&info.headImg.length){
					this.height='478rpx';
				}
				// 判断是否为vip课程
				if(info.vip){
					this.isVip=true
				}else{
					this.isVip=false;
					this.vip = true;
					this.tabbar = true;
				}
				//获取课表
				if(info.objectId){
					this.getAllTimetable(info.objectId);
				}
			},
			async getAllTimetable(objectId) {
				this.timetableList=[]
				let res = await Curriculum.getAllTimetable(objectId,true);
				if(res[0].children&&res[0].children.length){
					this.timetableList=res[0].children.filter(item => item.has_down_level);
				}else{
					this.timetableList = [];
				}
			}
		}
	}
</script>

<style scoped>
	.study {
		height: 100vh;
		overflow: hidden;
		background: #f7f7f7;
	}
	.navbar {
		position: fixed;
		width: 100%;
		color: #fff;
		top: 0;
		z-index: 10000;
	}
	.nav {
		width: 100%;
		display: flex;
		align-items: center;
		position: absolute;
	}
	.icon {
		flex: 0 1 50rpx;
		height: 50rpx;
		text-align: center;
	}
	.title {
		flex: 1 1 auto;
		padding-right: 50rpx;
	}
	.bg {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
	}
	.img {
		width: 100%;
	}
	
	.head {
		height: 276rpx;
		background: #fff;
		padding: 0 48rpx;
		box-shadow: 0 4rpx 8rpx 0 rgba(0,0,0,0.1);
	}
	.radius {
		border-top-left-radius: 24rpx;
		border-top-right-radius: 24rpx;
		position: relative;
		top: -24rpx;
	}
	.title {
		padding: 48rpx 0 18rpx;
		font-size: 44rpx;
		font-weight: 600;
	}
	.info {
		font-size: 24rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 48rpx;
		color: rgba(23,23,23,.5)
	}
	.info .studynum {
		margin-right: 30rpx;
	}
	.info image {
		width: 48rpx;
		height: 48rpx;
	}
	.teacher {
		display: flex;
		align-items: center;
	}
	.teacher image {
		border-radius: 50%;
		margin-right: 10rpx;
	}
	.tabber {
		display: flex;
		justify-content: space-around;
		margin-top: 44rpx;
		font-size: 24rpx;
		font-weight: 500;
	}
	.tabber view {
		height: 36rpx;
		text-align: center;
	}
	.text {
		color: #D81E1F;
		border-bottom: 3px solid #D81E1F;
	}
	.br {
		width: 46rpx;
		height: 5rpx !important;
		background: #D81E1F;
		border-radius: 2rpx;
	}
	.tab {
		/* height: calc(100vh - 764rpx);
		overflow-y: auto; */
		height: calc(100vh - 740rpx);
		overflow-y: auto;
		transform: translateY(-24rpx);
		padding-top: 24rpx;
	}
</style>
