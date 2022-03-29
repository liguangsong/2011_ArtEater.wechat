<template>
	<view class="list">
		
	
	<Navbar navbarBg='#F7F7F7' title='每日新知' align='center' bg='#f7f7f7' fontColor="#000" iconColor='#000'>
		<view class="auditon">
			<view class="item" v-for='(item,i) in list' :key='i' @click='jump(item)'>
				<view class="image-info">
					<image :src="item.surface[0]" mode="widthFix" class="main-image"></image>
					<view class="image-bottom-info">
						<view class="view">
							<image src="../../../static/icon/play.png" class="play-image"></image>
							<text class="play-num">
								{{(item.baseNum+item.N*(item.realNum||0))<10000?item.baseNum+item.N*(item.realNum||0):((item.baseNum+item.N*(item.realNum||0))/10000)+'w'}}
							</text>
						</view>
						<text class='time' v-if="item.course.duration&&item.course.duration!='00:00'">
							{{item.course.duration || ''}}
						</text>
					</view> 
					<view class="opcity"></view>
				</view>
				<image src="../../../static/icon/icon_vip.png" class="icon-vip" v-if="item.course.vip"></image>
				<view class="txt-info">
					<view class="txt-title">
						{{item.title}}
					</view>
					<text class='tag'>
						<!-- {{item.subTitle||''}} -->
						No.{{list.length-i < 10 ? '00'+(list.length-i+' ') : list.length-i < 100 ?  '0'+(list.length-i+' ') : list.length-i}} / {{arr[i]}}
					</text>
				</view>
			</view>
		</view>
		<view style='height: 40rpx'></view>
		<Modal :isShow='isShow' @cancle='isShow=false' submit='确定' title='需要开通会员' @submitFn='submitFn' />
		<login :visiable="isShowLogin" @cancle="isShowLogin=false" @ok="handleLoginComplate" :to="toUrl"></login>
	</Navbar>
	</view>
</template>

<script>
	import Parse from '@/parse/index.js'
	import Modal from '@/components/modal/modalvip.vue'
	import login from '@/components/login/login.vue'
	import Navbar from '../../../components/navBar/topNavbar.vue';
	import Curriculum from '@/js/utils/curriculum.js'
	export default {
		name: 'auditio1n',
		components: {
			Modal, login, Navbar
		},
		data() {
			return {
				vip: false,
				isShow: false,
				isShowLogin: false,
				list: [],
				arr: []
			}
		},
		onShow() {
			var app = getApp();
			var member = app.globalData.member;
			if (member) {
				if (member.memberType != 2) {
					if (member.endTime > Date.now()) {
						this.vip = true
					}
				}
			}
			var query = new this.Parse.Query('DailyCourse');
			query.descending("createdAt");
			query.find().then(data=>{
				this.list = data
				this.list.forEach(item=>{
					this.arr.push(item.createdAt.getFullYear() +'.'+(item.createdAt.getMonth()+1) +'.'+ item.createdAt.getDate())
				})
			})
		},
		methods: {
			async jump(item) {
				let userInfo = uni.getStorageSync('userInfo')
				await Curriculum.recordDailyCourseNum(item.id);
				if (userInfo && userInfo.openid) {
					if (userInfo.phone) {
						if (!item.attributes.course.attributes.vip) {
							uni.navigateTo({
								url: '/curriculumSubPackage/pages/details/details?objectId='+item.attributes.course.id
							})
						} else {
							if (this.vip) {
								uni.navigateTo({
									url: '/curriculumSubPackage/pages/details/details?objectId='+item.attributes.course.id
								})
							} else {
								this.isShow = true
							}
						}
					} else {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}
				} else {
					this.isShowLogin = true
				}
			},
			submitFn() {
				uni.navigateTo({
					url: '/mineSubPackage/pages/vip/vip'
				})
				this.isShow = false
			},
			/* 登录完成 */
			handleLoginComplate() {
				this.isShowLogin = false
				this.$emit('doneLogin', uni.getStorageSync('userInfo'))
			},
		}
	}
</script>

<style lang="scss" scoped>
	.list{
		background: #f7f7f7;
		height: 100vh;
	}
	.auditon {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 0rpx 30rpx 0rpx 30rpx;
		justify-content: space-between;
	}

	.item {
		width: 336rpx;
		position: relative;
		margin-top: 24rpx;

		.icon-vip {
			position: absolute;
			right: 0;
			top: -5rpx;
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
		height: 24rpx;
		position: absolute;
		bottom: 8rpx;
		display: flex;
		align-items: center;
		align-content: center;
		justify-content: space-between;
		font-size: 22rpx;
		z-index: 1;
	}

	.opcity {
		position: absolute;
		bottom: 0;
		width: 336rpx;
		height: 32rpx;
		background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 33%, rgba(0, 0, 0, 0.6) 100%);
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
		letter-spacing: 0rpx;
		font-weight: 500;
		color: #171717;
		line-height: 34rpx;
	}

	.txt-info .tag {
		height: 26rpx;
		font-size: 16rpx;
		letter-spacing: 0rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #989898;
		display: inherit;
		line-height: 26rpx;
		margin-top: 2rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.view {
		height: 24rpx;
		font-size: 16rpx;
		font-weight: 500;
		color: #FFFFFF;
		margin-left: 12rpx;
		display: flex;
		align-items: center;
		align-content: center;

		.play-image {
			width: 24rpx;
			height: 24rpx;
		}

		.play-num {
			font-size: 16rpx;
			font-weight: 500;
			color: #FFFFFF;
		}

		image {
			margin-top: -2rpx;
		}

	}

	.time {
		font-size: 16rpx;
		font-weight: 500;
		color: #FFFFFF;
		margin-right: 12rpx;
	}
</style>
