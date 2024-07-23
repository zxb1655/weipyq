<template>
  <popup ref="articlepopup" type="fadeInMiddle" @hide="close">
    <view class="weiarticle_popup">
      <view class="popup_title"> 获取公众号文章 </view>
      <input
        class="popup_input"
        type="text"
        v-model="articleUrl"
        placeholder="请输入公众号文章链接"
      />
      <view class="popup_btn" @tap="getArticle"> 获取 </view>
    </view>
  </popup>
</template>

<script>
export default {
  name: "wei-article",
  data() {
    return {
      articleUrl: "",
    };
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    isShow(newVal, old) {
      if (newVal) {
        this.$refs.articlepopup.show();
      } else {
        this.$refs.articlepopup.hide();
      }
    },
  },
  methods: {
    async getArticle() {
      if (this.articleUrl.length == 0) {
        return;
      }
      uni.showLoading({
        title: "正在获取中...",
      });
      const res = await this.$api.getArticle({
        url: this.articleUrl,
      });
      const linkData = {
        linkText: res.title,
        linkImg: res.imgUrl,
      };
      uni.hideLoading();
      this.articleUrl = "";
      this.$refs.articlepopup.hide();
      this.$emit("submit", linkData);
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss">
.weiarticle_popup {
  width: 600upx;
  height: 100%;
  padding: 20upx;
  border-radius: 10upx;
  background-color: #ffffff;

  .popup_title {
    text-align: center;
    font-size: 34upx;
    font-weight: 900;
    margin-bottom: 40upx;
    color: var(--green);
  }

  .popup_input {
    font-size: 26upx;
    padding-bottom: 10upx;
    border-bottom: 2upx solid var(--green);
  }

  .popup_btn {
    margin: 40upx auto 0;
    font-size: 30upx;
    width: 120upx;
    text-align: center;
    border-radius: 5px;
    background-color: var(--green);
    padding: 4upx 10upx;
    color: white;
  }
}
</style>
