<template>
	<!-- 用户评论ITEM -->
	<view class="CommentItem active-gray">
		<!-- 评论用户头像 -->
		<image class="commentAvatarStyle" :src="user.avatar" mode=""></image>
		<!-- 评论用户信息 -->
		<view class="CommentItemRight">
			<!-- 评论信息栏 -->
			<view class="commentTop">
				<!-- 用户昵称 -->
				<view class="commentNickName">
					{{user.username}}
				</view>
				<!-- 评论时间 -->
				<view class="commentDateStyle">
					<date-item :date='user.date' />
				</view>
			</view>
			<!-- 评论内容 -->
			<view class="commentContentText active-gray">
				<text v-if="user.replyName">回复<text class="replyText">{{user.replyName}}:</text></text>
				{{user.contentText}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "yy-comment-module",
		props: {
			user: {
				type: Object
			}
		}
	}
</script>

<style lang="scss">
	.CommentItem {
		display: flex;
		padding: 15rpx 20rpx 15rpx 60rpx;

		.CommentItemRight {
			flex: 1;
		}

		.commentDateStyle {
			margin-left: auto;
			color: var(--gray);
			font-size: 25rpx;
		}

		.commentTop {
			display: flex;
			align-items: center;
		}

		.commentNickName {
			color: var(--blue);
			font-weight: 400;
			font-size: 25rpx;
		}
		
		.replyText{
			color: var(--blue);
			margin-right: 8rpx;
		}

		.commentContentText {
			font-size: 26rpx;
			padding-top: 10rpx;
			line-height: 34rpx;
		}


		.commentAvatarStyle {
			margin: 6rpx;
			margin-right: 20rpx;
			margin-left: 4rpx;
			width: 60rpx;
			height: 60rpx;
			border-radius: 8rpx;
			overflow: hidden;
		}

	}
</style>
