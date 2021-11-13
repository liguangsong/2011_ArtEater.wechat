<template>
	<view class="list">
		<!-- <audition-learning :list="curriculumList" v-if="curriculumList.length&&moduleName=='正在学习'" @learnChangeUrl="changeUrl"></audition-learning>
		<audition :list="curriculumList" v-else-if="curriculumList.length" @changeUrl="changeUrl"></audition> -->
		<Navbar navbarBg='#F7F7F7' title='课程' align='center' fontColor="#000" iconColor='#000'>
			<view style='height: 24rpx;'></view>
			<audition-learning :list="curriculumList" v-if="curriculumList.length&&moduleName=='正在学习'" @learnChangeUrl="changeUrl"></audition-learning>
			<audition :list="curriculumList" v-else-if="curriculumList.length" @changeUrl="changeUrl"></audition>
		</Navbar>
	</view>
</template>

<script>
	import Curriculum from '@/js/utils/curriculum.js'
	import audition from '@/components/audition/audition.vue'
	import auditionLearning from '@/components/audition/auditionLearning.vue'
	import Navbar from '../../../components/navBar/navbar.vue';
	export default {
		data() {
			return {
				objId:'',
				moduleName:'',
				curriculumList:[]
			}
		},
		components:{audition,auditionLearning,Navbar},
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
			if(this.moduleName=='免费试听'){
				await this.getFreeCurrList();
			}else if(this.moduleName=='正在学习'){
				await this.getLearning();
			}else{
				await this.getModuleCurrList();
			}
			
		},
		methods: {
			async changeUrl(item) {
				//配置url
				let app = getApp();
				let member = app.globalData.member;
				let vip=false;
				if(member && member.memberType!=2 && (member.endTime > Date.now())){
                  vip=true;
				}
				let toUrl='';
				if(this.moduleName=='正在学习'){
					toUrl=await Curriculum.configUrl({course:item},vip);
				}else{
					toUrl=await Curriculum.configUrl(item,vip);
					// 记录点击量
					await Curriculum.recordClickNum(item.objectId);
				}
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
			},
			async getLearning() {
				this.curriculumList=[];
				let res=await Curriculum.getLearning();
				this.curriculumList=res;
				console.log(this.curriculumList,6667777)
			}
		}
	}
</script>

<style lang="scss" scoped>
  .list{
		background: #f7f7f7;
		height: 100vh;
  }
</style>
