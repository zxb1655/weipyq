<template>
	<!-- 输入框 -->
	<view class="input-module" :style="{'position': isFixed ? 'fixed' : 'absolute'}">
		<view class="input-view">
			<input type='text' :placeholder="reply.isReply ? `回复${reply.username}` : '评论'" :confirm-hold="true"
				@input='inputValue' :cursor-spacing='keyboardHeight' :focus="focus" :value="inputVal"
				@blur="blur"></input>
		</view>
		<view class="iconfont emojiIcon"></view>
		<view class="sentBtn"
			:style="{'backgroundColor':sendBtnCss.backgroundColor,'border':sendBtnCss.border,'color':sendBtnCss.color}"
			@tap="_send">发送</view>

		<userinfo-popup :reply="reply" v-if="isShowUserInfo" :isShow="isShowUserInfo" @close="closePopup"
			@send="sendComment"></userinfo-popup>
	</view>
</template>

<script>
	export default {
		name: "yy-input-item",
		props: {
			focus: {
				type: Boolean,
				default: false,
			},
			isFixed: {
				type: Boolean,
				default: true
			},
			reply: {
				type: Object,
				default: () => {
					return {
						isReply: false
					}
				}
			}
		},
		data() {
			return {
				isShowUserInfo: false,
				deviceHeight: '0',
				deviceWidth: '0',

				// 初始化键盘input高度
				keyboardHeight: 0,

				//input输入内容
				inputVal: '',

				// 发送按钮样式
				sendBtnCss: {
					backgroundColor: 'var(--grayLight)',
					border: '#c6c6c6 1px solid',
					color: '#c6c6c6'
				}
			};
		},
		created() {
			this.attached()
		},
		methods: {
			attached() {
				// 获取设备宽高
				this.deviceHeight = uni.getSystemInfoSync().windowHeight
				this.deviceWidth = uni.getSystemInfoSync().windowWidth

				//初始化键盘input高度
				let px = this.rpxTorpx(40);
				this.keyboardHeight = px - 4
			},
			blur() {
				this.$emit('blur', this.inputVal)
			},
			_send() {
				this.isShowUserInfo = true
			},
			closePopup() {
				this.isShowUserInfo = false
			},
			sendComment(userinfo) {
				const myEventDetail = {
					id: userinfo.id,
					username: userinfo.username,
					avatar: userinfo.avatar,
					contentText: this.inputVal,
					replyName: userinfo.replyName,
					date: {
						date: userinfo.date.date,
						time: userinfo.date.time
					}
				}
				this.$emit('inputMsg', myEventDetail)
				this.inputVal = ''
				this.changeBtnCss('')
			},
			inputValue(e) {
				this.inputVal = e.detail.value
				this.changeBtnCss(e.detail.value);
			},
			changeBtnCss(val) {
				if (val == '') { //如果输入框没有有文字
					this.sendBtnCss = {
						backgroundColor: 'var(--grayLight)',
						border: '#c6c6c6 1px solid',
						color: '#c6c6c6'
					}
				} else {
					this.sendBtnCss = {
						backgroundColor: 'var(--green)',
						border: 'var(--green) 1px solid',
						color: '#ffffff'
					}
				}
			},
			rpxTorpx(rpx) {
				let deviceWidth = uni.getSystemInfoSync().windowWidth;
				let px = (deviceWidth / 750) * Number(rpx);
				return px;
			},
			pxTorpx(px) {
				let deviceWidth = uni.getSystemInfoSync().windowWidth;
				let rpx = (750 / Number(px)) * deviceWidth;
				return rpx;
			},
		}
	}
</script>

<style lang="scss">
	.input-module {
		bottom: 0;
		display: flex;
		width: 100vw;
		padding: 20rpx;
		padding-left: 35rpx;
		background-color: var(--grayLight);
		align-items: center;
		box-sizing: border-box;

		.input-view {
			flex: 7;
			caret-color: #07c160;
			background-color: white;
			padding: 20rpx;
			border-radius: 10rpx;
		}

		.emojiIcon {
			padding-left: 25rpx;
			padding-right: 20rpx;
			font-size: 0;

			&::before {
				content: "\e60b";
				font-size: 55rpx;
			}
		}

		.sentBtn {
			padding: 25rpx;
			padding-top: 10rpx;
			padding-bottom: 10rpx;
			text-align: center;
			color: #c6c6c6;
			border: #c6c6c6 1px solid;
			border-radius: 10rpx;
			font-size: 28rpx;
		}
	}
</style>
