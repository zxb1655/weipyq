<template>
  <view class="navbar" :style="{ backgroundColor: bgColor, color: textColor }">
    <view class="nav">
      <text class="nav_time">{{ pageData.navbarTime }}</text>
      <view class="nav_right">
        <text class="iconfont icon_xinhao">&#xe61f;</text>
        <text class="iconfont icon_wifi">&#xe627;</text>
        <view class="icon_dian" :style="{ borderColor: textColor }">
          <view
            class="dian_right"
            :style="{ backgroundColor: textColor }"
          ></view>
          <view
            class="mask"
            :style="{ width: pageData.dian + '%', backgroundColor: textColor }"
          ></view>
        </view>
        <text class="nav_num">{{ pageData.dian }}</text>
        <text class="nav_bai">%</text>
      </view>
    </view>
    <view class="bar">
      <text class="iconfont icon_left" @tap="back">&#xe60a;</text>
      <text class="bar_text">{{
        ismain
          ? pageData.article.date.date + "  " + pageData.article.date.time
          : "详情"
      }}</text>
      <text class="iconfont icon_right" @tap="handleRight">&#xf0141;</text>
    </view>
  </view>
</template>

<script>
export default {
  name: "navbar",
  props: {
    pageData: {
      type: Object,
      default: {},
    },
    bgColor: {
      type: String,
      default: "#f7f7f7",
    },
    textColor: {
      type: String,
      default: "#333",
    },
    ismain: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    back() {
      uni.navigateBack({
        delta: 1,
      });
    },
    handleRight(e) {
      let data = {
        x: e.detail.x - 100,
        y: e.detail.y,
      };
      this.$emit("handle", data);
    },
  },
};
</script>

<style lang="scss">
.navbar {
  .nav {
    width: 765upx;
    height: 60upx;
    box-sizing: border-box;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 0 40upx;

    .nav_time {
      font-size: 24upx;
      font-weight: 900;
      margin-bottom: 2upx;
    }

    .nav_right {
      display: flex;
      align-items: center;
    }

    .icon_xinhao {
      font-size: 24upx;
      margin-right: 12upx;
      font-weight: 900;
    }

    .icon_wifi {
      font-size: 34upx;
      margin-right: 6upx;
      vertical-align: middle;
      position: relative;
      top: 0;
    }

    .icon_dian {
      width: 38upx;
      height: 22upx;
      box-sizing: border-box;
      display: inline-block;
      border: 3upx solid #333;
      border-radius: 6upx;
      padding: 2upx;
      margin-right: 10upx;
      position: relative;
      top: 2upx;

      .dian_right {
        position: absolute;
        top: 24%;
        right: -20%;
        width: 4upx;
        height: 10upx;
      }

      .mask {
        height: 100%;
      }
    }

    .nav_num {
      font-size: 24upx;
      font-weight: 500;
      margin-right: 2upx;
    }

    .nav_bai {
      font-size: 16upx;
      font-weight: 900;
      margin-top: 6upx;
    }
  }

  .bar {
    width: 765upx;
    height: 80upx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 20upx;
    padding-right: 50upx;

    .bar_text {
      font-size: 32upx;
      font-weight: 700;
      letter-spacing: 2upx;
      margin-bottom: 8upx;
    }

    .icon_left {
      font-size: 40upx;
      font-weight: 800;
    }

    .icon_right {
      font-weight: 800;
      font-size: 35upx;
    }
  }
}
</style>
