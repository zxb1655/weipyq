<template>
  <popup ref="userpopup" type="fadeInMiddle" @hide="close">
    <view class="userinfo_popup">
      <view class="popup_title"> 填写发表者信息 </view>
      <view class="content">
        <view class="content_left"> 头像： </view>
        <view class="content_right">
          <view class="content_avatar" @tap="chooseImage">
            <image v-if="avatar" :src="avatar" class="content_img"></image>
            <text v-else>+</text>
          </view>
        </view>
        <view class="randomImg" @click="randomImg"> 随机头像 </view>
      </view>
      <view class="content">
        <view class="content_left"> 昵称： </view>
        <view class="content_right">
          <input
            class="popup_input"
            type="text"
            v-model="username"
            placeholder="请填写发表者昵称"
          />
        </view>
        <view class="randomImg" @click="randomName"> 随机昵称 </view>
      </view>
      <picker mode="date" value="0" fields="day" @change="getDate">
        <edit-item
          title="发表日期"
          icon="date"
          arrow
          :right-text="date.date"
          :finish="status.item1"
        />
      </picker>
      <picker mode="time" @change="getTime">
        <edit-item
          title="发表时间"
          icon="time"
          arrow
          :right-text="date.time"
          :finish="status.item2"
        />
      </picker>

      <view class="popup_btn" @tap="sendInfo"> 发表 </view>
    </view>
  </popup>
</template>

<script>
export default {
  name: "wei-article",
  data() {
    return {
      replyName: "",
      username: "",
      avatar: "",
      date: {
        date: "",
        time: "",
      },
      status: {
        item1: false,
        item2: false,
      },
    };
  },
  props: {
    reply: {
      type: Object,
    },
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    if (this.reply) {
      this.replyName = this.reply.username;
    }
    this.$refs.userpopup.show();
  },
  methods: {
    randomImg() {
      this.avatar = this.$util.randomImg();
    },
    randomName() {
      this.username = this.$util.randomName();
    },
    getTime(e) {
      this.date.time = e.detail.value;
      this.status.item2 = true;
    },
    getDate(e) {
      let res = this.dislodgeZero(e.detail.value);
      res = this.addYMD(res);
      res = res.replace(/-/g, "");
      this.date.date = res;
      this.status.item1 = true;
    },
    // 日期去掉0
    dislodgeZero(str) {
      let strArray = str.split("-");
      strArray = strArray.map(function (val) {
        if (val[0] == "0") {
          return (val = val.slice(1));
        } else {
          return val;
        }
      });
      return strArray.join("-");
    },
    // 加年月日
    addYMD(str) {
      let strArray = str.split("-");
      strArray = strArray.map(function (val, index) {
        if (index == 0) {
          return val + "年";
        } else if (index == 1) {
          return val + "月";
        } else {
          return val + "日";
        }
      });
      return strArray.join("-");
    },
    chooseImage() {
      uni.chooseImage({
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        count: 1,
        success: (res) => {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          this.avatar = res.tempFilePaths[0];
        },
      });
    },
    sendInfo() {
      if (!this.avatar) {
        return uni.showToast({
          title: "请选择头像",
          icon: "none",
        });
      }
      if (!this.username) {
        return uni.showToast({
          title: "请输入昵称",
          icon: "none",
        });
      }
      const userInfo = {
        id: Math.floor(Math.random() * 10000),
        username: this.username,
        avatar: this.avatar,
        date: this.date,
        replyName: this.replyName,
      };
      this.$emit("send", userInfo);
      this.$refs.userpopup.hide();
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss">
.userinfo_popup {
  width: 600upx;
  height: 100%;
  padding: 20upx;
  border-radius: 10upx;
  background-color: #ffffff;

  .content {
    display: flex;
    align-items: center;
    margin-bottom: 40upx;

    .randomImg {
      margin: 30upx auto 0;
      font-size: 24upx;
      width: 100upx;
      text-align: center;
      border-radius: 10upx;
      background-color: var(--green);
      padding: 4upx 10upx;
      color: white;
    }

    .content_left {
      width: 20%;
      font-size: 28upx;
      text-align: right;
      color: #666;
      font-weight: 900;
    }

    .content_right {
      flex: 1;
    }

    .content_avatar {
      width: 150upx;
      height: 150upx;
      text-align: center;
      line-height: 150upx;
      font-size: 80upx;
      color: #a3a3a3;
      background-color: #ededed;
    }

    .content_img {
      width: 100%;
      height: 100%;
    }
  }

  .popup_title {
    text-align: center;
    font-size: 34upx;
    font-weight: 900;
    margin-bottom: 40upx;
    color: var(--green);
  }

  .popup_input {
    font-size: 26upx;
    padding-bottom: 20upx;
    border-bottom: 2upx solid var(--green);
  }

  .popup_btn {
    margin: 30upx auto 0;
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
