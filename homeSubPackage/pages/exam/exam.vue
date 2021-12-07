<template>
	<TopNavbar bg='#FAFAFA' :iconFn='true' @closeNavbar='iconBack'>
		<template v-slot:time>
			<view class="timeView">
				考试剩余时间：<u-count-down color="#b1b1b1" font-size="26" separator="zh" separator-size="26"
					@end='handleTimeOut' separator-color="#b1b1b1" @change="handleChange" :timestamp="endTime">
				</u-count-down>
			</view> 
		</template>
		<view>
			<view class="questionView" style='margin-top: 100rpx;margin-bottom: 120rpx;'>
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
						<view class="process">{{index}}/{{count}}</view>
						<view class="next">
							<image src="../../../static/icon/icon_next.png"></image>
						</view>
					</view>
				</view>
				<view class="imgView">
					<view class="imgItem" v-for="img in questionDetail.images">
						<image v-if="img" mode="widthFix" :src="img"></image>
						<view class="vtips">{{version}}</view>
					</view>
				</view>
				<!-- <view class="title">世纪巴洛克时代的美术风格要点分析世纪巴洛克时代的美术风格要点分析世纪巴洛克时代的美术风格要点分析<input @focus="inputFocus" @blur="inputBlur" type="text" class="inputTxt" />格要点分析</view> -->
				<view class="title" v-if="questionDetail.type==3" style="margin-bottom: 20rpx;">
					<block v-for="(c,i) in questionDetail.cinputs" :key="i">{{c}}
						<!-- <block v-if="hasSubmit">
						<view v-if="i!=questionDetail.cinputs.length-1" :class="'txt '+ (options[i].state==1?'success':'error')">{{options[i].content}}</view>
					</block>
					<block v-else> -->
						<block v-if="!hasSubmit">
							<input v-if="i!=questionDetail.cinputs.length-1"
								:style="{width: (options[i].value[0].txt.length * 34 + 60) + 'rpx;'}" :data-index="i"
								@input="handleAnswerChange" @focus="inputFocus" @blur="inputBlur" type="text"
								class="inputTxt" />
							<view v-if="i!=questionDetail.cinputs.length-1" class="tips">
								{{options[i].value[0].txt.length}}个字</view>
						</block>
						<!-- </block> -->
					</block>
				</view>
				<view class="title" v-else-if="questionDetail.type==4">
					<block v-for="(c,i) in questionDetail.cinputs" :key="i">{{c===''?' ':c}}<text
							v-if="i<questionDetail.cinputs.length-1">
								({{i+1}})</text></block>
				</view>
				<view class="title" v-else>{{questionDetail.title}}</view>
				<view class="options" v-if="questionDetail.type==1||questionDetail.type==2">
					<my-radio-group :disabled="hasSubmit" :options="options"
						:type="questionDetail.type==1?'radio':'check'" @change="handleChooseOption"></my-radio-group>
				</view>
				<view class="options" v-if="questionDetail.type==4">
					<view class="multisCheckView" v-for="(_option,_index) in options" :key="_index">
						<view class="head">({{_index + 1}})</view>
						<view class="content">
							<my-radio-group :disabled="hasSubmit" :options="_option.options" :index="_index"
								type="radio" @change="handleChooseMultisOption"></my-radio-group>
						</view>
					</view>
				</view>
				<!-- <view class="commentView" v-if="hasSubmit">
				<view v-if="questionDetail.type==3||questionDetail.type==4" class="rightAnswer">正确答案：
					<text style="margin-right: 10rpx;" v-for="s in options" :key="s.code">{{s.rightAnswer}}</text>
				</view>
				<view v-else class="rightAnswer">正确答案：<text v-for="s in options">{{s.value=='1'?s.code:''}}</text></view>
				<view class="comment">答案解析：
					<u-parse v-if="isShowComments" :html="questionDetail.comments"></u-parse>
					<u-parse v-else html="暂未开放"></u-parse>
				</view>
			</view> -->
			</view>
			<view v-if="count > 0" class="actionView">
				<!-- <button v-if="!hasSubmit" @click="handleSubmit" :class="canSubmit?'hasAnswer':'noAnswer'">确认提交</button>
			<button v-if="hasSubmit&&index < count" @click="handleNext" class="next">下一题</button> -->
				<button v-if="index < count" @click="handleSubmit" :class="canSubmit?'next':'noAnswer'">下一题</button>
				<button v-else @click="handleSubmit" :class="canSubmit?'next':'noAnswer'">提交</button>
			</view>
			<Modal @cancle='isShow=false' :isShow='isShow' :title='title' :submit='submitInfo' @submitFn='submitFn'/>
		</view>
	</TopNavbar>
