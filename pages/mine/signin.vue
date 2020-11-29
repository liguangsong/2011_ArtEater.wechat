<template>
	<view>
		<view class="scoreView">
			当前积分：{{userInfo.score}}
		</view>
		<view class="actionView">
			<view v-if="isNeedSign" @click="handleSign" class="action">签到</view>
			<view v-else class="action">已签到</view>
		</view>
		<view class="mydatepicker">
		  <view class="head">
			<view class="prev" @click="handlePrev">
			  prev
			</view>
			<view class="title">
			  <picker mode="date" :value="date" fields="month" :end="endtDate">
				<view class="picker">
				  {{dateStr}}
				</view>
			  </picker>
			</view>
			<view class="next" @click="handleNext">
			  next
			</view>
		  </view>
		  <view class="body">
			<view class="title">
			  <view>日</view>
			  <view>一</view>
			  <view>二</view>
			  <view>三</view>
			  <view>四</view>
			  <view>五</view>
			  <view>六</view>
			</view>
			<view class="content">
			  <view v-for="item in prevDays" class="item prev">{{item.text}}</view>
			  <view v-for="item in currDays" class="item">
				<view @click="handleClickItem" :data-item="item" :class="(item.isContain?'contain':'') + (item.isChecked?' checked':'')">{{item.text}}</view>
			  </view>
			  <view v-for="item in nextDays"class="item next">{{item.text}}</view>
			</view>
		  </view> 
		</view>
	</view>
</template>
<script>
	import { dateFormat, toDateFromString,addMonths, addDays, addSeconds, GetRandomNum } from '../../js/common.js'
	export default {
		data() {
			return {
				userInfo:{},
				date:'',
				checkday:'',
				checkeddays:[],
				cancheck:'all',
				startDate: '',
				endDate: '',
				prevDays: [],
				currDays: [],
				nextDays: [],
				dateStr:'',
				isNeedSign: true
			}
		},
		onLoad() {
			var self = this
			this.date= dateFormat(new Date(),'yyyy-MM-dd')
			this.startDate = dateFormat(new Date(),'yyyy-MM-dd')
			this.endDate = dateFormat(addDays(new Date(),365),'yyyy-MM-dd')
			uni.getStorage({
				key:'userInfo',
				success: res => {
					this.userInfo = res.data
					this.bindSignInHistory()
				}
			})
			this.build()
			uni.loadFontFace ({
			  family: 'PingFangSC-Medium',
			  source: 'url("https://www.aoekids.cn/font/PingFangSCMedium.ttf")',
			  success: function(){
				  console.log('load font success')
			  }
			})
		},
		watch:{
			checkeddays(val){
				this.prevDays.forEach((item)=>{
					var date = val.find(t=>{
						return t == item.dateStr
					})
					if(date){
						item.isChecked = 'checked'
					} else {
						item.isChecked = ''
					}
				})
				this.currDays.forEach((item)=>{
					var date = val.find(t=>{
						return t == item.dateStr
					})
					if(date){
						item.isChecked = 'checked'
					} else {
						item.isChecked = ''
					}
				})
			}
		},
		methods: {
			/* 查询签到记录 */
			bindSignInHistory(){
				var self = this
				var today = dateFormat(new Date(), 'yyyy-MM-dd')
				var signInQuery = new this.Parse.Query("SignInHistory")
				signInQuery.equalTo("openid", this.userInfo.openid)
				signInQuery.find().then(res=>{
					if(res.length > 0) {
						res.forEach((date)=>{
							if(today == dateFormat(date.createdAt,'yyyy-MM-dd')){ // 今天已打卡
								self.isNeedSign = false
							}
							self.checkeddays.push(dateFormat(date.createdAt,'yyyy-MM-dd'))
						})
					}
				})
			},
			/*签到*/
			handleSign(){
				var self = this
				var dbHistory = this.Parse.Object.extend("SignInHistory")
				var _history = new dbHistory()
				_history.set('openid', this.userInfo.openid)
				_history.save().then(his => {
					var dbUserInfo = self.Parse.Object.extend("UserInfo")
					var user = new dbUserInfo()
					user.set('id',self.userInfo.objectId)
					let score = 0
					if(self.userInfo.score){
						user.set('score', self.userInfo.score + 10)
					} else {
						user.set('score', 10)
					}
					user.save().then(ures => {
						self.userInfo.score = ures.get('score')
						uni.setStorage({
							key: 'userInfo',
							data: self.userInfo
						})
						self.bindSignInHistory()
						console.log('保存成功')
					})
				},(error)=>{
					console.log(error)
				})
			},
			build(){
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
						self.prevDays.push({
							text: currDate.getDate(),
							date: currDate,
							dateStr: dateFormat(currDate, 'yyyy-MM-dd')
						})
						currDate = addDays(currDate, 1)
					}
				}
				/** 开始处理当前月份的数据 */
				var currDate = startDate;
				while (currDate <= endDate) {
					var hasCheckday = self.checkeddays.find(function (v, i) {
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
				  self.nextDays.push({
					text: currDate.getDate(),
					date: currDate,
					dateStr: dateFormat(currDate, 'yyyy-MM-dd')
				  })
				  currDate = addDays(currDate, 1)
				}
			  }
			},
			handlePrev(){
			  var self = this
			  self.date = dateFormat(addMonths(toDateFromString(self.date),-1), 'yyyy-MM-dd');
			  this.build()
			},
			handleNext(){
			  var self = this
			  self.date = dateFormat(addMonths(toDateFromString(self.date), 1), 'yyyy-MM-dd');
			  this.build()
			},
			handleClickItem(e){
			  var dateItem = e.currentTarget.dataset.item
			  var self = this
			  if(self.cancheck == 'all'){
				self.checkeddays = [dateItem.dateStr]
			  } else if(self.cancheck == 'month'){

			  } else if(self.cancheck == 'checked'){
				var date = self.checkeddays.find((v,i)=>{
				  return v == dateItem.dateStr
				})
				if(date){
				  self.currDays.forEach((item,index)=>{
					if (item.dateStr == dateItem.dateStr){
					  item.isChecked = true
					} else{
					  item.isChecked = false
					}
				  })
				  self.checkday = dateItem.dateStr
				}
			  }
			}
		}
	}
