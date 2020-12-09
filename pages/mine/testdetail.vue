<template>
	<view>
		<view class="questionView">
			<view class="headView">
				<view v-if="questionDetail.type==1" class="queType">单选题</view>
				<view v-if="questionDetail.type==2" class="queType">多选题</view>
				<view v-if="questionDetail.type==3" class="queType">填空题</view>
				<view class="countView"></view>
			</view>
			<view class="imgView">
				<image v-if="questionDetail.images" mode="widthFix" :src="questionDetail.images"></image>
			</view>
			<view class="title" v-if="questionDetail.type==3" style="margin-bottom: 20rpx;">
				<block v-for="(c,i) in questionDetail.cinputs">{{c}}
					<view v-if="i!=questionDetail.cinputs.length-1" :class="'txt '+ (options[i].state==1?'success':'error')">{{options[i].content}}</view>
				</block>
			</view>
			<view class="title" v-else>{{questionDetail.title}}</view>
			<view class="options" v-if="questionDetail.type!=3">
				<my-radio-group :disabled="true" :options="options" :type="questionDetail.type==1?'radio':'check'" @change="handleChooseOption"></my-radio-group>
			</view>
			<view class="commentView">
				<view v-if="questionDetail.type==3" class="rightAnswer">正确答案：
					<view v-for="s in options">{{s.rightAnswer}}</view>
				</view>
				<view v-else class="rightAnswer">正确答案：<text v-for="s in options">{{s.value=='1'?s.code:''}}</text></view>
				<view class="comment">答案解析：
					<u-parse :html="questionDetail.comments"></u-parse>
				</view>
			</view>
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
				screenWidth: 0,
				inputHeight:328, // 软键盘高度
				userInfo: null,
				testHisId:'',
				testHisDetail: null,
				questionId: '',
				questionDetail: null,
				
				answers:[],
				questions:[],
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
			/*加载题目*/
			bindQuestion(){
				var self = this
				var query = new this.Parse.Query("TestQuestions")
				let id = self.questions[self.index]
				// query.equalTo('id', id)
				query.get(id).then(res=>{
					if(res){
						if(res.get('type') == 3){
							res.set('cinputs', res.get('title').split('____'))
						}
						self.questionDetail = res
						let _options = JSON.parse(JSON.stringify(res.get('options')))
						_options.forEach((_itm,_idx)=>{
							if(res.get('type') == 3){
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
				if(this.questionDetail.get('type') == 3) {
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
						item.rightAnswer = item.value[0].txt + (item.value.length > 1 ? ('(备选：' + _currTxt + ')'):'')
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