</template>

<script>
	import TopNavbar from '@/components/navBar/topNavbar.vue'
	import myRadioGroup from '@/components/myRadio/myRadioGroup.vue'
	import Modal from '@/components/modal/modalback.vue'
	import {
		dateFormat,
		toDateFromString,
		addMonths,
		addDays,
		addSeconds,
		GetRandomNum
	} from '@/js/common.js'
	const codes = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
	export default {
		components: {
			myRadioGroup,
			TopNavbar,
			Modal
		},
		data() {
			return {
				isShow: false,
				title: '',
				submitInfo: '',
				
				index: 1, // 当前答题序号
				count: 0, // 总题数
				isShowComments: true, // 是否显示答案解析
				options: [],
				currAnswer: [], // 当前答案
				hasSubmit: false,
				canSubmit: false,
				screenWidth: 0,
				inputHeight: 328, // 软键盘高度
				userInfo: null,
				examId: '',
				examDetail: null,
				questionDetail: null,
				endTime: null,
				answers: [],
				currTime: 0, // 多去多少时间（秒）
				score: 0,
				isComplate: false, // 是否已正常提交
				questions: [], // 需要答题的题目Id,
				version: ''
			}
		},
		onLoad(options) {
			var self = this
			if (options.tid) {
				this.examId = options.tid
				this.bindExamDetail()
			}
			uni.getStorage({
				key: 'userInfo',
				success: res => {
					this.userInfo = res.data
				}
			})
			uni.getSystemInfo({
				success: res => {
					self.screenWidth = res.screenWidth
				}
			})

			// uni.enableAlertBeforeUnload({
			// 	message: '当前还未完成考试，返回则默认提交考卷，是否继续退出？',
			// 	success: res => {},
			// 	fail: error => {}
			// })
			self.Parse.Config.get().then(_config => {
				self.version = _config.get('version')
			})
		},
		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {
			if (!this.isComplate) { // 如果没有正常提交,则自动提交
				this.submit()
			}
		},
		methods: {
			iconBack() {
				this.title = '当前还未完成考试，返回则默认提交考卷，是否继续退出？';
				this.submitInfo = '确定';
				this.isShow = true;
			},
			submitFn() {
				this.isShow = false;
				uni.navigateBack({
					delta: 1
				})
			},
			inputFocus(e) {
				console.log(e, '键盘弹起')
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
			existsQuestiionComments(question) {
				var self = this
				var subjects = question.get('subjects')
				if (subjects && subjects.length > 0) {
					var query = new this.Parse.Query("Subjects")
					query.containedIn('objectId', JSON.parse(JSON.stringify(subjects)))
					query.greaterThan('price', 0)
					query.first().then(res => {
						if (res) {
							self.isShowComments = false
						} else {
							self.isShowComments = true
						}
					})
				} else {
					self.isShowComments = false
				}
			},
			/*倒计时*/
			handleChange(timestamp) {
				this.currTime = this.endTime - timestamp
			},
			/*加载考试详情*/
			bindExamDetail() {
				var self = this
				var query = new this.Parse.Query("ExamPaper")
				query.get(this.examId).then(res => {
					self.examDetail = res
					let questions = res.get('questions')
					let minutes = res.get('time_count')
					self.endTime = minutes * 60
					self.count = questions.length
					self.answers = new Array(questions.length)
					let way = res.get('way')
					if (way == '3' || way == '4') {
						self.questions = self.examDetail.get('questions').sort(() => {
							return Math.random() - 0.5
						})
					} else {
						self.questions = self.examDetail.get('questions')
					}
					self.bindQuestion()
				})
			},
			/*加载题目*/
			bindQuestion() {
				var self = this
				var query = new this.Parse.Query("TestQuestions")
				let id = self.questions[self.index - 1]
				// query.equalTo('id', id)				
				query.get(id).then(res => {
					if (res) {
						self.questionDetail = null
						self.existsQuestiionComments(res)
						let type = res.get('type')
						if (type == 3) {
							res.set('cinputs', res.get('title').split('____'))
						}
						if (type == 4) {
							res.set('cinputs', res.get('title').split('()'))
						}
						self.questionDetail = res
						let _options = JSON.parse(JSON.stringify(res.get('options')))
						let way = self.examDetail.get('way')
						if (type == 1 || type == 2) {
							if (way == '2' || way == '4') {
								_options = _options.sort(() => {
									return Math.random() > 0.5 ? 1 : -1;
								})
							}
							_options.forEach((_item, _idx) => {
								_item.oldcode = '' + _item.code
								_item.code = codes[_idx]
							})
						} else if (type == 3) {
							_options.forEach((_item, _idx) => {
								_item.content = ''
							})
						} else if (type == 4) {
							if (way == '2' || way == '4') {
								_options.forEach((_item, _idx) => {
									_item.options = _item.options.sort(() => {
										return Math.random() > 0.5 ? 1 : -1;
									})
								})
							}
							_options.forEach((item, _idx) => {
								item.options.forEach((_item, _idx) => {
									_item.oldcode = '' + _item.code
									_item.code = codes[_idx]
									if (_item.value == '1') {
										item.rightAnswer = _item.code
									}
								})
							})
						}
						self.options = _options
					}
				})
			},
			/*选择答案*/
			handleChooseOption(options) {
				let _currAnswer = []
				options.forEach((item, index) => {
					if (item.state == 2) {
						_currAnswer.push(item.code)
					}
				})
				this.currAnswer = _currAnswer
				let type = this.questionDetail.get('type')
				if (type == 2) {
					this.canSubmit = _currAnswer.length > 1
				} else if (type == 1) {
					this.canSubmit = _currAnswer.length == 1
				}
			},
			/*多项选择选择答案*/
			handleChooseMultisOption(options, _index) {
				var item = options.find(t => {
					return t.state == 2
				})
				this.currAnswer[_index] = item.code
				var checkCount = 0
				for (var i = 0; i < this.options.length; i++) {
					var item = this.currAnswer[i]
					if (item) {
						checkCount++
					}
				}
				if (checkCount == this.options.length) {
					this.canSubmit = true
				} else {
					this.canSubmit = false
				}
			},
			/*填空题填写答案*/
			handleAnswerChange(e) {
				var index = e.currentTarget.dataset.index
				this.options[index].content = e.detail.value
				let _canSubmit = true
				this.options.forEach((item) => {
					if (!item.content) {
						_canSubmit = false
					}
				})
				this.canSubmit = _canSubmit
			},
			/*提交答案*/
			handleSubmit() {
				var self = this
				if (self.canSubmit) {
					self.hasSubmit = true // 先禁用
					let result = true
					let _score = 0
					let _examOptions = self.examDetail.get('options')
					let _type = self.questionDetail.get('type')
					let _option = _examOptions.find(t => {
						return t.type == parseInt(_type)
					})
					if (this.questionDetail.get('type') == 3) {
						self.currAnswer = []
						self.options.forEach(item => {
							self.currAnswer.push(item.content)
						})
						this.options.forEach(item => {
							var answer = item.value.find(t => {
								return t.txt == item.content
							})
							if (!answer) { // 错误
								// item.state = 2
								result = false
							} else {
								// item.state = 1
							}
							let _currTxt = ''
							item.value.forEach((t, i) => {
								if (i > 0) {
									_currTxt += t.txt
									if (i != item.value.length - 1) {
										_currTxt += '|'
									}
								}
							})
							item.rightAnswer = item.value[0].txt + (item.value.length > 1 ? ('(备选：' + _currTxt +
								')') : '') + ' '
						})
					} else if (this.questionDetail.get('type') == 4) {
						this.options.forEach((_option, _index) => {
							_option.options.forEach((item) => {
								var choose = self.currAnswer[_index] == item.code
								if ((item.value == '0' || item.value == '') && choose) { // 选中错误答案
									result = false
									// item.state = 4
								} else if (item.value == '1' && choose) { // 选中正确答案
									// item.state = 6
								} else if (item.value == '1' && !choose) { // 未选中正确答案
									result = false
									// item.state = 5
								} else { // 未选中的错误答案
									// item.state = 3
								}
							})
						})
					} else {
						this.options.forEach((item) => {
							var choose = self.currAnswer.find(function(t) {
								return t == item.code
							})
							if ((item.value == '0' || item.value == '') && choose) { // 选中错误答案
								result = false
								// item.state = 4
							} else if (item.value == '1' && choose) { // 选中正确答案
								// item.state = 6
							} else if (item.value == '1' && !choose) { // 未选中正确答案
								result = false
								// item.state = 5
							} else { // 未选中的错误答案
								// item.state = 3
							}
						})
					}
					if (result) {
						self.score += parseFloat(_option.score)
						var queryRight = self.Parse.Object.extend("RightHistory")
						var query = new self.Parse.Query(queryRight)
						query.equalTo('openid', self.userInfo.openid)
						query.first().then(rhis => {
							var queryNote = self.Parse.Object.extend("ErrorHistory")
							var query1 = new self.Parse.Query(queryNote)
							query1.equalTo('openid', self.userInfo.openid)
							query1.find().then(notes => {
								let note = notes.find(t => {
									return t.get('questionId') == self.questionDetail.id
								})

								if (rhis) { // 已存在正确记录
									if (!note) { // 不在错误记录中，添加至正确记录中
										let _questionId = rhis.get('questions').find(t => {
											return t == self.questionDetail.id
										})
										if (!_questionId) { // 不存在正确记录中，保存至正确记录
											let _questionIds = rhis.get('questions')
											_questionIds.push(self.questionDetail.id)
											rhis.set('questions', _questionIds)
											rhis.save()
										}
									}
								} else {
									if (!note) { // 不在错误记录中，添加至正确记录中
										let _questionIds = [self.questionDetail.id]
										var dbRight = new queryRight()
										dbRight.set('openid', self.userInfo.openid)
										dbRight.set('questions', _questionIds)
										dbRight.save()
									}
								}
							})
						})
					} else {
						/*错题记录*/
						var queryNote = self.Parse.Object.extend("ErrorHistory")
						var query = new self.Parse.Query(queryNote)
						query.equalTo('openid', self.userInfo.openid)
						query.equalTo('questionId', self.questionDetail.id)
						query.count().then(count => {
							if (count && count > 0) { // 已存在错误记录

							} else {
								var dbNote = self.Parse.Object.extend("ErrorHistory")
								var note = new dbNote()
								note.set('openid', self.userInfo.openid)
								note.set('questionId', self.questionDetail.id)
								note.set('title', self.questionDetail.get('title'))
								note.set('options', self.questionDetail.get('options'))
								note.set('count', 0)
								note.save().then(_note => {
									console.log('保存成功')
								}, (error) => {
									console.log(error)
								})
							}
						})
					}
					self.answers[self.index - 1] = {
						questionId: self.questions[self.index - 1],
						options: JSON.parse(JSON.stringify(self.options)),
						answer: JSON.parse(JSON.stringify(self.currAnswer)),
						result: result
					}
					if (self.index == self.examDetail.get('questions').length) {
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
							uni.redirectTo({
								url: '/pages/mine/testresult?eid=' + his.id + '&from=exam'
							})
							console.log('保存成功')
						}, (error) => {
							console.log(error)
						})
					} else {
						setTimeout(function() {
							self.index = self.index + 1
							self.currAnswer = [] // 当前答案
							self.hasSubmit = false;
							self.canSubmit = false;
							self.bindQuestion()
						}, 300)
					}

					let _questionId = self.questionDetail.id

					// 答题记录和赠送积分
					self.Parse.Config.get().then(config => {
						let firstExamScore = config.get('firstExamScore') // 第一次答题赠送积分
						let secondExamScore = config.get('secondExamScore') // 第二次或多次答题赠送积分
						var examRecordQuery = new self.Parse.Query('ExamRecord') // 答题记录
						examRecordQuery.equalTo('openid', self.userInfo.openid)
						examRecordQuery.equalTo('questionId', _questionId)
						examRecordQuery.count().then(examRecordCount => {
							var ScoreRecords = this.Parse.Object.extend("ScoreRecord")
							var scoreRecord = new ScoreRecords()
							scoreRecord.set('openid', self.userInfo.openid)
							scoreRecord.set('channel', 'exam')
							if (examRecordCount == 0) { // 第一次答题
								scoreRecord.set('score', firstExamScore)
								scoreRecord.set('extend', 'first') // 首次答题
							} else { // 非第一次答题
								scoreRecord.set('score', secondExamScore)
							}
							scoreRecord.save()

							// 修改用户积分
							var userQuery = new self.Parse.Query(self.Parse.User)
							userQuery.get(self.Parse.User.current().id).then(user => {
								if (user.score > 0 && (!user.get('score_all') || user.get(
										'score_all') == 0)) {
									user.set('score_all', user.get('score') + scoreRecord.get(
										'score'))
								} else {
									user.set('score_all', user.get('score_all') + scoreRecord.get(
										'score'))
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
							examRecord.set('subjectId', self.questionDetail.get('subjects')[0])
							examRecord.set('result', result)
							examRecord.save().then(() => {
								var examRecordQuery = new self.Parse.Query(ExamRecords)
								examRecordQuery.equalTo('questionId', _questionId)
								examRecordQuery.count().then(examCount => {
									var examRecordRightQuery = new self.Parse.Query(
										ExamRecords)
									examRecordRightQuery.equalTo('questionId', _questionId)
									examRecordRightQuery.equalTo('result', true)
									examRecordRightQuery.count().then(rightCount => {
										console.log('正确率：' + rightCount + '/' +
											examCount)
										var Questions = self.Parse.Object.extend(
											"TestQuestions")
										var quesQuery = new self.Parse.Query(
											Questions)
										quesQuery.get(_questionId).then(
											_question => {
												_question.set('accuracy',
													parseFloat((
															rightCount /
															examCount)
														.toFixed(4)))
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
								examRecordQuery.count().then(examCount => {
									var examRecordRightQuery = new self.Parse.Query(
										ExamRecords)
									examRecordRightQuery.equalTo('questionId', _questionId)
									examRecordRightQuery.equalTo('result', false)
									examRecordRightQuery.greaterThanOrEqualTo('createdAt',
										start)
									examRecordRightQuery.lessThanOrEqualTo('createdAt',
										end)
									examRecordRightQuery.count().then(errorCount => {
										console.log('错误率：' + errorCount + '/' +
											examCount)
										var QuestReports = self.Parse.Object
											.extend("QuestReport")
										let reportQuery = new self.Parse.Query(
											QuestReports)
										let date = y + '-' + m + '-' + d
										reportQuery.equalTo('questionId',
											_questionId)
										reportQuery.equalTo('date', date)
										reportQuery.first().then(report => {
											if (report) {
												report.set('accuracy',
													parseFloat((
															errorCount /
															examCount)
														.toFixed(4)))
												report.save()
											} else {
												report = new QuestReports()
												report.set('questionId',
													_questionId)
												report.set('date', date)
												report.set('accuracy',
													parseFloat((
															errorCount /
															examCount)
														.toFixed(4)))
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
			handleNext() {
				this.index = this.index + 1
				this.currAnswer = [] // 当前答案
				this.hasSubmit = false;
				this.canSubmit = false;
				this.bindQuestion()
				wx.pageScrollTo({
					scrollTop: 0
				})
			},
			/*超时自动提交*/
			handleTimeOut() {
				this.submit(function(his) {
					uni.redirectTo({
						url: '/pages/mine/testresult?eid=' + his.id + '&from=exam'
					})
				})
			},
			/* 提交 */
			submit(callback) {
				var self = this
				this.isComplate = true
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
					if (callback) {
						callback(his)
					}
				}, (error) => {
					console.log(error)
				})
			}
		}
	}
</script>


<style>
	@import '@/css/dati.css'
</style>
