<template>
	<!-- 输入框 -->
	<view class="input-module" :style="{'position': isFixed ? 'fixed' : 'absolute'}">
		<view class="input-view">
			<input type='text' :placeholder="reply.isReply ? `回复${reply.username}` : '评论'" :confirm-hold="true"
				@input='inputValue' :cursor-spacing='keyboardHeight' :focus="focus" :value="inputVal"
				@blur="blur"></input>
		</view>
		<view class="iconfont emojiIcon"></view>
    <view class="iconfont imgIcon"></view>
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
				let px = this.upxToupx(40);
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
			upxToupx(upx) {
				let deviceWidth = uni.getSystemInfoSync().windowWidth;
				let px = (deviceWidth / 750) * Number(upx);
				return px;
			},
			pxToupx(px) {
				let deviceWidth = uni.getSystemInfoSync().windowWidth;
				let upx = (750 / Number(px)) * deviceWidth;
				return upx;
			},
		}
	}
</script>

<style lang="scss">
/* 针对手机设备 */
@media screen and (max-width: 768px) {
  .input-module {
    width: 100vw;
  }
}
/* 针对桌面设备 */
@media screen and (min-width: 1024px) {
  .input-module {
    width: 550px;
  }
}
	.input-module {
		bottom: 0;
		display: flex;
    padding: 20upx 20upx 20upx 35upx;
    background-color: var(--grayLight);
		align-items: center;
		box-sizing: border-box;

		.input-view {
			flex: 7;
			caret-color: #07c160;
			background-color: white;
			padding: 20upx;
			border-radius: 10upx;
		}

		.emojiIcon {
			padding-left: 25upx;
			padding-right: 20upx;
			font-size: 0;

			&::before {
				content: "\e60b";
				font-size: 55upx;
			}
		}
    .imgIcon {
      padding-left: 10upx;
      padding-right: 20upx;
      font-size: 0;
      &::before {
        content: "\e608";
        font-size: 61upx;
      }
    }
		.sentBtn {
      padding: 10upx 25upx;
      text-align: center;
			color: #c6c6c6;
			border: #c6c6c6 1px solid;
			border-radius: 10upx;
			font-size: 28upx;
		}
	}
</style>
