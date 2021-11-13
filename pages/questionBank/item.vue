<template>
	<view class='questionbank-item' @click='jump(item)'>
		<view class='img'>
			<image :src="img"></image>
		</view>
		<view class="content">
			<view class="title">{{item.subject_name}}</view>
			<view class="info">
				<view>
					<view>已完成: {{subjectTree.progress?subjectTree.progress:0}}/{{subjectTree.childrenCount?subjectTree.childrenCount:0}}</view>
				</view>
				<view class="btn">
					<!-- <text>学习</text> -->
					<image src="../../static/study.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: {}
			},
			img: {
				type: String
			}
		},
		data() {
			return {
				subjectTree:[],
				userInfo: null,
				subjectId:'',
				subjectDetail: null,
				subjects: [],
				questionHistory: [],
				subjectProgress: []
			}
		},
		created() {
			var self = this
			uni.loadFontFace ({
			  family: 'PingFangSC-Medium',
			  source: 'url("https://www.arteater.cn/PingFangSCMedium.ttf")',
			  success: function(){
				  console.log('load font success')
			  }
			})
			this.subjectId = this.item.objectId
			uni.getStorage({
				key:'userInfo',
				success: res => {
					self.userInfo = res.data;
					self.bindSubjectDetail()
				}
			})
		},
		methods: {
			/*加载科目详情*/
			bindSubjectDetail(){
				var self = this
				var query = new this.Parse.Query("Subjects")
				query.get(this.subjectId).then(res=>{
					res.set('progress', 0)
					res.set('childrenCount', 0)
					self.subjectDetail = res
					self.bindSubjectTree()
				})
			},
			/* 加载科目树*/
			async bindSubjectTree(){
				var self = this
				uni.showLoading({
					title:'加载中……'
				})
				var query = new this.Parse.Query("Subjects")
				query.ascending('createdAt');
				let count=await query.count();
				query.limit(count)
				query.find().then(async res=>{
					self.subjects = res
					var queryProgress = new self.Parse.Query("SubjectProgress")
					queryProgress.equalTo('openid',self.userInfo.openid)
					queryProgress.equalTo('isImportant', 0)
					let ProgressCount=await queryProgress.count();
					queryProgress.limit(ProgressCount)
					queryProgress.find().then(pres=>{
							self.subjectProgress = pres
							var hisQuery = new self.Parse.Query("QuestionHistory")
							hisQuery.equalTo("isImportant", 0)
							hisQuery.equalTo("openid", self.userInfo.openid)
							hisQuery.find().then(questionHistory=>{
								self.questionHistory = questionHistory
								var tree = self.initSubjectTree(res, self.subjectId, pres)
								self.subjectTree = {
									quesCount: self.subjectDetail.quesCount,
									// extend: false,
									has_down_level: self.subjectDetail.get('has_down_level'),
									value: self.subjectDetail.id,
									progress: 0,
									childrenCount: 0,
									children: tree
								}
								self.handleGetTestCount(self.subjectTree)
								uni.hideLoading()
							})
					})
				})
			},
			/** 构造树形科目 */
			initSubjectTree(subjects, parentId, subjectProgress){
				var self = this
				var treeValue = []
				let _subjects = subjects.filter((_item)=>{
					return _item.get('parent_ID') == parentId
				})
				_subjects.forEach((_subject, _index)=> {
					let subject = {
						quesCount: _subject.quesCount,
						// extend: false,
						has_down_level: _subject.get('has_down_level'),
						value: _subject.id,
						progress: 0,
						childrenCount: 0
					}
					let childrens = subjects.filter(_item=>{
						return _item.get('parent_ID') == _subject.id
					})
					subject.progress = 0
					subject.childrenCount = 0
					if(childrens.length > 0) { // 有子集
						subject.children = self.initSubjectTree(subjects, _subject.id, subjectProgress)
						let subjectIds = []
						if(subject.children&&subject.children.length>0){
							subject.children.forEach(t=>{
								subjectIds.push(t.value)
							})
							let quesIndex = 0
							let quesCount = 0
							subjectProgress.forEach(t=>{
								if(subjectIds.indexOf(t.get('subjectId'))!=-1){
									quesIndex+= t.get('subjectIndex')
									quesCount+= t.get('quesCount')
								}
							})
							subject.progress = (quesIndex ? quesIndex : 0)
							if(quesCount>0){
								subject.childrenCount = quesCount
							}
						}
					}
					treeValue.push(subject)
				})
				return treeValue
			},
			getSubjectChildIds(tree, subjectIds){
				var self = this
				if(tree){
					tree.forEach(item=>{
						subjectIds.push(item.value)
						if(item.children){
							self.getSubjectChildIds(item.children, subjectIds)
						}
					})
				}
			},
			/*查看科目下题目数量*/
			handleGetTestCount(subject){
				var self = this
				var ids = []
				ids.push(subject.value)
				self.getSubjectChildIds(subject.children, ids)
				uni.showLoading({
					title:'加载中……'
				})
				var quesQuery = new self.Parse.Query("TestQuestions")
				quesQuery.containedIn('subjects', ids)
				quesQuery.limit(10000)
				quesQuery.find().then(ques=>{
					subject.childrenCount = ques.length
					self.subjectProgress.forEach(t=>{
						if(t.get('subjectId') == subject.value){
							if(t.get('subjectIndex')){
								subject.progress = t.get('subjectIndex')
							} else {
								subject.progress = 0
							}
						}
					})
					let subIndex = 0
					if(subject.children && subject.children.length > 0) {
						subject.children.forEach(item => {
							let _quesCount = 0
							let _ids = []
							_ids.push(item.value)
							self.getSubjectChildIds(item.children, _ids)
							ques.forEach(t=>{
								_ids.forEach(id=>{
									if(t.get('subjects').indexOf(id)!=-1){
										_quesCount++
									}
								})
							})
							item.quesCount = _quesCount //questions.length
							if(item.quesCount > 0) {
								item.childrenCount = item.quesCount
								let quesIndex = 0
								self.subjectProgress.forEach(t=>{
									if(t.get('subjectId') == item.value){
										if(t.get('subjectIndex')){
											quesIndex += t.get('subjectIndex')
										}
									}
								})
								item.progress = (quesIndex ? quesIndex : 0)
							}
							subIndex+=item.progress
						})
					}
					if(subIndex>0&&subject.progress==0){
						subject.progress = subIndex
					}
					uni.hideLoading()
				})
			},
			jump(item) {
				uni.navigateTo({
					url:'/homeSubPackage/pages/subject/subject?sid='+item.objectId
				})
			}
		}
	}
