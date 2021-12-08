<template>
	<TopNavbar bg='#f7f7f7'>
		<view style="padding-bottom: 100rpx;">
			<view class="questionView">
				<view class="headView">
					<image class="red-block" src="../../static/icon/icon_red_block.png"></image>
					<view v-if="questionDetail.type==1" class="queType">单选题</view>
					<view v-if="questionDetail.type==2" class="queType">多选题</view>
					<view v-if="questionDetail.type==3" class="queType">填空题</view>
					<view v-if="questionDetail.type==4" class="queType">多项选择题</view>
					<view class="countView"></view>
				</view>
				<view class="imgView">
					<view class="imgItem" v-for="img in questionDetail.images">
						<image v-if="img"  mode="widthFix" :src="img"></image>
						<view class="vtips">{{version}}</view>
					</view>
				</view>
				<view class="title" v-if="questionDetail.type==3" style="margin-bottom: 20rpx;">
					<block v-for="(c,i) in questionDetail.cinputs" :key="i">{{c}}
						<view v-if="i!=questionDetail.cinputs.length-1" :class="'txt '+ (options[i].state==1?'success':'error')">{{options[i].content}}</view>
					</block>
				</view>
				<view class="title" v-else-if="questionDetail.type==4">
					<block v-for="(c,i) in questionDetail.cinputs" :key="i">{{c}}<text v-if="i<questionDetail.cinputs.length-1">({{i+1}})</text></block>
				</view>
				<view class="title" v-else>{{questionDetail.title}}</view>
				<view class="options" v-if="questionDetail.type==1||questionDetail.type==2">
					<my-radio-group :disabled="true" :options="options" :type="questionDetail.type==1?'radio':'check'" @change="handleChooseOption"></my-radio-group>
				</view>
				<view class="options" v-if="questionDetail.type==4">
					<view class="multisCheckView" v-for="(_option,_index) in options">
						<view class="head">({{_index + 1}})</view>
						<view class="content">						
							<my-radio-group :disabled="true" :options="_option.options" :index="_index" type="radio" @change="handleChooseMultisOption"></my-radio-group>
						</view>
					</view>
				</view>
			</view>
			<view :class="'commentView ' + ((!isShowComments&&!hasBuyedComments)?'needbuy':'')">
				<view class="bg" v-if="!isShowComments&&!hasBuyedComments">
					<image src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/dajxbg1.png"></image>
				</view>
				<view style="position: relative;padding: 60rpx 70rpx;width: 100%;" :class="((!isShowComments&&!hasBuyedComments)?'':'htmlView')">
					<view v-if="questionDetail.type==3||questionDetail.type==4" class="rightAnswer">正确答案：
						<text style="margin-right: 10rpx;" v-for="s in options">{{s.rightAnswer}}</text>
					</view>
					<view v-else class="rightAnswer">正确答案：<text v-for="s in options">{{s.value=='1'?s.code:''}}</text></view>
					<view class="comment">
						<view v-if="isShowComments">
							<view class="accuracy" style='display: flex;;'>
								<view :class="'apercent ' + (questionDetail.aPercent>=percentH?'h':(questionDetail.aPercent>=percentM&&questionDetail.aPercent<percentH?'m':'l'))">
									<view class="icon">
										<image v-if="questionDetail.aPercent>=percentH" src="../../static/icon/icon_percent_h.png"></image>
										<image v-if="questionDetail.aPercent>=percentM&&questionDetail.aPercent<percentH" src="../../static/icon/icon_percent_m.png"></image>
										<image v-if="questionDetail.aPercent<percentM" src="../../static/icon/icon_percent_l.png"></image>
									</view>
									<view style="flex: 1;">全民正确率：{{questionDetail.aPercent}}%</view>
								</view>
								<view v-if="questionDetail.aPercent>=percentH" class="atips">此为送分题，且行且珍惜。</view>
								<view v-if="questionDetail.aPercent>=percentM&&questionDetail.aPercent<percentH" class="atips">有些人做错了，但愿不是你。</view>
								<view v-if="questionDetail.aPercent<percentM" class="atips">大家都错了也不是你做错的理由。</view>
							</view>
							<u-parse :html="questionDetail.comments?questionDetail.comments:'暂无解析'"></u-parse>
						</view>
						<view v-else>
							<view v-if="!hasBuyedComments">
								<view class="accuracy" style="margin: 0;">全民正确率：解锁试题解析可见</view>
								<view  style="text-align: center;margin-top: 120rpx;">
									<button class="btnComments" type="default" @click="handleBuyComments">
										<image src="../../static/icon/icon_lock.png" style="width: 32rpx;height: 32rpx;display: inline-block;vertical-align: middle;"></image>
										<view style="text-indent: 20rpx;display: inline-block;">解锁试题解析</view>
									</button>
								</view>
							</view>
							<view v-else>
								<view class="accuracy" style='display:flex;'>
									<view :class="'apercent ' + (questionDetail.aPercent>=percentH?'h':(questionDetail.aPercent>=percentM&&questionDetail.aPercent<percentH?'m':'l'))">
										<view class="icon">
											<image v-if="questionDetail.aPercent>=percentH" src="../../static/icon/icon_percent_h.png"></image>
											<image v-if="questionDetail.aPercent>=percentM&&questionDetail.aPercent<percentH" src="../../static/icon/icon_percent_m.png"></image>
											<image v-if="questionDetail.aPercent<percentM" src="../../static/icon/icon_percent_l.png"></image>
										</view>
										<view style="flex: 1;">全民正确率：{{questionDetail.aPercent}}%</view>
									
									</view>
									<view v-if="questionDetail.aPercent>=percentH" class="atips">此为送分题，且行且珍惜。</view>
									<view v-if="questionDetail.aPercent>=percentM&&questionDetail.aPercent<percentH" class="atips">有些人做错了，但愿不是你。</view>
									<view v-if="questionDetail.aPercent<percentM" class="atips">大家都错了也不是你做错的理由。</view>
								
								</view>
								<u-parse :html="questionDetail.comments?questionDetail.comments:'暂无解析'"></u-parse>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-popup v-model="isShowCommentBuy" height="680rpx" :closeable="true" mode="bottom" border-radius="40">
			<view class="buylView" style="padding:74rpx 40rpx;">
				<view class="title">{{dajxConfig.action}}</view>
				<view class="price">¥{{dajxConfig.price}}</view>
				<view class="tips">
					您购买的商品为虚拟内容服务，购买后不支持退订、转让、退换，请酌情确认。
				</view>
				<view class="tips">
					购买后可在【个人中心-已购项目】中查看
				</view>
				<view class="btnActions">
					<button @click="handleBuyCommentsBtnClick">确认购买</button>
				</view>
			</view>
		</u-popup>
	</TopNavbar>
