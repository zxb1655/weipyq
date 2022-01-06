<template>
  <popup ref="rulepopup" type="fadeInMiddle" @hide="close">
    <view class="rule">
      <scroll-view scroll-y="true" class="rule_popup" v-if="type === 'index'">
        <view class="popup_title"> 使用说明 </view>
        <view class="rule_content">
          <view class="list">
            <view class="list_title">两种模式说明</view>
            <view class="list_box">
              <view class="list_left">自动生成版: </view>
              <view class="list_right"
                >根据填写信息(朋友圈发表者、发表内容等)自动生成集赞截图。</view
              >
            </view>
            <view class="list_box">
              <view class="list_left">截图版: </view>
              <view class="list_right">
                需要自己到朋友圈截取所需要集赞的内容截图，然后上传本系统会自动生成集赞图。
              </view>
            </view>
          </view>
          <view class="list">
            <view class="list_title">三种截图样式说明</view>
            <view class="list_box">
              <view class="list_left">图文样式: </view>
              <view class="list_right">
                <text>发表图片或者文字的图文样式。</text>
                <image
                  class="list_img"
                  src="https://cdn.jzzz66.cn/rule1.png"
                  mode="widthFix"
                />
              </view>
            </view>
            <view class="list_box">
              <view class="list_left">文章样式: </view>
              <view class="list_right">
                <text
                  >转发公众号文章的样式。可以自动获取微信文章的详情图和描述。</text
                >
                <image
                  class="list_img"
                  src="https://cdn.jzzz66.cn/rule2.png"
                  mode="widthFix"
                />
              </view>
            </view>
            <view class="list_box">
              <view class="list_left">主图样式: </view>
              <view class="list_right"
                ><text>主图样式，生成点赞和评论数量。</text>
                <image
                  class="list_img"
                  src="https://cdn.jzzz66.cn/rule3.png"
                  mode="widthFix"
                />
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
      <scroll-view scroll-y="true" class="rule_popup" v-if="type === 'auto'">
        <view class="popup_title"> 使用说明 </view>
        <view class="rule_content">
          <view class="list">
            <view class="list_title">说明</view>
            <view class="list_box"
              >此模式需要自己到朋友圈先截图保存，然后裁切上传到本系统，就会自动生成点赞截图。</view
            >
          </view>
          <view class="list">
            <view class="list_title">图文和链接样式</view>
            <view class="list_box"
              >需要上传两张截图，分别是朋友圈内容截图和评论内容截图，需要自己裁切成下列类型图片(只裁切高度，不要裁切宽度)。</view
            >
            <view class="list_box">
              <view class="list_left">第一张: </view>
              <view class="list_right">
                <text>朋友圈内容截图，需裁切成下面这样。</text>
                <image
                  class="list_img"
                  src="https://cdn.jzzz66.cn/auto1.png"
                  mode="widthFix"
                />
              </view>
            </view>
            <view class="list_box">
              <view class="list_left">第二张: </view>
              <view class="list_right"
                ><text>朋友评论截图，需裁切成下面这样。</text>
                <image
                  class="list_img"
                  src="https://cdn.jzzz66.cn/auto2.png"
                  mode="widthFix"
                />
              </view>
            </view>
          </view>
          <view class="list">
            <view class="list_title">主图样式</view>
            <view class="list_box"
              >只需上传一张截图，裁切掉主图下面的点赞和评论数量展示，需裁切成下面这样</view
            >
            <image
              class="list_img auto3img"
              src="https://cdn.jzzz66.cn/auto3.png"
              mode="widthFix"
            />
          </view>
        </view>
      </scroll-view>
      <scroll-view scroll-y="true" class="rule_popup" v-if="type === 'article'">
        <view class="popup_title"> 使用说明 </view>
        <view class="rule_content">
          <view class="list">
            <view class="list_title">保存截图说明</view>
            <view class="list_box"
              >点击屏幕右上角的3个点，然后再点击截图，就会生成图片。</view
            >
            <image
              class="list_img artimg"
              src="https://cdn.jzzz66.cn/art1.png"
              mode="widthFix"
            />
            <view class="list_box">然后再长按图片保存到手机即可。</view>
            <image
              class="list_img artimg"
              src="https://cdn.jzzz66.cn/art2.png"
              mode="widthFix"
            />
          </view>
          <view class="list">
            <view class="list_title">留言说明</view>
            <view class="list_box"
              >只有自动生成模式才能发表留言并进行回复，截图版的评论是上传截图生成的，不能自动生成留言。点击某条留言便可以进行回复。</view
            >
            <image
              class="list_img artimg"
              src="https://cdn.jzzz66.cn/art4.png"
              mode="widthFix"
            />
          </view>
        </view>
      </scroll-view>
      <view class="popup_btn" @tap="closeBox"> 关闭 </view>
    </view>
  </popup>
</template>

<script>
export default {
  name: "wei-article",
  data() {
    return {
      isTip: true,
    };
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "index",
    },
  },
  mounted() {
    const isTip = uni.getStorageSync("isTip");
    isTip && this.$refs.rulepopup.show();
  },
  methods: {
    closeBox() {
      this.$refs.rulepopup.hide();
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss">
.rule {
  .rule_popup {
    width: 630upx;
    height: 75vh;
    padding: 20upx;
    border-radius: 10upx;
    background-color: #ffffff;

    .rule_content {
      padding-right: 20upx;

      .list_title {
        border-left: 4px solid var(--green);
        padding-left: 10px;
        font-size: 32upx;
        font-weight: 900;
        color: var(--green);
        margin-bottom: 20upx;
      }

      .list_box {
        display: flex;
        justify-content: space-between;
        font-size: 28upx;
        margin-bottom: 10upx;
      }

      .list_left {
        width: 160upx;
        text-align: right;
        font-weight: 900;
      }

      .list_right {
        margin-left: 20upx;
        flex: 1;
        font-size: 26upx;
        color: #222;
        line-height: 1.6;
      }

      .list_img {
        width: 80%;
      }
    }

    .popup_title {
      text-align: center;
      font-size: 34upx;
      font-weight: 900;
      margin-bottom: 40upx;
      color: var(--green);
    }
  }
  .auto3img {
    width: 80%;
    display: block;
    margin: 0 auto;
  }
  .artimg {
    width: 80%;
    display: block;
    margin: 10upx auto;
  }
  .popup_btn {
    margin: 20upx auto 0;
    font-size: 30upx;
    width: 120upx;
    text-align: center;
    border-radius: 5px;
    background-color: var(--green);
    padding: 8upx 10upx;
    color: white;
  }
}
</style>
