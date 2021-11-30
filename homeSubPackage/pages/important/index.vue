<template>
	<TopNavbar title='重点题库' paddingTop='216'>
	<view class="myPage">
		<!-- <view style="text-align: center;padding-top: 200rpx;">	
			<view style="text-align: center;">
				<image mode="aspectFit" src="https://art-eater.oss-cn-beijing.aliyuncs.com/%E5%BF%85%E8%80%83%E9%A2%98%E5%BA%93%E6%8F%92%E5%9B%BE%403x.png" style="width:598rpx;height: 366rpx;"></image>
			</view>
			<view style="	height: 50rpx;font-family: PingFangSC-Medium;font-size: 34rpx;color: #352026;margin-top: 84rpx;margin-bottom: 28rpx;">即将上线</view>
			<text style="font-family: PingFangSC-Medium;font-size: 30rpx;line-height: 42rpx;color: rgba(53, 32, 38, 0.7);">
			由央美史论名师团队在海量试题中
			锁定必考知识点，精选出必考题库，
			使复习有的放矢，大大节省你的学习时间。</text>
		</view> -->
		<view class="subjectItem" v-if="sub.subject_name!='科技文艺常识'" v-for="(sub) in subjects" @click="handleSubjectClick" :data-item="sub">
			<view class="img">
				<image v-if="sub.subject_name=='中国美术史'" src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/%E4%B8%AD%E5%9B%BD%E7%BE%8E%E6%9C%AF%E5%8F%B2-%E6%A0%87%E9%A2%98%E5%9B%BE1.jpg" mode=""></image>
				<image v-if="sub.subject_name=='外国美术史'" src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/%E5%A4%96%E5%9B%BD%E7%BE%8E%E6%9C%AF%E5%8F%B2-%E6%A0%87%E9%A2%98%E5%9B%BE1.jpg" mode=""></image>
				<image v-if="sub.subject_name=='美术鉴赏'" src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/%E8%89%BA%E6%9C%AF%E6%A6%82%E8%AE%BA-%E6%A0%87%E9%A2%98%E5%9B%BE1.jpg" mode=""></image>
			</view>
			<view class="progress">
				<u-line-progress :percent="sub.progress*100/sub.childrenCount" :show-percent="false" height="10" active-color="#ff6f68"></u-line-progress>
			</view>
			<view class="tips">
				已完成：{{sub.percent}}%
			</view>
		</view>
	</view>
	</TopNavbar>
</template>

