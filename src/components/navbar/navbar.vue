<template>
	<view class="navbar" :style="{'backgroundColor': bgColor,'color': textColor}">
		<view class="nav">
			<text class="nav_time">{{pageData.navbarTime}}</text>
			<view class="nav_right">
				<text class="iconfont icon_xinhao">&#xe61f;</text>
				<text class="iconfont icon_wifi">&#xe627;</text>
				<view class="icon_dian" :style="{'borderColor': textColor}">
					<view class="dian_right" :style="{'backgroundColor': textColor}"></view>
					<view class="mask" :style="{'width': pageData.dian + '%','backgroundColor': textColor}"></view>
				</view>
				<text class="nav_num">{{pageData.dian}}</text>
				<text class="nav_bai">%</text>
			</view>
		</view>
		<view class="bar">
			<text class="iconfont icon_left" @tap="back">&#xe60a;</text>
			<text class="bar_text">{{ismain ? pageData.article.date.date +'  '+ pageData.article.date.time : '详情'}}</text>
			<text class="iconfont icon_right" @tap="handleRight">&#xf0141;</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "navbar",
		props: {
			pageData: {
				type: Object,
				default: {}
			},
			bgColor: {
				type: String,
				default: '#f7f7f7'
			},
			textColor: {
				type: String,
				default: '#333'
			},
			ismain: {
				type: Boolean,
				default: false
			}
		},
		methods:{
			back(){
				uni.navigateBack({
					delta: 1
				})
			},
			handleRight(e){
				let data = {
					x: e.detail.x - 100,
					y: e.detail.y
				}
				this.$emit('handle',data)
			},
		}
	}
</script>

<style lang="scss">
	.navbar{
		.nav {
			width: 765rpx;
			height: 60rpx;
			box-sizing: border-box;
			display: flex;
			align-items: flex-end;
			justify-content: space-between;
			padding: 0 40rpx;
		
			.nav_time {
				font-size: 24rpx;
				font-weight: 900;
				margin-bottom: 2rpx;
			}
		
			.nav_right {
				display: flex;
				align-items: center;
			}
		
			.icon_xinhao {
				font-size: 24rpx;
				margin-right: 12rpx;
				font-weight: 900;
			}
		
			.icon_wifi {
				font-size: 34rpx;
				margin-right: 6rpx;
				vertical-align: middle;
				position: relative;
				top: 2rpx;
			}
		
			.icon_dian {
				width: 38rpx;
				height: 22rpx;
				box-sizing: border-box;
				display: inline-block;
				border: 3rpx solid #333;
				border-radius: 6rpx;
				padding: 2rpx;
				margin-right: 10rpx;
				position: relative;
				top: 4rpx;
				
				.dian_right{
					position: absolute;
					top: 24%;
					right: -20%;
					width: 4rpx;
					height: 10rpx;
				}
		
				.mask {
					height: 100%;
				}
			}
		
			.nav_num {
				font-size: 24rpx;
				font-weight: 900;
			}
		
			.nav_bai {
				font-size: 16rpx;
				font-weight: 900;
				margin-top: 6rpx;
			}
		}
		
		.bar {
			width: 765rpx;
			height: 80rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-left: 20rpx;
			padding-right: 50rpx;
		
			.bar_text {
				font-size: 32rpx;
				font-weight: 700;
				letter-spacing: 2rpx;
				margin-bottom: 8rpx;
			}
		
			.icon_left {
				font-size: 40rpx;
				font-weight: 800;
			}
		
			.icon_right {
				font-weight: 800;
				font-size: 35rpx;
			}
		}
	}
</style>
