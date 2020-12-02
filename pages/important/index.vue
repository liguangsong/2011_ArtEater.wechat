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
			const query = new this.Parse.Query(Subjects)
			query.startsWith("parent_ID", "0")
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
		padding: 22rpx 36rpx;
	}
	.myPage{
		width: calc(100% - 80rpx);
		padding: 40rpx;
		background-color: #FFFFFF;
		border-radius: 46rpx;
	}
	.myPage .subjectItem{
		padding: 0 36rpx;
		display: flex;
		height: 106rpx;
		line-height: 106rpx;
		border-bottom: 1rpx solid #eeeeee;
	}
	.myPage .subjectItem:last-child{
		border: 0;
	}
	.myPage .subjectItem .subjectName{
		flex: 1;
	}
	.myPage .subjectItem .icon{
		width: 50rpx;
		text-align: right;
	}
</style>
