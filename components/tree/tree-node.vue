<template>
	<view class="tree-item">
		<view class="leave0" v-if='item.level == 1&&item.kind==4'>
			{{item.subjectName}}
		</view>
		<view v-else class="item" @click.stop='changeItem'>
			<view class="leave" :style='{paddingLeft: (item.level-1)*56 + "rpx", color:item.kind==4 && (!item.children || !item.children.length)?"rgba(0,0,0,0.3)":"rgba(0,0,0,0.7)"}'>
				<view class="title">
					<image class="icon" :src="item.kind == '1' ? video :item.kind == '2'? audio:''"></image>
					<text class='txt' :class="{cur:item.preLearn,fre:!item.vip}" v-if='item.kind!=4'>{{item.subjectName}}</text>
					<text class='txt kind' :class="{cur:item.preLearn,fre:!item.vip}" v-else>{{item.subjectName}}</text>
					<text class='free' v-if='!item.vip'>免费</text>
				</view>
				<view class="acllow-left" v-if="item.preLearn">
					<text class='study'>上次学习</text>
				</view>
				<view class="arrow-box" @click.stop='close'>
					<image class='left' src="../../curriculumSubPackage/static/icon_tg.png" mode=""></image>
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
		padding-left: 62rpx;
		font-size: 28rpx;
		font-weight: 700;
		transform: translateY(1px);
		font-family: PingFangSC-Semibold;
	}
	.item {
		background: #fff;
		padding-left: 48rpx;
	}
	.free {
		display: inline-block;
		height: 24rpx;
		width: 44rpx;
		background: #eee;
		color: #ccc;
		font-size: 14rpx;
		line-height: 24rpx;
		text-align: center;
		margin-left: 20rpx;
		border-radius: 4rpx;
	}
	.leave {
		/* height: 85rpx; */
		border-top: 1px solid #f7f7f7;
		display: flex;
		justify-content: space-between;
		font-size: 24rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: rgba(0,0,0,0.7);
	}
	.leave .title {
		position: relative;
	}
	.leave .title .txt {
		opacity: .75;
		color: #000;
		max-width: 562rpx;
		overflow: hidden;
		display: inline-block;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.leave .title .txt.cur{
		max-width:500rpx;
	}
	.leave .title .txt.fre{
		max-width:499rpx;
		vertical-align: bottom;
	}
	.leave .title .txt.cur.fre{
		max-width:430rpx;
		vertical-align: bottom;
	}
	.kind {
		opacity: .3 !important;
	}
	.leave .icon {
		position: absolute;
		top: 24rpx;
		left: -46rpx;
		width: 36rpx;
		height: 36rpx;
	}
	.acllow-left {
		font-size: 16rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(0,0,0,0.3);
		line-height: inherit;
		position: absolute;
		right: 88rpx;
	}
	.arrow-box{
		width:88rpx;
	}
	.arrow-box image {
		margin-left: 24rpx;
	}
	.left{
		width: 22rpx;
		height: 34rpx;
		vertical-align: text-top;
	}
	.none {
		color: #ccc;
	}
</style>
