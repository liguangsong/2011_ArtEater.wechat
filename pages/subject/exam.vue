<template>
	<view>
		<view class="buytipsView">
			<view class="tipView">
				<view class="txt">
					本章为免费内容，学习更多知识，请点击购买全部章节
				</view>
				<view class="icon">
					<u-icon name="arrow-right" color="#ffffff" size="32"></u-icon>
				</view>
			</view>
		</view>
		<view v-if="count==0" style="text-align: center;">
			暂无内容
		</view>
		<view v-else class="questionView">
			<view class="headView">
				<view v-if="questionDetail.type==1" class="queType">单选题</view>
				<view v-if="questionDetail.type==2" class="queType">多选题</view>
				<view v-if="questionDetail.type==3" class="queType">填空题</view>
				<view class="countView">{{subjectIndex}}/{{count}}</view>
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
				<view class="comment">答案解析：{{questionDetail.comments}}</view>
			</view>
		</view>
		<view v-if="count > 0" class="actionView">	
			<button v-if="!hasSubmit" @click="handleSubmit" :class="canSubmit?'hasAnswer':'noAnswer'">确认提交</button>
			<button v-if="hasSubmit&&subjectIndex < count" @click="handleNext" class="next">下一题</button>
		</view>
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
				subjectIndex: 1, // 当前答题序号
				count:0, // 总题数
				options: [],
				currAnswer:[], // 当前答案
				hasSubmit: false,
				canSubmit: false,
				screenWidth: 0,
				inputHeight:328, // 软键盘高度
				userInfo: null,
				subjectId:'',
				subjectDetail: null,
				questionDetail: null,
				history:null
			}
		},
		onLoad(options) {
			var self = this
			if(options.sid){
				this.subjectId = options.sid
				this.bindSubjectDetail()
			}
			uni.getStorage({
				key:'userInfo',
				success: res => {
					this.userInfo = res.data
					self.bindQuestion()
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
			/*加载科目详情*/
			bindSubjectDetail(){
				var self = this
				var query = new this.Parse.Query("Subjects")
				query.get(this.subjectId).then(res=>{
					self.subjectDetail = res
				})
			},
			/*加载题目*/
			bindQuestion(){
				var self = this
				var hisQuery = new this.Parse.Query("QuestionHistory")
				hisQuery.equalTo("subjectId",this.subjectId)
				hisQuery.equalTo("openid",this.userInfo.openid)
				hisQuery.first().then(hres=>{
					if(hres){
						self.history = hres
						self.subjectIndex = hres.get('subjectIndex') + 1
					}
					
					var cquery = new this.Parse.Query("TestQuestions")
					cquery.equalTo("subjects", this.subjectId)
					cquery.count().then(cres=>{
						if(cres==0) {
							self.count = 0
							return
						}
						if(hres && hres.get('subjectIndex') >= cres) {
							uni.navigateTo({
								url:'complate'
							})
						}
						self.count = cres
					})
					var query = new this.Parse.Query("TestQuestions")
					query.equalTo("subjects", this.subjectId)
					query.ascending("index")
					if(hres){
						query.greaterThan("index", hres.get('questIndex'))	
					}
					query.first().then(res=>{
						if(res){
							if(res.get('type') == 3){
								res.set('cinputs', res.get('title').split('____'))
							}
							self.questionDetail = res
							let _options = JSON.parse(JSON.stringify(res.get('options')))
							self.options =  _options
						}
					})
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
				if(this.canSubmit) {
					this.hasSubmit = true // 先禁用
					let result = true
					if(this.questionDetail.get('type') == 3) {
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
					/*保存答题记录*/
					var dbOrder = this.Parse.Object.extend("QuestionHistory")
					var order = new dbOrder()
					if(this.history){
						order.set('id', this.history.id)
					}
					order.set('openid', this.userInfo.openid)
					order.set('subjectId', this.subjectDetail.id)
					order.set('questIndex', this.questionDetail.get('index'))
					order.set('subjectIndex', this.history?(this.history.get('subjectIndex') + 1) : 1)
					order.save().then(his => {
						debugger
						self.history = his
						console.log('保存成功')
					},(error)=>{
						console.log(error)
					})
					if(!result) { // 答错
						/*错题记录*/
						var dbOrder = this.Parse.Object.extend("ErrorHistory")
						var order = new dbOrder()
						order.set('openid', this.userInfo.openid)
						order.set('questionId', this.questionDetail.id)
						order.set('title', this.questionDetail.get('title'))
						order.set('options', this.questionDetail.get('options'))
						order.save().then(_order => {
							console.log('保存成功')
						},(error)=>{
							console.log(error)
						})
					}
				}
			},
			/*下一题*/
			handleNext(){
				this.subjectIndex = this.history.get('subjectIndex')
				this.currAnswer = [] // 当前答案
				this.hasSubmit = false;
				this.canSubmit = false;
				this.bindQuestion()
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