<script>
	import TopNavbar from '@/components/navBar/topNavbar.vue'
	export default {
		data() {
			return {
				count: 0,
				subjects:[],
				subjectProgress:[]
			}
		},
		components: {
			TopNavbar
		},
		onShow() {			
			var self = this
			uni.getStorage({
				key:'openid',
				success(r) {
					var openid = r.data
					var queryProgress = new self.Parse.Query("SubjectProgress")
					queryProgress.equalTo('openid',openid)
					queryProgress.equalTo('isImportant', 1)
					queryProgress.limit(10000)
					queryProgress.find().then(pres=>{
						self.subjectProgress = pres
						self.bindSubjectTree()
					})
				}
			})
		},

		methods: {
			
			/* 加载科目树*/
			bindSubjectTree(){
				var self = this
				uni.showLoading({
					title:'加载中……'
				})
				var query = new this.Parse.Query("Subjects")
				query.ascending('createdAt')
				query.limit(10000)
				query.find().then(res=>{
					var tree = self.initSubjectTree(res, '0')
					self.subjects = tree
					console.log(self.subjects)
					self.subjects.forEach(t=>{
						self.handleGetTestCount(t)
					})
				})
			},
			/** 构造树形科目 */
			initSubjectTree(subjects, parentId, ){
				var self = this
				var treeValue = []
				let _subjects = subjects.filter((_item)=>{
					return _item.get('parent_ID') == parentId
				})
				_subjects.forEach((_subject, _index)=> {
					let subject = {
						subject_name: _subject.get('subject_name'),
						content: _subject.get('content'),
						price: _subject.get('price'),
						quesCount: _subject.quesCount,
						extend: false,
						has_down_level: _subject.get('has_down_level'),
						id: _subject.id,
					}
					let childrens = subjects.filter(_item=>{
						return _item.get('parent_ID') == _subject.id
					})
					subject.progress = 0
					subject.childrenCount = 0
					subject.percent = 0
					if(childrens.length > 0) { // 有子集
						subject.children = self.initSubjectTree(subjects, _subject.id)
					}
					treeValue.push(subject)
				})
				return treeValue
			},
			handleSubjectClick(e){
				var item = e.currentTarget.dataset.item
				// console.log(e);
				// return
				uni.navigateTo({
					url:'/homeSubPackage/pages/important/subject?sid='+item.id
				})
			},
			
			/*查看科目下题目数量*/
			handleGetTestCount(subject){
				var self = this
				var ids = []
				ids.push(subject.id)
				self.getSubjectChildIds(subject.children, ids)
				uni.showLoading({
					title:'加载中……'
				})
				var quesQuery = new self.Parse.Query("TestQuestions")
				quesQuery.equalTo('isImportant', 1)
				quesQuery.containedIn('subjects', ids)
				quesQuery.limit(10000)
				quesQuery.find().then(ques=>{
					subject.childrenCount = ques.length
					self.subjectProgress.forEach(t=>{
						if(t.get('subjectId') == subject.id){
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
							_ids.push(item.id)
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
									if(t.get('subjectId') == item.id){
										if(t.get('subjectIndex')){
											quesIndex += t.get('subjectIndex')
										}
									}
								})
								item.progress = quesIndex
							}
							subIndex+=item.progress
						})
					}
					if(subIndex>0&&subject.progress==0){
						subject.progress = subIndex
					}
					subject.percent = (subject.progress*100/subject.childrenCount)
					if(!subject.percent) {
						subject.percent = '0'
					} else {
						subject.percent = subject.percent.toFixed(2)
					}
					uni.hideLoading()
				})
			},
			getSubjectChildIds(tree, subjectIds){
				var self = this
				if(tree){
					tree.forEach(item=>{
						subjectIds.push(item.id)
						if(item.children){
							self.getSubjectChildIds(item.children, subjectIds)
						}
					})
				}
			}
		}
	}
</script>

<style>
	.myPage .subjectItem{
		position: relative;
		margin: 0 auto 24rpx;
		width: 690rpx;
		height: 280rpx;
		background-color: #ffffff;
		box-shadow: 0rpx 16rpx 44rpx 0rpx 
			rgba(226, 171, 166, 0.21);
		border-radius: 24rpx;
		overflow: hidden;
	}
	.myPage .subjectItem .img{
		/* position: absolute;
		top: 10rpx;
		left: 10rpx;
		height: 230rpx;
		line-height: 230rpx;
		width: 670rpx;
		 */
		position: absolute;
		top: 0;
		left: 0;
		height: 192rpx;
		line-height: 192rpx;
		text-align: center;
		width: 100%;
	}
	.myPage .subjectItem .img image{
		width: 100%;
		height: 192rpx;
		line-height: 192rpx;
	}
	.myPage .subjectItem .progress{
		position: relative;
		top: 212rpx;
		width: 654rpx;
		left: 18rpx;
		height: 10rpx;
		line-height: 10rpx;
	}
	.myPage .subjectItem .tips{
		position: relative;
		top: 234rpx;
		left: 18rpx;
		height: 26rpx;
		line-height: 26rpx;
		font-family: PingFangSC-Regular;
		font-size: 18rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: rgba(53, 32, 38, 0.7);
	}
	.myPage .subjectItem:last-child{
		border: 0;
	}
	.myPage .subjectItem .subjectName{
		flex: 1;
		padding: 0 16rpx;
		font-family: PingFangSC-Medium;
		font-size: 34rpx;
		font-weight: bold;
	}
	.myPage .subjectItem .icon{
		width: 84rpx;
		text-align: center;
	}
</style>
