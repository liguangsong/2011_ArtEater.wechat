<template>
	<view>
		{{content}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mid:'',
				content:''
			}
		},
		onLoad(options) {
			if(options.mid){
				this.mid = options.mid
			}
			var self = this
			// 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('content', function(res) {
				self.content = res.data
			})
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
