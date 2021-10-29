import Parse from '@/parse/index.js'
export default{
	//获取课程及详情
	async getCurriculum(id) {
		  let curriculum= new Parse.Query('coursesModule');
		  if(id){
			  curriculum.equalTo('objectId',id);
		  }
		  curriculum.ascending('createdAt');
		  // curriculum.ascending('index');
		  let res=await curriculum.find();
		      if(res){
				res = res.map(v=>v.toJSON());  
			  }else{
				  res=[]
			  }
			  return res;
	},
	// 获取当前课程下的推荐课程
	async getRecommended(ids) {
		let curriculum= new Parse.Query('coursesModule');
			curriculum.containedIn('objectId',ids);
			curriculum.ascending('createdAt');
		let res=await curriculum.find();
		    if(res){
		    	res = res.map(v=>v.toJSON());  
		    }else{
		        res=[]
		    }
		    return res;
	},
	// 获取当前课程所属的整个系列课程
	async getAllTimetable(rootId,recursion) {
		let curriculum= new Parse.Query('coursesModule');
			curriculum.equalTo('rootId',rootId);
		const coursesModuleRoot = new Parse.Query("coursesModule");
			coursesModuleRoot.equalTo("objectId", rootId);
		const mainQuery = Parse.Query.or(curriculum, coursesModuleRoot);
		let res=await mainQuery.find();;
		    if(res){
		    	res = res.map(v=>v.toJSON());  
		    }else{
		        res=[]
		    }
			if(recursion){
				res=await this.arrToTree(res,0);
			}
			console.log(res,7876);
		    return res;
	},
	// 依次在数组中找到每一层级对应的元素，同时每个元素的 children 属性对应的 value 通过 pid 去找到，然后递归执行下去
	arrToTree(arr, pid=0) {
		console.log(arr,8888)
	  const res = [];
	  arr.forEach(item => {
	    if(item.parent_ID == pid) {
	      // 这样每次都需要遍历整个数组，因此时间复杂度为 n*n
	      // const children = arrToTree(arr, item.id)   
	
	      // 往下递归时，每次数组的大小都在减小，每次都筛选掉父代元素，最终的时间复杂度为 n*logn
	      const children = this.arrToTree(arr.filter(v => v.parent_ID !== pid), item.objectId);
	      if(children.length) {
	        res.push({ ...item, children })
	      }else {
	        res.push({ ...item })
	      }
	    }
	  });
	  console.log(res,123454321)
	  return res;
	}
}