<template>
	<TopNavbar  bg='#FAFAFA'>
	<view>
		<view class="buytipsView" v-if="baseSubjectDetail.price>0 && !hasBuyed">
			<view class="tipView" @click="handleSubjectBuy">
				<view class="txt">
					本章为免费内容，学习更多知识，请点击购买全部章节
				</view>
				<view class="icon">
					<u-icon name="arrow-right" color="rgba(0, 0, 0, 0.37)" size="24"></u-icon>
				</view>
			</view>
		</view>
		<view class="tabView" v-if="isShowTab">
			<view :class="'tabItem ' + (tab=='tab1'? 'curr':'')"  @click="tab = 'tab1'">
				<view class="title">答题</view>
				<view class="line" v-if="tab=='tab1'">
				</view>
			</view>
			<view :class="'tabItem ' + (tab=='tab2'? 'curr':'')"  @click="tab = 'tab2'">
				<view class="title">复习</view>
				<view class="line" v-if="tab=='tab2'">
				</view>
			</view>
			<view class="clip-line"></view>
		</view>
		
		<view style="padding-bottom: 200rpx;">
			<view v-if="count==0" style="text-align: center;">
				<!-- <u-empty text="网络不理想，请耐心等待" mode="data"></u-empty> -->
				<Empty />
			</view>
			<view v-else class="questionView">
				<view class="headView">
					<image class="red-block" src="../../../static/icon/icon_red_block.png"></image>
					<view v-if="questionDetail.type==1" class="queType">单选题</view>
					<view v-if="questionDetail.type==2" class="queType">多选题</view>
					<view v-if="questionDetail.type==3" class="queType">填空题</view>
					<view v-if="questionDetail.type==4" class="queType">多项选择题</view>
					<view class="countView">
						<view class="prev">
							<image v-if="subjectIndex==1" src="../../../static/icon/icon_one.png"></image>
							<image v-else src="../../../static/icon/icon_prev.png"></image>
						</view>
						<view class="process">{{subjectIndex}}/{{count}}</view>
						<view class="next">
							<image src="../../../static/icon/icon_next.png"></image>
						</view>
					</view>
				</view>
				<view class="imgView" v-if="questionDetail.images.length">
					<view class="imgItem" v-for="img in questionDetail.images">
						<image v-if="img"  mode="widthFix" :src="img"></image>
						<view class="vtips">{{version}}</view>
					</view>
				</view>
				<!-- <view class="title">世纪巴洛克时代的美术风格要点分析世纪巴洛克时代的美术风格要点分析世纪巴洛克时代的美术风格要点分析<input @focus="inputFocus" @blur="inputBlur" type="text" class="inputTxt" />格要点分析</view> -->
				<view class="title" v-if="questionDetail.type==3">
					<block v-for="(c,i) in questionDetail.cinputs" :key="i">{{c}}
						<!-- <block v-if="tab=='tab2'">
							<input v-if="i!=questionDetail.cinputs.length-1" :style="{width: (options[i].value[0].txt.length * 34 + 60) + 'rpx;'}" :data-index="i" @input="handleAnswerChange" @focus="inputFocus" @blur="inputBlur" type="text" class="inputTxt" />
							<view v-if="i!=questionDetail.cinputs.length-1" class="tips">{{options[i].value[0].txt.length}}个字</view>
						</block>
						<block v-else> -->
							<block v-if="hasSubmit||tab=='tab2'">
								<template v-if="i!=questionDetail.cinputs.length-1">
									<view :class="'txt '+ (options[i].state==1?'success':'error')" v-for="(item,letter) in options[i].content" :key="letter">
										{{options[i].content[letter]}}
									</view>
								</template>
							</block>
							<block v-else>
								<input v-if="i!=questionDetail.cinputs.length-1" :style="{width: (options[i].value[0].txt.length * 34 + 60) + 'rpx;'}" :data-index="i" @input="handleAnswerChange" @focus="inputFocus" @blur="inputBlur" type="text" class="inputTxt" />
								<view v-if="i!=questionDetail.cinputs.length-1" class="tips">{{options[i].value[0].txt.length}}个字</view>
							</block>
						<!-- </block> -->
					</block>
				</view>
				<view class="title" v-else-if="questionDetail.type==4">
					<block v-for="(c,i) in questionDetail.cinputs" :key="i">{{c===''?' ':c}}<text v-if="i<questionDetail.cinputs.length-1">
					({{i+1}})
					</text></block>
				</view>
				<view class="title" v-else>{{questionDetail.title}}</view>
				<view class="options" v-if="questionDetail.type==1||questionDetail.type==2">
					<my-radio-group :disabled="hasSubmit||tab=='tab2'" :options="options" :type="questionDetail.type==1?'radio':'check'" @change="handleChooseOption"></my-radio-group>
				</view>
				<view class="options" v-if="questionDetail.type==4">
					<view class="multisCheckView" v-for="(_option,_index) in options">
						<view class="head">({{_index + 1}})</view>
						<view class="content">						
							<my-radio-group :disabled="hasSubmit||tab=='tab2'" :options="_option.options" :index="_index" type="radio" @change="handleChooseMultisOption"></my-radio-group>
						</view>
					</view>
				</view>
			</view>
			<!-- <view v-if="(hasSubmit||tab=='tab2')&&(!isShowComments&&!hasBuyedComment)" style='height: 572rpx'></view> -->
			<!-- 是否吸底 -->
			<view :class="'commentView ' + ((!isShowComments&&!hasBuyedComments)?'needbuy':'')" v-if="hasSubmit||tab=='tab2'" >
				<view class="bg" v-if="!isShowComments&&!hasBuyedComments">
					<image src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/dajxbg1.png"></image>
				</view>
				<view style="position: relative;padding: 48rpx 60rpx;width: 100%;" :class="((!isShowComments&&!hasBuyedComments)?'':'htmlView')">
					<view v-if="questionDetail.type==3||questionDetail.type==4" class="rightAnswer">正确答案：
						<text style="margin-right: 10rpx;" v-for="s in options">{{s.rightAnswer}}</text>
					</view>
					<view v-else class="rightAnswer">正确答案：<text v-for="s in options">{{s.value=='1'?s.code:''}}</text></view>
					<view class="comment">
						<view v-if="isShowComments">
							<view class="accuracy">
								<view :class="'apercent ' + (questionDetail.aPercent>=percentH?'h':(questionDetail.aPercent>=percentM&&questionDetail.aPercent<percentH?'m':'l'))">
									<view class="icon">
										<image v-if="questionDetail.aPercent>=percentH" src="../../../static/icon/icon_percent_h.png"></image>
										<image v-if="questionDetail.aPercent>=percentM&&questionDetail.aPercent<percentH" src="../../../static/icon/icon_percent_m.png"></image>
										<image v-if="questionDetail.aPercent<percentM" src="../../../static/icon/icon_percent_l.png"></image>
									</view>
									<view>全民正确率：{{questionDetail.aPercent}}%</view>
									<view v-if="questionDetail.aPercent>=percentH" class="atips">此为送分题，且行且珍惜。</view>
									<view v-if="questionDetail.aPercent>=percentM&&questionDetail.aPercent<percentH" class="atips">有些人做错了，但愿不是你。</view>
									<view v-if="questionDetail.aPercent<percentM" class="atips">大家都错了也不是你做错的理由。</view>
								</view>
								
							</view>
							<u-parse :html="questionDetail.comments?questionDetail.comments:'暂无解析'"></u-parse>
						</view>
						<view v-else>
							<view v-if="!hasBuyedComments">
								<view class="accuracy" style="margin: 0;">全民正确率：解锁试题解析可见</view>
								<view  style="text-align: center;margin-top: 186rpx;">
									<button class="btnComments" type="default" @click="handleBuyComments">
										<image src="../../../static/icon/icon_lock.png" style="width: 32rpx;height: 32rpx;display: inline-block;vertical-align: middle;"></image>
										<view style="margin-top:1rpx;text-indent: 20rpx;display: inline-block;">解锁试题解析</view>
									</button>
								</view>
							</view>
							<view v-else>
								<view class="accuracy">
									<view :class="'apercent ' + (questionDetail.aPercent>=percentH?'h':(questionDetail.aPercent>=percentM&&questionDetail.aPercent<percentH?'m':'l'))">
										<view class="icon">
											<image v-if="questionDetail.aPercent>=percentH" src="../../../static/icon/icon_percent_h.png"></image>
											<image v-if="questionDetail.aPercent>=percentM&&questionDetail.aPercent<percentH" src="../../../static/icon/icon_percent_m.png"></image>
											<image v-if="questionDetail.aPercent<percentM" src="../../../static/icon/icon_percent_l.png"></image>
										</view>
										<view>全民正确率：{{questionDetail.aPercent}}%</view>
										<view v-if="questionDetail.aPercent>=percentH" class="atips">此为送分题，且行且珍惜。</view>
										<view v-if="questionDetail.aPercent>=percentM&&questionDetail.aPercent<percentH" class="atips">有些人做错了，但愿不是你。</view>
										<view v-if="questionDetail.aPercent<percentM" class="atips">大家都错了也不是你做错的理由。</view>
									</view>
									
								</view>
								<u-parse :html="questionDetail.comments?questionDetail.comments:'暂无解析'"></u-parse>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="tab == 'tab1' && count > 0" class="actionView">	
			<button v-if="!hasSubmit" @click="handleSubmit" :class="canSubmit?'hasAnswer':'noAnswer'">确认提交</button>
			<button v-if="hasSubmit&&subjectIndex < count" @click="handleNext" class="next">下一题</button>
			<button v-if="hasSubmit&&subjectIndex == count" @click="handleNext" class="next">查看结果</button>
		</view>
		<view v-if="tab == 'tab2' && count > 0" class="actionView">
			<view class="btnGroup" style="display: flex;">
				<button v-if="subjectIndex >= 1 " @click="handlePrevAnswer" :class="'prev '+ (subjectIndex==1?'disable':'')">上一题</button>
				<button v-if="subjectIndex <= count" @click="handleNextAnswer" :class="'next '+ (subjectIndex==count?'disable':'')">下一题</button>
			</view>
		</view>
		<u-popup v-model="isShowSubjectBuy" height="680rpx" :closeable="true" mode="bottom" border-radius="40">
			<view class="buylView" style="padding:74rpx 70rpx;">
				<view class="title">{{baseSubjectDetail.subject_name}}</view>
				<view class="price">¥{{baseSubjectDetail.price}}</view>
				<view class="tips">
					您购买的商品为虚拟内容服务，购买后不支持退订、转让、退换，请酌情确认。
				</view>
				<view class="tips">
					购买后可在【个人中心-已购项目】中查看
				</view>
				<view class="btnActions">
					<button @click="handleBuyBtnClick">确认购买</button>
				</view>
			</view>
		</u-popup>
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
	</view>
	</TopNavbar>
