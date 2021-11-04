<template>
	<view class='study'>
		<Navbar navbarBg='#fff' :height='height' title='课程' fontColor="#000" iconColor='#000'>
			<template v-slot:img>
				<image style='width: 100%;' :src="curriculumInfo.headImg[0]" mode='aspectFill'></image>
			</template>
			<view class="head radius" :style='{top: height ? "-20rpx": 0}'>
				<view class="title">{{curriculumInfo.subjectName}}</view>
				<view class="info">
					<view>
						<text v-if="curriculumInfo.subheadingOne" class='studynum'>{{curriculumInfo.subheadingOne}}</text>
						<text v-if="curriculumInfo.subheadingTwo">{{curriculumInfo.subheadingTwo}}</text>
					</view>
					<view class="teacher">
						<image v-if="curriculumInfo.portrait&&curriculumInfo.portrait.length" :src="curriculumInfo.portrait[0]"></image>
						<text>{{curriculumInfo.lecturerName}}</text>
					</view>
				</view>
				<view class="tabber">
					<view :class='{text: !tabbar}' @click='tabbar = false'>详情</view>
					<view :class='{text: tabbar}' @click='tabbar = true'>目录</view>
				</view>
			</view>
			<view class="tab">
				<Timetable v-if='tabbar' :list="timetableList"/>
				<Details v-else :detail="curriculumInfo.introduce" :isVip="isVip"/>
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
			this.getCurriculum();
		},
		created() {
			var app = getApp();
			var member = app.globalData.member;
			if (member && member.blockGold) {
				if (member.blockGold.endTime > Date.now() || member.permanent) {
					this.tabbar = true;
					return ;
				}
			}
			if (member && member.whiteGold) {
				if (member.whiteGold.endTime > Date.now() || whiteGold.permanent) {
					this.tabbar = true;
				}
			}
		},
		methods: {
			// 获取详情
			async getCurriculum() {
				let res = await Curriculum.getCurriculum(this.item.objectId);
				console.log(res,88899)
				let info = res[0];
				this.curriculumInfo=info;
				if(info.headImg&&info.headImg.length){
					this.height='478rpx';
				}
				// 判断是否为vip课程
				if(info.isVipCourse){
					this.isVip=true
				}else{
					this.isVip=false;
				}
				//获取课表
				if(info.objectId){
					this.getAllTimetable(info.objectId);
				}
			},
			async getAllTimetable(objectId) {
				this.timetableList=[]
				let res = await Curriculum.getAllTimetable(objectId,true);
				console.log(res,343234)
				if(res[0].children&&res[0].children.length){
					console.log(res,343234)
					this.timetableList=res[0].children;
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
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		position: relative;
	}
  .title {
		padding: 28rpx 0;
		font-size: 44rpx;
		font-weight: 900;
	}
	.info {
		font-size: 24rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 48rpx;
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
		margin-top: 30rpx;
	}
	.tabber view {
		height: 48rpx;
	}
	.tab {
		/* margin-top: 30rpx; */
	}
	.text {
		color: #D81E1F;
		border-bottom: 3px solid #D81E1F;
	}
	
</style>