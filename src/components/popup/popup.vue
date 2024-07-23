<template>
	<view>
		<view v-if="showMask" @tap.stop="maskHide" class="fadeIn_mask" :class="showBl?'show':'hide'"></view>
		<view :class="[('XB_' + type), showBl?'show':'hide']">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
      //展示模式
      //fadeInMiddle|fadeInLeft|fadeInRight|fadeInDown|fadeInUp|fadeScaleHeightToLowInMiddle
			type:{
				type: String,
				default: 'fadeInMiddle'
			},
      //是否可点击mask隐藏
			tapMaskHide: {
				type: Boolean,
				default: true
			},
			showMask: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				showBl: false
			}
		},
		methods: {
			show() {
				this.showBl = true;
			},
			maskHide() {
				if(this.tapMaskHide) this.hide();
			},
			hide() {
				this.showBl = false;
				this.$emit('hide')
			},
		}
	}
</script>

<style scoped>
	@import url("css/XB-popup.css");
</style>