</template>

<script>
	import TopNavbar from '@/components/navBar/topNavbar.vue'
	import myRadioGroup from '../../components/myRadio/myRadioGroup.vue'
	import { dateFormat, toDateFromString,addMonths, addDays, addSeconds, GetRandomNum } from '../../js/common.js'
	export default {
		components:{
			myRadioGroup, TopNavbar
		},
		data() {
			return {
				index: 0, // 当前答题序号
				count:0, // 总题数
				options: [],
				isShowComments: true, // 是否显示答案解析
				currAnswer:[], // 当前答案
				screenWidth: 0,
				inputHeight:328, // 软键盘高度
				userInfo: null,
				testHisId:'',
				testHisDetail: null,
				questionId: '',
				questionDetail: null,
				
				answers:[],
				questions:[],
				dajxConfig: null, // 答案解析配置
				hasBuyedComments: false, // 是否购买了答案解析
				isShowCommentBuy: false,
				version: '',
				percentH: 0,
				percentM: 0,
			}
		},
		onLoad(options) {
			var self = this
			if(options.tid){
				this.testHisId = options.tid
				this.index = parseInt(options.index)
				this.bindTestHisDetail()
			}
			uni.getStorage({
				key:'userInfo',
				success: res => {
					this.userInfo = res.data
					self.bindCommentsOrder()
				}
			})
			uni.getSystemInfo({
			  success: res => {
				console.log(res)
				self.screenWidth = res.screenWidth
			  }
			})

			self.Parse.Config.get().then(_config=>{
				self.version = _config.get('version')
				self.percentH = _config.get('percentH')
				self.percentM = _config.get('percentM')
			})
		},
		methods: {
			/*加载考试详情*/
			bindTestHisDetail(){
				var self = this
				var query = new this.Parse.Query("TestHistory")
				query.get(this.testHisId).then(res=>{
					self.testHisDetail = res
					self.questions = res.get('questions')
					self.answers = res.get('answers')
					self.bindQuestion()
				})
			},
			/* 判断当前是否显示答案解析 */
			existsQuestiionComments(question){
				var self = this
				var subjects = question.subjects
				if(subjects && subjects.length > 0){
					var query = new this.Parse.Query("Subjects")
					query.containedIn('objectId', JSON.parse(JSON.stringify(subjects)))
					query.greaterThan('price', 0)
					query.first().then(res=>{
						if(res) {
							self.isShowComments = false
						} else {
							self.isShowComments = true
						}
					})
				} else {
					self.isShowComments = false
				}
			},
			handleBuyComments(){
				var self = this
				uni.navigateTo({
					url:'/pages/buy/buy?subjectId=' + this.dajxConfig.id,
					event:{
						reloadOrder: function(data){
							self.bindCommentsOrder()
						}
					}
				})
			},
			/*查询是否已经购买了答案解析*/
			bindCommentsOrder(){
				var self = this
				var app = getApp()
				self.dajxConfig = app.globalData.dajxConfig // 答案解析配置
				if(self.dajxConfig.get('isNeedPay') == 1 && self.dajxConfig.get('price') > 0) { // 需要支付
					var query = new self.Parse.Query("Order")
					query.equalTo('openId', self.userInfo.openid)
					query.contains('subjectId', self.dajxConfig.id)
					query.equalTo('state', 1)
					query.first().then(res=>{
						if(res){
							self.hasBuyedComments = true // 已经购买了答案解析
						}
					})
				}
			},
			/*加载题目*/
			bindQuestion(){
				var self = this
				var query = new this.Parse.Query("TestQuestions")
				let id = self.questions[self.index]
				// query.equalTo('id', id)
				query.get(id).then(res=>{
					if(res){
						var quesItem = JSON.parse(JSON.stringify(res))
						self.existsQuestiionComments(quesItem)
						if(quesItem.type == 3){
							quesItem.cinputs= quesItem.title.split('____')
						}
						if(quesItem.type == 4){
							quesItem.cinputs= quesItem.title.split('()')
						}
						quesItem.aPercent =  quesItem.accuracy?(quesItem.accuracy*100).toFixed(2):'0'
						self.questionDetail = quesItem
						let _options = self.answers[self.index].options
						_options.forEach((_itm,_idx)=>{
							if(quesItem.type == 3){
								_itm.content = self.answers[self.index].answer[_idx]
							} else {
								self.currAnswer = self.answers[self.index]
							}
						})
						self.options =  _options
						self.calcResult()
					}
				})
			},
			calcResult(){
				var self = this
				let _examOptions = self.options
				if(this.questionDetail.type == 3) {
					this.options.forEach(item=>{
						var answer = item.value.find(t=>{
							return t.txt == item.content
						})
						if(!answer) { // 错误
							item.state = 2
						} else {
							item.state = 1
						}
						let _currTxt = ''
						item.value.forEach((t,i)=>{
							if(i > 0) {
								_currTxt+=t.txt
								if(i!=item.value.length-1){
									_currTxt+='|'
								}
							} 
						})
						item.rightAnswer = item.value[0].txt + (item.value.length > 1 ? ('(备选：' + _currTxt + ')'):'') + ' '
					})
				} else if(this.questionDetail.type == 4){
					self.options.forEach((_option,_index)=>{
						_option.options.forEach((item)=>{
							var choose = self.currAnswer.answer[_index] == item.code
							if((item.value == '0'|| item.value == '') && choose) { // 选中错误答案
								item.state = 4
							} else if(item.value == '1'&& choose) { // 选中正确答案
								item.state = 6
							} else if(item.value == '1'&& !choose){ // 未选中正确答案
								item.state = 5
							} else { // 未选中的错误答案
								item.state = 3
							}
						})
					})
				} else {
					this.options.forEach((item)=>{
						var choose = self.currAnswer.answer.find(function(t){
							return t == item.code
						})
						if((item.value == '0'|| item.value == '') && choose) { // 选中错误答案
							item.state = 4
						} else if(item.value == '1'&& choose) { // 选中正确答案
							item.state = 6
						} else if(item.value == '1'&& !choose){ // 未选中正确答案
							item.state = 5
						} else { // 未选中的错误答案
							item.state = 3
						}
					})
				}
			},
		}
	}
