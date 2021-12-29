<template>
	<view class="pageAutoEdit">
		<view class="upload" @tap="uploadImg">+</view>
		<view class="pre" v-if="pageData.articleImgList.length > 0">
			<view class="preList" v-for="(item,index) in pageData.articleImgList" :key="index">
				<view class="deleteImg" @tap="deleteImg(index)">x</view>
				<image :src="item" mode="aspectFill" class="preimg" @tap="preImg(index)"></image>
			</view>
		</view>
		<view class="mar-l-r-40">
			<edit-item title='点赞量' icon='good' :max="500" type="slide" @slideValue="slideValue"
				:finish='status.item1' />
			<edit-item v-if="pageData.type == 2" title='评论量' icon='chat' type="slide" @slideValue="slideCommentValue" :finish='status.item2' />
		</view>
		<view class="send-out">
			<view class="send iconfont" @tap="send">发 表</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageData: {
					type: 0,
					articleImgList: [],
					comment: {
						commentNum: 0,
						goodUserAvatarList: 0,
						commentUserList: []
					}
				},
				status: {
					item1: false,
					item2: false,
				},
			}
		},
		onLoad(option) {
			this.pageData.type = option.type
		},
		methods: {
			preImg(i) {
				uni.previewImage({
					current: i,
					urls: this.pageData.articleImgList
				});
			},
			deleteImg(i) {
				this.pageData.articleImgList.splice(i, 1)
			},
			uploadImg() {
				let num = this.pageData.type == 2 ? 1 : 2
				if (this.pageData.articleImgList.length >= num) {
					uni.showToast({
						title: `最多上传${num}张`,
						icon: "error"
					})
					return
				}
				uni.chooseImage({
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					count: 1,
					success: (res) => {
						this.pageData.articleImgList.push(...res.tempFilePaths)
					}
				})
			},
			slideCommentValue(value) {
				this.pageData.comment.commentNum = value
				this.status.item2 = value > 0
			},
			slideValue(value) {
				this.pageData.comment.goodUserAvatarList = value
				this.status.item1 = value > 0
			},
			async send(userinfo) {
				let data = JSON.stringify(this.pageData)
				if(this.pageData.type == 2){
					uni.navigateTo({
						url: `../autoMain/autoMain?data=${(data)}`,
					})
				} else {
					uni.navigateTo({
						url: `../autoArticle/autoArticle?data=${(data)}`,
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.pageAutoEdit {
		padding: 40rpx 20rpx 0;

		.upload {
			margin: 0 auto;
			width: 200rpx;
			height: 200rpx;
			font-size: 80rpx;
			text-align: center;
			line-height: 200rpx;
			color: #a3a3a3;
			background-color: #ededed;
			margin-bottom: 20rpx;
		}

		.pre {
			display: flex;
			justify-content: space-around;
			margin-bottom: 20rpx;

			.preList {
				position: relative;
			}

			.deleteImg {
				position: absolute;
				top: 0;
				right: 0;
				z-index: 1;
				width: 50rpx;
				height: 50rpx;
				background-color: #DD524D;
				color: #FFFFFF;
				border-radius: 50%;
				text-align: center;
				line-height: 40rpx;
			}

			.preimg {
				width: 45vw;
			}
		}


		.mar-l-r-40 {
			margin-left: 40rpx;
			margin-right: 40rpx;
		}

		.item-group {
			border-top: 1rpx #f1f1f1 solid;
			border-bottom: 1rpx #f1f1f1 solid;
		}

		.send {
			display: inline-block;
			border-radius: 10rpx;
			background-color: var(--green);
			padding: 10rpx 40rpx;
			color: white;
		}

		.send-out {
			text-align: center;
			padding: 50rpx;
		}

	}
</style>
