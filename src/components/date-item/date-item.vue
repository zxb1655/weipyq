<template>
  <view>
    <!-- 只有不是同一天才渲染日期 -->
    <text v-if="shouldShowDate" class="bottomDateStyle">{{ date.date || nowDate }}</text>
    <text class="bottomDateStyle left">{{ date.time || nowTime }}</text>
  </view>
</template>

<script>
export default {
  name: "yy-date-item",
  props: {
    date: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      nowDate: "",
      nowTime: "",
    };
  },
  computed: {
    // 今天日期字符串（YYYY年MM月DD日）
    todayStr() {
      const d = new Date();
      const Y = d.getFullYear();
      const M = d.getMonth() + 1;
      const D = d.getDate();
      return `${Y}年${M}月${D}日`;
    },
    // 是否显示日期：如果 props 没给 date.date，或者给的日期就是今天，就不显示
    shouldShowDate() {
      if (!this.date || !this.date.date) return false;   // 没传日期，不显示
      return this.date.date !== this.todayStr;          // 不是今天，才显示
    },
  },
  created() {
    this._getNowDate();
    // 每分钟刷新一次时间（保证 nowTime 实时）
    this.timer = setInterval(() => this._getNowDate(), 60000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    _getNowDate() {
      const date = new Date();
      const year = date.getFullYear() + "年";
      const month = date.getMonth() + 1 + "月";
      const day = date.getDate() + "日";
      this.nowDate = year + month + day;

      const hour = date.getHours().toString().padStart(2, "0");
      const min = date.getMinutes().toString().padStart(2, "0");
      this.nowTime = hour + ":" + min;
    },
  },
};
</script>

<style>
.bottomDateStyle {
  color: var(--gray);
  font-size: 25upx;
}
.left {
  margin-left: 4px;
}
</style>