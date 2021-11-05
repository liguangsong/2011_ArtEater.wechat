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
			if(res){
				let ids=res.get('ids');
				if(ids){
					 curriculum.containedIn('objectId',ids);
					 curriculum.notEqualTo('isHideCourse',true);
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
			}else{
				res = []
			}
			return res;
	},
	//添加正在学习数据****************
	async changeLearn(id,status) {
		let openid= uni.getStorageSync('openid');
		let Learning = Parse.Object.extend('Learning');
		let newLearning= new Learning();
		let learning= new Parse.Query('Learning');
			learning.equalTo('openId',openid);
			let res = await learning.first();
			if(res){
			let ids=res.get('ids');
			if(ids){
				// 数据库有课程时 
				if(ids.includes(id)&&status!=true){
					// 如果有当前学习的课程学习完需要删除
				   ids.splice(ids.indexOf(id),1)
				}else if(ids.includes(id)&&status==true){
					// 如果有当前学习的课程未学习完需要取出来放到最前
				   let did=ids.splice(ids.indexOf(id),1);
				       ids=[...did,...ids];
				}else if(!ids.includes(id)&&status==true){
					//如果数据库没当前的学习课程，需要存直接存
					ids=[id,...ids];
				}
			}else if(!ids&&status==true){
				//如果没学习过课程则直接存进去
				ids=[id]
			}
			res.set('ids',ids);
			console.log(ids,1212121+'qqqqq');
			await res.save()
		}else{
			newLearning.set('openId',openid);
			newLearning.set('ids',[id]);
			await newLearning.save()
		}
	},
	// 配置模块的课程被点击时的跳转url
	async configUrl(item, vip) {
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
		// console.log(item,5556)
		
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
					if (vip) {
						toUrl = '/curriculumSubPackage/pages/study/study?objectId='+item.course.objectId;
					} else {
						toUrl = '/mineSubPackage/pages/vip/vip';
					}
				}
			}else{
				   //vip单课程点击时跳转到开通会员
					 if (vip) {
							toUrl = '/curriculumSubPackage/pages/details/details?objectId='+item.course.objectId;
					 } else {
							toUrl = '/mineSubPackage/pages/vip/vip';
					 }
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