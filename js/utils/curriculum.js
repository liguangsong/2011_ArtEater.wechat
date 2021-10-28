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
	// 配置模块的课程被点击时的跳转url
	async configUrl(item) {
		let toUrl=''
		if(item.course.flag==1){
			// 系列课程点击时到详情页有介绍有详情
			toUrl = '/curriculumSubPackage/pages/study/study';
		}else if(!item.course.isVipCourse&&item.course.flag==2){
			//非vip单课程点击时直接播放页
			toUrl = '/curriculumSubPackage/pages/details/details';
		}else if(item.course.isVipCourse&&item.course.flag==2){
			//vip单课程点击时跳转到开通会员
			toUrl = '/mineSubPackage/pages/vip/vip';
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
	},
	//获取所有课程
	async getCurriculum(id) {
		  let curriculum= new Parse.Query('coursesModule');
		  if(id){
			  curriculum.equalTo('objectId',id);
		  }
		  curriculum.ascending('createdAt');
		  // curriculum.ascending('index');
		  let res=await curriculum.find();
		      res = res.map(v=>v.toJSON());
			  return res;
	},
	
}