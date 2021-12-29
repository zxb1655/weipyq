<template>
	<!-- 微信评论模块 -->
	<view class="comment-module"
		v-if='pageData.comment.commentUserList.length > 0 ||pageData.comment.goodUserAvatarList != 0 ||selfGood '>
		<!-- 三角形 -->
		<view class="triangleStyle"></view>

		<block v-if='pageData.comment.goodUserAvatarList != 0 || selfGood '>
			<!-- 评论点赞栏 -->
			<view class="goodContentStyle">
				<!-- 点赞icon -->
				<view class="goodContentLeftStyle iconfont">
				</view>

				<!-- 点赞用户 -->
				<view class="goodUserList">
					<block v-for='(item,index) in goodUserList' :key='index'>
						<view class="giveGoodUserItem">
							<image :src="item" mode="widthFix"></image>
						</view>
					</block>

					<block v-if='selfGood'>
						<view class="giveGoodUserItem myself-good">
							<image class="commentAvatarStyle" :src="avatar"></image>
						</view>
					</block>
				</view>
			</view>
		</block>
		
		<block v-if='pageData.comment.commentUserList.length > 0 && loadUserList'>
			<!-- 评论内容栏 -->
			<view class="commentContentStyle iconfont">
				<!-- 评论用户列表 -->
				<block v-for='(item,index) in pageData.comment.commentUserList' :key='item.id'>
					<view @tap="showSelect($event,index)">
						<comment-item :user='item' />
					</view>
				</block>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		name: "yy-comment-module",
		props: {
			pageData: {
				type: Object,
			},
			selfGood: {
				type: Boolean,
				default: false
			},
			avatar: {
				type: String,
				default: ''
			},
			isAuto: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				goodUserList: [],
				loadUserList: false,
			};
		},
		mounted() {
			this.handleAvatar()
		},
		methods: {
			handleAvatar() {
				let num = this.pageData.comment.goodUserAvatarList;
				let tempArray = []
				for (let i = 1; i < num; i++) {
					tempArray.push(`/static/avatar/avatar-${i}.jpeg`);
				}
				const filtArr = this.shuffle(tempArray)
				this.loadUserList = true
				this.goodUserList = filtArr
			},
			// 随机打乱数组
			shuffle(arr) {
			    let i = arr.length;
			    while (i) {
			        let j = Math.floor(Math.random() * i--);
			        [arr[j], arr[i]] = [arr[i], arr[j]];
			    }
					return arr
			},
			showSelect(e, i) {
				// detail对象，提供给事件监听函数
				var myEventDetail = {
					x: e.touches[0].pageX,
					y: e.touches[0].pageY - 150,
					index: i
				}
				this.$emit('showSelect', myEventDetail)
			},
		}
	}
</script>

<style lang="scss">
	.comment-module {
		position: relative;
		margin: 0 22rpx 130rpx;
		background-color: var(--grayLight);
		box-sizing: border-box;
		
		.triangleStyle {
			position: absolute;
			top: -35rpx;
			left: 14rpx;
			width: 0;
			height: 0;
			border-width: 22rpx;
			border-style: solid;
			border-color: transparent var(--grayLight) transparent transparent;
			transform: rotate(90deg);
			/*顺时针旋转90°*/
		}

		.goodContentStyle {
			display: flex;
			padding: 10rpx 7rpx 15rpx 0;
			border-bottom: 1px white solid;
		}

		.goodUserList {
			display: flex;
			flex-wrap: wrap;
			font-size: 0;

			image {
				width: 60rpx;
				height: 60rpx;
				border-radius: 8rpx;
			}
		}

		.giveGoodUserItem {
			padding: 6rpx;
		}

		.myself-good {
			overflow: hidden;
			width: 60rpx;
			height: 60rpx;
			box-sizing: content-box;
			border-radius: 25rpx;
		}

		.open-data {
			height: 100%;
			width: 100%;
		}

		.goodContentLeftStyle {
			align-items: center;
			line-height: 74rpx;
			padding: 0 12rpx 0 19rpx;
		}

		.goodContentLeftStyle::before {
			content: "\e653";
			color: var(--blue);
			font-size: 30rpx;
		}

		.commentContentStyle {
			position: relative;

			&::before {
				position: absolute;
				content: "\e64e";
				font-size: 26rpx;
				top: 35rpx;
				left: 20rpx;
				color: var(--blue);
				font-weight: bolder;
			}
		}
	}
</style>
