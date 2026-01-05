<template>
  <view class="pageedit">
    <weiarticle-popup
        :isShow="isShowArticle"
        @submit="getArticleInfo"
        @close="isShowArticle = false"
    />
    <userinfo-popup
        v-if="isShowUserInfo"
        :isShow="isShowUserInfo"
        @close="isShowUserInfo = false"
        @send="goArticle"
    />
    <view class="mar-l-r-40 content-edit">
      <!-- 文本输入框 -->
      <view class="content-text">
        <textarea
            placeholder="这一刻的想法..."
            v-model="pageData.article.contentText"
            maxlength="-1"
        ></textarea>
      </view>

      <!-- 链接 -->
      <view class="link" v-if="pageData.type == 1">
        <view class="pypLink">
          <image
              @tap="uploadImg"
              class="linkImg"
              :src="pageData.linkInfo.linkImg"
              mode="aspectFill"
          ></image>
          <text
              class="linkText"
              style="height: auto"
              @tap="inputLink"
              v-if="!isInput"
          >{{ pageData.linkInfo.linkText }}</text
          >
          <textarea
              focus
              class="linkText"
              @blur="isInput = false"
              v-model="pageData.linkInfo.linkText"
              placeholder="点击输入链接描述"
              v-else
          />
        </view>
        <view class="linkBtn" @tap="showPopup"> 获取公众号文章信息 </view>
      </view>

      <view v-if="pageData.type != 1">
        <upload @upLoader="getFiles" />
      </view>
    </view>

    <!-- 预设置 -->
    <view class="mar-l-r-40 item-group">
      <edit-item
          title="点赞量"
          icon="good"
          :max="500"
          type="slide"
          @slideValue="slideValue"
          :finish="status.item1"
      />
      <edit-item
          v-if="pageData.type == 2"
          title="评论量"
          icon="chat"
          type="slide"
          @slideValue="slideCommentValue"
          :finish="status.item4"
      />
      <edit-item
          title="是否开启顶部导航"
          icon="link"
          type="switch"
          @switchValue="switchValue"
          :finish="status.item2"
          :checked="pageData.navbar"
      />
      <edit-item
          v-if="pageData.navbar"
          :max="100"
          title="顶部导航电量"
          icon="80dianliang"
          type="slide"
          @slideValue="dianValue"
          :finish="status.item3"
          :value="pageData.dian"
      />
      <picker mode="time" @change="getTime">
        <edit-item
            v-if="pageData.navbar"
            title="顶部导航时间"
            icon="time"
            arrow
            :right-text="pageData.navbarTime"
            :finish="status.item5"
        />
      </picker>
    </view>
    <view class="send-out">
      <view class="send iconfont" @tap="send">发 表</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    // 生成 28–95 的随机整数电量
    const randomDian = Math.floor(Math.random() * (95 - 28 + 1)) + 28;
    // 默认时间为当前 HH:MM
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const defaultTime = `${hh}:${mm}`;

    return {
      isInput: false,
      pageData: {
        type: 0,
        navbar: true,              // 默认开启顶部导航
        navbarTime: defaultTime,   // 默认当前时间
        dian: randomDian,          // 默认随机电量
        linkInfo: {
          linkText: "点击输入公众号文章描述",
          linkImg: "https://weiapi.jzzz66.cn/avatar.png",
        },
        article: {
          username: "",
          avatar: "",
          contentText: "",
          pictureList: [],
          date: {
            date: "",
            time: "",
          },
        },
        comment: {
          commentNum: 0,
          goodUserAvatarList: 0,
          commentUserList: [],
        },
      },
      status: {
        item1: false,
        item2: true,   // 开关默认开启
        item3: true,   // 电量已赋值
        item4: false,
        item5: true,   // 时间已赋值
      },
      isShowArticle: false,
      isShowUserInfo: false,
    };
  },
  onLoad(option) {
    this.pageData.type = option.type;
  },
  methods: {
    getTime(e) {
      this.pageData.navbarTime = e.detail.value;
      this.status.item5 = true;
    },
    getArticleInfo(data) {
      this.isShowArticle = false;
      this.pageData.linkInfo = data;
    },
    inputLink() {
      this.isInput = true;
    },
    showPopup() {
      this.isShowArticle = true;
    },
    uploadImg() {
      uni.chooseImage({
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        count: 1,
        success: (res) => {
          this.pageData.linkInfo.linkImg = res.tempFilePaths[0];
        },
      });
    },
    dianValue(value) {
      this.pageData.dian = value;
      this.status.item3 = value > 0;
    },
    slideCommentValue(value) {
      this.pageData.comment.commentNum = value;
      this.status.item4 = value > 0;
    },
    slideValue(value) {
      this.pageData.comment.goodUserAvatarList = value;
      this.status.item1 = value > 0;
    },
    switchValue(value) {
      this.pageData.navbar = value;
      this.status.item2 = value;
    },
    getFiles(data) {
      this.pageData.article.pictureList = data;
    },
    send() {
      this.isShowUserInfo = true;
    },
    async goArticle(userinfo) {
      this.pageData.article.contentText = await this.$util.emoticonReplace(
          this.pageData.article.contentText
      );
      this.pageData.article.username = userinfo.username;
      this.pageData.article.avatar = userinfo.avatar;
      this.pageData.article.date = userinfo.date;
      let data = JSON.stringify(this.pageData);
      if (this.pageData.type == 2) {
        uni.navigateTo({
          url: `../main/main?data=${data}`,
        });
      } else {
        uni.navigateTo({
          url: `../article/article?data=${data}`,
        });
      }
    },
  },
};
</script>

<style lang="scss">
.uni-picker-container {
  z-index: 9;
}
/* 针对手机设备 */
@media screen and (max-width: 768px) {
  .pageedit {
    width: 100vw;
  }
}
/* 针对桌面设备 */
@media screen and (min-width: 1024px) {
  .pageedit {
    width: 550px;
    height: 100vh;
    margin: 0 auto;
    box-shadow: 0 0 5px #eee;
  }
}
.pageedit {
  padding-top: 10upx;

  .link {
    .pypLink {
      height: 80upx;
      margin-top: 10upx;
      display: flex;
      align-items: center;
      background-color: var(--grayLight);
      padding: 12upx 20upx 12upx 12upx;
      position: relative;
      z-index: 10;
    }

    .linkBtn {
      float: right;
      font-size: 22upx;
      display: inline-block;
      margin-top: 30upx;
      border-radius: 5px;
      background-color: var(--green);
      padding: 8upx 20upx;
      color: white;
    }

    .linkImg {
      width: 90upx;
      height: 90upx;
      margin-right: 10upx;
    }

    .linkText {
      font-size: 26upx;
      width: 100%;
      height: 100%;
      line-height: 1.5;
      flex: 1;
      vertical-align: middle;
    }
  }

  .mar-l-r-40 {
    margin-left: 40upx;
    margin-right: 40upx;
  }

  .content-edit {
    margin-top: 40upx;
    margin-bottom: 100upx;
  }

  .content-text {
    width: 100%;
    height: 100px;
  }

  .content-text {
    textarea {
      width: 100%;
      font-size: 30upx;
    }
  }

  .item-group {
    border-top: 1upx #f1f1f1 solid;
    border-bottom: 1upx #f1f1f1 solid;
  }

  .send {
    display: inline-block;
    border-radius: 10upx;
    background-color: var(--green);
    padding: 10upx 40upx;
    color: white;
  }

  .send-out {
    text-align: center;
    padding: 50upx;
  }
}
</style>