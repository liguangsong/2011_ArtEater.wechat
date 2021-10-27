<template>
	<view class="tree-item">
		<view class="leave0" v-if='item.leave == 0'>
			{{item.label}}
		</view>
		<view v-else class="item" @click='changeItem'>
			<view class="leave" :style='{paddingLeft: item.leave*52 + "rpx"}'>
				<view class="title">
					<image :src="item.type == 'mp4' ? video : audio"></image>
					{{item.label}}
				</view>
				<view class="acllow-left">
					<text class='study'>正在学习</text>
					<text class='left'>></text>
				</view>
			</view>
		</view>
		<treeNode  v-for='(attr,i) in item.children' :key='i' :item='attr'></treeNode>
	</view>
</template>

<script>
	import treeNode from './tree-node.vue';
	export default {
		name: 'treeNode',
		components: {
			treeNode
		},
		props: {
			item: {
				type: Object,
				default: () => {}
			}
		},
		inject: [
			'onClickItem',
		],
		data() {
			return {
				audio: '../../curriculumSubPackage/static/audio.png',
				video: '../../curriculumSubPackage/static/video.png'
			}
		},
		methods: {
			changeItem() {
				this.onClickItem(this.item)
			}
		}
	}
</script>

<style>
	.tree-item > view {
		height: 84rpx;
		line-height: 84rpx;
	}
	.leave0 {
		background: #f7f7f7;
		width: 100%;
		padding-left: 48rpx;
		font-size: 28rpx;
		font-weight: 900;
		transform: translateY(1px);
	}
	.leave0::before {
		display: inline-block;
		content: '';
		width: 6rpx;
		height: 24rpx;
		background: #D81E1F;
		line-height: 84rpx;
		margin-right: 8rpx;
	}
	.item {
		background: #fff;
		padding-left: 48rpx;
	}
	.leave {
		font-size: 24rpx;
		height: 85rpx;
		border-top: 1px solid #f7f7f7;
		display: flex;
		justify-content: space-between;
	}
	.leave .title {
		position: relative;
	}
	.leave image {
		position: absolute;
		top: 24rpx;
		left: -42rpx;
		width: 36rpx;
		height: 36rpx;
	}
	.acllow-left {
		padding-right: 40rpx;
		color: rgba(0,0,0,0.3)
	}
	.acllow-left .study {
		font-size: 22rpx;
		margin-right: 32rpx;
	}
	.none {
		color: #ccc;
	}
</style>
