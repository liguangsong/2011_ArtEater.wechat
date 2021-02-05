<template>
	<view>
		<u-popup v-model="visiable" height="500rpx" mode="bottom" @close="handleCancle" :closeable="true">
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
				<button class="btnChoose" @click="handleComplate">确定</button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		props:{
			visiable:{
				type: Boolean,
				default: false
			},
			value:{
				type: Array,
				default: []
			}
		},
		data() {
			return {
				universities:[
					{code:'中央美术学院',name:'中央美术学院',checked:false},
					// {code:'中国美术学院',name:'中国美术学院',checked:false},
					{code:'清华大学美术学院',name:'清华大学美术学院',checked:false},
					// {code:'西安美术学院',name:'西安美术学院',checked:false},
					// {code:'四川美术学院',name:'四川美术学院',checked:false},
					// {code:'鲁迅美术学院',name:'鲁迅美术学院',checked:false},
					// {code:'湖北美术学院',name:'湖北美术学院',checked:false},
					// {code:'天津美术学院',name:'天津美术学院',checked:false},
					// {code:'广州美术学院',name:'广州美术学院',checked:false},
					// {code:'其它',name:'其它',checked:false}
				],
			};
		},
		onLoad() {
			uni.loadFontFace ({
				family: 'PingFangSC-Medium',
				source: 'url("https://www.arteater.cn/PingFangSCMedium.ttf")',
				success: function(){
					console.log('load font success')
				}
			})
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
	.myckView{
		overflow: hidden;
	}
	.checkGroup{
		padding: 0 84rpx;text-align: center;
		margin-top: 90rpx;
		height: 250rpx;
		overflow-y:auto;
	}
	.checkGroup .checkItem{
		width: 580rpx;
		height: 100rpx;
		line-height: 100rpx;
		border-bottom: 2rpx solid #f2f2f2;
		display: flex;
		
	}
	.checkGroup .checkItem .title{
		flex: 1;
		text-align: left;
		font-family: PingFangSC-Medium;
		font-size: 34rpx;
		color: #352026;
	}
	.checkGroup .checkItem .title.checked{
		color: #ff6867;
	}
	.checkGroup .checkItem .icon{
		width: 50rpx;
		text-align: right;
		height: 100rpx;
		line-height: 100rpx;
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
	.btnChoose{
		width: 690rpx;
		height: 92rpx;
		line-height: 92rpx;
		border-radius: 92rpx;
		text-align: center;
		background-color: #ed3535;
		color: #ffffff;
		margin-top: 10rpx;
		font-size: 34rpx;
		font-family: PingFangSC-Medium;
	}
</style>