</script>


<style>
	page{
		background-color: #fbfbfb;
	}
	
	.tabView{
		padding: 20rpx 24rpx 0rpx 24rpx;
		display: flex;
		position: relative;
	}
	.tabView .tabItem{
		flex: 1;
		text-align: center;
	}
	.tabView .tabItem .title{
		font-stretch: normal;
		letter-spacing: 0rpx;
		height: 34rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #000000;
		line-height: 34rpx;
		margin-bottom: 2rpx;
	}
	.tabView .tabItem.curr .title{
		color: #D81E1F;
	}
	.tabView .tabItem.curr .line{
		width: 48rpx;
		height: 4rpx;
		background: #D81E1F;
		border-radius: 2rpx;
		margin: auto;
	}
	.tabView .clip-line{
		position: absolute;
		width: 702rpx;
		height: 1rpx;
		background: #000000;
		opacity: 0.1;
		bottom: 2rpx;
	}
	.tabView .tabItem .icon{
		width: 52rpx;
		height: 8rpx;
		text-align: center;
		display: inline-block;
		position: relative;
		top: -16rpx;
	}
	.tabView .tabItem .icon image{
		width: 52rpx;
		height: 8rpx;
		display: inline-block;
		vertical-align: middle;
		position: absolute;
		left: 0;
	}
	.buytipsView{
		background-color: #ffb8b7;
		height: 72rpx;
		line-height: 72rpx;
	}
	.buytipsView .tipView{
		display: flex;
		padding: 0 36rpx;
	}
	.buytipsView .tipView .txt{
		flex: 1;
		font-size: 26rpx;
		font-family: PingFangSC-Medium;
		color: #ffffff;
	}
	.buytipsView .tipView .icon{
		width: 50rpx;
		text-align: right;
	}
	.questionView{
		margin-top: 42rpx;
		background: #FAFAFA;
		/* padding-bottom: 200rpx; */
	}
	.questionView .headView{
		display: flex;
		padding-left:36rpx;
		padding-right:30rpx;
	}
	.questionView .headView .red-block{
        width: 10rpx;
		height: 24rpx;
		position: relative;
		margin-right: 8rpx;
		margin-top: 10rpx;
	}
	.questionView .headView .queType{
		flex: 1;
		height: 40rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #000000;
		line-height: 40rpx;
	}
	.questionView .headView .countView{
		/* width: 150rpx; */
		text-align: right;
		display: inline-flex;
		height: 40rpx;
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(0,0,0,0.5);
		line-height: 40rpx;
	}
	.questionView .headView .countView .prev{
		width: 30rpx;
		height: 30rpx;
		line-height: 40rpx;
		font-size: 0;
		text-align: left;
	}
	.questionView .headView .countView .prev image{
		width: 30rpx;
		height: 30rpx;
		display: inline-block;
		vertical-align: middle;
	}
	.questionView .headView .countView .process{
       margin:0 12rpx;
	}
	.questionView .headView .countView .next{
		width: 30rpx;
		height: 30rpx;
		line-height: 40rpx;
		font-size: 0;
		text-align: right;
	}
	.questionView .headView .countView .next image{
		width: 30rpx;
		height: 30rpx;
		display: inline-block;
		vertical-align: middle;
	}
	.questionView .imgView{
		margin-top: 32rpx;
		padding: 0 48rpx;
	}
	.questionView .imgView image{
		width: 100%;
	}
	.questionView .title{
		padding: 0 48rpx;
		margin-top: 24rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #000000;
		line-height: 70rpx;
	}
	.questionView .title .tips{
		display: inline;
		font-size: 26rpx;
		color: rgb(53,32,38,0.4);
		font-size: PingFangSC-Medium;
		line-height: 80rpx;
	}
	.questionView .title .inputTxt{
		border: 2rpx solid #e3e3e3;
		border-radius: 20rpx;
		background-color: #FFFFFF;
		height: 64rpx;
		line-height: 60rpx;
		max-width: 630rpx;
		min-width: 80rpx;
		width: 80rpx;
		padding: 0 30rpx;
		display: inline-block;
		margin: 0 20rpx;
		vertical-align: middle;
		font-size: 34rpx;
		font-weight: normal;
		color: #352026;
		font-size: PingFangSC-Medium;
	}
	.questionView .title .txt{
		border: 2rpx solid #e3e3e3;
		border-radius: 20rpx;
		background-color: #FFFFFF;
		height: 52rpx;
		line-height: 50rpx;
		padding: 0 0rpx;
		display: inline-block;
		margin: 0 4rpx;
		vertical-align: middle;
		font-size: 34rpx;
		font-weight: normal;
		color: #352026;
		font-size: PingFangSC-Medium;
		border-radius: 20rpx;
		text-align: center;
	}
	.questionView .title .txt.success{
		color: #32CD72;
		// width: 52rpx;
		height: 52rpx;
		background: rgba(50, 205, 114, 0.15);
		border-radius: 8rpx;
		border: 2rpx solid rgba(50, 205, 114, 0.29);
	}
	.questionView .title .txt.error{
		color: #fa5151;
		// width: 52rpx;
		height: 52rpx;
		background-color: #ffe8e8;
		border-radius: 8rpx;
		border: 2rpx solid #ffdfdf;
	}
	.questionView .options{
		padding: 20rpx 0rpx;
	}
	.actionView{
		/* margin-top: 50rpx; */
		width: 100%;
		padding: 30rpx;
		height: 140rpx;
		position: fixed;
		bottom: 0;
		padding-top: 8rpx;
		background-color: #fbfbfa;
	}
	.actionView button{
		width: 100%;
		height: 92rpx;
		border-radius: 46rpx;
		background-color: #ED3535;
		color: #ffffff;
		font-family: PingFangSC-Medium;
		font-size: 34rpx;
		border: 0;
	}
	.actionView button::after{
		border: 0;
	}
	.actionView button.noAnswer{
		opacity: 0.4;
		background-color: #ED3535;
	}
	.actionView button.hasAnswer{
		background-color: #ED3535;
	}
	.commentView{
		/* background-color: #FFFFFF; */
		border-radius: 46rpx;
		padding: 38rpx 48rpx;
		/* margin-top: 10rpx; */
		/* margin-bottom: 196rpx; */
		min-height: 572rpx;
	}
	.htmlView{
		background-color: #FFFFFF;
		padding: 36rpx 36rpx!important;
        box-shadow: 0rpx 0rpx 12rpx 0rpx rgba(0,0,0,0.09);
		border-radius: 26rpx;
	}
	.commentView.needbuy{
		padding: 0;
		position: absolute;
		width: 702rpx;
		left: 24rpx;
		background-color: unset;
	}
	.needbuy .bg{
		position: absolute;
		width: 702rpx;
		height: 572rpx;
	}
	.needbuy .bg image{
		width: 100%;
		height: 572rpx;
	}
	
	.commentView .rightAnswer{
		margin-right: 10rpx;
		min-height: 44rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #000000;
		line-height: 44rpx;
	}
	.commentView .comment{
		font-size: 26rpx;
		line-height: 42rpx;
		font-family: PingFangSC-Medium;
		font-weight: normal;
		font-stretch: normal;
		line-height: 54rpx;
		letter-spacing: 0rpx;
		color: #352026;
		margin-top: 14rpx;
	}
	.commentView .comment .accuracy{
		letter-spacing: 0rpx;
		color: rgba(0, 0, 0, 0.7);
		margin: 16rpx 0 36rpx 0;
		height: 40rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		line-height: 40rpx;
	}
	.commentView .comment .accuracy .apercent{
		height: 40rpx;
		line-height: 40rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-size: 28rpx;
		font-weight: 400;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: rgba(76, 192, 143, 0.95);
		display: flex;
	}
	.commentView .comment .accuracy .apercent .icon{
		width: 40rpx;height: 42rpx;line-height: 42rpx;font-size: 0;
	}
	.commentView .comment .accuracy .apercent.h{
		color: rgba(76, 192, 143, 0.95);
	}
	.commentView .comment .accuracy .apercent.m{
		color: #fbb955;
	}
	.commentView .comment .accuracy .apercent.l{
		color: #ED3535;
		opacity: 0.7;
	}
	.commentView .comment .accuracy .apercent image{
		width: 32rpx;
		height: 32rpx;
		display: inline-block;
		vertical-align: middle;
	}
	.commentView .comment .accuracy .atips{
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: rgba(0, 0, 0, 0.4);
		height: 26rpx;
		font-size: 18rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		margin-top:12rpx;
		line-height: 26rpx;
		text-align: right;
		flex: 1;
	}
	.actionView button.next{
		background-color: #FFFFFF;
		border: 2px solid #D81E1F;
		font-family: PingFangSC-Semibold, PingFang SC;
		color: #D81E1F;
	}
	.actionView .btnGroup{
		background-color: #FFFFFF;
		border: 2px solid #D81E1F;
		color: #D81E1F;
		height: 92rpx;
		line-height: 92rpx;
		border-radius: 46rpx;
		display: flex;
		font-size: 34rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
	}
	.actionView .btnGroup .prev{
		display: inline-block;
		vertical-align: middle;
		margin: auto 0;
		width: 200rpx;
		margin-left: 30rpx;
		background-color:#ffffff;
		border: 0;
		border-radius: 0;
		border-right: 1px solid rgba(216,30,31,0.3);
		color: #D81E1F;
		height: 48rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		opacity: 0.8;
		line-height: 48rpx;
	}
	.actionView .btnGroup .next{
		display: inline-block;
		vertical-align: middle;
		margin: auto 0;
		flex: 1;
		border: 0;
		color: #D81E1F;
		height: 48rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		opacity: 0.8;
		line-height: 48rpx;
	}
	.actionView .btnGroup .prev.disable,.actionView .btnGroup .next.disable{
		color: rgba(0, 0, 0, 0.3);
	}
	.buylView {
		width: 100%;
	}
	.buylView .title{
		font-size: 38rpx;
		font-weight: bold;
		font-family: PingFangSC-Medium;
		color: #352026;
	}
	.buylView .price{
		font-size: 34rpx;
		margin-top: 12rpx;
		font-family: PingFangSC-Medium;
		color: #ed3535;
	}
	.buylView .tips{		
		font-size: 26rpx;
		margin-top: 54rpx;
		font-family: PingFangSC-Medium;
		color: rgba(53,32,38,0.4);
	}
	.buylView .btnActions{
		margin-top: 96rpx;
	}
	.buylView .btnActions button{
		width: 100%;
		height: 92rpx;
		border-radius: 46rpx;
		background-color: #ED3535;
		color: #ffffff;
		font-family: PingFangSC-Medium;
		font-size: 34rpx;
	}
	.btnComments{
		display: inline-block;
		font-size: 24rpx;
		font-weight: 400;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #000000!important;
		width: 254rpx;
		height: 62rpx;
		background-color: #FFFFFF!important;
		border-radius: 31rpx;
        font-family: PingFangSC-Regular, PingFang SC;
	}
	.btnComments::after{
		border: 0;
	}
	.vtips{
		text-align: right;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: rgba(0,0,0, 0.7);
		font-size: 18rpx;
		font-family: PingFangSC-Light, PingFang SC;
		font-weight: 300;
		line-height: 26rpx;
	}
	.imgView .imgItem{
		margin-bottom: 20rpx;
	}
	.head {
		padding-left: 36rpx;
		padding-top: 20rpx;
	}
</style>
