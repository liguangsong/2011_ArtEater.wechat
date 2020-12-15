<template>
	<view class="myPage">
		<view class="subjectItem" v-for="(sub) in subjects" @click="handleSubjectClick" :data-item="sub">
			<view class="subjectName">
				{{sub.subject_name}}
			</view>
			<view class="icon">
				<u-icon name="arrow-right" color="#f4f4f4" size="32"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				subjects:[]
			}
		},
		onLoad() {			
			var self = this
			const Subjects = this.Parse.Object.extend("Subjects")
			const query = new this.Parse.Query("Subjects")
			query.equalTo("parent_ID", "0")
			query.ascending("createdAt")
			query.find().then(list => {
				self.subjects = list
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
			handleSubjectClick(e){
				var item = e.currentTarget.dataset.item
				uni.navigateTo({
					url:'./subject?sid='+item.objectId
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #fbfbfb;
	}
	.myPage{
		padding:0 34rpx 0 36rpx;
	}
	.myPage .subjectItem{
		margin-top: 24rpx;
		display: flex;
		height: 116rpx;
		line-height: 116rpx;
		border-radius: 20rpx;
		background-color: #ffffff;
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
