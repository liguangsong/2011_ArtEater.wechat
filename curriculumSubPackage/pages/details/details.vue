<template>
	<view class="details" :class='{"details-scroll": timetable}'>
		<view class="header">
			<view class="tabbar" :style='{height: tabbarheight+"rpx"}'>
				<view class="navbar" :style='{height: navbarheight + "rpx", top: tabbarheight - navbarheight + "rpx"}'>
					<view class="icon">
						<u-icon @click='back' name="arrow-left" color="#000" size="34rpx"></u-icon>
					</view>
				</view>
			</view>
			<!-- 视频 -->
			<view class='mp4' v-if="curriculumInfo.kind&&curriculumInfo.kind==1">
				<k-video :src='curriculumInfo.link'></k-video>
			</view>
			<view class="info">
				<view class="info-title">{{curriculumInfo.subjectName}}</view>
				<view class="bottom">
					<view class="teacher">
						<image v-if="curriculumInfo.portrait&&curriculumInfo.portrait.length" :src="curriculumInfo.portrait[0]"></image>
						<text>{{curriculumInfo.lecturerName}}</text>
					</view>
					<view class="btn">
						<view v-if="curriculumInfo.flag==1">
							<view class="img" @click='timetablefn'>
								<image src="../../static/icon_list.png"></image>
							</view>
							<text>课表</text>
						</view>
						<view @click="share">
							<view class="img">
								<image src="../../../static/icon/icon_share.png"></image>
							</view>
							<!-- <text>分享</text> -->
							<button type="default" open-type='share'>分享</button>
						</view>
						<view @click="operateCollection(false)">
							<view class="img">
								<image :src="collectionStatus?active:unactive"></image>
							</view>
							<text>{{collectionStatus?'已收藏':'收藏'}}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 音频 -->
			<view class="mp3" v-if="curriculumInfo.kind&&curriculumInfo.kind==2">
				<k-audio :play.sync='play' :src='curriculumInfo.link'></k-audio>
			</view>
			<view class="br"></view>
		</view>
		<!-- 图文 -->
		<view class="html" :style='{paddingTop: infoTop + 4 + "px"}' v-if="curriculumInfo.explain">
			<rich-text :nodes='curriculumInfo.explain|formatRichText'></rich-text>
		</view>
		<!-- 推荐学习 -->
		<view class="recommend">
			<view class="recommend-title">
				推荐学习
			</view>
			<view class="recommend-item" v-for='(item,i) in recommendedList' :key='i'>
				<view class='font'>
					<view class="title">{{item.subjectName}}</view>
					<view class="info">
						<text v-if="item.subheadingOne">{{item.subheadingOne}}</text>
						<text v-if="item.subheadingTwo">{{item.subheadingTwo}}</text>
					</view>
				</view>
				<view class="teacher">
					<view class='img'>
						<image v-if="item.portrait&&item.portrait.length" :src="item.portrait[0]"></image>
						<text>{{item.lecturerName}}</text>
					</view>
					<view class="btn">
						<text>学习</text>
					</view>
				</view>
				<view class="vip" v-if='item.isVipCourse'>
					<image v-if='item.isVipCourse && vip' :src="unlock" />
					<image v-else :src="lock" />
				</view>
			</view>
		</view>
		<view class="bg" v-if='timetable'  @click='timetable = false'></view>
		<view class="timetable" :class='{"show-timetable": timetable}'>
			<view class="content">
				<view class="content-header">
					<view class="icon">
						<u-icon name="arrow-up"></u-icon>
					</view>
					<view class="timetable-title">
						<text>{{timetableRoot.subjectName}}</text>
					</view>
				</view>
				<view class="list">
					<view class="item" v-for='(item,i) in timetableList' :key='i' :class='{active: curriculumInfo.objectId==item.objectId}' @click="changeCurriculum(item)">
						<view class="item-title">
							<text>{{item.subjectName}}</text>
						</view>
						<view class="item-type">
							<text v-if='curriculumInfo.objectId==item.objectId'>当前课程</text>
							<image :src="item.kind==1?'../../static/video.png':item.kind==2?'../../static/audio.png':''" mode=""></image>
						</view>
					</view>
				</view>
				<view class="close">
					<view class="btn" @click='timetable = false'>
						关闭
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Curriculum from '../../js/curriculum.js'
	import kAudio from '../../../components/audio/audio.vue'
	import kVideo from '../../../components/video/kVideo.vue'
	export default {
		components: {
			kAudio, kVideo
		},
		data() {
			return {
				tabbarheight: 0,
				navbarheight: 0,
				infoTop: 0,
				collectionStatus:false,
				active:"../../../static/icon/icon_collection_active.png",
				unactive:"../../../static/icon/icon_collection.png",
				timetable: false,	// 课表是否显示
				curriculumInfo:{},//当前课程详情
				recommendedList:[],//推荐课程
				timetableRoot:{}, //
				timetableList:[],//课表弹框数据
				play: false,
				vip:true,//当前哦用户是否是vip
				lock: '../../../static/vip-lock.png',
				unlock: '../../../static/vip-unlock.png',
			}
		},
		onLoad(options) {
			this.curriculumInfo={};
			this.objectId=options.objectId;
			// 获取当前课程详情
			this.getCurriculum();
		},
		//用户点击右上角分享朋友圈
		onShareTimeline: function () {
			return {
		      title: '食艺兽',
		      query: {
		        key: value
		      },
		      imageUrl: ''
		    }
		},
		filters:{
		/**
		 * 处理富文本里的图片宽度自适应
		 * 1.查找img标签有无style属性，如果没有，加上style
		 * 2.所有标签style后追加 max-width:100% !important;
		 * 4.去掉<br/>标签
		 */
		formatRichText(html) { //控制小程序中图片大小
		   return Curriculum.formatRichText(html);
		    }
		},
		created() {
			uni.getSystemInfo({
				success: (e) => {
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
		mounted() {
			
		},
		methods: {
			// 获取详情
			async getCurriculum() {
				let res = await Curriculum.getCurriculum(this.objectId);
				console.log(res,88899)
				let info = res[0];
				this.curriculumInfo=info;
				// 获取收藏状态
				await this.operateCollection(true);
				if(info.checkData&&info.checkData.length){
					//获取推荐课程
					await this.getRecommended(info.checkData);
				}
				if(info.rootId){
					// 获取课表
					await this.getAllTimetable(info.rootId);
				}
				const query = uni.createSelectorQuery().in(this);
				query.select('.header').boundingClientRect(data => {
					this.infoTop = data.height;
				}).exec();
			},
			//获取推荐课程
			async getRecommended(ids) {
				console.log(ids,8888)
				  let res = await Curriculum.getRecommended(ids);
				  console.log(res,777)
				     this.recommendedList = res;
			},
			// 获取课表
			async getAllTimetable(rootId) {
				let res = await Curriculum.getAllTimetable(rootId);
				console.log(res,667788)
				   res = res.filter(v=>{
				   if(v.rootId==='0' && !v.kind){
					   
					   this.timetableRoot=v;
					   console.log(this.timetableRoot,v,11222)
				   }
				   return (v.rootId && v.kind && v.kind!=4);
				   });
				   console.log(res,9999)
				   this.timetableList=res;
			},
			// 切换课程时判断是否是vip课程
			changeCurriculum(item) {
				if(item.isVipCourse){
					// 是vip课程则要跳转到vip中心买会员
					uni.navigateTo({
						url:'../../../mineSubPackage/pages/vip/vip'
					})
				}else{
					this.curriculumInfo=item;
				}
				
			},
			//分享
			share() {
				console.log(123);
				uni.share({
				    provider: "weixin",
				    scene: "WXSceneSession",
				    type: 1,
				    summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    }
				});
			},
			// 收藏操作
			async operateCollection(init) {
				console.log(init,7788)
				if(init){
					let res= await Curriculum.getCollectionstatus(this.curriculumInfo.objectId);
					this.collectionStatus=res;
				}else{
					let res= await Curriculum.operateCollections(this.curriculumInfo.objectId);
					this.collectionStatus=res
				};
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			timetablefn() {
				console.log(12);
				this.timetable = true
			}
		}
	}
</script>

<style scoped lang='scss'>
	.details-scroll {
		height: 100vh;
		overflow: hidden;
	}
	.details {
		position: relative;
		background: #fff;
		.header {
			position: fixed;
			width: 100%;
			background: #fff;
			.tabbar {
				width: 100%;
				overflow: hidden;
				.navbar {
					position: absolute;
					width: 100%;
					z-index: 1000;
					display: flex;
					align-items: center;
					.icon {
						padding-left: 34rpx;
					}
				}
			}
			.info {
				padding: 48rpx 24rpx 28rpx 48rpx;
				.info-title {
					font-size: 36rpx;
					line-height: 50rpx;
					color: #D81E1F;
					font-weight: 600;
					margin-bottom: 14rpx;
				}
				.bottom {
					display: flex;
					justify-content: space-between;
					align-content: center;
					font-size: 20rpx;
					height: 64rpx;
					line-height: 64rpx;
					.teacher {
						flex: 0 1 278rpx;
						display: flex;
						align-content: center;
						image {
							width: 48rpx;
							height: 48rpx;
							border-radius: 50%;
							margin-right: 10rpx;
						}
					}
					.btn > view {
						display: flex;
						width:33.33%;
						align-content: center;
					}
					.btn {
						flex: 1 0 auto;
						display: flex;
						justify-content: flex-end;
						.img {
							width: 64rpx;
							height: 64rpx;
						}
						image {
							width: 64rpx;
							height: 64rpx;
						}
						button {
							font-size: 20rpx;
							height: 64rpx;
							width: 170rpx;
							line-height: 64rpx;
							background: none;
							border: none;
							border-radius: 0;
							box-sizing: border-box;
							margin-left: 0;
							margin-right: 0;
							padding-right: 0;
							position: relative;
							text-align: right;
							left: -46rpx;
							text-decoration: none;
							&:after {
								border: none;
							}
						}
					}
				}
			}
			.mp3 {
				margin: 0 16rpx 28rpx;
				height: 148rpx;
				border-radius: 24rpx;
				padding: 28rpx;
				box-shadow: 0 4rpx 8rpx 0 rgba(0,0,0,0.05), 0 -4rpx 8rpx 0 rgba(0,0,0,0.05);
			}
			.br {
				border-bottom: 1px solid #ccc;
				margin: 0 24rpx;
			}
		}
		.html {
			width: 100%;
			padding: 28rpx 40rpx;
			line-height: 40rpx;
			font-size: 24rpx;
			overflow: hidden;
			box-shadow: 0 0 8rpx 2rpx rgba(0,0,0,0.08);
		}
		.html image, .html img {
			width: 100%;
		}
		.recommend {
			padding: 48rpx 30rpx;
			background: rgba(0, 0, 0, 0.05);
			.recommend-title {
				font-size: 28rpx;
				font-weight: 500;
				margin-bottom: 24rpx;
				&::before {
					content: "";
					display: inline-block;
					width: 10rpx;
					height: 24rpx;
					margin-right: 8rpx;
					background: #D81E1F;
				}
			}
			.recommend-item {
				position: relative;
				width: 690rpx;
				height: 220rpx;
				background: #fff;
				box-shadow: 0 4rpx 10rpx 0 rgba(0,0,0,0.06);
				border-radius: 24rpx;
				padding: 32rpx 48rpx 20rpx 40rpx;
				margin-bottom: 24rpx;
				.font {
					margin-bottom: 40rpx;
					.title {
						font-size: 32rpx;
						font-weight: 500;
						line-height: 44rpx;
					}
					.info {
						font-size: 20rpx;
						font-weight: 400;
						color: #555;
						line-height: 28rpx;
						margin-top: 8rpx;
						text {
							&:first-child {
								margin-right: 10rpx;
							}
						}
					}
				}
				.teacher {
					display: flex;
					justify-content: space-between;
					height: 48rpx;
					font-size: 20rpx;
					line-height: 48rpx;
					align-items: center;
					.img {
						display: flex;
						align-content: center;
					}
					image {
						width: 48rpx;
						height: 48rpx;
						border-radius: 50%;
						margin-right: 12rpx;
					}
					.btn {
						color: #FF6867;
						width: 100rpx;
						height: 40rpx;
						border-radius: 20rpx;
						border: 2rpx solid #FF6867;
						text-align: center;
						line-height: 40rpx;
					}
				}
				.vip {
					position: absolute;
					top: -6rpx;
					right: -6rpx;
				}
				.vip image {
					width: 116rpx;
					height: 116rpx;
				}
			}
		}
		.show-timetable {
			view {
				&.content {
					transform: translateY(0);
					transition: .3s;
				}
			}
		}
		.bg {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			width: 100%;
			height: 100vh;
			background: rgba(0,0,0,.5);
		}
		.timetable {
			position: fixed;
			width: 100%;
			bottom: 0;
			.content {
				position: absolute;
				width: 100%;
				height: 836rpx;
				background: #fff;
				border-top-left-radius: 24rpx;
				border-top-right-radius: 24rpx;
				bottom: 0;
				overflow: hidden;
				transform: translateY(100%);
				transition: .3s;
				.content-header {
					position: absolute;
					top: 0;
					padding-top: 24rpx;
					height: 160rpx;
					width: 100%;
					background: #fff;
					.icon {
						width: 100%;
						text-align: center;
						font-size: 20rpx;
						opacity: .2;
					}
					.timetable-title {
						padding-top: 40rpx;
						padding-left: 48rpx;
						font-size: 28rpx;
						font-weight: 600;
						color: #D81E1F;
						line-height: 40rpx;
					}
				}
				.list {
					height: 512rpx;
					margin-top: 160rpx;
					padding-left: 48rpx;
					overflow-y: auto;
					.active {
						font-size: 24rpx;
						font-weight: 600;
						color: #000000;
						.item-type {
							text{
								font-size: 16rpx;
								opacity: .3;
							}
						}
					}
					.item {
						display: flex;
						justify-content: space-between;
						align-items: center;
						height: 84rpx;
						border-bottom: 1px solid rgba(0,0,0,.1);
						font-size: 24rpx;
						color: rgba(0,0,0,.7);
						.item-type {
							margin-right: 20rpx;
							text {
								margin-right: 30rpx;
							}
							image {
								width: 24rpx;
								height: 24rpx;
								vertical-align: middle;
							}
						}
					}
				}
				.close {
					height: 164rpx;
					width: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					view{
						width: 690rpx;
						height: 94rpx;
						line-height: 94rpx;
						font-size: 34rpx;
						font-weight: 600;
						color: #D81E1F;
						text-align: center;
						border-radius: 46rpx;
						border: 2rpx solid #D81E1F;
					}
				}
			}
		}
	}
</style>
