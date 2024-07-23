<template>
  <view>
    <text class="bottomDateStyle">{{ date.date || nowDate }}</text>
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
  created() {
    this._getNowDate();
  },
  methods: {
    _getNowDate() {
      let date = new Date();
      let year = date.getFullYear() + "年";
      let month = date.getMonth() + 1 + "月";
      let day = date.getDate() + "日";
      let resDate = year + month + day;

      let hour = date.getHours().toString();
      if (hour.length == 1) {
        hour = "0" + hour;
      }
      let min = date.getMinutes().toString();
      if (min.length == 1) {
        min = "0" + min;
      }
      let time = hour + ":" + min;
      this.nowDate = resDate;
      this.nowTime = time;
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
