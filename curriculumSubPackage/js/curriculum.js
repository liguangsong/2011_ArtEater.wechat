import Parse from '@/parse/index.js'
import Config from '@/static/config/index.js'
export default {
	//获取课程及详情
	async getCurriculum(id) {
		let curriculum = new Parse.Query('CoursesModule');
		if (id) {
			curriculum.equalTo('objectId', id);
		}
	curriculum.notEqualTo('hide', true);
		
		curriculum.ascending('createdAt');
		let res = await curriculum.find();
		if (res) {
			res = res.map(v => v.toJSON());
		} else {
			res = []
		}
		return res;
	},
	//获取课程及详情
	async getHideCurriculum(id) {
		console.log(id,'ppppp')
		let curriculum = new Parse.Query('CoursesModule');
		    // curriculum.equalTo('hide', true);
		if (id) {
			curriculum.equalTo('objectId', id);
		}
		let res = await curriculum.find();
		if (res) {
			res = res.map(v => v.toJSON());
		} else {
			res = []
		}
		return res;
	},
	////初始获取上次学习的课程
	async getPreLearn(id) {
		let openid = uni.getStorageSync('openid');
		let learning = new Parse.Query('Learning');
		learning.equalTo('openId', openid);
		let res = await learning.first();
		var courseId = undefined;
		if (res) {
			let ids = res.get('preIds');
			if (ids) {
				courseId = ids[id];
			}
		}
		return courseId;
	},
	//更新上次学习课程Id
	async updatePreLearn(key, value) {
		let openid = uni.getStorageSync('openid');
		let Learning = Parse.Object.extend('Learning');
		let newLearning = new Learning();
		let learning = new Parse.Query('Learning');
		learning.equalTo('openId', openid);
		let res = await learning.first();
		if (res) {
			let ids = res.get('preIds');
			if (ids) {
				ids[key] = value;
			} else {
				ids = {
					[key]: value
				}
			}
			res.set('preIds', ids)
			await res.save();
		} else {
			newLearning.set('openId', openid);
			newLearning.set('preIds', {
				[key]: value
			});
			await newLearning.save();
		}
	},
	// 获取当前课程下的推荐课程
	async getRecommended(ids) {
		let curriculum = new Parse.Query('CoursesModule');
		curriculum.notEqualTo('hide', true);
		curriculum.containedIn('objectId', ids);
		curriculum.ascending('createdAt');
		let res = await curriculum.find();
		console.log(res);
		if (res) {
			res = res.map(v => v.toJSON());
		} else {
			res = []
		}
		return res;
	},
	// 获取当前课程所属的整个系列课程
	async getAllTimetable(rootId, recursion) {
		let coursesModuleRoot = new Parse.Query("CoursesModule");
			coursesModuleRoot.notEqualTo('hide', true);
			coursesModuleRoot.ascending('createdAt');
			coursesModuleRoot.equalTo("objectId", rootId);
		let curriculum = new Parse.Query('CoursesModule');
			curriculum.notEqualTo('hide', true);
			curriculum.equalTo('rootId', rootId);
			curriculum.ascending('createdAt');
		const mainQuery = Parse.Query.or(coursesModuleRoot,curriculum);
		      mainQuery.ascending('createdAt');
		let res = await mainQuery.find();
		if (res) {
			// 获取上次学习的课程Id
			let preId = await this.getPreLearn(res[0].id);
			res = res.map(v => {
				v = v.toJSON();
				if (preId && v.objectId == preId) {
					v.preLearn = true;
				}
				return v;
			});
		} else {
			res = []
		}
		if (recursion) {
			res = await this.arrToTree(res, '0');
		} else {
			res = await this.arrToTree(res, '0');
			res = await this.treeToArr(res, []);
			// 删除children字段
			res.forEach(v => {
				if (v.children) {
					delete v.children;
				}
			})
		}
		return res;
	},
	// 获取当前课程所属的整个系列课程 扫码分享情况
	async getAllTimetable_hide(rootId, recursion,root) {
		let coursesModuleRoot = new Parse.Query("CoursesModule");
		if(root){
			coursesModuleRoot.equalTo('hide', true);
		}
			coursesModuleRoot.ascending('createdAt');
			coursesModuleRoot.equalTo("objectId", rootId);
		let curriculum = new Parse.Query('CoursesModule');
			if(root){
				curriculum.notEqualTo('hide', true);
			}
			curriculum.equalTo('rootId', rootId);
			curriculum.ascending('createdAt');
		const mainQuery = Parse.Query.or(coursesModuleRoot,curriculum);
		mainQuery.ascending('createdAt');
		let res = await mainQuery.find();
		if (res) {
			// 获取上次学习的课程Id
			let preId = await this.getPreLearn(res[0].id);
			res = res.map(v => {
				v = v.toJSON();
				if (preId && v.objectId == preId) {
					v.preLearn = true;
				}
				return v;
			});
		} else {
			res = []
		}
		if (recursion) {
			res = await this.arrToTree(res, '0');
		} else {
			res = await this.arrToTree(res, '0');
			res = await this.treeToArr(res, []);
			// 删除children字段
			res.forEach(v => {
				if (v.children) {
					delete v.children;
				}
			})
		}
		return res;
	},
	// 正向-树形结构转平铺
	// 从外到内依次递归，有 children 则继续递归
	treeToArr(data, res = []) {
		data.forEach(item => {
			res.push(item);
			if (item.children && item.children.length !== 0) {
				this.treeToArr(item.children, res);
			}
		});
		return res;
	},
	// 依次在数组中找到每一层级对应的元素，同时每个元素的 children 属性对应的 value 通过 pid 去找到，然后递归执行下去
	arrToTree(arr, pid = '0') {
		const res = [];
		arr.forEach(item => {
			if (item.parent_ID === pid) {
				// 这样每次都需要遍历整个数组，因此时间复杂度为 n*n
				// const children = arrToTree(arr, item.id)   

				// 往下递归时，每次数组的大小都在减小，每次都筛选掉父代元素，最终的时间复杂度为 n*logn
				const children = this.arrToTree(arr.filter(v => v.parent_ID !== pid), item.objectId);
				if (children.length) {
					res.push({
						...item,
						children
					})
				} else {
					res.push({
						...item
					})
				}
			}
		});
		return res;
	},
	// 序列化富文本图片自适应
	formatRichText(html) {
		let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {

			if (match.search(/style=/gi) == -1) {
				match = match.replace(/\<img/gi, '<img style=""');
			}
			return match;
		});
		newContent = newContent.replace(/&nbsp;+/gi, function(match, capture) {
			console.log(match,654322)
			match=match.replace(/&nbsp;/g,'\xa0')
			return match;
		});
		newContent = newContent.replace(/style="/gi, '$& max-width:100% !important; ');
		newContent = newContent.replace(/<br[^>]*\/>/gi, '');
		newContent = newContent.replace(/<figure[^>]*>|<\/figure[^>]*>/gi, "");
		return newContent;
	},
	//添加取消收藏
	async operateCollections(id) {
		let that = this;
		let openid = uni.getStorageSync('openid');
		let Collections = Parse.Object.extend('Collections');
		let newCollections = new Collections();
		let collections = new Parse.Query('Collections');
		collections.equalTo('openId', openid);
		let res = await collections.first();
		if (res) {
			let ids = res.get('ids');
			if (ids.includes(id)) {
				let newIds = ids.filter(v => v != v);
				res.set('ids', newIds);
				let unsave = await res.save();
				if (unsave) {
					uni.showToast({
						title: '取消收藏！'
					});
					return false;
				} else {
					uni.showToast({
						title: '取消失败！',
						icon: 'error'
					});
					return true;
				}
			} else {
				res.set('ids', [...ids, id]);
				let save = await res.save();
				if (save) {
					uni.showToast({
						title: '收藏成功！'
					});
					return true;
				} else {
					uni.showToast({
						title: '收藏失败！',
						icon: 'error'
					});
					return false;
				}
			}
		} else {
			newCollections.set('openId', openid);
			newCollections.set('ids', [id]);
			let status = await newCollections.save();
			if (status) {
				uni.showToast({
					title: '收藏成功！'
				});
				return true;
			} else {
				uni.showToast({
					title: '收藏失败！',
					icon: 'error'
				});
				return false;
			}
		}

	},
	//初始获取收藏状态
	async getCollectionstatus(id) {
		let that = this;
		let openid = uni.getStorageSync('openid');
		let collections = new Parse.Query('Collections');
		collections.equalTo('openId', openid);
		let res = await collections.first();
		if (res) {
			let ids = res.get('ids');
			if (ids && ids.includes(id)) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	},
	// 扫码方法
	async scanCode(member,url) {
		let vip = false;
		if(member&&member.memberType !=2){
			vip = true;
		}
		let that = this;
		if (url.includes(Config.ScanUrl)) {
			let id = url.split('/')[url.split('/').length - 1];
			let data = await that.getHideCurriculum(id);
			if (data.length) {	
				let info = data[0];
				
				// if (info.vip && (member&&member.memberType != 0 && member.memberType != 1)) {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '您没有权限'
				// 	})
				// 	return ;
				// }
				let toUrl = await that.configUrl(info,vip);
				if(toUrl=='/pages/login/login'){
					uni.navigateTo({
						url: toUrl
					})
				}else{
					uni.reLaunch({
						url: toUrl
					})
				}
			} else {
				uni.showToast({
					title: '未找到当前课程',
					icon: 'none'
				})
			}
		} else {
			uni.showToast({
				title: '二维码错误',
				icon: 'none'
			})
		}
	},
	// // 扫码方法
	// scanCode(member) {
	// 	let that = this;
	// 	uni.scanCode({
	// 		success: async (res) => {
	// 			this.scaninfo = res;
	// 			if (res.result) { //res.result
	// 				res.result = Config.ScanUrl + '1fUxfBh7Pu'
	// 				if (res.result.includes(Config.ScanUrl)) {
	// 					let url = decodeURIComponent(res.result);
	// 					let id = url.split('/')[url.split('/').length - 1];
	// 					let data = await that.getHideCurriculum(id);
	// 					if (data.length) {	
	// 						let info = data[0];
	// 						if (info.vip && (member.memberType != 0 && member.memberType != 1)) {
	// 							uni.showToast({
	// 								icon: 'none',
	// 								title: '您没有权限'
	// 							})
	// 							return ;
	// 						}
	// 						let toUrl = await this.configUrl(info);
	// 						uni.reLaunch({
	// 							url: toUrl
	// 						})
	// 					} else {
	// 						uni.showToast({
	// 							title: '未找到当前课程',
	// 							icon: 'none'
	// 						})
	// 					}
	// 				} else {
	// 					uni.showToast({
	// 						title: '二维码错误',
	// 						icon: 'none'
	// 					})
	// 				}
	// 				// '0016429'||

	// 				// `../pages/index/index`
	// 				//    console.log(res.result,'内部扫码')
	// 			}
	// 		},
	// 		fail() {
	// 			uni.showToast({
	// 				icon: 'none',
	// 				title: '扫码失败'
	// 			})
	// 		}
	// 	});
	// },
	async configUrl(item,vip) {
		let toUrl = '';
		// if (item.flag == 1) {
		// 	if (item.level == 0) {
		// 		// 系列课程点击时到详情页有介绍有详情
		// 		toUrl = '/curriculumSubPackage/pages/shareStudy/study?objectId=' + item.objectId;
		// 	} else {
		// 		//单课程点击时直接播放页
		// 		toUrl = '/curriculumSubPackage/pages/shareDetails/details?objectId=' + item.objectId;
		// 	}
		// } else {
		// 	//单课程点击时直接播放页
		// 	toUrl = '/curriculumSubPackage/pages/shareDetails/details?objectId=' + item.objectId;
		// }

		// return toUrl;
						if(!item.vip){
							if(item.flag==1){
								if(item.level==0){
									// 系列课程点击时到详情页有介绍有详情
									toUrl = '/curriculumSubPackage/pages/shareStudy/study?objectId='+item.objectId;
								}else{
									//非vip单课程点击时直接播放页
									toUrl = '/curriculumSubPackage/pages/shareDetails/details?objectId='+item.objectId;
								}
							}else{ 
								   //非vip单课程点击时直接播放页
								   toUrl = '/curriculumSubPackage/pages/shareDetails/details?objectId='+item.objectId;
							}
						}else {
							if(item.flag==1){
								if(item.level==0){
									// 系列课程点击时到详情页有介绍有详情
									toUrl = '/curriculumSubPackage/pages/shareStudy/study?objectId='+item.objectId;
								}else{
									//vip单课程点击时跳转到开通会员
									if (vip) {
										toUrl = '/curriculumSubPackage/pages/shareDetails/details?objectId='+item.objectId;
									} else {
										toUrl = '/mineSubPackage/pages/vip/vip';
									}
								}
							}else{
								   //vip单课程点击时跳转到开通会员
									 if (vip) {
											toUrl = '/curriculumSubPackage/pages/shareDetails/details?objectId='+item.objectId;
									 } else {
											toUrl = '/mineSubPackage/pages/vip/vip';
									 }
							}
						}
			
         return toUrl;
	}
}
