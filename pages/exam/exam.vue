<template>
	<view>
		<view class="timeView">
			考试剩余时间：<u-count-down color="#b1b1b1" font-size="26" separator="zh" separator-size="26" separator-color="#b1b1b1" @change="handleChange" :timestamp="endTime"></u-count-down>
		</view>
		<view class="questionView">
			<view class="headView">
				<view v-if="questionDetail.type==1" class="queType">单选题</view>
				<view v-if="questionDetail.type==2" class="queType">多选题</view>
				<view v-if="questionDetail.type==3" class="queType">填空题</view>
				<view class="countView">{{index}}/{{count}}</view>
			</view>
			<view class="imgView">
				<image mode="widthFix" src="../../static/banner.png"></image>
			</view>
			<!-- <view class="title">世纪巴洛克时代的美术风格要点分析世纪巴洛克时代的美术风格要点分析世纪巴洛克时代的美术风格要点分析<input @focus="inputFocus" @blur="inputBlur" type="text" class="inputTxt" />格要点分析</view> -->
			<view class="title" v-if="questionDetail.type==3" style="margin-bottom: 20rpx;">
				<block v-for="(c,i) in questionDetail.cinputs">{{c}}
					<block v-if="hasSubmit">
						<view v-if="i!=questionDetail.cinputs.length-1" :class="'txt '+ (options[i].state==1?'success':'error')">{{options[i].content}}</view>
					</block>
					<block v-else>
						<input v-if="i!=questionDetail.cinputs.length-1" :style="{width: (options[i].value[0].txt.length * 34 + 60) + 'rpx;'}" :data-index="i" @input="handleAnswerChange" @focus="inputFocus" @blur="inputBlur" type="text" class="inputTxt" />
						<view v-if="i!=questionDetail.cinputs.length-1" class="tips">({{options[i].value[0].txt.length}}个字)</view>
					</block>
				</block>
			</view>
			<view class="title" v-else>{{questionDetail.title}}</view>
			<view class="options" v-if="questionDetail.type!=3">
				<my-radio-group :disabled="hasSubmit" :options="options" :type="questionDetail.type==1?'radio':'check'" @change="handleChooseOption"></my-radio-group>
			</view>
			<view class="commentView" v-if="hasSubmit">
				<view v-if="questionDetail.type==3" class="rightAnswer">正确答案：
					<view v-for="s in options">{{s.rightAnswer}}</view>
				</view>
				<view v-else class="rightAnswer">正确答案：<text v-for="s in options">{{s.value=='1'?s.code:''}}</text></view>
				<view class="comment">答案解析：
					<u-parse :html="questionDetail.comments"></u-parse>
				</view>
			</view>
		</view>
		<view v-if="count > 0" class="actionView">	
			<button v-if="!hasSubmit" @click="handleSubmit" :class="canSubmit?'hasAnswer':'noAnswer'">确认提交</button>
			<button v-if="hasSubmit&&index < count" @click="handleNext" class="next">下一题</button>
		</view>
	</view>
</template>

