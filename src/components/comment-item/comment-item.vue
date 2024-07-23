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
          {{ user.username }}
        </view>
        <!-- 评论时间 -->
        <view class="commentDateStyle">
          <date-item :date="user.date" />
        </view>
      </view>
      <!-- 评论内容 -->
      <view class="commentContentText active-gray">
        <text v-if="user.replyName"
          >回复<text class="replyText">{{ user.replyName }}:</text></text
        >
        {{ user.contentText }}
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "yy-comment-module",
  props: {
    user: {
      type: Object,
    },
  },
};
</script>

<style lang="scss">
.CommentItem {
  display: flex;
  padding: 15upx 20upx 15upx 60upx;

  .CommentItemRight {
    flex: 1;
  }

  .commentDateStyle {
    margin-left: auto;
    color: var(--gray);
    font-size: 25upx;
  }

  .commentTop {
    display: flex;
    align-items: center;
  }

  .commentNickName {
    color: var(--blue);
    font-weight: 400;
    font-size: 25upx;
  }

  .replyText {
    color: var(--blue);
    margin-right: 8upx;
  }

  .commentContentText {
    font-size: 26upx;
    padding-top: 10upx;
    line-height: 34upx;
  }

  .commentAvatarStyle {
    margin: 6upx;
    margin-right: 20upx;
    margin-left: 4upx;
    width: 60upx;
    height: 60upx;
    border-radius: 8upx;
    overflow: hidden;
  }
}
</style>
