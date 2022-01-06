<template>
  <view class="main">
    <renderimg-popup
      :imgUrl="renderUrl"
      :isShow="isShowRender"
      @close="isShowRender = false"
    />
    <!-- 长按展开模块 -->
    <longselect-module
      @renderImg="preImg"
      :coordinate="coordinate"
      :hidden="longSelectHidden"
    />
    <html2canvas ref="html2canvas" :domId="domId" @renderFinish="renderFinish">
      <view class="canbox" id="main" @touchstart="hideLong">
        <!-- 手机顶部导航 -->
        <block v-if="pageData.navbar">
          <navbar
            @handle="handleRight"
            ismain
            :pageData="pageData"
            bgColor="#111"
            textColor="#fff"
          />
        </block>
        <view class="content">
          <image
            :src="pageData.article.pictureList[0]"
            mode="widthFix"
            class="con_img"
          ></image>
        </view>
        <view class="boottom">
          <view class="boot_text" v-html="pageData.article.contentText"></view>
          <view class="footer">
            <view class="foot_left">
              <text class="icon-good iconfont"></text>
              <text class="zan moreright">赞</text>
              <text class="icon-chat iconfont"></text>
              <text class="comment">评论</text>
            </view>
            <view class="foot_right">
              <text class="icon-good iconfont"></text>
              <text class="zan">{{ pageData.comment.goodUserAvatarList }}</text>
              <text class="icon-chat iconfont"></text>
              <text class="comment">{{ pageData.comment.commentNum }}</text>
            </view>
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
      domId: "",
      renderUrl: "",
      //页面数据
      pageData: {
        type: 0,
        navbar: false,
        dian: 0,
        article: {
          username: "",
          avatar: "",
          contentText: "哈哈哈",
          pictureList: [],
          date: {
            date: "",
            time: "",
          },
        },
        linkInfo: {
          linkText: "点击输入公众号文章描述",
          linkImg: "https://weiapi.jzzz66.cn/avatar.png",
        },
        comment: {
          commentNum: 0,
          goodUserAvatarList: 0, //临时为数字
          commentUserList: [
            {
              username: "",
              avatar: "",
              contentText: "",
              date: {
                date: "2020年2月8日",
                time: "15:40",
              },
            },
          ],
        },
      },
    };
  },
  onLoad(options) {
    if (options.data) {
      this.pageData = JSON.parse(options.data);
    }
  },
  mounted() {
    this.domId = "#main";
  },
  methods: {
    hideLong() {
      this.longSelectHidden = false;
    },
    handleRight(data) {
      this.coordinate = data;
      this.longSelectHidden = true;
    },
    renderFinish(filePath) {
      this.renderUrl = filePath;
      uni.hideToast();
      this.isShowRender = true;
    },
    preImg() {
      console.log(1);
      this.$refs.html2canvas.createImg();
    },
  },
};
</script>

<style lang="scss">
.main {
  height: 100vh;
  .canbox {
    width: 765upx;
    height: 100vh;
    display: flex;
    flex-direction: column;

    .content {
      flex: 1;
      background-color: #000;
      max-height: 85vh;
      height: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      margin: -2upx 0;

      .con_img {
        width: 765upx;
      }
    }

    .boottom {
      width: 765upx;
      height: auto;
      background-color: #0f0e13;
    }

    .boot_text {
      color: #fffeff;
      padding: 14upx 20upx;
      font-size: 34upx;
      letter-spacing: 2upx;
      line-height: 1.4;
      max-height: 130upx;
      overflow: hidden;
    }

    .footer {
      width: 765upx;
      height: 90upx;
      box-sizing: border-box;
      background-color: #343233;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 40upx 10upx 30upx;

      .icon-good {
        font-size: 42upx;
        margin-right: 6upx;
        vertical-align: middle;
      }

      .zan {
        font-size: 32upx;
        margin-right: 16upx;
        position: relative;
        bottom: 2upx;
      }

      .moreright {
        margin-right: 50upx;
      }

      .icon-chat {
        font-size: 38upx;
        font-weight: 900;
        margin-right: 8upx;
        vertical-align: middle;
        position: relative;
        top: 2upx;
      }

      .comment {
        font-size: 32upx;
        position: relative;
        bottom: 2upx;
      }
    }
  }
}
</style>