</script>

<style scoped>
	.questionbank-item {
		width: 690rpx;
		height: 216rpx;
		margin: 28rpx auto 0;
		display: flex;
		box-shadow: 0 4rpx 10rpx 0 rgba(0,0,0,0.1);
		border-radius: 24rpx;
		padding: 20rpx;
	}
	.questionbank-item .img {
		width: 180rpx;
		height: 180rpx;
		margin-right: 28rpx;
	}
	.questionbank-item .img image {
		border-radius: 20rpx;
		width: 100%;
		height: 100%;
	}
	.questionbank-item .content {
		display: flex;
		flex-direction: column;
		flex: 1 0 auto;
		justify-content: space-between;
	}
	.questionbank-item .content .title {
		font-size: 32rpx;
		font-weight: 600;
		line-height: 44rpx;
		margin-top: 12rpx;
	}
	.questionbank-item .content .info {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-end;
		font-size: 20rpx;
		font-weight: 400;
		line-height: 32rpx;
		font-family: PingFangSC-Regular;
		color: rgba(0,0,0,.5);
	}
	.questionbank-item image {
		width: 108rpx;
		height: 48rpx;
		margin-bottom: -4rpx;
	}
	/* .questionbank-item .btn{
		width: 100rpx;
		height: 40rpx;
		border-radius: 20rpx;
		font-size: 24rpx;
		text-align: center;
		line-height: 40rpx;
		color: #FF6867;
		border: 2rpx solid #FF6867;
		margin-right: 12rpx;
	} */
</style>
