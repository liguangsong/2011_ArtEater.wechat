import Parse from '@/parse/index.js'
export default {
	//获取所有模块
	async getHomeSetting(id) {
		  let homeSetting= new Parse.Query('homeSetting');
		  if(id){
			  homeSetting.equalTo('objectId',id);
		  }
		  homeSetting.ascending('showOrder');
		  let res=await homeSetting.find();
		      if(res){
				res = res.map(v=>v.toJSON());
				for(let i=0; i<res.length; i++){
					let v=res[i];
					let course= await this.getCategoryCurriculum(v.objectId);
					if(course){
						v.list=course;
					}else{
						v.list=[];
					}
				}
			  }else{
				  res=[]
			  }
			  return res;
	},
	//根据分类获取课程
	async getCategoryCurriculum(objectId) {
		let ModuleAssociatedCourses= new Parse.Query('ModuleAssociatedCourses');
		var homeSetting = Parse.Object.extend("homeSetting")
		let category= homeSetting.createWithoutData(objectId);
		    ModuleAssociatedCourses.equalTo('module',category);
			ModuleAssociatedCourses.include('module');
			ModuleAssociatedCourses.include('course');
		    ModuleAssociatedCourses.ascending('displayOrder');
		let count=await ModuleAssociatedCourses.count();
			ModuleAssociatedCourses.limit(count)
		let res = await ModuleAssociatedCourses.find();
		if(res){
			return res;
		}else{
			return [];
		}
	},
	// 免费试听
	async getFreeCurrList(index) {
		let ModuleAssociatedCourses= new Parse.Query('ModuleAssociatedCourses');
		    ModuleAssociatedCourses.equalTo('courseListening',index);
			ModuleAssociatedCourses.include('course');
		let count=await ModuleAssociatedCourses.count();
			ModuleAssociatedCourses.limit(count)
			ModuleAssociatedCourses.ascending('displayOrder');
		let res = await ModuleAssociatedCourses.find();
		    if(res){
		    	return res;
		    }else{
		    	return [];
		    }
	},
	//初始获取正在学习的列表
	async getLearning(){
		let curriculum= new Parse.Query('coursesModule');
		let openid= uni.getStorageSync('openid');
		let learning= new Parse.Query('Learning');
			learning.equalTo('openId',openid);
			let res = await learning.first();
			let ids=res.get('ids');
			if(ids){
				 curriculum.containedIn('objectId',ids);
				let  course=await curriculum.find();
				   if(course){
					   let newres=[]
					   ids.forEach(s=>{
						   course.forEach(v=>{
							   v = v.toJSON();
							   v.objectId==s && newres.push(v);
						   })
					   })
					   res=newres;
				   }else{
					   res = []
				   }
			}else{
				res = []
			}
			return res;
	},
	//添加正在学习数据****************
	async operateCollections(id) {
		
	},
	// 配置模块的课程被点击时的跳转url
	async configUrl(item) {
		let toUrl=''
		// if(item.course.flag==1 && item.course.level==0){
		// 	// 系列课程点击时到详情页有介绍有详情
		// 	toUrl = '/curriculumSubPackage/pages/study/study?objectId='+item.course.objectId;
		// }else if((!item.course.isVipCourse&&item.course.flag==2) || (!item.course.isVipCourse&&item.course.flag==1 && item.course.level!=0)){
		// 	//非vip单课程点击时直接播放页
		// 	toUrl = '/curriculumSubPackage/pages/details/details?objectId='+item.course.objectId;
		// }else if((item.course.isVipCourse&&item.course.flag==2) || (item.course.isVipCourse&&item.course.flag==1&& item.course.level!=0)){
		// 	//vip单课程点击时跳转到开通会员
		// 	toUrl = '/mineSubPackage/pages/vip/vip';
		// }
		console.log(item,5556)
		if(!item.course.isVipCourse){
			if(item.course.flag==1){
				if(item.course.level==0){
					// 系列课程点击时到详情页有介绍有详情
					toUrl = '/curriculumSubPackage/pages/study/study?objectId='+item.course.objectId;
				}else{
					//非vip单课程点击时直接播放页
					toUrl = '/curriculumSubPackage/pages/details/details?objectId='+item.course.objectId;
				}
			}else{
				   //非vip单课程点击时直接播放页
				   toUrl = '/curriculumSubPackage/pages/details/details?objectId='+item.course.objectId;
			}
		}else {
			if(item.course.flag==1){
				if(item.course.level==0){
					// 系列课程点击时到详情页有介绍有详情
					toUrl = '/curriculumSubPackage/pages/study/study?objectId='+item.course.objectId;
				}else{
					//vip单课程点击时跳转到开通会员
					toUrl = '/mineSubPackage/pages/vip/vip';
				}
			}else{
				   //vip单课程点击时跳转到开通会员
				   toUrl = '/mineSubPackage/pages/vip/vip';
			}
		}
		
		return toUrl;
	},
	// 记录课程点击量
	async recordClickNum(objectId) {
		let ModuleAssociatedCourses= new Parse.Query('ModuleAssociatedCourses');
		    ModuleAssociatedCourses.equalTo('objectId',objectId);
		let res= await ModuleAssociatedCourses.first();
			if(res){
			   let realNum=res.get('realNum');
				   realNum=realNum||0;
				   realNum+=1;
				   res.set('realNum',realNum);
				   await res.save();
			}
	}
}