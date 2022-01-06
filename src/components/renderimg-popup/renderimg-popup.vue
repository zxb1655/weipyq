<template>
  <popup ref="imgPopup" type="fadeInMiddle" @hide="hideImgPopup">
    <view class="tip"> 长按图片进行保存 </view>
    <scroll-view scroll-y="true" class="img_popup_box">
      <image :src="imgUrl" mode="heightFix" class="renderImg"></image>
    </scroll-view>
  </popup>
</template>

<script>
export default {
  name: "renderimg-popup",
  data() {
    return {};
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    imgUrl: {
      type: String,
      default: "",
    },
  },
  watch: {
    isShow(newVal, old) {
      if (newVal) {
        this.$refs.imgPopup.show();
      } else {
        this.$refs.imgPopup.hide();
      }
    },
  },
  methods: {
    hideImgPopup() {
      this.close();
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss">
.img_popup_box {
  width: 100%;
  height: 80vh;
  text-align: center;
  overflow: scroll;
}

.tip {
  text-align: center;
  color: #fff;
  position: relative;
  bottom: 60upx;
}

.renderImg {
  height: 100%;
}
</style>
