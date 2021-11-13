<template>
	<view class='study' v-if="curriculumInfo">
		<Navbar navbarBg='#fff' :height='height' fontColor="#000" iconColor='#000'>
			<template v-slot:img>
				<image style='width: 100%; height: 100%;' :src="curriculumInfo.headImg[0]" mode='aspectFill'></image>
			</template>
			<view class="head radius" :style='{top: height ? "-24rpx": 0}'>
				<view class="title">{{curriculumInfo.subjectName}}</view>
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
						<view :class='{text: !tabbar}'>详情</view>
						<view v-if='!tabbar' class='br'></view>
					</view>
					<view style='padding: 0 20rpx;' @click='tabbar = true'>
						<view :class='{text: tabbar}'>目录</view>
						<view v-if='tabbar' class='br'></view>
					</view>
				</view>
			</view>
			<view class="tab">
				<Timetable v-if='tabbar ' :list="timetableList"/>
				<Details v-else :detail="curriculumInfo.introduce" :isVip="vip"/>
			</view>
		</Navbar>
	</view>
</template>

<script>
	import Curriculum from '../../js/curriculum.js'
	import Timetable from './timetable.vue';
	import Details from './details.vue';
	import Navbar from '../../components/navbar/navbar.vue';
	export default {
		data() {
			return {
				curriculumInfo:{},//详情root节点的
				timetableList:[],//课表页面
				height: '0',
				tabbar: false,
				isVip: false,
				vip: false,
				item: null
			}
		},
		components: {
			Timetable,
			Details,
			Navbar
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
		background: #f7f7f7;
		height: 100vh;
	}
	.head {
		height: 256rpx;
		background: #fff;
		padding: 0 48rpx;
		box-shadow: 0 4rpx 8rpx 0 rgba(0,0,0,0.1);
	}
	.radius {
		border-top-left-radius: 24rpx;
		border-top-right-radius: 24rpx;
		position: relative;
	}
  .title {
		padding: 20rpx 0;
		font-size: 44rpx;
		font-weight: 900;
	}
	.info {
		font-size: 24rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 48rpx;
		color: rgba(23,23,23,.6)
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
		font-weight: 700;
	}
	.tabber view {
		height: 38rpx;
		text-align: center;
	}
	.text {
		color: #D81E1F;
		border-bottom: 3px solid #D81E1F;
	}
	.br {
		width: 46rpx;
		height: 4rpx;
		background: #D81E1F;
		border-radius: 2rpx;
	}
	
</style>