<template>
    <cover-view class="tabbar" :style="{'padding-bottom': paddingBottomHeight + 'rpx'}">
        <cover-view class="tabbar-item"
            v-for="(item, index) in list" 
            :key="index" 
			style="position: relative;"
        >  
			<!-- <cover-view v-if="item.midButton" class="midButton">
				<cover-image class="item-img" :src="item.icon_a" v-if="current == index"></cover-image>
				<cover-image class="item-img" :src="item.icon" v-else></cover-image>
				<cover-view class="item-name" :class="{'tabbarActive': current == index}" v-if="item.text">{{item.text}}</cover-view>
			</cover-view> -->
			<cover-view @click="tabbarChange(item)" >
				<cover-image class="item-img" :src="item.icon_a" v-if="current == index"></cover-image>
				<cover-image class="item-img" :src="item.icon" v-else></cover-image>
				<cover-view class="item-name" :class="{'tabbarActive': current == index}" v-if="item.text">{{item.text}}</cover-view>
			</cover-view>
			<cover-view class="item-badge">{{73}}</cover-view>
        </cover-view>
    </cover-view>
</template>

<script>
export default {
    props: {
        current: String
    },
    data() {
        return {
            paddingBottomHeight: 0,  //苹果X以上手机底部适配高度
            list: [{
                    text: '首页',  
                    icon: '/static/bg_null.png',  //未选中图标
                    icon_a: '/static/bg_null.png',  //选中图片
                    path: "/pages/index/index"  //页面路径
                },{
                    text: '课程',
                    icon: '/static/bg_null.png',  //未选中图标
                    icon_a: '/static/bg_null.png',  //选中图片
                    path: "/pages/curriculum/curriculum"
                },
     //            {
     //                text: '',
     //                icon: '/static/bg_null.png',  //未选中图标
     //                icon_a: '/static/bg_null.png',  //选中图片
     //                path: '/pages/error/error',
					// midButton:true,
     //            },
				{
                    text: '题库',
                    icon: '/static/bg_null.png',  //未选中图标
                    icon_a: '/static/bg_null.png',  //选中图片
                    path: "/pages/questionBank/questionBank"
                },{
                    text: '我的',
                    icon: '/static/bg_null.png',  //未选中图标
                    icon_a: '/static/bg_null.png',  //选中图片
                    path: "/pages/mine/mine"
                }
            ]
        };
    },
    created() {
        let that = this;
		let app = getApp();
		that.paddingBottomHeight =app.globalData.paddingBottomHeight;
    },
	mounted() {
		console.log(1234);
	},
    watch: {
        
    },
    methods: {
        tabbarChange(path) {
			this.$emit('tabbarChange',path);
        }
    }
};
</script>

<style lang="scss" scoped>
    .tabbarActive{
        color: #79D5AD !important;
    }
	.midButton{
		width:80rpx;
		height: 80rpx;
		background-color: #007AFF;
		border-radius: 50%;
	}
    .tabbar{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
		z-index: 999;
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 100rpx;
                background-color: #ffffff;
        .tabbar-item{
            display: flex;
			width: 100%;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100rpx;
            .item-img{
                margin-bottom: 4rpx;
                width: 60rpx;
                height: 60rpx;
            }
            .item-name{
                font-size: 25rpx;
                color: #A3A3A3;
            }
			.item-badge{
				    top: 5rpx;
				    right: 50rpx;
				    font-size: 20rpx;
				    position: absolute;
				    color: #ffffff;
				    background:#ff7c7c;
					box-sizing: border-box;
					display: inline-flex;
				    justify-content: center;
				    align-items: center;
				    line-height: 24rpx;
				    padding: 4rpx 8rpx;
				    border-radius: 32rpx;
				    z-index: 9;
					min-width: 32rpx;
					min-height: 32rpx;
			}
        }
    }
</style>