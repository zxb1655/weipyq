<template>
  <view class="pagearticle" ref="render">
    <renderimg-popup
      :imgUrl="renderUrl"
      :isShow="isShowRender"
      @close="isShowRender = false"
    />
    <rule-popup
      v-if="isRulePopup"
      :isShow="isRulePopup"
      type="article"
      @close="isRulePopup = false"
    />
    <view class="content">
      <html2canvas
        ref="html2canvas"
        :domId="domId"
        @renderFinish="renderFinish"
      >
        <view id="poster">
          <!-- 手机顶部导航 -->
          <block v-if="pageData.navbar">
            <navbar @handle="handleRight" :pageData="pageData" />
          </block>
          <!-- 文章内容模块 -->
          <article-module
            :pageData="pageData"
            @comment="clickComment"
            @selfzan="clickGood"
          >
            <block v-if="pageData.article.pictureList != 0">
              <upload
                slot="picture"
                show
                :filesData="pageData.article.pictureList"
              />
            </block>
          </article-module>
          <!-- 文章评论模块 -->
          <view class="comment">
            <comment-module
              @showSelect="showSelect"
              :avatar="pageData.article.avatar"
              :pageData="pageData"
              :self-good="selfGood"
            />
          </view>
          <!-- 长按展开模块 -->
          <longselect-module
            @cancel="longSelectHidden = false"
            @replyCom="replyCom"
            @renderImg="preImg"
            @deleteCom="deleteCom"
            :coordinate="coordinate"
            :hidden="longSelectHidden"
          />
          <!-- input模块 -->
          <input-module
            @blur="blurInput"
            :reply="reply"
            :focus="isFocus"
            :isFixed="isFixed"
            @inputMsg="getComment"
          />
        </view>
      </html2canvas>
    </view>
  </view>
</template>

<script>
import html2canvas from "html2canvas";
export default {
  data() {
    return {
      isShowRender: false,
      isRulePopup: false,
      isFixed: true,
      reply: {
        isReply: false,
        username: "",
      },
      coordinate: {},
      //选择Item的开启状态
      longSelectHidden: false,

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
      //是否聚焦input
      isFocus: false,
      // 是否自赞
      selfGood: false,
      domId: "",
      renderUrl: "",
    };
  },
  mounted() {
    this.domId = "#poster";
  },
  onLoad(options) {
    this.isRulePopup = true;
    if (options.data) {
      this.pageData = JSON.parse(options.data);
      console.log(this.pageData);
    }
  },
  methods: {
    handleRight(data) {
      this.coordinate = data;
      this.longSelectHidden = !this.longSelectHidden;
    },
    preImg() {
      this.isFixed = false;
      this.$refs.html2canvas.createImg();
    },
    renderFinish(filePath) {
      this.renderUrl = filePath;
      uni.hideToast();
      this.isShowRender = true;
      this.isFixed = true;
    },
    deleteCom(i) {
      if (typeof i == "number") {
        this.pageData.comment.commentUserList.splice(i, 1);
      }
    },
    replyCom(i) {
      let username = this.pageData.comment.commentUserList[i].username;
      this.reply.isReply = true;
      this.reply.username = username;
      this.isFocus = true;
    },
    clickComment() {
      this.isFocus = true;
      this.reply.isReply = false;
      this.reply.username = "";
    },
    //点击了赞按钮
    clickGood(data) {
      this.selfGood = data;
    },
    /**
     * 展开长按选择数据传递（传入组件long-select-item坐标信息）
     */
    showSelect(data) {
      this.coordinate = data;
      this.longSelectHidden = true;
    },
    blurInput(value) {
      if (!value) {
        setTimeout(() => {
          this.reply.isReply = false;
          this.reply.username = "";
        }, 100);
      }
      this.isFocus = false;
    },
    getComment(e) {
      let array = this.pageData.comment.commentUserList;
      array.push(e);
      this.pageData.comment.commentUserList = array;
      this.reply.isReply = false;
      this.reply.username = "";
      this.isFocus = false;
    },
  },
};
</script>

<style lang="scss">
.pagearticle {
  #poster {
    min-height: 100vh;
    position: relative;
  }

  .comment {
    padding-bottom: 2upx;
  }
}
</style>
