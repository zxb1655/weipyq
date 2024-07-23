<template>
  <view class="set-item iconfont" :class="{ green: finish }">
    <view
      class="set-item-text set-slide"
      :class="[{ arrow: arrow }, iconName]"
      v-if="type == 'slide'"
    >
      {{ title }}
      <slider
        class="right-slide"
        :value="slideValue"
        block-color="#07c160"
        activeColor="#07c160"
        :max="max"
        @change="sliderChange"
      />
      <input
        @input="sliderChange"
        class="slide-text"
        type="text"
        :value="slideValue"
      />
    </view>
    <view
      class="set-item-text set-slide"
      :class="[{ arrow: arrow }, iconName]"
      v-if="type == 'switch'"
    >
      {{ title }}
      <switch @change="switchChange" color="#07c160" />
    </view>
    <view
      class="set-item-text"
      :class="[{ arrow: arrow }, iconName]"
      v-if="type == 'text'"
    >
      {{ title }}
      <text class="right-text">{{ rightText }}</text>
    </view>
  </view>
</template>

<script>
export default {
  name: "yy-form-item",
  computed: {
    iconName() {
      return `icon-${this.icon}`;
    },
  },
  data() {
    return {
      slideValue: 0,
    };
  },
  methods: {
    sliderChange(e) {
      this.slideValue = e.detail.value;
      this.$emit("slideValue", e.detail.value);
    },
    switchChange(e) {
      this.$emit("switchValue", e.target.value);
    },
  },
  props: {
    type: {
      type: String,
      default: "text",
    },
    max: {
      type: Number | String,
      default: 100,
    },
    title: {
      type: String,
      default: "标签内容",
    },
    icon: {
      type: String,
      default: "good",
    },
    arrow: {
      type: Boolean,
      default: false,
    },
    rightText: {
      type: String | Number,
      default: "",
    },
    finish: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.set-item {
  position: relative;
  padding-left: 100upx;
  background-color: white;
  box-sizing: border-box;

  &:active {
    background-color: #e5e5e5;
  }

  uni-slider {
    margin: 0;
  }

  .set-item-text {
    padding: 30upx 65upx 30upx 0;
    border-bottom: 1upx #f1f1f1 solid;
    font-size: 30upx;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &::before {
      position: absolute;
      left: 25upx;
      color: black;
      font-size: 40upx;
    }
  }
  .set-slide {
    padding-right: 0;
  }

  .arrow {
    &::after {
      position: absolute;
      right: 20upx;
      content: "\e6ab";
      font-size: 32upx;
      top: 33upx;
      color: #e6e6e6;
    }
  }
  .right-text {
    color: #ddd;
  }
  .right-slide {
    margin-left: 40upx;
    flex: 1;
  }
  .slide-text {
    color: var(--green);
    width: 60upx;
    padding-left: 20upx;
    margin-left: 20upx;
    margin-right: 10upx;
  }
}

.green {
  color: var(--green);

  .right-text {
    color: inherit;
  }

  .set-item-text:before {
    color: var(--green);
    font-weight: bold;
  }
}
</style>
