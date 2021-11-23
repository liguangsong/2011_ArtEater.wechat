<template>
	<view>
		<u-popup v-model="visiable" height="100%" mode="bottom" @close="handleCancle">
			<TopNavbar bg='#fff' title='目标院校' @closeNavbar='$emit("changeVisiable")' :iconFn='true'>
				<view class="myckView">
					<view class="checkGroup">
						<view class="checkItem" v-for="(item, index) in universities" @click="handleCheckItem" :data-item="item">
							<view :class="'title '+ (item.checked?'checked':'')">{{item.name}}</view>
							<view class="icon">
								<image v-if="!item.checked" src="../../static/icon/icon_check_normal.png"></image>
								<image v-else src="../../static/icon/icon_check_checked.png"></image>
							</view>
						</view>
					</view>
				</view>
				<view style='height: 140rpx;'></view>
			</TopNavbar>
			<view class="close">
				<button class="btnChoose" @click="handleComplate">确定</button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import TopNavbar from '../navBar/topNavbar.vue';
	export default {
		props:{
			visiable:{
				type: Boolean,
				default: false
			},
			value:{
				type: Array,
				default: []
			},
		
		},
		components: {
			TopNavbar
		},
		data() {
			return {
				universities:[
					{code:'中央美术学院',name:'中央美术学院',checked:false},
					{code:'中国美术学院',name:'中国美术学院',checked:false},
					{code:'清华大学美术学院',name:'清华大学美术学院',checked:false},
					{code:'西安美术学院',name:'西安美术学院',checked:false},
					{code:'四川美术学院',name:'四川美术学院',checked:false},
					{code:'鲁迅美术学院',name:'鲁迅美术学院',checked:false},
					{code:'湖北美术学院',name:'湖北美术学院',checked:false},
					{code:'天津美术学院',name:'天津美术学院',checked:false},
					{code:'广州美术学院',name:'广州美术学院',checked:false},
					{code:'其它',name:'其它',checked:false},
				],
			};
		},

		methods:{		
			handleCancle(){
				this.$emit('cancle')
			},
			handleCheckItem(e){
				var _item = e.currentTarget.dataset.item
				var itm = this.universities.find(function(item){
					return item.code == _item.code
				})
				itm.checked = !itm.checked
			},
			/* 完成选择 */
			handleComplate(){
				var codes = []
				this.universities.forEach(function(item){
					if(item.checked) {
						codes.push(item.code)
					}
				})
				this.$emit('complate',codes)
			}
		},
		watch:{
			value(newval){
				this.universities.forEach(function(item){
					if(newval.indexOf(item.code)==-1){
						item.checked = false
					} else {
						item.checked = true
					}
				})
			}
		}
	}
</script>

<style>
	.checkGroup{
		padding-left: 48rpx;
		text-align: center;
		height: 100%;
	}
	.checkGroup .checkItem{
		width: 100%;
		height: 90rpx;
		line-height: 100rpx;
		border-bottom: 2rpx solid #f2f2f2;
		display: flex;
		
	}
	.checkGroup .checkItem .title{
		flex: 1;
		text-align: left;
		/* font-family: PingFangSC-Medium;
		font-size: 34rpx;
		color: #352026; */
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(0,0,0,.67);
		line-height: 90rpx;
		
	}
	.checkGroup .checkItem .title.checked{
		color: #ED3535;
	}
	.checkGroup .checkItem .icon{
		width: 50rpx;
		text-align: right;
		height: 100rpx;
		margin-right: 48rpx;
		line-height: 90rpx;
	}
	.checkGroup .checkItem .icon image{
		width: 32rpx;
		height: 32rpx;
		display: inline-block;
		vertical-align: middle;
	}
	.ckbox{
		width: 580rpx;
		height: auto;
		display: inline-block;
		text-align: center;
	}
	
	.close {
		width: 750rpx;
		height: 140rpx;
		background: #FFFFFF;
		position: fixed;
		bottom: 0;
		left: 0;
	}
	.btnChoose{
		width: 690rpx;
		height: 92rpx;
		line-height: 92rpx;
		border-radius: 92rpx;
		text-align: center;
		background-color: #ed3535;
		color: #ffffff;
		margin-top: 8rpx;
		font-size: 34rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
	}
</style>