</script>

<style>
	.scoreView{
		padding: 50rpx 36rpx;
	}
	.actionView{
		padding: 50rpx;
		width: 100%;
		text-align: center;
	}
	.actionView .action{
		display: inline-block;
		width: 200rpx;
		height: 200rpx;
		line-height: 200rpx;
		border-radius: 50%;
		background-color: #4CD964;
		color: #ffffff;
	}
	.mydatepicker{
	  height: 100%;
	  padding: 0 20rpx;
	}
	.mydatepicker .head{
	  display: flex;
	  height: 50rpx;
	  line-height: 50rpx;
	}
	.mydatepicker .head .prev{
	  text-align: center;
	  width: 14.2%;
	}
	.mydatepicker .head .title{
	  flex: 1;
	  text-align: center;
	  font-weight: bold;
	}
	.mydatepicker .head .next{
	  text-align: center;
	  width: 14.2%;
	}
	
	
	.mydatepicker .body{
	  width: 100%;
	}
	.mydatepicker .body .title{
	  display: flex;
	  height: 50rpx;
	  line-height: 50rpx;
	  color: #80848f;
	}
	.mydatepicker .body .title view{
	  flex: 1;
	  text-align: center;
	}
	.mydatepicker .body .content .item{
	 display: inline-block;
	 width: 14.2%;
	 height: 60rpx;
	 line-height: 60rpx;
	 text-align: center;
	 font-weight: bold;
	 font-size: 30rpx;
	}
	.mydatepicker .body .content .item.prev{
	  color:#80848f;
	}
	.mydatepicker .body .content .item.next{
	  color:#80848f;
	}
	.checked{
	  color: #ffffff;
	  background-color: #495060!important;
	  border-radius: 50%;
	  width: 50rpx;
	  height: 50rpx;
	  display: inline-block;
	  text-align: center;
	}
	/** 包含 */
	.contain{
	  color: #ffffff;
	  background-color: #2b85e4;
	  border-radius: 50%;
	  width: 50rpx;
	  height: 50rpx;
	  line-height: 50rpx;
	  display: inline-block;
	  text-align: center;
	}
</style>
