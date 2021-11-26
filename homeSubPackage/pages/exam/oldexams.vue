<template>
	<view style="padding: 30rpx;">
		<u-parse :html="exam.content?exam.content:'暂无内容'"></u-parse>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				exam: {}
			}
		},
		onLoad(options) {
			var self = this
			if(options.tid) {
				const OldExams = this.Parse.Object.extend("OldExams")
				const query = new this.Parse.Query(OldExams)
				query.get(options.tid).then(exam => {
					self.exam = exam
				})
			}
		},
		methods: {
		}
	}
</script>

<style>

</style>
