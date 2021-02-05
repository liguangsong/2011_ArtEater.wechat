<template>
	<view>
		<view style="padding-bottom: 200rpx;">
			<view v-if="count==0" style="text-align: center;">
				<u-empty text="网络不理想，请耐心等待" mode="data"></u-empty>
			</view>
			<view v-else class="questionView">
				<view class="headView">
					<view v-if="questionDetail.type==1" class="queType">单选题</view>
					<view v-if="questionDetail.type==2" class="queType">多选题</view>
					<view v-if="questionDetail.type==3" class="queType">填空题</view>
					<view v-if="questionDetail.type==4" class="queType">多项选择题</view>
					<view class="countView">{{index}}/{{count}}</view>
				</view>
				<view class="imgView">
					<view class="imgItem" v-for="img in questionDetail.images">
						<image v-if="img"  mode="widthFix" :src="img"></image>
						<view class="vtips">{{version}}</view>
					</view>
				</view>
				<!-- <view class="title">世纪巴洛克时代的美术风格要点分析世纪巴洛克时代的美术风格要点分析世纪巴洛克时代的美术风格要点分析<input @focus="inputFocus" @blur="inputBlur" type="text" class="inputTxt" />格要点分析</view> -->
				<view class="title" v-if="questionDetail.type==3" style="margin-bottom: 20rpx;">
					<block v-for="(c,i) in questionDetail.cinputs" :key="i">{{c}}
						<block v-if="hasSubmit">
							<view v-if="i!=questionDetail.cinputs.length-1" :class="'txt '+ (options[i].state==1?'success':'error')">{{options[i].content}}</view>
						</block>
						<block v-else>
							<input v-if="i!=questionDetail.cinputs.length-1" :style="{width: (options[i].value[0].txt.length * 34 + 60) + 'rpx;'}" :data-index="i" @input="handleAnswerChange" @focus="inputFocus" @blur="inputBlur" type="text" class="inputTxt" />
							<view v-if="i!=questionDetail.cinputs.length-1" class="tips">{{options[i].value[0].txt.length}}个字</view>
						</block>
					</block>
				</view>
				<view class="title" v-else-if="questionDetail.type==4">
					<block v-for="(c,i) in questionDetail.cinputs" :key="i">{{c===''?' ':c}}<text v-if="i<questionDetail.cinputs.length-1">({{i+1}})</text></block>
				</view>
				<view class="title" v-else>{{questionDetail.title}}</view>
				<view class="options" v-if="questionDetail.type==1||questionDetail.type==2">
					<my-radio-group :disabled="hasSubmit" :options="options" :type="questionDetail.type==1?'radio':'check'" @change="handleChooseOption"></my-radio-group>
				</view>
				<view class="options" v-if="questionDetail.type==4">
					<view class="multisCheckView" v-for="(_option,_index) in options">
						<view class="head">({{_index + 1}})</view>
						<view class="content">						
							<my-radio-group :disabled="hasSubmit" :options="_option.options" :index="_index" type="radio" @change="handleChooseMultisOption"></my-radio-group>
						</view>
					</view>
				</view>
			</view>
			<view :class="'commentView ' + ((!isShowComments&&!hasBuyedComments)?'needbuy':'')" v-if="hasSubmit">
				<view class="bg" v-if="!isShowComments&&!hasBuyedComments">
					<image src="../../static/dajxbg.png"></image>
				</view>
				<view style="position: relative;padding: 60rpx 70rpx;width: 100%;" :class="((!isShowComments&&!hasBuyedComments)?'':'htmlView')">
					<view v-if="questionDetail.type==3||questionDetail.type==4" class="rightAnswer">正确答案：
						<view style="display:inline-block;margin-right: 10rpx;" v-for="s in options">{{s.rightAnswer}}</view>
					</view>
					<view v-else class="rightAnswer">正确答案：<text v-for="s in options">{{s.value=='1'?s.code:''}}</text></view>
					<view class="comment">
						<view v-if="isShowComments">
							<view class="accuracy">
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
								<view v-if="questionDetail.aPercent<percentM" class="atips">记住：大家都错了也不是你做错的理由。</view>
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
								<view class="accuracy">
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
									<view v-if="questionDetail.aPercent<percentM" class="atips">记住：大家都错了也不是你做错的理由。</view>
								</view>
								<u-parse :html="questionDetail.comments?questionDetail.comments:'暂无解析'"></u-parse>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="count > 0" class="actionView">	
			<button v-if="!hasSubmit" @click="handleSubmit" :class="canSubmit?'hasAnswer':'noAnswer'">确认提交</button>
			<button v-if="hasSubmit && index < count" @click="handleNext" class="next">下一题</button>
			<button v-if="hasSubmit && index == count" @click="handleHome" class="next">完成</button>
		</view>
		<!-- <u-popup v-model="isShowCommentBuy" height="680rpx" :closeable="true" mode="bottom" border-radius="40">
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
		</u-popup> -->
	</view>
