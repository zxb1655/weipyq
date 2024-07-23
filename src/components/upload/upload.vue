<template>
  <!-- 外层 -->
  <view class="weui-uploader__bd">
    <!-- 预览层 -->
    <view class="weui-uploader__files" id="uploaderFiles">
      <block v-if="files.length == 1">
        <image
          :src="files[0]"
          mode="widthFix"
          class="onepyqPic"
          @load="imageLoad"
          :style="{ width: firPicWidth, height: firPicHeight }"
        ></image>
      </block>

      <block v-else-if="files.length == 4">
        <view class="weui-uploader__file" @tap="previewImage" :id="files[0]">
          <image class="weui-uploader__img" :src="files[0]" mode="aspectFill" />
        </view>
        <view class="weui-uploader__file" @tap="previewImage" :id="files[1]">
          <image class="weui-uploader__img" :src="files[1]" mode="aspectFill" />
        </view>
        <view class="weui-uploader__file"> </view>
        <view class="weui-uploader__file" @tap="previewImage" :id="files[2]">
          <image class="weui-uploader__img" :src="files[2]" mode="aspectFill" />
        </view>
        <view class="weui-uploader__file" @tap="previewImage" :id="files[3]">
          <image class="weui-uploader__img" :src="files[3]" mode="aspectFill" />
        </view>
      </block>

      <block v-else>
        <block v-for="(item, index) in files" :key="index">
          <view class="weui-uploader__file" @tap="previewImage" :id="item">
            <image class="weui-uploader__img" :src="item" mode="aspectFill" />
          </view>
        </block>
      </block>
    </view>

    <!-- 添加层 -->
    <block v-if="files.length < 9 && !show">
      <view class="weui-uploader__input-box">
        <view class="weui-uploader__input" @tap="chooseImage"></view>
      </view>
    </block>
  </view>
</template>

<script>
export default {
  name: "yy-upload",
  props: {
    // 是否显示添加层
    show: {
      type: Boolean,
      default: false,
    },
    filesData: {
      type: Array | Object,
      default: null,
    },
  },
  mounted() {
    this.files = this.filesData || [];
  },
  data() {
    return {
      // 预览图片列表
      files: [],

      firPicWidth: "0upx",
      firPicHeight: "0upx",
    };
  },
  methods: {
    chooseImage: function (e) {
      uni.chooseImage({
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        count: 9 - this.files.length,
        success: (res) => {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          this.files = this.files.concat(res.tempFilePaths);
          this.getPicture();
        },
      });
    },
    previewImage: function (e) {
      uni.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.files, // 需要预览的图片http链接列表
      });
    },
    //调整第一个图片的长宽
    imageLoad(e) {
      let width = e.detail.width;
      let height = e.detail.height;
      let scale = height / width;
      //判断图片高度和宽度
      if (height > width) {
        height = "390";
        width = height / scale;
      } else {
        width = "390";
        height = scale * width;
      }
      this.firPicWidth = width + "upx";
      this.firPicHeight = height + "upx";
    },
    getPicture() {
      // detail对象，提供给事件监听函数
      this.$emit("upLoader", this.files);
    },
  },
};
</script>

<style lang="scss">
.weui-uploader__bd {
  margin: 25upx 0 70upx 0;
  margin-bottom: -16upx;
  margin-right: -16upx;
  overflow: hidden;
  .weui-uploader__file {
    float: left;
    margin-right: 16upx;
    margin-bottom: 16upx;
    position: relative;
  }

  .weui-uploader__img {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .weui-uploader__input {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .onepyqPic {
    max-width: 300upx;
    max-height: 300upx;
  }

  .weui-uploader__file,
  .weui-uploader__input-box {
    width: 30%;
    height: 0;
    padding-bottom: 30%;
  }

  .weui-uploader__input-box {
    float: left;
    position: relative;
    margin-right: 16upx;
    margin-bottom: 16upx;
    box-sizing: border-box;
    background-color: #ededed;
    &::after {
      content: " ";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #a3a3a3;
      width: 32px;
      height: 2px;
    }

    &::before {
      content: " ";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #a3a3a3;
      width: 2px;
      height: 32px;
    }
    &:active {
      border-color: #8b8b8b;
      &::after {
        background-color: #8b8b8b;
      }
      &::before {
        background-color: #8b8b8b;
      }
    }
  }
}
</style>
