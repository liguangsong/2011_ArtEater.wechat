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
	//获取音视频时长
	async getVideoOrAudioDuration(v) {
		v.duration='';
		let innerAudioContext =uni.createInnerAudioContext();
		innerAudioContext.src=v.link;
		await innerAudioContext.onCanplay( async()=>  {
			setTimeout(()=>{
			v.duration =  this.sToHs(Math.floor(innerAudioContext.duration * 1000));
			},10);
			v.duration=this.sToHs(Math.floor(innerAudioContext.duration * 1000));
		});
	},
	sToHs(s) {
		let h;
		s = s / 1000;
		h = Math.floor(s / 60);
		s = Math.floor(s % 60);
		h += '';
		s += '';
		h = h.length === 1 ? '0' + h : h;
		s = s.length === 1 ? '0' + s : s;
		return h + ':' + s;
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
		let ne=[]
		if(res){
			for(let i=0; i<res.length;i++) {
				let v= res[i];
				v=v.toJSON();
				if(v.course.flag==2 && !!v.course.link &&(v.course.kind==1 || v.course.kind==2)){
					this.getVideoOrAudioDuration(v.course).then(()=>{
						ne.push(v)
					});
					
				}else{
					ne.push(v)
				}
			}
			return ne;
		}else{
			return ne;
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