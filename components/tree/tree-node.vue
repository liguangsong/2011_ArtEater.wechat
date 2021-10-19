<template>
	<view class="tree-item">
		<view class='label'>
			<view class="icon">
				<u-icon v-if='item.type=="mp3" && !item.children' name="photo" size="28"></u-icon>
				<u-icon v-if='item.type=="mp4" && !item.children' name="tags" size="28"></u-icon>
			</view>
			<view class="title">				
				<text @click='changeItem'>{{item.label}}</text>
				<text v-if='item.upstudy' class='upstudy'>
					上次学习
				</text>
			</view>
			<view class="more">
				<text v-if='!item.children'>></text>
			</view>
		</view>
		<view :style='{marginLeft: "30px"}' v-if='item.children && item.children.length > 0'>
			<treeNode 
				v-for='(attr,i) in item.children'
				:key='i'
				:item='attr'
			/>
		</view>
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
	.label {
		line-height: 56rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		position: relative;
	}
	.label .icon {
		position: absolute;
		left: -40rpx;
		height: 56rpx;
		line-height: 56rpx;
	}
	.label .title {
		flex: 1 0 auto;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.label .title .upstudy {
		color: #ccc;
		margin-right: 20rpx;
	}
	
	
</style>
