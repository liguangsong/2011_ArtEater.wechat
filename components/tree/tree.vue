<template>
	<view class='bg'>
		<!-- <view id='tree' :class="{rowheight: show}"> -->
		<view id='tree'>
			<tree-node 
				v-for='(item,i) in list'
				:key='i'
				:item='item'
			/>
		</view>
		<!-- <view @click='show=false' class="show-all" v-if='show'>
			<text>查看全部</text>
		</view> -->
	</view>
</template>

<script>
	import treeNode from './tree-node.vue'
	export default {
		name: 'tree',
		props: {
			list: {
				type: Array
			},
			showAllbtn: {
				type: Boolean,
				default: false
			}
		},
		components: {
			treeNode
		},
		provide(){
			return {
			  onClickItem: this.onClickItem,
			}
		},
		data() {
			return {
				show: false
			}
		},
		mounted() {
			let px = uni.upx2px(600);
			// console.log(px, '--');
			if (this.showAllbtn) {
				const query = uni.createSelectorQuery().in(this);
				query.select('#tree').boundingClientRect(data => {
					if (data.height < px) {
						this.show = false;
					} else {
						this.show = true;
					}
				}).exec();
			}
		},
		methods: {
			onClickItem(item) {
				this.$emit('onClickItem', item)
			}
		}
	}
</script>

<style>
	.bg {
		background: #f7f7f7;
	}
	.rowheight {
		height: 600rpx;
		overflow: hidden;
		padding-bottom: 20rpx;
	}
	.show-all {
		color: red;
		text-align: center;
		margin: 50rpx 0;
	}
</style>
