<template>
	<view class="details" :style='{height: timetable ? "100vh":"auto"}' :class='{"details-scroll": timetable}'>
		<view class="header">
			<view class="tabbar" :style='{height: tabbarheight+"rpx"}'>
				<view class="navbar" :style='{height: navbarheight + "rpx", top: tabbarheight - navbarheight + "rpx"}'>
					<view class="icon" @click='gohome' v-if="shareType!=1">
						<u-icon name="home" color="#000" size="34rpx"></u-icon>
					</view>
					<view class="icon" @click='back' v-else>
						<u-icon name="arrow-left" color="#000" size="34rpx"></u-icon>
					</view>
				</view>
			</view>
			<!-- 视频 -->
			<view class='mp4' v-if="curriculumInfo.kind&&curriculumInfo.kind==1">
				<k-video :src='curriculumInfo.link' @changeLearn="changeLearn"></k-video>
			</view>
			<view class="info">
				<view class="info-title">{{curriculumInfo.subjectName}}</view>
				<view class="bottom">
					<view class="teacher">
						<image v-if="curriculumInfo.portrait&&curriculumInfo.portrait.length"
							:src="curriculumInfo.portrait[0]"></image>
						<text>{{curriculumInfo.lecturerName}}</text>
					</view>
					<view class="btn">
						<view class='btnitem' v-if="curriculumInfo.flag==1" @click='timetablefn'>
							<view class="img">
								<image src="../../static/icon_list.png"></image>
							</view>
							<text>课表</text>
						</view>
						<view class="btnitem" v-else></view>
						<view class='btnitem button' @click="share">
							<!-- :style="{left: curriculumInfo.flag==1 ? '26rpx':'46rpx'}" -->
							<view class="img">
								<image src="../../../static/icon/icon_share.png"></image>
							</view>
							<!-- <text>分享</text> -->
							<button type="default" :data-objectId='objectId' open-type='share'>分享</button>
						</view>
						<view class='btnitem' @click="operateCollection(false)">
							<view class="img">
								<image :src="collectionStatus?active:unactive"></image>
							</view>
							<text class='collection'>{{collectionStatus?'已收藏':'收藏'}}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 音频 -->
			<view class="mp3" v-if="curriculumInfo.kind&&curriculumInfo.kind==2">
				<k-audio :play.sync='play' :audioTimeTotal="curriculumInfo.duration" :src='curriculumInfo.link'
					@changeLearn="changeLearn"></k-audio>
			</view>
			<view class="br"></view>
		</view>
		<!-- 图文 -->
		<view class="html" :style='{paddingTop: infoTop + 4 + "px"}' v-if="curriculumInfo.explain">
			<rich-text class="ql-editor" :nodes='curriculumInfo.explain|formatRichText'></rich-text>
		</view>
		<!-- 推荐学习 -->
		<view class="recommend" v-if='recommendedList.length'>
			<view class="recommend-title">
				推荐学习
			</view>
			<Item v-for='(item,i) in recommendedList' v-if='!item.hide' :key='i' :item='item' :vip='vip' />
		</view>
		<view class="bg" @touchmove.stop.prevent="" v-if='timetable' @click='timetable = false'></view>
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
					<template v-for='(item,i) in timetableList'>
						<view class="item"
							v-if="shareType || !item.hide || !shareType&&item.hide&&item.objectId==objectId" :key='i'
							:class='{active: curriculumInfo.objectId==item.objectId}' @click="changeCurriculum(item)">
							<view class="item-title"
								:class="{'item-title-shot':curriculumInfo.objectId==item.objectId?true:false}">
								<text>{{item.subjectName}}</text>
							</view>
							<view class="item-type">
								<text v-if='curriculumInfo.objectId==item.objectId'>当前课程</text>
								<image
									:src="item.kind==1?'../../static/video.png':item.kind==2?'../../static/audio.png':''"
									mode=""></image>
							</view>
						</view>
					</template>

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
	import Utils from '@/js/utils/curriculum.js'
	import Curriculum from '../../js/curriculum.js'
	import kAudio from '../../../components/audio/bg-audio.vue'
	import kVideo from '../../../components/video/kVideo.vue'
	import Item from '@/pages/curriculum/item.vue'
	export default {
		components: {
			kAudio,
			kVideo,
			Item
		},
		data() {
			return {
				shareType: 0,
				tabbarheight: 0,
				navbarheight: 0,
				infoTop: 0,
				collectionStatus: false,
				active: "../../../static/icon/icon_collection_active.png",
				unactive: "../../../static/icon/icon_collection.png",
				timetable: false, // 课表是否显示
				curriculumInfo: {}, //当前课程详情
				recommendedList: [], //推荐课程
				timetableRoot: {}, //
				timetableList: [], //课表弹框数据
				play: false,
				vip: false,
				lock: '../../../static/vip-lock.png',
				unlock: '../../../static/vip-unlock.png',
				screenHeight: 0,
				allheight: 0,
				status: false
			}
		},
		onLoad(options) {
			this.curriculumInfo = {};
			this.objectId = options.objectId;
			if (options.shareType) {
				this.shareType = options.shareType;
			}
			// 获取当前课程详情
			this.getCurriculum();
		},
		async onShow() {
			let that = this;
			uni.getSystemInfo({
				success: function(res) {
					that.screenHeight = res.screenHeight;
				}
			});

			var app = getApp();
			var member = app.globalData.member;
			// 判断是不是会员
			if (member) {
				if (member.memberType != 2) {
					if (member.endTime > Date.now()) {
						this.vip = true;
					} else {
						var query = new this.Parse.Query('MemberList');
						var user1 = JSON.parse(JSON.stringify(user));
						query.equalTo("openId", user1.openid);
						var results = await query.first();
						results.set('memberType', '');
						results.save();
					}
				}
			} else {
				var user = await this.Parse.User.current();
				var query = new this.Parse.Query('MemberList');
				var user1 = JSON.parse(JSON.stringify(user));
				query.equalTo("openId", user1.openid);
				var results = await query.first();
				if (results) {
					var r = JSON.parse(JSON.stringify(results));
					app.globalData.member = r;
					if (r.memberType != 2) {
						if (r.endTime > Date.now()) {
							this.vip = true;
						} else {
							results.set('memberType', '');
							results.save();
						}
					}
				}
			}
		},
		onPageScroll(res) {
			if (this.curriculumInfo.kind == 3) {
				let that = this;
				let scrollTop = res.scrollTop;
				let view = uni.createSelectorQuery().in(this).select(".details");
				view.boundingClientRect(data => {
					that.allheight = data.height;
				}).exec();
				let param = scrollTop / (this.allheight - this.screenHeight);
				if (param >= 0.8 && !this.status) {
					this.status = true;
					that.changeLearn(false);
				} else if (param < 0.8 && this.status) {
					this.status = false;
					that.changeLearn(true);
				}
			}
		},
		//用户点击右上角分享朋友圈
		onShareTimeline: function() {
			return {
				title: '食艺兽',
				query: {
					key: value
				},
				imageUrl: ''
			}
		},
		filters: {
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
		methods: {
			async changeLearn(status) {
				let res = await Utils.changeLearn(this.curriculumInfo.objectId, status);
			},
			// 获取详情
			async getCurriculum() {
				let res = await Curriculum.getHideCurriculum(this.objectId);
				let info = res[0];
				this.curriculumInfo = info;
				if (info.rootId) {
					var q = new this.Parse.Query('CoursesModule')
					q.equalTo('objectId', info.rootId)
					q.find().then(data => {
						this.curriculumInfo.portrait = data[0].attributes.portrait;
						this.curriculumInfo.lecturerName = data[0].attributes.lecturerName;
					})
				}
				if (info.flag == 1) {
					// 存储上次学习
					await Curriculum.updatePreLearn(info['rootId'], info.objectId);
				}
				if (info.kind == 3) {
					this.changeLearn(true);
				}
				// 获取收藏状态
				await this.operateCollection(true);
				if (info.recommendCourse && info.recommendCourse.length) {
					console.log('获取推荐课程');
					//获取推荐课程
					await this.getRecommended(info.recommendCourse);
				}
				if (info.rootId) {
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
				let res = await Curriculum.getRecommended(ids);
				this.recommendedList = res;
			},
			// 获取课表
			async getAllTimetable(rootId) {
				let res = await Curriculum.getAllTimetable_hide(rootId, false, this.shareType ==
				1); //rootId=='0'true为分享的整个系列课程，false为扫码分享的系列课程中的单课程
				res = res.filter(v => {
					if (v.rootId === '0' && !v.kind) {
						this.timetableRoot = v;
					}
					return (v.rootId && v.kind && v.kind != 4);
				});
				this.timetableList = res;
			},
			// 切换课程时判断是否是vip课程
			async changeCurriculum(item) {
				let app = getApp();
				let member = app.globalData.member;
				let vip = false;
				if (member && member.memberType != 2 && (member.endTime > Date.now())) {
					vip = true;
				}
				if (item.vip && !vip) {
					// 是vip课程则要跳转到vip中心买会员
					uni.navigateTo({
						url: '../../../mineSubPackage/pages/vip/vip'
					})
				} else {
					this.curriculumInfo = item;
					this.timetable = false;
					this.$nextTick(() => {
						const query = uni.createSelectorQuery().in(this);
						query.select('.header').boundingClientRect(data => {
							this.infoTop = data.height;
						}).exec();
					})
					// 存储上次学习
					await Curriculum.updatePreLearn(item['rootId'], item.objectId);
					if (this.curriculumInfo.rootId) {
						var q = new this.Parse.Query('CoursesModule')
						q.equalTo('objectId', this.curriculumInfo.rootId)
						q.find().then(data => {
							this.curriculumInfo.portrait = data[0].attributes.portrait;
							this.curriculumInfo.lecturerName = data[0].attributes.lecturerName;
						})
					}
				}

			},
			//分享
			share() {
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 1,
					summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			// 收藏操作
			async operateCollection(init) {
				if (init) {
					let res = await Curriculum.getCollectionstatus(this.curriculumInfo.objectId);
					this.collectionStatus = res;
				} else {
					let res = await Curriculum.operateCollections(this.curriculumInfo.objectId);
					this.collectionStatus = res
				};
			},
			gohome() {
				uni.reLaunch({
					url: '/pages/index/index'
				})
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			timetablefn() {
				this.timetable = true
			}
		}
	}
</script>


<style scoped lang='scss'>
	.details-scroll {
		height: 100vh;
		overflow: hidden;
		background: #fff;
	}

	.details {
		position: relative;
		background: #fff;

		.header {
			position: fixed;
			width: 100%;
			background: #fff;
			z-index: 1000;

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
					color: rgba(216, 30, 31, 1);
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
					color: rgba(23, 23, 23, .6);

					.teacher {
						flex: 0 1 278rpx;
						display: flex;
						align-items: center;

						image {
							width: 48rpx;
							height: 48rpx;
							border-radius: 50%;
							margin-right: 10rpx;
						}
					}

					.btn {
						width: 392rpx;
						flex: 1 0 auto;
						display: flex;
						justify-content: space-around;
						font-size: 20rpx;
						font-weight: 400;
						color: rgba(23, 23, 23, 0.6);

						.btnitem {
							flex: 0 1 124rpx;
							display: flex;
							justify-content: flex-end;
							position: relative;
						}

						.img {
							width: 64rpx;
							height: 64rpx;
						}

						image {
							width: 64rpx;
							height: 64rpx;
						}

						text {
							display: inline-block;
							width: 60rpx;
						}

						.button {
							.img {
								position: absolute;
								left: 0;
							}
						}

						button {
							font-size: 20rpx;
							height: 64rpx;
							width: 124rpx;
							line-height: 64rpx;
							background: none;
							border: none;
							border-radius: 0;
							color: rgba(23, 23, 23, 0.6);
							box-sizing: border-box;
							margin-left: 0;
							margin-right: 0;
							padding-right: 0;
							padding-left: 64rpx !important;
							text-align: left;
							text-decoration: none;
							position: absolute;

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
				box-shadow: 0 4rpx 8rpx 0 rgba(0, 0, 0, 0.05), 0 -4rpx 8rpx 0 rgba(0, 0, 0, 0.05);
			}

			.br {
				border-bottom: 1px solid rgba(0, 0, 0, .05);
				margin: 0 24rpx;
			}
		}

		.html {
			width: 100%;
			padding: 28rpx 40rpx;
			line-height: 40rpx;
			font-size: 24rpx;
			overflow: hidden;
			box-shadow: 0 0 8rpx 2rpx rgba(0, 0, 0, 0.08);
			position: relative;
			z-index: 10;
		}

		.html image,
		.html img {
			width: 100%;
		}

		.recommend {
			padding: 48rpx 30rpx;
			background: rgba(0, 0, 0, 0.05);
			display: block;

			.recommend-title {
				font-size: 28rpx;
				font-weight: 500;
				margin-bottom: 24rpx;
				font-family: PingFangSC-Medium;

				&::before {
					content: "";
					display: inline-block;
					width: 10rpx;
					height: 24rpx;
					margin-right: 8rpx;
					transform: translateY(2rpx);
					background: #D81E1F;
					border-radius: 1px;
				}
			}

			.recommend-item {
				position: relative;
				z-index: 0;
				width: 690rpx;
				height: 220rpx;
				background: #fff;
				box-shadow: 0 4rpx 10rpx 0 rgba(0, 0, 0, 0.06);
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
					color: rgba(23, 23, 23, .6);

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
			background: rgba(0, 0, 0, .5);
			z-index: 1000;
		}

		.timetable {
			position: fixed;
			width: 100%;
			bottom: 0;
			z-index: 2000;

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
						color: #D81E1F;
						line-height: 40rpx;
						font-family: PingFangSC-Semibold;
						font-weight: 700;
					}
				}

				.list {
					height: 512rpx;
					margin-top: 160rpx;
					padding-left: 48rpx;
					overflow-y: auto;
					font-family: PingFangSC-Regular;

					.active {
						font-size: 24rpx;
						font-weight: 800;
						font-family: PingFangSC-Semibold, PingFang SC;
						color: rgba(0, 0, 0, .9) !important;

						.item-type {
							text {
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
						border-bottom: 1px solid rgba(0, 0, 0, .05);
						font-size: 24rpx;
						color: rgba(0, 0, 0, .67);

						.item-title {
							max-width: 620rpx;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}

						.item-title-shot {
							max-width: 516rpx;
						}

						text {
							font-family: PingFangSC-Regular, PingFang SC;
						}

						.item-type {
							margin-right: 48rpx;

							text {
								margin-right: 30rpx;
							}

							image {
								width: 34rpx;
								height: 34rpx;
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

					view {
						width: 690rpx;
						height: 94rpx;
						line-height: 94rpx;
						font-size: 34rpx;
						font-weight: 500;
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