<script>
	import myRadioGroup from '../../components/myRadio/myRadioGroup.vue'
	import { dateFormat, toDateFromString,addMonths, addDays, addSeconds, GetRandomNum } from '../../js/common.js'
	export default {
		components:{
			myRadioGroup
		},
		data() {
			return {
				index: 1, // 当前答题序号
				count:0, // 总题数
				options: [],
				currAnswer:[], // 当前答案
				hasSubmit: false,
				canSubmit: false,
				screenWidth: 0,
				inputHeight:328, // 软键盘高度
				userInfo: null,
				examId:'',
				examDetail: null,
				questionDetail: null,
				endTime: null,
				answers:[],
				currTime:0, // 多去多少时间（秒）
				score:0,
				isComplate: false, // 是否已正常提交
			}
		},
		onLoad(options) {
			var self = this
			if(options.tid){
				this.examId = options.tid
				this.bindExamDetail()
			}
			uni.getStorage({
				key:'userInfo',
				success: res => {
					this.userInfo = res.data
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
			  source: 'url("https://www.aoekids.cn/font/PingFangSCMedium.ttf")',
			  success: function(){
				  console.log('load font success')
			  }
			})
			
			uni.enableAlertBeforeUnload({
				message:'当前还未完成考试，返回则默认提交考卷，是否继续退出？',
				success: res=>{
					
				},
				fail: error=>{}
			})
		},
		/**
		  * 生命周期函数--监听页面隐藏
		  */
		onHide: function () {
			debugger
		},
		
		/**
		  * 生命周期函数--监听页面卸载
		  */
		onUnload: function () {
			if(!this.isComplate){ // 如果没有正常提交,则自动提交
				this.submit()
			}
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
			/*倒计时*/
			handleChange(timestamp){
				this.currTime =  this.endTime -timestamp
			},
			/*加载考试详情*/
			bindExamDetail(){
				var self = this
				var query = new this.Parse.Query("ExamPaper")
				query.get(this.examId).then(res=>{
					self.examDetail = res
					let questions = res.get('questions')
					let minutes = res.get('time_count')
					self.endTime = minutes * 60
					self.count = questions.length
					self.answers = new Array(questions.length)
					self.bindQuestion()
				})
			},
			/*加载题目*/
			bindQuestion(){
				var self = this
				var query = new this.Parse.Query("TestQuestions")
				let id = self.examDetail.get('questions')[self.index-1]
				// query.equalTo('id', id)
				query.get(id).then(res=>{
					if(res){
						if(res.get('type') == 3){
							res.set('cinputs', res.get('title').split('____'))
						}
						self.questionDetail = res
						let _options = JSON.parse(JSON.stringify(res.get('options')))
						self.options =  _options
					}
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
				let type = this.questionDetail.get('type')
				if(type == 2) {
					this.canSubmit = _currAnswer.length > 1
				} else if(type == 1) {
					this.canSubmit = _currAnswer.length == 1
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
				if(self.canSubmit) {
					self.hasSubmit = true // 先禁用
					let result = true
					let _score = 0
					let _examOptions = self.examDetail.get('options')
					let _type = self.questionDetail.get('type')
					let _typeTxt = (_type==1?'单选':(_type==2?'多选':(_type==3?'填空':'')))
					let _option = _examOptions.find(t=>{
						return t.type == _typeTxt
					})
					if(this.questionDetail.get('type') == 3) {
						self.currAnswer=[]
						self.options.forEach(item=>{
							self.currAnswer.push(item.content)
						})
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
							item.rightAnswer = item.value[0].txt + (item.value.length > 1 ? ('(备选：' + _currTxt + ')'):'')
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
					if(result){
						self.score += parseFloat(_option.score)
					}
					self.answers[self.index-1] = { answer: JSON.parse(JSON.stringify(self.currAnswer)), result:result}
					if(self.index==self.examDetail.get('questions').length){
						// 最后一题
						/*保存答题记录*/
						var dbHistory = this.Parse.Object.extend("TestHistory")
						var _history = new dbHistory()
						_history.set('openid', this.userInfo.openid)
						_history.set('examName', this.examDetail.get('test_paper_name'))
						_history.set('examId', this.examDetail.id)
						_history.set('questions', self.examDetail.get('questions'))
						_history.set('answers', self.answers)
						_history.set('seconds', self.currTime)
						_history.set('score', self.score)
						_history.set('pass_score', self.examDetail.get('pass_score'))
						_history.set('allscore', self.examDetail.get('score'))
						_history.save().then(his => {
							self.isComplate = true
							uni.navigateTo({
								url:'/pages/mine/testresult?eid='+ his.id+'&from=exam'
							})
							console.log('保存成功')
						},(error)=>{
							debugger
							console.log(error)
						})
					}
				}
			},
			/*下一题*/
			handleNext(){
				this.index = this.index + 1
				this.currAnswer = [] // 当前答案
				this.hasSubmit = false;
				this.canSubmit = false;
				this.bindQuestion()
			},
			/* 提交 */
			submit(){
				var self = this
				// 最后一题
				/*保存答题记录*/
				var dbHistory = this.Parse.Object.extend("TestHistory")
				var _history = new dbHistory()
				_history.set('openid', this.userInfo.openid)
				_history.set('examName', this.examDetail.get('test_paper_name'))
				_history.set('examId', this.examDetail.id)
				_history.set('questions', self.examDetail.get('questions'))
				_history.set('answers', self.answers)
				_history.set('seconds', self.currTime)
				_history.set('score', self.score)
				_history.set('pass_score', self.examDetail.get('pass_score'))
				_history.set('allscore', self.examDetail.get('score'))
				_history.save().then(his => {
					console.log('保存成功')
				},(error)=>{
					console.log(error)
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #fbfbfb;
	}
	.timeView{
		height: 72rpx;
		line-height: 72rpx;
		padding-left: 36rpx;
		font-size: 26rpx;
		color: #b1b1b1;
		font-family: PingFangSC-Medium;
		background-color: #ffffff;
	}
	.questionView{
		padding: 0 36rpx;
		margin-top: 42rpx;
		padding-bottom: 200rpx;
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
	}
	.questionView .headView .countView{
		width: 150rpx;
		text-align: right;
		font-size: 26rpx;
		color: #352026;
		font-size: PingFangSC-Medium;
	}
	.questionView .imgView{
		margin-top: 40rpx;
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
		line-height: 64rpx;
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
		line-height: 64rpx;
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
		margin-top: 50rpx;
		width: 100%;
		padding: 0 36rpx;
		position: fixed;
		bottom: 100rpx;
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
		background-color: #FFFFFF;
		border-radius: 46rpx;
		padding: 60rpx 40rpx;
	}
	.commentView .rightAnswer{
		font-size: 30rpx;
		font-weight: bold;
		/* height: 42rpx; */
		line-height: 42rpx;
		font-family: PingFangSC-Medium;
		color: #352026;
	}
	.commentView .comment{
		margin-top: 32rpx;
		font-size: 26rpx;
		line-height: 42rpx;
		font-family: PingFangSC-Medium;
		color: #352026;
	}
	.actionView button.next{
		background-color: #FFFFFF;
		border: 2rpx solid #ffb9b8;
		color: #f16564;
	}
</style>
