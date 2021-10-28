<template>
	<view>
		<audition :list="curriculumList" v-if="curriculumList.length" @changeUrl="changeUrl"></audition>
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
			this.moduleName=options.moduleName;
			uni.setNavigationBarTitle({
				title:this.moduleName
			});
		if(options.objId){
			this.objId=options.objId;
		}
		},
		async onShow() {
			if(this.moduleName!='免费试听'){
				await this.getModuleCurrList();
			}else{
				await this.getFreeCurrList();
			}
			
		},
		methods: {
			async changeUrl(item) {
				//配置url
				let toUrl=await Curriculum.configUrl(item);
				// 记录点击量
				await Curriculum.recordClickNum(item.objectId);
				uni.navigateTo({
					url:toUrl
				})
			},
			//获取模块内的所有课程
			async getModuleCurrList() {
				this.curriculumList=[];
				let res=await Curriculum.getCategoryCurriculum(this.objId);
				this.curriculumList=res;
				console.log(res,'qqqqqq')
			},
			//获取免费试听
			async getFreeCurrList() {
				this.curriculumList=[];
				let res=await Curriculum.getFreeCurrList(1);
				this.curriculumList=res;
			}
		}
	}
</script>

<style>

</style>
