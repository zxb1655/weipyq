<script>
export default {
  onLaunch: function () {
    // #ifdef H5
    if (navigator.userAgent.indexOf("Mobile") === -1) {
      uni.showToast({
        title: "请使用手机访问哦！目前样式没有完全兼容PC端！",
        icon: "none",
        duration: 3000,
      });
    }
    // #endif
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
@import "/static/iconfont.css";
@import "/static/css/index.scss";
</style>
