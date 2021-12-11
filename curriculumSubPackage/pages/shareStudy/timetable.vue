<template>
	<view class="timetable">
		<!-- <view :class="{content: unlock}"> -->
		<view>
			<view class="catalogue">
				<text>课程目录</text>
			</view>
			<Tree :list='list' @onClickItem='onClickItem' :showAllbtn='true' />
		</view>
	</view>
</template>

<script>
	import Tree from '../../../components/tree/tree.vue'
	export default {
		props: {
			list: {
				type: Array,
				default: []
			}
		},
		data() {
			return {

			}
		},
		components: {
			Tree,
		},
		methods: {
			onClickItem(item) {
				let app = getApp();
				let member = app.globalData.member;
				let vip = false;
				if (member && member.memberType != 2 && (member.endTime > Date.now())) {
					vip = true;
				}
				if (item.kind != 4) {
					if (item.vip && !vip) {
						uni.navigateTo({
							url: '/mineSubPackage/pages/vip/vip'
						});
					} else {
						uni.navigateTo({
							url: '/curriculumSubPackage/pages/shareDetails/details?objectId=' + item.objectId +
								'&shareType=1'
						});
					}
				}
			}
		}
	}
</script>
<style scoped>
	.catalogue {
		margin-top: 4rpx;
		font-size: 28rpx;
		margin-bottom: 14rpx;
		font-weight: 500;
		padding-left: 48rpx;
		color: #D81E1F;
	}

	.catalogue text:before {
		display: inline-block;
		content: "";
		width: 10rpx;
		height: 24rpx;
		background: #D81E1F;
		margin-right: 10rpx;
		transform: translateY(2rpx);
		border-radius: 1px;
	}

	.content {
		height: 600rpx;
		overflow: hidden;
	}
</style>