</template>

<script>
	import myRadioGroup from '../../components/myRadio/myRadioGroup.vue'
	export default {
		components:{
			myRadioGroup
		},
		data() {
			return {
				// begin: new Date(),
				// end: new Date(),
				index: 1, // 当前序号
				count:0, // 总题数
				isShowComments: true, // 是否显示答案解析
				options: [],
				currAnswer:[], // 当前答案
				hasSubmit: false,
				canSubmit: false,
				screenWidth: 0,
				inputHeight:328, // 软键盘高度
				userInfo: null,
				questionDetail: null,
				currnote:null,
				notes:[],
				dajxConfig: null, // 答案解析配置
				hasBuyedComments: false, // 是否购买了答案解析
				isShowCommentBuy: true,
				allQuestions:[],
				version: '',
				percentH: 0,
				percentM: 0,
			}
		},
		onLoad(options) {
			var self = this
			uni.getStorage({
				key:'userInfo',
				success: res => {
					this.userInfo = res.data
					uni.showLoading()
					if(options.y){
						let start = new Date(options.y, options.m, options.d, 0, 0, 0)
						let end = new Date(options.y, options.m, options.d, 23, 59, 59)
						let eQuery = new self.Parse.Query("QuestReport");
						eQuery.equalTo('date', (options.y+'-'+options.m+'-'+options.d))
						// eQuery.equalTo('result', false)
						eQuery.descending('accuracy') // 错误率从大到小排序
						eQuery.limit(10)
						eQuery.find().then(res=>{
							debugger
							let ids = []
							res.forEach(t=>{
								ids.push(t.get('questionId'))
							})
							if(ids.length>0){
								self.allQuestions = ids
								self.bindQuestion()
							} else {
								uni.hideLoading()
							}
						})
						self.bindCommentsOrder()
					}
				}
			})
			uni.getSystemInfo({
			  success: res => {
				console.log(res)
				self.screenWidth = res.screenWidth
			  }
			})

			uni.loadFontFace ({
			  family: 'PingFangSC-Medium',
			  source: 'url("https://www.arteater.cn/PingFangSCMedium.ttf")',
			  success: function(){
				  console.log('load font success')
			  }
			})
			self.Parse.Config.get().then(_config=>{
				self.version = _config.get('version')
				self.percentH = _config.get('percentH')
				self.percentM = _config.get('percentM')
			})
		},
		methods: {
			inputFocus(e){
				console.log(e,'键盘弹起')
				var inputHeight = 0
				if (e.detail.height) {
				  this.inputHeight = e.detail.height * 750 / this.screenWidth
				}
			},
			inputBlur(e) {
				this.inputHeight = 0
			    console.log('键盘收起')
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
				self.index = 1
				self.count = 10
				self.allQuestions = self.allQuestions.sort(function(){
					return Math.random() - 0.5;
				});
				self.currnote = self.allQuestions[0]
				self.notes = self.allQuestions
				var cquery = new self.Parse.Query("TestQuestions")
				cquery.get(self.currnote).then(res=>{
					if(res){
						var quesItem = JSON.parse(JSON.stringify(res))
						self.existsQuestiionComments(quesItem)
						if(quesItem.type == 3){
							quesItem.cinputs = quesItem.title.split('____')
						}
						if(res.get('type') == 4){
							quesItem.cinputs = quesItem.title.split('()')
						}
						quesItem.aPercent =  quesItem.accuracy?(quesItem.accuracy*100).toFixed(2):'0'
						self.questionDetail = quesItem
						self.options =  quesItem.options
					}
					uni.hideLoading()
				})
			},
			/*选择答案*/
			handleChooseOption(options){
				let _currAnswer = []
				options.forEach((item,index)=>{
					if(item.state == 2){
						_currAnswer.push(item.code)
					}		
				})
				this.currAnswer = _currAnswer
				let type = this.questionDetail.type
				if(type == 2) {
					this.canSubmit = _currAnswer.length > 1
				} else if(type == 1) {
					this.canSubmit = _currAnswer.length == 1
				}
			},
			/*多项选择选择答案*/
			handleChooseMultisOption(options,_index){
				var item = options.find(t=>{
					return t.state == 2
				})
				this.currAnswer[_index] = item.code
				var checkCount = 0
				for(var i=0;i<this.options.length;i++){
					var item = this.currAnswer[i]
					if(item){
						checkCount++
					}
				}
				if(checkCount==this.options.length){
					this.canSubmit = true
				} else {
					this.canSubmit = false
				}
			},
			/*填空题填写答案*/
			handleAnswerChange(e){
				var index = e.currentTarget.dataset.index
				this.options[index].content = e.detail.value
				let _canSubmit = true
				this.options.forEach((item)=>{
					if(!item.content){
						_canSubmit = false
					}
				})
				this.canSubmit = _canSubmit
			},
			/*提交答案*/
			handleSubmit(){
				var self = this
				if(this.canSubmit) {
					this.hasSubmit = true // 先禁用
					let result = true
					if(this.questionDetail.type == 3) {
						this.options.forEach(item=>{
							var answer = item.value.find(t=>{
								return t.txt == item.content
							})
							if(!answer) { // 错误
								item.state = 2
								result = false
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
						this.options.forEach((_option,_index)=>{
							_option.options.forEach((item)=>{
								var choose = self.currAnswer[_index] == item.code
								if((item.value == '0'|| item.value == '') && choose) { // 选中错误答案
									result = false
									item.state = 4
								} else if(item.value == '1'&& choose) { // 选中正确答案
									item.state = 6
								} else if(item.value == '1'&& !choose){ // 未选中正确答案
									result = false
									item.state = 5
								} else { // 未选中的错误答案
									item.state = 3
								}
							})
						})
					} else {
						this.options.forEach((item)=>{
							var choose = self.currAnswer.find(function(t){
								return t == item.code
							})
							if((item.value == '0'|| item.value == '') && choose) { // 选中错误答案
								result = false
								item.state = 4
							} else if(item.value == '1'&& choose) { // 选中正确答案
								item.state = 6
							} else if(item.value == '1'&& !choose){ // 未选中正确答案
								result = false
								item.state = 5
							} else { // 未选中的错误答案
								item.state = 3
							}
						})
					}
					let _questionId =  self.questionDetail.objectId
					// 答题记录和赠送积分
					self.Parse.Config.get().then(config=>{
						let firstExamScore = config.get('firstExamScore') // 第一次答题赠送积分
						let secondExamScore = config.get('secondExamScore') // 第二次或多次答题赠送积分
						var examRecordQuery = new self.Parse.Query('ExamRecord') // 答题记录
						examRecordQuery.equalTo('openid', self.userInfo.openid)
						examRecordQuery.equalTo('questionId', _questionId)
						examRecordQuery.count().then(examRecordCount=>{
							var ScoreRecords = self.Parse.Object.extend("ScoreRecord")
							var scoreRecord = new ScoreRecords()
							scoreRecord.set('openid',self.userInfo.openid)
							scoreRecord.set('channel', 'exam')
							if(examRecordCount == 0) { // 第一次答题
								scoreRecord.set('score', firstExamScore)
								scoreRecord.set('extend', 'first') // 首次答题
							} else { // 非第一次答题
								scoreRecord.set('score', secondExamScore)
							}
							scoreRecord.save()
							
							// 修改用户积分
							var userQuery = new self.Parse.Query(self.Parse.User)
							userQuery.get(self.Parse.User.current().id).then(user=>{
								if(user.score > 0 && (!user.get('score_all') || user.get('score_all') == 0)) {
									user.set('score_all', user.get('score') + scoreRecord.get('score'))
								} else {
									user.set('score_all', user.get('score_all') + scoreRecord.get('score'))
								}
								user.set('score', user.get('score') + scoreRecord.get('score'))
								user.save().then(ures => {
									self.userInfo.score = ures.get('score')
									self.userInfo.score_all = ures.get('score_all')
									uni.setStorage({
										key: 'userInfo',
										data: ures
									})
									console.log('保存成功')
								})
							})	
							var ExamRecords = self.Parse.Object.extend("ExamRecord")
							var examRecord = new ExamRecords()
							examRecord.set('openid', self.userInfo.openid)
							examRecord.set('questionId', _questionId)
							examRecord.set('subjectId', self.questionDetail.subjects[0])
							examRecord.set('result', result)
							examRecord.save().then(()=>{
								var examRecordQuery = new self.Parse.Query(ExamRecords)
								examRecordQuery.equalTo('questionId', _questionId)
								examRecordQuery.count().then(examCount=>{
									var examRecordRightQuery = new self.Parse.Query(ExamRecords)
									examRecordRightQuery.equalTo('questionId', _questionId)
									examRecordRightQuery.equalTo('result', true)
									examRecordRightQuery.count().then(rightCount=>{
										console.log('正确率：'+ rightCount+'/'+ examCount)
										var Questions = self.Parse.Object.extend("TestQuestions")
										var quesQuery = new self.Parse.Query(Questions)
										quesQuery.get(_questionId).then(_question=>{
											_question.set('accuracy', parseFloat((rightCount / examCount).toFixed(4)))
											_question.save()
										})
									})
								})
								
								var examRecordQuery = new self.Parse.Query(ExamRecords)
								let now = new Date()
								let y = now.getFullYear()
								let m = now.getMonth()
								let d = now.getDate()
								let start = new Date(y, m, d, 0, 0, 0)
								let end = new Date(y, m, d, 23, 59, 59)
								examRecordQuery.equalTo('questionId', _questionId)
								examRecordQuery.greaterThanOrEqualTo('createdAt', start)
								examRecordQuery.lessThanOrEqualTo('createdAt', end)
								examRecordQuery.count().then(examCount=>{
									var examRecordRightQuery = new self.Parse.Query(ExamRecords)
									examRecordRightQuery.equalTo('questionId', _questionId)
									examRecordRightQuery.equalTo('result', false)
									examRecordRightQuery.greaterThanOrEqualTo('createdAt', start)
									examRecordRightQuery.lessThanOrEqualTo('createdAt', end)
									examRecordRightQuery.count().then(errorCount=>{
										console.log('错误率：'+ errorCount + '/' + examCount)
										var QuestReports = self.Parse.Object.extend("QuestReport")
										let reportQuery = new self.Parse.Query(QuestReports)
										let date = y+'-'+m+'-'+d
										reportQuery.equalTo('questionId', _questionId)
										reportQuery.equalTo('date', date)
										reportQuery.first().then(report=>{
											if(report){
												report.set('accuracy', parseFloat((errorCount / examCount).toFixed(4)))
												report.save()
											} else {
												report = new QuestReports()
												report.set('questionId', _questionId)
												report.set('date', date)
												report.set('accuracy', parseFloat((errorCount / examCount).toFixed(4)))
												report.save()
											}
										})
									})
								})
							})
						})
					})
				}
			},
			/*下一题*/
			handleNext(){
				var self = this
				this.index = this.index + 1
				this.currAnswer = [] // 当前答案
				this.hasSubmit = false;
				this.canSubmit = false;
				this.currnote = this.notes[this.index-1]
				var cquery = new self.Parse.Query("TestQuestions")
				cquery.get(this.currnote).then(res=>{
					if(res){
						var quesItem = JSON.parse(JSON.stringify(res))
						if(quesItem.type == 3){
							quesItem.cinputs = quesItem.title.split('____')
						}
						if(quesItem.type == 4){
							quesItem.cinputs = quesItem.title.split('()')
						}
						quesItem.aPercent =  (quesItem.accuracy?(quesItem.accuracy*100).toFixed(2):'0')
						self.questionDetail = quesItem
						self.options =  quesItem.options
						wx.pageScrollTo({
							scrollTop: 0
						})
					}
				})
			},
			handleHome(){
				uni.redirectTo({
					url:'./success'
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #fbfbfb;
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
		padding: 0 36rpx;
		margin-top: 42rpx;
		/* padding-bottom: 200rpx; */
	}
	.questionView .headView{
		display: flex;
	}
	.questionView .headView .queType{
		flex: 1;
		font-size: 38rpx;
		font-weight: bold;
		color: #352026;
		font-size: PingFangSC-Medium;
		line-height: 50rpx;
		height: 50rpx;
	}
	.questionView .headView .countView{
		width: 150rpx;
		text-align: right;
		font-size: 26rpx;
		color: #352026;
		font-size: PingFangSC-Medium;
		line-height: 50rpx;
		height: 50rpx;
	}
	.questionView .imgView{
		margin-top: 60rpx;
	}
	.questionView .imgView image{
		width: 100%;
	}
	.questionView .title{
		margin-top: 24rpx;
		font-size: 34rpx;
		color: #352026;
		font-size: PingFangSC-Medium;
		line-height: 80rpx;
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
		height: 64rpx;
		line-height: 60rpx;
		min-width: 80rpx;
		padding: 0 30rpx;
		display: inline-block;
		margin: 0 20rpx;
		vertical-align: middle;
		font-size: 34rpx;
		font-weight: normal;
		color: #352026;
		font-size: PingFangSC-Medium;
		border-radius: 20rpx;
	}
	.questionView .title .txt.success{
		color: #3cc0da;
		background-color: #eaf1f4;
		border: 2rpx solid #d9e6e7;
	}
	.questionView .title .txt.error{
		color: #fa5151;
		background-color: #ffe8e8;
		border: 2rpx solid #ffdfdf;
	}
	.questionView .options{
		padding: 20rpx 0;
	}
	
	.actionView{
		/* margin-top: 50rpx; */
		width: 100%;
		padding: 36rpx;
		height: 196rpx;
		position: fixed;
		bottom: 0;
		padding-top: 12rpx;
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
		background-color: #ffe8e8;
	}
	.actionView button.hasAnswer{
		background-color: #ED3535;
	}
	.commentView{
		/* background-color: #FFFFFF; */
		border-radius: 46rpx;
		padding: 60rpx 40rpx;
		/* margin-top: 10rpx; */
		/* margin-bottom: 196rpx; */
		min-height: 472rpx;
	}
	.htmlView{
		background-color: #FFFFFF;
		padding: 60rpx 40rpx!important;
		border-radius: 46rpx;
	}
	.commentView.needbuy{
		padding: 0;
		position: relative;
		background-color: unset;
	}
	.needbuy .bg{
		position: absolute;
		left: 0;
		width: 100%;
		height: 434rpx;
	}
	.needbuy .bg image{
		width: 100%;
		height: 434rpx;
	}
	
	.commentView .rightAnswer{
		font-size: 30rpx;
		font-weight: bold;
		/* height: 42rpx; */
		line-height: 42rpx;
		font-family: PingFangSC-Medium;
		color: #352026;
		margin-right: 10rpx;
	}
	.commentView .comment{
		/* margin-top: 32rpx; */
		font-size: 26rpx;
		line-height: 42rpx;
		font-family: PingFangSC-Medium;
		font-weight: normal;
		font-stretch: normal;
		line-height: 54rpx;
		letter-spacing: 0rpx;
		color: #352026;
	}
	
	.commentView .comment .accuracy{
		font-family: PingFangSC-Regular;
		font-size: 26rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: rgba(53, 32, 38, 0.7);
		margin: 36rpx 0;
	}
	.commentView .comment .accuracy .apercent{
		height: 42rpx;
		line-height: 42rpx;
		font-family: PingFangSC-Regular;
		font-size: 30rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: rgba(76, 192, 143, 0.95);
		display: flex;
	}
	.commentView .comment .accuracy .apercent .icon{
		width: 42rpx;height: 42rpx;line-height: 45rpx;font-size: 0;
	}
	.commentView .comment .accuracy .apercent.h{
		color: rgba(76, 192, 143, 0.95);
	}
	.commentView .comment .accuracy .apercent.m{
		color: #fbb955;
	}
	.commentView .comment .accuracy .apercent.l{
		color: rgba(237, 53, 53, 0.7);
	}
	.commentView .comment .accuracy .apercent image{
		width: 32rpx;
		height: 32rpx;
		display: inline-block;
		vertical-align: middle;
	}
	.commentView .comment .accuracy .atips{
		height: 36rpx;
		line-height: 36rpx;
		font-family: PingFangSC-Regular;
		font-size: 26rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: rgba(53, 32, 38, 0.4);
	}
	.actionView button.next{
		background-color: #FFFFFF;
		border: 2rpx solid #ffb9b8;
		color: #f16564;
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
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #ff6867!important;
		width: 254rpx;
		height: 62rpx;
		background-color: #ffe6e6!important;
		border-radius: 31rpx;
	}
	.btnComments::after{
		border: 0;
	}
	.vtips{
		text-align: right;
		font-size: 18rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: rgba(53, 32, 38, 0.7);
	}
	.imgView .imgItem{
		margin-bottom: 20rpx;
	}
</style>
