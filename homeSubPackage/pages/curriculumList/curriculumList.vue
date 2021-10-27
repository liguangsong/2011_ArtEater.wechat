<template>
	<view>
		<audition :list="curriculumList" v-if="curriculumList.length"></audition>
	</view>
</template>

<script>
	import Curriculum from '@/js/utils/curriculum.js'
	import audition from '@/components/audition/audition.vue'
	export default {
		data() {
			return {
				objId:'',
				moduleName:'',
				curriculumList:[]
			}
		},
		comments:{audition},
		onLoad(options) {
		this.objId=options.objId;
		this.moduleName=options.moduleName;
		uni.setNavigationBarTitle({
			title:this.moduleName
		});
		},
		async onShow() {
			await this.getModuleCurrList();
		},
		methods: {
			//获取模块内的所有课程
			async getModuleCurrList() {
				this.curriculumList=[];
				let res=await Curriculum.getCategoryCurriculum(this.objId);
				this.curriculumList=res;
				console.log(res,'qqqqqq')
			}
		}
	}
</script>

<style>

</style>