</template>

<script>
	import TopNavbar from '@/components/navBar/topNavbar.vue'
	import myRadioGroup from '@/components/myRadio/myRadioGroup.vue'
	import Empty from '@/components/empty/empty.vue'
	export default {
		components:{
			myRadioGroup, TopNavbar, Empty
		},
		data() {
			return {
				vip: false,
				tab: 'tab1',
				isOnload: true,
				isShowTab: false,
				subjectIndex: 1, // 当前答题序号
				isShowSubjectBuy: false,
				isShowComments: true, // 是否显示答案解析
				hasBuyed: false, // 是否已购买本科目
				count:0, // 总题数
				options: [],
				currAnswer:[], // 当前答案
				hasSubmit: false,
				canSubmit: false,
				screenWidth: 0,
				inputHeight:328, // 软键盘高度
				userInfo: null,
				subjectId:'',
				baseSubjectId: '',
				baseSubjectDetail:null,
				subjectDetail: null,
				questions:[], // 所有题目
				questionDetail: null,
				history:null,
				dajxConfig:null, // 答案解析配置
				hasBuyedComments: false, // 是否购买了答案解析
				isShowCommentBuy: false,
				answers: [],
				beginTime: new Date(), // 开始答题时间
				subjectIds:[],
				version: '',
				percentH: 0,
				percentM: 0,
				bsid: '',
			}
		},
		onShow() {
			var app = getApp();
			var member = app.globalData.member;
			// 判断是不是会员
			if (member) {
				if (member.memberType != 1) {
					if (member.endTime > Date.now()) {
						this.vip = true;
					}
				}
			}
			// this.vip = true;
		},
		onLoad(options) {
			console.log(options, '..........');
			this.bsid = options.bsid;
			var self = this
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('subjectTree', function(tree){
				
				uni.getStorage({
					key:'userInfo',
					success: res => {
						self.userInfo = res.data
						if(options.sid && options.bsid){
							self.subjectId = options.sid
							self.subjectIds.push(self.subjectId)
							self.getSubjectChildIds(tree.children)
							self.bindQuestions()
							self.bindSubjectDetail()
							// self.bindBaseSubjectDetail()
							// self.bindOrder()
							self.bindCommentsOrder()
						}
					}
				})
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
		watch:{
			tab(newval){
				var self = this
				if(newval=='tab2'){ // 模拟答案
					self.bindAnswer(self.options, self.questionDetail.type)
				} else { // 清空答案
					if(self.history) {
						var answers = JSON.parse(JSON.stringify(self.history.get('answers')))
						var _answer = answers.find(t=>{
							return t && t.questionId == self.questionDetail.objectId
						})
						if(_answer){
							self.options = _answer.options
						} else {
							self.clearAnswer(self.options, self.questionDetail.type)
						}
					} else {
						self.clearAnswer(self.options, self.questionDetail.type)
					}
				}
			}
		},
		methods: {
			/*绑定正确答案*/
			bindAnswer(options, type) {
				if(type == 4) {
					options.forEach(t => {
						t.options.forEach(st => {
							if(st.value=='1') {
								st.state = 2
							} else {
								st.state = 1
							}
						})
					})
				} else if(type == 3){
					options.forEach((item)=>{
						item.content = item.value[0].txt
						item.state = 1
					})
				} else {
					options.forEach((item)=>{
						if(item.value=='1') {
							item.state = 2
						} else {
							item.state = 1
						}
					})
				}
			},
			/*清空选项*/
			clearAnswer(options, type){
				if(type == 4) {
					options.forEach(t => {
						t.options.forEach(st => {
							st.state = 0
						})
					})
				} else if(type == 3){
					options.forEach((item)=>{
						item.content = ''
						item.state = 0
					})
				} else {
					options.forEach((item)=>{
						item.state = 0
					})
				}
			},
			inputFocus(e){
				console.log(e,'键盘弹起')
				var inputHeight = 0
				if (e.detail.height) {
				  this.inputHeight = e.detail.height * 750 / this.screenWidth
				}
			},
			getSubjectIds(tree, subjectId){
				var self = this
				if(tree.children){
					tree.children.forEach(item=>{
						if(item.value == subjectId){
							self.subjectIds.push(item.value)
							self.getSubjectChildIds(item.children)
						} else {
							if(item.children){
								self.getSubjectIds(item.children, subjectId)
							}
						}
					})
				}
			},
			getSubjectChildIds(tree){
				var self = this
				if(tree){
					tree.forEach(item=>{
						self.subjectIds.push(item.value)
						if(item.children){
							self.getSubjectChildIds(item.children)
						}
					})
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
			/*加载顶级科目详情*/
			bindBaseSubjectDetail(){
				var self = this
				var query = new this.Parse.Query("Subjects")
				query.get(this.baseSubjectId).then(res=>{
					self.baseSubjectDetail = res
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
						if (self.vip) {
							self.isShowComments = true
						}
					})
				} else {
					self.isShowComments = false
					if (self.vip) {
						self.isShowComments = true
					}
				}

			},
			/*查询是否已购买本章节*/
			bindOrder(){
				var self = this
				var query = new this.Parse.Query("Order")
				query.equalTo('openId',this.userInfo.openid)
				query.contains('subjectId',this.baseSubjectId)
				query.equalTo('state', 1)
				query.first().then(res=>{
					if(res){
						self.hasBuyed = true
					}
				})
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
						if (self.vip) {
							self.isShowComments = true
						}
					})
				}
				if (self.vip) {
					self.isShowComments = true
				}
			},
			/* 加载科目下所有题目 */
			bindQuestions(){
				var self = this
				var hisQuery = new this.Parse.Query("QuestionHistory")
				hisQuery.equalTo("subjectId", this.subjectId)
				hisQuery.equalTo("isImportant", 1)
				hisQuery.equalTo("openid",this.userInfo.openid)
				hisQuery.first().then(hres=>{
					if(hres){
						self.history = hres
						self.subjectIndex = hres.get('subjectIndex') + 1
						if(self.isOnload && self.history && self.history.get('count')>0){ // 已答完一次，二次进入答题
							self.isOnload = false
							self.isShowTab = true
							uni.showModal({
								content:'该科目已完成,本次为答题复习',
								showCancel:false,
								success(res) {
									// self.handleSubjectExamRecord()
								}
							})
						}
					}
					var cquery = new self.Parse.Query("TestQuestions")
					cquery.equalTo('isImportant', 1)
					cquery.containedIn("subjects", self.subjectIds)
					cquery.ascending("index")
					cquery.limit(10000)
					cquery.find().then(res=>{
						self.questions = res
						if(hres && hres.get('answers') && hres.get('subjectIndex') < self.questions.length - 1) {
							self.answers = hres.get('answers')
						}
						if(self.subjectIndex > self.questions.length){
							self.subjectIndex = 1
							if(self.history) {
								self.history.set('subjectIndex', 0)
							}
						}
						self.bindQuestion()
						self.answers = new Array(res.length)
					})
				})
			},
			/*加载题目*/
			bindQuestion(){
				var self = this
				if(self.history){
					if(self.history&&self.subjectIndex > 1) {
						self.history.set('subjectIndex', self.subjectIndex - 1)
					} else {
						self.history.set('subjectIndex', 0)
					}
				}
				self.count = self.questions.length
				if(self.questions.length > 0) {
					var quesItem = JSON.parse(JSON.stringify(self.questions[self.subjectIndex-1]))
					if(quesItem.type == 3){
						quesItem.cinputs = quesItem.title.split('____')
						quesItem.options.forEach(item=> {
							let _currTxt = ''
							item.value.forEach((t, i)=>{
								if(i > 0) {
									_currTxt += t.txt
									if(i != item.value.length - 1) {
										_currTxt += '|'
									}
								} 
							})
							item.rightAnswer = item.value[0].txt + (item.value.length > 1 ? ('(备选：' + _currTxt + ')'):'') + ' '
						})
					}
					if(quesItem.type == 4){
						quesItem.cinputs = quesItem.title.split('()')
					}
					self.existsQuestiionComments(quesItem)
					quesItem.aPercent =  quesItem.accuracy?(quesItem.accuracy*100).toFixed(2):'0'
					self.questionDetail = quesItem
					let _options = JSON.parse(JSON.stringify(quesItem.options))
					if(self.tab == 'tab2'){
						self.bindAnswer(_options, quesItem.type)
					}
					self.options =  _options
				}
			},
			/* 已答完题 */
			handleComplate(){
				var self = this
				self.history.set('count', 1)
				self.history.save().then(his=>{
					self.history = his
				})
				if(!self.isOnload){
					// uni.showModal({
					// 	content:'当前科目下所有试题已经答完，是否选择重新答题',
					// 	success(res) {
					// 		if(res.confirm){
					// 			self.isOnload = false
					// 			self.subjectIndex = 1
					// 			self.currAnswer = [] // 当前答案
					// 			self.hasSubmit = false;
					// 			self.canSubmit = false;	
					// 			self.history.set('subjectIndex',0)
					// 			self.history.set('questIndex',0)
					// 			self.history.save().then(res=>{
					// 				self.history = res
					// 				self.bindQuestion()
					// 			})
					// 		} else {
					// 			self.history.set('subjectIndex',0)
					// 			self.history.set('questIndex',0)
					// 			self.history.save()
					// 		}
					// 	},
					// 	complete() {
					// 	}
					// })
				}
				// self.handleSubjectExamRecord()
			},
			/*科目答题完成记录*/
			handleSubjectExamRecord(subjectId) {
				var self = this
				if(!subjectId){
					subjectId = self.subjectDetail.id
				}
				var squery = new self.Parse.Query('Subjects')
				squery.get(subjectId).then(subject=>{
					if(subject) {
						var query = new self.Parse.Query('SubjectProgress')
						query.equalTo('openid', self.userInfo.openid)
						query.equalTo('isImportant', 1)
						query.equalTo('subjectId', subjectId)
						query.first().then(progress=>{
							var tQuery = new self.Parse.Query('TestQuestions')
							tQuery.equalTo('isImportant', 1)
							tQuery.containedIn('subjects', [subjectId])
							tQuery.count().then(tCount=>{ // 查询科目下题目数量
								if(!progress){
									var SubjectProgress = self.Parse.Object.extend('SubjectProgress')
									var subjectProgress = new SubjectProgress()
									subjectProgress.set('openid',self.userInfo.openid)
									subjectProgress.set('isImportant', 1)
									subjectProgress.set('subjectId', subjectId)
									subjectProgress.set('subjectIndex', 1)
									subjectProgress.set('quesCount', tCount)
									subjectProgress.save().then(r=> {
										if(subject.get('parent_ID')!='0'){
											self.handleSubjectExamRecordParent(self, subject.get('parent_ID'))
										} else {
											const eventChannel = self.getOpenerEventChannel()
											eventChannel.emit('buySuccess', {});									
										}
									})
								} else {
									let subjectIndex = (progress.get('subjectIndex')?progress.get('subjectIndex'):tCount)
									if(subjectIndex >= tCount){
										subjectIndex = tCount
									} else {
										subjectIndex = subjectIndex + 1
									}
									if(self.subjectIndex > progress.get('subjectIndex')||!progress.get('subjectIndex')){
										progress.set('subjectIndex', subjectIndex)
										progress.save().then(r=> {
											if(subject.get('parent_ID')!='0'){
												self.handleSubjectExamRecordParent(self, subject.get('parent_ID'))
											} else {
												const eventChannel = self.getOpenerEventChannel()
												eventChannel.emit('buySuccess', {});									
											}
										})
									}
								}
							})
						})
					}
				})
			},
			/* 更新父级科目状态 */
			handleSubjectExamRecordParent(self, subjectId){
				var SubjectProgress = self.Parse.Object.extend('SubjectProgress')
				var pquery = new self.Parse.Query('SubjectProgress')
				pquery.equalTo('openid', self.userInfo.openid)
				pquery.equalTo('isImportant', 1)
				pquery.equalTo('subjectId', subjectId)
				pquery.first().then(progress=>{
					var query = new self.Parse.Query('Subjects')
					query.get(subjectId).then(subject=>{
						if(subject) { // 存在父级科目
							var query1 = new self.Parse.Query('Subjects')
							query1.equalTo('parent_ID', subject.id)
							query1.select('objectId')
							query1.find().then(childrenSubjects=>{ // 查询父级科目下所有子集科目id
								var subjectIds = []
								childrenSubjects.forEach(t=>{
									subjectIds.push(t.id)
								})
								var query2 = new self.Parse.Query('SubjectProgress')
								query2.equalTo('openid', self.userInfo.openid)
								query2.equalTo('isImportant', 1)
								query2.containedIn('subjectId', subjectIds)
								query2.find().then(children=>{ // 查询子集科目答题进度
									let quesIndex = 0
									let quesCount = 0
									children.forEach(t=>{
										quesIndex+= (t.get('subjectIndex')?t.get('subjectIndex'):0)
										quesCount+= (t.get('quesCount')?t.get('quesCount'):0)
									})
									if(progress){
										progress.set('subjectIndex', quesIndex)
										progress.set('quesCount', quesCount)
										progress.save().then(r=> {
											if(subject.get('parent_ID')!='0'){
												self.handleSubjectExamRecordParent(self, subject.get('parent_ID'))
											} else {
												const eventChannel = self.getOpenerEventChannel()
												eventChannel.emit('buySuccess', {});
											}
										})
									} else {
										progress = new SubjectProgress()
										progress.set('openid', self.userInfo.openid)
										progress.set('isImportant', 1)
										progress.set('subjectIndex', quesIndex)
										progress.set('quesCount', quesCount)
										progress.set('subjectId', subjectId)
										progress.save().then(r=> {
											if(subject.get('parent_ID')!='0'){
												self.handleSubjectExamRecordParent(self, subject.get('parent_ID'))
											} else {
												const eventChannel = self.getOpenerEventChannel()
												eventChannel.emit('buySuccess', {});
											}
										})
									}
								})
							})
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
			/* 计算正确答案 */
			calc(){
				var self = this
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
					/*保存答题记录*/
					var dbHistory = this.Parse.Object.extend("QuestionHistory")
					var _history = new dbHistory()
					if(this.history){
						_history.set('id', self.history.id)
					}
					_history.set('openid', self.userInfo.openid)
					_history.set('subjectId', self.subjectDetail.id)
					_history.set('isImportant', 1)
					_history.set('questIndex', self.questionDetail.index)
					_history.set('subjectIndex', self.history?(self.history.get('subjectIndex') + 1) : 1)
					_history.save().then(his => {
						self.history = his
						if(his.get('subjectIndex') >= self.count){
							self.isOnload = false
							self.handleComplate()
						}
						self.handleSubjectExamRecord(self.questionDetail.subjects[0])
						console.log('保存成功')
					},(error)=>{
						console.log(error)
					})
					if(!result) { // 答错
						/*错题记录*/
						var queryNote = this.Parse.Object.extend("ErrorHistory")
						var query = new self.Parse.Query(queryNote)
						query.equalTo('openid', this.userInfo.openid)
						query.equalTo('questionId', this.questionDetail.objectId)
						query.count().then(count=>{
							if(count && count > 0){ // 已存在错误记录
								
							} else {
								var dbNote = this.Parse.Object.extend("ErrorHistory")
								var note = new dbNote()
								note.set('openid', this.userInfo.openid)
								note.set('questionId', this.questionDetail.objectId)
								note.set('title', this.questionDetail.title)
								note.set('options', this.questionDetail.options)
								note.set('count', 0)
								note.save().then(_note => {
									console.log('保存成功')
								},(error)=>{
									console.log(error)
								})
							}
						})
					} else {
						var queryRight = self.Parse.Object.extend("RightHistory")
						var query = new self.Parse.Query(queryRight)
						query.equalTo('openid', self.userInfo.openid)
						query.first().then(rhis=>{
							var queryNote = self.Parse.Object.extend("ErrorHistory")
							var query1 = new self.Parse.Query(queryNote)
							query1.equalTo('openid', self.userInfo.openid)
							query1.find().then(notes => {
								let note = notes.find(t=> {
									return t.get('questionId') == self.questionDetail.objectId
								})
								
								if(rhis){ // 已存在正确记录
									if(!note){ // 不在错误记录中，添加至正确记录中
										let _questionId = rhis.get('questions').find(t=>{
											return t == self.questionDetail.objectId
										})
										if(!_questionId){ // 不存在正确记录中，保存至正确记录
											let _questionIds = rhis.get('questions')
											_questionIds.push(self.questionDetail.objectId)
											rhis.set('questions',_questionIds)
											rhis.save()
										}
									}
								} else {
									if(!note){ // 不在错误记录中，添加至正确记录中
										let _questionIds = [self.questionDetail.objectId]
										var dbRight = new queryRight()
										dbRight.set('openid', self.userInfo.openid)
										dbRight.set('questions',_questionIds)
										dbRight.save()
									}
								}
							})
						})
					}
					self.answers[self.subjectIndex - 1] = {questionId: self.questions[self.subjectIndex - 1].id, options: JSON.parse(JSON.stringify(self.options)) ,answer: JSON.parse(JSON.stringify(self.currAnswer)), result:result}
					_history.set('answers', self.answers)
					_history.save()
					var _questionId =  self.questionDetail.objectId
					// 答题记录和赠送积分
					self.Parse.Config.get().then(config=>{
						let firstExamScore = config.get('firstExamScore') // 第一次答题赠送积分
						let secondExamScore = config.get('secondExamScore') // 第二次或多次答题赠送积分
						var examRecordQuery = new self.Parse.Query('ExamRecord') // 答题记录
						examRecordQuery.equalTo('openid', self.userInfo.openid)
						examRecordQuery.equalTo('questionId', _questionId)
						examRecordQuery.count().then(examRecordCount=>{
							var ScoreRecords = this.Parse.Object.extend("ScoreRecord")
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
								if(user.score > 0 && (!user.get('score_all') || user.get('score_all')==0)){
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
							var ExamRecords = this.Parse.Object.extend("ExamRecord")
							var examRecord = new ExamRecords()
							examRecord.set('openid', self.userInfo.openid)
							examRecord.set('questionId', _questionId)
							examRecord.set('subjectId', self.subjectDetail.id)
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
										// var Questions = self.Parse.Object.extend("TestQuestions")
										var quesQuery = new self.Parse.Query("TestQuestions")
										let quesId = _questionId
										quesQuery.get(quesId).then(_question=>{
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
				if(this.subjectIndex==this.count){
					var time = new Date() - self.beginTime
					uni.redirectTo({
						url:'./result?bisd='+self.bsid+'&sid='+self.subjectDetail.id+'&important=1&time='+ parseInt(time/1000),
					})
				} else {
					this.subjectIndex = this.history.get('subjectIndex') + 1
					this.currAnswer = [] // 当前答案
					this.hasSubmit = false;
					this.canSubmit = false;
					this.bindQuestion()
					wx.pageScrollTo({
						scrollTop: 0
					})
				}
			},
			/* 查看上一个答案 */
			handlePrevAnswer(){
				if(this.subjectIndex > 1){
					this.currAnswer = [] // 当前答案
					this.hasSubmit = false;
					this.canSubmit = false;
					this.subjectIndex = this.subjectIndex - 1
					this.bindQuestion()
					wx.pageScrollTo({
						scrollTop: 0
					})
				}
			},
			/* 查看下一个答案 */
			handleNextAnswer(){
				if(this.subjectIndex < this.count){
					this.currAnswer = [] // 当前答案
					this.hasSubmit = false;
					this.canSubmit = false;
					this.subjectIndex = this.subjectIndex + 1
					this.bindQuestion()
					wx.pageScrollTo({
						scrollTop: 0
					})
				}
			},
		}
	}
</script>

<style>
	@import '@/css/dati.css'

</style>


