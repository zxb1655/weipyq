<template>
  <!-- 长按弹出操作 -->
  <view
    class="longActiveSelect"
    :animation="longActiveAm"
    :style="{ top: showTop, left: showLeft }"
  >
    <view @tap="renderImg">截图</view>
    <view @tap="deleteCom">删除</view>
    <view @tap="replyCom">回复</view>
    <view @tap="cancel">取消</view>
  </view>
</template>

<script>
export default {
  name: "yy-long-select-item",
  props: {
    coordinate: {
      type: Object,
    },
    hidden: {
      type: Boolean,
    },
  },
  watch: {
    hidden(newV, oldV) {
      if (newV) {
        this._showSelect(this.coordinate);
      } else {
        this._hiddenSelect();
      }
    },
  },
  data() {
    return {
      longActiveAm: "",
      showTop: "0upx",
      showLeft: "0upx",
    };
  },
  methods: {
    renderImg() {
      this.$emit("renderImg");
      this.cancel();
    },
    deleteCom() {
      uni.showModal({
        title: "提示",
        content: "确定删除吗？",
        success: (res) => {
          if (res.confirm) {
            this.$emit("deleteCom", this.coordinate.index);
            this.cancel();
          }
        },
      });
    },
    replyCom() {
      this.$emit("replyCom", this.coordinate.index);
      this.cancel();
    },
    cancel() {
      this._hiddenSelect();
      this.$emit("cancel");
    },
    //展开选择item
    _showSelect(e) {
      //短震动
      uni.vibrateShort({});
      this.showLeft = e.x + "px";
      this.showTop = e.y + "px";
      let animation = uni.createAnimation({
        duration: 200,
        timingFunction: "ease",
      });
      animation.width("180upx").height("440upx").step();
      this.longActiveAm = animation.export();
    },
    //隐藏选择item
    _hiddenSelect() {
      let animation = uni.createAnimation({
        duration: 100,
        timingFunction: "ease",
      });
      animation.width("0upx").height("0upx").step();
      this.longActiveAm = animation.export();
    },
  },
};
</script>

<style lang="scss">
.longActiveSelect {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  overflow: hidden;
  background-color: white;
  width: 0upx;
  height: 0upx;
  box-shadow: 0 0 20upx 0upx rgb(202, 202, 202);

  & > view {
    height: 110upx;
    box-sizing: border-box;
    padding-top: 30upx;
    padding-bottom: 30upx;
    padding-left: 30upx;

    &:active {
      background-color: var(--grayActive);
    }
  }
}
</style>
