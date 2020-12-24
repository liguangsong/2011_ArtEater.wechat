<template>
	<view class="myCom">
		<my-radio v-for="option in myOptions" :disabled="disabled" :class="'item state' + option.state" :state="option.state?option.state:1" :code="option.code" :text="option.content" :value="option.value" :checked="option.value=='1'" @valueChange="valueChange"></my-radio>
	</view>
</template>

<script>
	import myRadio from './myRadioBox.vue'
	export default {
		components:{
			myRadio
		},
		name:'myRadioGroup',
		props:{
			options:{
				type: Array,
				default: []
			},
			index:{
				type: Number,
				default: 0
			},
			value: {
				type: String,
				default: ''
			},
			type:{
				type: String,
				default: ''
			},
			disabled:{
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				myOptions:[]
			};
		},
		onReady() {
			var options = JSON.parse(JSON.stringify(this.options))
			this.myOptions = []
			options.forEach((option)=>{
				if(!option.state||option.state == 0){
					option.state = 1
				}
				this.myOptions.push(option)
			})
		},
		watch:{
			options(val){
				var options = JSON.parse(JSON.stringify(val))
				this.myOptions = []
				options.forEach((option)=>{
					if(!option.state||option.state == 0){
						option.state = 1
					}
					this.myOptions.push(option)
				})
			}
		},
		methods:{
			valueChange(e){
				if(this.type=='radio'){
					this.myOptions.forEach((item)=>{
						if(item.code == e.code){
							item.state = 2
						} else {
							item.state = 1
						}
					})
				} else if(this.type == 'check') {
					this.myOptions.forEach((item)=>{
						if(item.code == e.code){
							if(item.state==1){
								item.state = 2
							} else {
								item.state = 1
							}
						}
					})
				}
				this.$emit('change', this.myOptions, this.index)
			}
		}
	}
</script>

<style>
	.myCom .item{
		display: inline-block;
		width: 100%;
		border: 2rpx solid #fbfbfb;
		border-radius: 0rpx;
		margin-top: 10rpx;
	}
	.myCom .item:last-child,.myCom .item.state1:last-child,.myCom .item.state3:last-child,.myCom .item.state5:last-child{
		border-bottom-color: #fbfbfb;
	}
	.myCom .item.state1{
		/* border: 0; */
		border-bottom: 2rpx solid #f2f2f2;
	}
	.myCom .item.state2{
		border: 2rpx solid rgba(53, 32, 38 , 0.1);
		background-color: #ffffff;
	}
	.myCom .item.state3{
		border-color: #fbfbfb;
		border-bottom: 2rpx solid #f2f2f2;
	}
	.myCom .item.state4{
		border: 2rpx solid #ffdfdf;
		background-color: #ffe8e8;
	}
	.myCom .item.state5{
		border-color: #fbfbfb;
		border-bottom: 2rpx solid #f2f2f2;
	}
	.myCom .item.state6{
		border: 2rpx solid #d9e6e7;
		background-color: #eaf1f4;
	}
</style>
