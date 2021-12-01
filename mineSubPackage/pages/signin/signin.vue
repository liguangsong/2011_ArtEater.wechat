<template>
	<TopNavbar title='签到' paddingTop="224">
		<view>
			<view class="mydatepicker">
					
			<view class="title-info title-margin">
				<view class="left">
					<view class="red-block"></view>
					{{dateStr}}
				</view>
				<view class="right">
					<view class="prev" @click="handlePrev">
						<u-icon name="arrow-left" color="#ff6867" size="30"></u-icon>
					</view>
					<view class="next" @click="handleNext">
						<u-icon name="arrow-right" color="#ff6867" size="30"></u-icon>
					</view>
				</view>
			</view>

				<view class="body">
					<image src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/signin.png"></image>
					<view class="content">
						<view v-for="item in prevDays" class="item prev">
							<view @click="handleClickItem" :data-item="item"
								:class="(item.dateStr == today?'today':'') + (item.isContain?' contain':'') + (item.isChecked?' checked':'')">
								<text>{{item.text}}</text>
							</view>
						</view>
						<view v-for="item in currDays" class="item">
							<view @click="handleClickItem" :data-item="item"
								:class="(item.dateStr == today?'today':'') + (item.isContain?' contain':'') + (item.isChecked?' checked':'')">
								<text>{{item.text}}</text>
							</view>
						</view>
						<view v-for="item in nextDays" class="item next">
							<view @click="handleClickItem" :data-item="item"
								:class="(item.dateStr == today?'today':'') + (item.isContain?' contain':'') + (item.isChecked?' checked':'')">
								<text>{{item.text}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="title-info title-margin">
				<view class="left">
					<view class="red-block"></view>
					当前积分：{{userInfo.score}}
				</view>
			</view> 
			<view class="actionView">
				<view v-if="isNeedSign" @click="handleSign" class="action">立即签到</view>
				<view v-else class="action disabled">已签到</view>
				<view v-if="isNeedSign" class="tips">
					<image src="../../static/bubble.png"></image>
					<view class="tipicon">
						签到成功获得{{signUpScore}}积分
					</view>
				</view>
			</view>
		</view>
	</TopNavbar>
</template>
<script>
	import {
		dateFormat,
		toDateFromString,
		addMonths,
		addDays,
		addSeconds,
		GetRandomNum,
		utc2beijing
	} from '../../../js/common.js'
	import TopNavbar from '@/components/navBar/topNavbar.vue'
	export default {
		data() {
			return {
				userInfo: {},
				signUpScore: 0,
				date: '',
				today: '',
				checkday: '',
				checkeddays: [],
				cancheck: 'all',
				startDate: '',
				endDate: '',
				prevDays: [],
				currDays: [],
				nextDays: [],
				dateStr: '',
				isNeedSign: true
			}
		},
		components: {
			TopNavbar
		},
		onLoad() {
			var self = this
			this.date = dateFormat(new Date(), 'yyyy-MM-dd')
			this.today = dateFormat(new Date(), 'yyyy-MM-dd')
			this.startDate = dateFormat(new Date(), 'yyyy-MM-dd')
			this.endDate = dateFormat(addDays(new Date(), 365), 'yyyy-MM-dd')
			uni.getStorage({
				key: 'userInfo',
				success: res => {
					this.userInfo = res.data
					this.bindSignInHistory()
				}
			})
			this.build()

			self.Parse.Config.get().then(config => {
				self.signUpScore = config.get('signUpScore') // 签到送积分
			})
		},
		watch: {
			checkeddays(val) {
				this.prevDays.forEach((item) => {
					var date = val.find(t => {
						return t == item.dateStr
					})
					if (date) {
						item.isChecked = 'checked'
					} else {
						item.isChecked = ''
					}
				})
				this.currDays.forEach((item) => {
					var date = val.find(t => {
						return t == item.dateStr
					})
					if (date) {
						item.isChecked = 'checked'
					} else {
						item.isChecked = ''
					}
				})
			}
		},
		methods: {
			/* 查询签到记录 */
			bindSignInHistory() {
				var self = this
				var today = dateFormat(new Date(), 'yyyy-MM-dd')
				var signInQuery = new this.Parse.Query("SignInHistory")
				signInQuery.equalTo("openid", this.userInfo.openid)
				signInQuery.find().then(res => {
					if (res.length > 0) {
						res.forEach((date) => {
							// console.log(dateFormat(date.createdAt,'yyyy-MM-dd HH:mm:ss'))
							if (today == dateFormat(date.createdAt, 'yyyy-MM-dd')) { // 今天已打卡
								self.isNeedSign = false
							}
							self.checkeddays.push(dateFormat(date.createdAt, 'yyyy-MM-dd'))
						})
					}
				})
			},
			/*签到*/
			handleSign() {
				var self = this
				if (self.isNeedSign) {
					self.isNeedSign = false
					var dbHistory = this.Parse.Object.extend("SignInHistory")
					var signInQuery = new this.Parse.Query("SignInHistory")
					signInQuery.equalTo('openid', self.userInfo.openid)
					var now = new Date()
					signInQuery.greaterThan('createdAt', new Date(now.getFullYear(), now.getMonth(), now.getDate()))
					signInQuery.count().then(res => {
						if (res == 0) {
							var _history = new dbHistory()
							_history.set('openid', this.userInfo.openid)
							_history.save() //.then(his => {

							if (self.signUpScore > 0) {
								// 添加积分记录
								var ScoreRecords = this.Parse.Object.extend("ScoreRecord")
								var scoreRecord = new ScoreRecords()
								scoreRecord.set('openid', self.userInfo.openid)
								scoreRecord.set('channel', 'signin')
								scoreRecord.set('extend', '') // 首次答题
								scoreRecord.set('score', self.signUpScore)
								scoreRecord.save()
								// 修改用户积分
								var userQuery = new self.Parse.Query(self.Parse.User)
								userQuery.get(self.Parse.User.current().id).then(user => {
									user.set('score', user.get('score') + self.signUpScore)
									if (user.score > 0 && (!user.get('score_all') || user.get(
											'score_all') == 0)) {
										user.set('score_all', user.get('score') + self.signUpScore)
									} else {
										user.set('score_all', user.get('score_all') + self.signUpScore)
									}
									user.save().then(ures => {
										self.userInfo.score = ures.get('score')
										self.userInfo.score_all = ures.get('score_all')
										uni.setStorage({
											key: 'userInfo',
											data: ures
										})
										self.bindSignInHistory()
										console.log('保存成功')
									})
								})
							}
							// },(error)=>{
							// 	console.log(error)
							// })
						}
					}, error => {

					})
				}
			},
			build() {
				var self = this
				self.prevDays = []
				self.currDays = []
				self.nextDays = []
				var date = toDateFromString(self.date)

				this.dateStr = dateFormat(date, 'yyyy年MM月')
				var startDate = new Date(date.getFullYear(), date.getMonth(), 1)
				var endDate = addSeconds(addMonths(startDate, 1), -1)
				/** 开始处理前一月的数据 */
				var week = startDate.getDay();
				if (week > 0) {
					currDate = addDays(startDate, -week)
					while (currDate <= addDays(startDate, -1)) {
						var hasCheckday = self.checkeddays.find(function(v, i) {
							return v == dateFormat(currDate, 'yyyy-MM-dd')
						});
						self.prevDays.push({
							text: currDate.getDate(),
							date: currDate,
							dateStr: dateFormat(currDate, 'yyyy-MM-dd'),
							isChecked: self.checkday == dateFormat(currDate, 'yyyy-MM-dd'),
							isContain: hasCheckday ? true : false
						})
						currDate = addDays(currDate, 1)
					}
				}
				/** 开始处理当前月份的数据 */
				var currDate = startDate;
				while (currDate <= endDate) {
					var hasCheckday = self.checkeddays.find(function(v, i) {
						return v == dateFormat(currDate, 'yyyy-MM-dd')
					});
					self.currDays.push({
						text: currDate.getDate(),
						date: currDate,
						dateStr: dateFormat(currDate, 'yyyy-MM-dd'),
						isChecked: self.checkday == dateFormat(currDate, 'yyyy-MM-dd'),
						isContain: hasCheckday ? true : false
					})
					currDate = addDays(currDate, 1)
				}
				/** 开始处理下月的数据 */
				week = endDate.getDay();
				if (week < 6) {
					var currDate = addDays(endDate, 1);
					while (currDate <= addDays(endDate, 6 - week)) {
						var hasCheckday = self.checkeddays.find(function(v, i) {
							return v == dateFormat(currDate, 'yyyy-MM-dd')
						});
						self.nextDays.push({
							text: currDate.getDate(),
							date: currDate,
							dateStr: dateFormat(currDate, 'yyyy-MM-dd'),
							isChecked: self.checkday == dateFormat(currDate, 'yyyy-MM-dd'),
							isContain: hasCheckday ? true : false
						})
						currDate = addDays(currDate, 1)
					}
				}
			},
			handlePrev() {
				var self = this
				self.date = dateFormat(addMonths(toDateFromString(self.date), -1), 'yyyy-MM-dd');
				this.build()
			},
			handleNext() {
				var self = this
				self.date = dateFormat(addMonths(toDateFromString(self.date), 1), 'yyyy-MM-dd');
				this.build()
			},
			handleClickItem(e) {
				var dateItem = e.currentTarget.dataset.item
				var self = this
				if (self.cancheck == 'all') {
					// self.checkeddays = [dateItem.dateStr]
				} else if (self.cancheck == 'month') {

				} else if (self.cancheck == 'checked') {
					var date = self.checkeddays.find((v, i) => {
						return v == dateItem.dateStr
					})
					if (date) {
						self.currDays.forEach((item, index) => {
							if (item.dateStr == dateItem.dateStr) {
								item.isChecked = true
							} else {
								item.isChecked = false
							}
						})
						self.checkday = dateItem.dateStr
					}
				}
			},
			handleScoreRecordClick() {
				uni.navigateTo({
					url: '../scorerecord/scorerecord'
				})
			}
		}
	}
</script>

<style scoped>
	.right {
		display: flex;
	}
	.actionView {
		/* padding: 50rpx; */
		width: 100%;
		text-align: center;
		margin-top: 62rpx;
		position: relative;
	}
	.actionView .tips {
		position: absolute;
		top: -132rpx;
		right: 0;
		width: 438rpx;
		height: 100rpx;
	}
	.actionView .tips .tipicon {
		margin-top: 34rpx;
		font-weight: 500;
		color: #D81E1F;
		line-height: 34rpx;
		font-size: 24rpx;
	}
	.actionView .tips image {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}
	
	.scoreView {
		margin-top: 26rpx;
		height: 48rpx;
		line-height: 48rpx;
		color: #352026;
		font-family: PingFangSC-Medium;
		font-size: 34rpx;
		font-weight: bold;
		text-align: center;
	}

	.actionView .action {
		display: inline-block;
		width: 240rpx;
		height: 240rpx;
		line-height: 240rpx;
		border-radius: 50%;
		background-color: #ff6867;
		color: #ffffff;
		font-family: PingFangSC-Medium;
		font-size: 42rpx;

		background: #D81E1F;
		box-shadow: 0 6rpx 12rpx 0 rgba(0,0,0,0.11);
	}

	.actionView .action.disabled {
		background-color: #dcdcdc;
		background-image: none;
		box-shadow: none;
	}

	.mydatepicker {
		height: 100%;
	}

	.mydatepicker .head {
		display: flex;
		height: 150rpx;
		line-height: 150rpx;
		padding: 0 42rpx;
	}

	.mydatepicker .head .title {
		flex: 1;
		text-align: left;
		font-weight: bold;
		font-size: 38rpx;
		font-family: PingFangSC-Medium;
		color: #352026;
	}

	.mydatepicker .head .prev {
		text-align: right;
		width: 60rpx;
	}

	.mydatepicker .head .next {
		text-align: right;
		width: 60rpx;
	}


	.mydatepicker .body {
		/* width: 100%; */
		width: 722rpx;
		height: 674rpx;
		margin: 0 auto;
		position: relative;
	}
	.mydatepicker .body image {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.mydatepicker .body .titleView {
		height: 68rpx;
		line-height: 68rpx;
		border-bottom: 1rpx solid #f4f4f4;
		padding: 0 20rpx;
	}

	.mydatepicker .body .titleView .title {
		display: flex;
		height: 42rpx;
		line-height: 42rpx;
		font-weight: bold;
		font-size: 30rpx;
		font-family: PingFangSC-Medium;
		color: #352026;
	}

	.mydatepicker .body .titleView .title view {
		flex: 1;
		text-align: center;
		height: 42rpx;
		line-height: 42rpx;
	}

	.mydatepicker .body .content {
		padding: 0 20rpx;
		min-height: 564rpx;
		position: relative;
		z-index: 100;
		padding-top: 152rpx;
	}

	.mydatepicker .body .content .item {
		display: inline-block;
		width: 14.1%;
		text-align: center;
		margin-bottom: 48rpx;
		font-size: 20rpx;
		font-weight: 500;
		color: rgba(0,0,0,.2);
	}
	.mydatepicker .body .content .item view {
		width: 40rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		background: rgba(0,0,0,.05);
		margin: 0 auto;
		border-radius: 50%;
	}

	/* .mydatepicker .body .content .item.prev {
		color: #80848f;
	}

	.mydatepicker .body .content .item.next {
		color: #80848f;
	} */

	.checked {
		color: #ffffff;
		display: inline-block;
		line-height: 36rpx !important;
		text-align: center;
		color: #D81E1F;
		background: rgba(237, 53, 53, 0.1) !important;
		border: 2rpx solid rgba(237, 53, 53, 0.6);
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
	}

	/** 包含 */
	.contain {
		color: #ffffff;
		background-color: #ff6867;
		border-radius: 50%;
		width: 64rpx;
		height: 64rpx;
		line-height: 64rpx;
		display: inline-block;
		text-align: center;
	}
</style>
