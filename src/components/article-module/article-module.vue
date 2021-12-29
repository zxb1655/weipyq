<template>
	<view class="article_module">
		<!-- 用户头像 -->
		<image class="avatarStyle" :src="pageData.article.avatar"></image>

		<view class="pyq-right">
			<!-- 用户昵称 -->
			<view class="userNickNameStyle active-gray">
				{{pageData.article.username}}
			</view>

			<!-- 文本内容 -->
			<view class="pyqContentText active-gray" v-html="pageData.article.contentText"></view>

			<view class="pypLink" v-if="pageData.type == 1">
				<image class="linkImg" :src="pageData.linkInfo.linkImg" mode="aspectFill"></image>
				<text class="linkText" style="height: auto;" @tap="isInput = true"
					v-if="!isInput">{{pageData.linkInfo.linkText}}</text>
				<textarea v-else focus @blur="isInput = false" class="linkText" v-model="pageData.linkInfo.linkText" placeholder="点击输入链接描述" />
			</view>

			<!-- 图片内容 -->
			<view class="picture-out" v-if="pageData.type == 0">
				<!-- 这里放图片slot -->
				<slot name='picture'></slot>
			</view>

			<!-- 底部信息及按钮 -->
			<view class="bottomStyle">
				<!-- 发布日期 -->
				<view class="center">
					<date-item :date='pageData.article.date' />
				</view>
				<!-- 删除按钮 -->
				<view class="deleteBtn active-gray" @tap="deleteBtn">删除</view>

				<!-- 点赞评论展开按钮 -->
				<view class="amRight">
					<view class="good-comments-btn-out" :animation='showBtnAm'>
						<view class="good-comment-btn">
							<!-- 按钮三角 -->
							<view class="good-comment-btn-triangle"></view>
							<!-- 点赞评论按钮 -->
							<view class="good-comment-flex">
								<!-- 点赞按钮 -->
								<view class="iconfont good-comment-flex-good" @tap="userGood">
									<text v-if="!selfGood"> 赞</text>
									<text v-else> 取消</text>
								</view>
								<!-- 评论按钮 -->
								<view class="iconfont good-comment-flex-comment" @tap="userComment"> 评论</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 点赞/评论按钮 -->
				<view class="goodBtn" @tap="showGoodCommentBtn">
					<view class="goodBtnDot"></view>
					<view class="goodBtnDot"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "article-module",
		props: {
			pageData: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				isInput: false,
				showBtnAm: '',
				showBtnAmStatus: false,

				//是否自赞
				selfGood: false,
			};
		},
		methods: {
			userComment() {
				this.showGoodCommentBtn();
				this.$emit('comment')
			},
			// 用户点赞
			userGood() {
				this.showGoodCommentBtn();
				this.selfGood = !this.selfGood
				this.$emit('selfzan', this.selfGood)
			},
			showGoodCommentBtn() {
				//创建动画实例
				let animation = uni.createAnimation({
					duration: 200,
					timingFunction: 'ease',
					delay: 0,
				});
				if (this.showBtnAmStatus) {
					animation.width('0rpx').step();
					this.showBtnAmStatus = false
				} else {
					animation.width('340rpx').step();
					this.showBtnAmStatus = true
				}
				this.showBtnAm = animation.export()
			},
			deleteBtn() {
				uni.showModal({
					title: '提示',
					content: '确定删除吗？',
					success: res => {
						if (res.confirm) {
							uni.navigateBack({
								delta: 1
							})
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.article_module {
		display: flex;
		padding: 27rpx;
		box-sizing: border-box;

		.avatarStyle {
			width: 85rpx;
			height: 85rpx;
			border-radius: 10rpx;
			overflow: hidden;
			box-sizing: border-box;
			margin-right: 20rpx;
		}

		.pyq-right {
			flex: 1;
			margin-top: -6rpx;

			.pypLink {
				height: 80rpx;
				margin-top: 10rpx;
				display: flex;
				align-items: center;
				background-color: var(--grayLight);
				padding: 12rpx 20rpx 12rpx 12rpx;

				.linkImg {
					width: 90rpx;
					height: 90rpx;
					margin-right: 10rpx;
				}

				.linkText {
					font-size: 26rpx;
					width: 100%;
					height: 80rpx;
					line-height: 1.5;
					flex: 1;
				}
			}

			.userNickNameStyle {
				display: inline-block;
				color: var(--blue);
				font-weight: 400;
				font-size: 30rpx;
			}

			.pyqContentText {
				margin-top: 4rpx;
				margin-bottom: 0rpx;
				line-height: 40rpx;
				font-size: 30rpx;
			}

			.bottomStyle {
				display: flex;
				align-items: center;
				margin-top: 20rpx;
				margin-bottom: 12rpx;

				&>view {
					&:last-child {
						margin-left: auto;
					}
				}
			}

			.deleteBtn {
				color: var(--blue);
				font-size: 25rpx;
				margin-left: 30rpx;
			}

			.goodBtn {
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: var(--grayLight);
				width: 70rpx;
				height: 45rpx;
				border-radius: 10rpx;

				&:active {
					background-color: var(--grayActive);
				}
			}

			.goodBtnDot {
				margin: 4rpx;
				width: 10rpx;
				height: 10rpx;
				border-radius: 50%;
				background-color: var(--blue);
			}

			.good-comment-btn {
				position: relative;
				width: 320rpx;
				height: 90rpx;
				background-color: var(--blackLight);
				border-radius: 10rpx;
			}

			.good-comment-btn-triangle {
				position: absolute;
				right: -30rpx;
				top: 19rpx;
				width: 0;
				height: 0;
				border-width: 22rpx;
				border-style: solid;
				border-color: transparent var(--blackLight) transparent transparent;
				transform: rotate(180deg);
			}

			.good-comment-flex {
				display: flex;
				height: 100%;
				justify-content: space-around;
				align-items: center;
				white-space: nowrap;

				&>view {
					color: white;
					font-size: 28rpx;
					padding-top: 16rpx;
					padding-bottom: 16rpx;
					align-self: center;
					flex: 1;
					text-align: center;

					&:active {
						background-color: var(--blackLight2);
					}

					&:last-child {
						border-left: var(--blackLight2) 1px solid;
					}
				}
			}
			
			.good-comment-flex-good{
				&::before{
					position: relative;
					bottom: -1rpx;
					content: "\e653";
					color: white;
					font-size: 35rpx;
				}
			}
			
			.good-comment-flex-comment{
				&::before{
					position: relative;
					bottom: -2rpx;
					content: "\e64e";
					color: white;
					font-size: 35rpx;
				}
			}
			
			.good-comments-btn-out {
				display: inline-block;
				position: relative;
				width: 0;
				overflow: hidden;
			}
			
			.amRight {
				position: absolute;
				right: 120rpx;
				text-align: right;
			}
			
			.center {
				font-size: 0;
			}
		}
	}

</style>
