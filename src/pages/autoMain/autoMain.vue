<template>
	<view class="automain">
		<renderimg-popup :imgUrl="renderUrl" :isShow="isShowRender" @close="isShowRender = false" />
		<!-- 长按展开模块 -->
		<longselect-module @renderImg="preImg" :coordinate='coordinate' :hidden="longSelectHidden" />
		<view class="hotBox" @tap="handleRight"></view>
		<html2canvas ref="html2canvas" :domId="domId" @renderFinish="renderFinish">
			<view class="canbox" id="main" @touchstart="hideLong">
				<img :src="pageData.articleImgList[0]" class="autoImg"></img>
				<view class="footer">
					<view class="foot_left">
						<text class="icon-good iconfont"></text>
						<text class="zan moreright">赞</text>
						<text class="icon-chat iconfont"></text>
						<text class="comment">评论</text>
					</view>
					<view class="foot_right">
						<text class="icon-good iconfont"></text>
						<text class="zan">{{pageData.comment.goodUserAvatarList}}</text>
						<text class="icon-chat iconfont"></text>
						<text class="comment">{{pageData.comment.commentNum}}</text>
					</view>
				</view>
			</view>
		</html2canvas>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShowRender: false,
				coordinate: {},
				longSelectHidden: false,
				domId: '',
				renderUrl: '',
				pageData: {
					type: 0,
					articleImgList: [],
					comment: {
						commentNum: 0,
						goodUserAvatarList: 0,
						commentUserList: []
					}
				},
			}
		},
		onLoad(options) {
			if (options.data) {
				this.pageData = JSON.parse(options.data)
			}
		},
		mounted() {
			this.domId = '#main'
		},
		methods: {
			hideLong() {
				this.longSelectHidden = false
			},
			handleRight() {
				this.coordinate = {
					x: 220,
					y: 50
				}
				this.longSelectHidden = true
			},
			renderFinish(filePath) {
				this.renderUrl = filePath
				uni.hideToast();
				this.isShowRender = true
				this.longSelectHidden = false
			},
			preImg() {
				this.$refs.html2canvas.createImg()
			},
		}
	}
</script>

<style lang="scss">
	.automain {		
		.autoImg {
			width: 100vw;
		}

		.hotBox {
			width: 200rpx;
			height: 200rpx;
			position: fixed;
			z-index: 10;
			top: 0;
			right: 0;
		}

		.canbox {
			width: 100vw;
			display: flex;
			flex-direction: column;
		}

		.footer {
			width: 765rpx;
			height: 90rpx;
			box-sizing: border-box;
			margin-top: -2rpx;
			background-color: #343233;
			color: #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 40rpx 10rpx 30rpx;

			.icon-good {
				font-size: 42rpx;
				margin-right: 6rpx;
				vertical-align: middle;
			}

			.zan {
				font-size: 32rpx;
				margin-right: 16rpx;
				position: relative;
				bottom: 2rpx;
			}

			.moreright {
				margin-right: 50rpx;
			}

			.icon-chat {
				font-size: 38rpx;
				font-weight: 900;
				margin-right: 8rpx;
				vertical-align: middle;
				position: relative;
				top: 2rpx;
			}

			.comment {
				font-size: 32rpx;
				position: relative;
				bottom: 2rpx;
			}
		}
	}
</style>
