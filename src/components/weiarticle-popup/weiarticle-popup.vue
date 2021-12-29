<template>
	<popup ref="articlepopup" type="fadeInMiddle" @hide="close">
		<view class="weiarticle_popup">
			<view class="popup_title">
				获取公众号文章
			</view>
			<input class="popup_input" type="text" v-model="articleUrl" placeholder="请输入公众号文章链接" />
			<view class="popup_btn" @tap="getArticle">
				获取
			</view>
		</view>
	</popup>
</template>

<script>
	export default {
		name: "wei-article",
		data() {
			return {
				articleUrl: '',
			};
		},
		props: {
			isShow: {
				type: Boolean,
				default: false
			}
		},
		watch: {
			isShow(newVal, old) {
				if (newVal) {
					this.$refs.articlepopup.show();
				} else {
					this.$refs.articlepopup.hide();
				}
			}
		},
		methods: {
			async getArticle() {
				if (this.articleUrl.length == 0) {
					return
				}
				uni.showLoading({
					title: '正在获取中...'
				});
				const res = await this.$api.getArticle({
					url: this.articleUrl
				})
				const linkData = {
					linkText: res.title,
					linkImg: res.imgUrl
				}
				uni.hideLoading()
				this.articleUrl = ''
				this.$refs.articlepopup.hide();
				this.$emit('submit', linkData)
			},
			close(){
				this.$emit("close")
			}
		}
	}
</script>

<style lang="scss">
	.weiarticle_popup {
		width: 600rpx;
		height: 100%;
		padding: 20rpx;
		border-radius: 10rpx;
		background-color: #FFFFFF;

		.popup_title {
			text-align: center;
			font-size: 34rpx;
			font-weight: 900;
			margin-bottom: 40rpx;
			color: var(--green);
		}

		.popup_input {
			font-size: 26rpx;
			padding-bottom: 10rpx;
			border-bottom: 2rpx solid var(--green);
		}

		.popup_btn {
			margin: 40rpx auto 0;
			font-size: 30rpx;
			width: 120rpx;
			text-align: center;
			border-radius: 5px;
			background-color: var(--green);
			padding: 4rpx 10rpx;
			color: white;
		}
	}
</style>
